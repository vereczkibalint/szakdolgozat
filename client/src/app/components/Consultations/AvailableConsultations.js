import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    cancelReservation,
    fetchAllConsultation,
    reserveConsultation
} from "../../services/consultationService";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faCheckCircle, faQuestion, faTimes, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {Button, Table, Form} from "react-bootstrap";
import Alert from "../../../common/components/Alert";

const AvailableConsultations = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user._id);
    const isLoading = useSelector(state => state.consultations.isLoading);
    const consultations = useSelector(state => state.consultations.consultations);
    const consultationErrorMessage = useSelector(state => state.consultations.errors.message);

    const [filteredConsultations, setFilteredConsultations] = useState([...consultations]);

    useEffect(() => {
        dispatch(fetchAllConsultation());
    }, [dispatch]);

    useEffect(() => {
        setFilteredConsultations([...consultations]);
        sortConsultationsByAsc();
    }, [consultations]);

    if(isLoading) {
        return (
            <LoadingSpinner />
        );
    }

    // TODO!
    function sortConsultationsByAsc() {
        filteredConsultations.sort((prev, next) => {
            return new Date(next.startTime) - new Date(prev.startTime);
        });
    }

    function handleConsultationReservation(consultationId) {
        dispatch(reserveConsultation(consultationId));
    }

    function handleConsultationReservationCancel(reservationId) {
        dispatch(cancelReservation(reservationId));
    }

    function toggleView(viewMode) {
        switch(viewMode){
            case 'show-reserved':
                setFilteredConsultations(consultations.filter(consultation => consultation.reservation && consultation.reservation.student._id === user));
                filteredConsultations.sort((prev, next) => {
                    return new Date(next.startTime) - new Date(prev.startTime);
                });
                break;
            case 'show-all':
            default:
                setFilteredConsultations([...consultations]);
                filteredConsultations.sort((prev, next) => {
                    return new Date(next.startTime) - new Date(prev.startTime);
                });
                break;
        }
    }

    return (
        <div className="mt-5">
            <h2 className="text-center mb-3">Elérhető konzultációk</h2>
            <Form.Group className="d-flex flex-row">
                <Form.Label>Megjelenítési mód:</Form.Label>
                <Form.Control as="select" onChange={(e) => toggleView(e.target.value)}>
                    <option value="show-all">Összes mutatása</option>
                    <option value="show-reserved">Általam foglalt időpontok mutatása</option>
                </Form.Control>
            </Form.Group>
            <Table hover responsive className="text-center">
                <thead className="font-weight-bold">
                <tr>
                    <td>Oktató</td>
                    <td>Konzultáció kezdete</td>
                    <td>Konzultáció vége</td>
                    <td>Konzultáció helyszíne</td>
                    <td>Elérhetőség</td>
                    <td>Műveletek</td>
                </tr>
                </thead>
                <tbody>
                { !isLoading && filteredConsultations.map(consultation => (
                    <tr key={consultation._id}>
                        <td>{consultation.lecturer.lastName + ' ' + consultation.lecturer.firstName}</td>
                        <td>{moment(consultation.startTime).format('YYYY.MM.DD. HH:mm')}</td>
                        <td>{moment(consultation.endTime).format('YYYY.MM.DD. HH:mm')}</td>
                        <td>{consultation.location}</td>
                        <td>
                            { !consultation.reservation ?
                                <FontAwesomeIcon icon={faCheckCircle} className="text-success" title="Elérhető"/> :
                                <FontAwesomeIcon icon={faTimesCircle} className="text-danger" title="Foglalt"/>}
                        </td>
                        <td className="d-flex justify-content-center align-content-center">
                            { !consultation.reservation && (
                                <Button variant="success" size="sm" onClick={() => handleConsultationReservation(consultation._id)}>
                                    <FontAwesomeIcon icon={faCheck} /> Lefoglalás
                                </Button>
                            )}

                            { consultation.reservation && consultation.reservation.student._id === user && moment(consultation.startTime).diff(moment(consultation.reservation.createdAt), 'h') < 24 && (
                                <FontAwesomeIcon icon={faQuestion} cursor="pointer" title="Konzultáció lemondására legkésőbb a kezdet előtt 24 órával van lehetőség!" />
                            )}

                            { consultation.reservation && consultation.reservation.student._id === user && moment(consultation.startTime).diff(moment(consultation.reservation.createdAt), 'h') > 24 && (
                                <Button variant="danger" size="sm" onClick={() => handleConsultationReservationCancel(consultation.reservation._id)}>
                                    <FontAwesomeIcon icon={faTimes} /> Lemondás
                                </Button>
                            )}
                        </td>
                    </tr>
                ))
                }
                </tbody>
            </Table>
            { consultationErrorMessage && (
                <Alert type="danger" message={consultationErrorMessage} />
            )}
            { !isLoading && filteredConsultations.length === 0 && (
                <Alert type="danger" message="A megadott feltételekkel nincs elérhető konzultáció!" />
            )}
        </div>
    );
}

export default AvailableConsultations;
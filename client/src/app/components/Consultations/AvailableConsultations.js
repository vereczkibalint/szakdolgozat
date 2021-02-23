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
import {faCheck, faCheckCircle, faEye, faQuestion, faTimes, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {Button, Table, Form, OverlayTrigger, Popover} from "react-bootstrap";
import Alert from "../../../common/components/Alert";

const AvailableConsultations = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user._id);
    const isLoading = useSelector(state => state.consultations.isLoading);
    const consultations = useSelector(state => state.consultations.consultations);
    const consultationErrorMessage = useSelector(state => state.consultations.errors.message);
    const [descriptionPopoverText, setDescriptionPopoverText] = useState('');
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

    const startTimeBeforeCurrentTimePopover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Lefoglalás nem lehetséges!</Popover.Title>
            <Popover.Content>
                Konzultáció foglalásra legkésőbb a kezdet előtt 24 órával van lehetőség!
            </Popover.Content>
        </Popover>
    );

    const currentTimeCancelTimeDiffLessThan24HoursPopover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Lemondás nem lehetséges!</Popover.Title>
            <Popover.Content>
                Konzultáció lemondására legkésőbb a kezdet előtt 24 órával van lehetőség!
            </Popover.Content>
        </Popover>
    );

    const descriptionPopover = (
        <Popover>
            <Popover.Title className="font-weight-bold">Konzultáció leírása</Popover.Title>
            <Popover.Content>
                <div dangerouslySetInnerHTML={{ __html: descriptionPopoverText }} />
            </Popover.Content>
        </Popover>
    );

    function renderOptionsColumn(consultation) {
        let startTimeCurrentTimeDiffInHours = moment(consultation.startTime).diff(moment(), 'h');
        let startTimeReservationTimeDiffInHours = 0;

        if (consultation.reservation) {
            startTimeReservationTimeDiffInHours = moment(consultation.startTime).diff(moment(consultation.reservation.createdAt), 'h');
        }

        if (!consultation.reservation && startTimeCurrentTimeDiffInHours > 24) {
            return (
                <Button variant="success" size="sm" onClick={() => handleConsultationReservation(consultation._id)}>
                    <FontAwesomeIcon icon={faCheck}/> Lefoglalás
                </Button>
            );
        } else if (!consultation.reservation && startTimeCurrentTimeDiffInHours < 24) {
            return (
                <OverlayTrigger trigger="click" placement="left" overlay={startTimeBeforeCurrentTimePopover}>
                    <FontAwesomeIcon icon={faQuestion} cursor="pointer" />
                </OverlayTrigger>
            );
        } else if (consultation.reservation && consultation.reservation.student._id === user && startTimeReservationTimeDiffInHours < 24) {
            return (
                <OverlayTrigger trigger="click" placement="left" overlay={currentTimeCancelTimeDiffLessThan24HoursPopover}>
                    <FontAwesomeIcon icon={faQuestion} cursor="pointer"/>
                </OverlayTrigger>
            );
        } else if(consultation.reservation && consultation.reservation.student._id === user && startTimeReservationTimeDiffInHours > 24){
            return (
                <Button variant="danger" size="sm"
                        onClick={() => handleConsultationReservationCancel(consultation.reservation._id)}>
                    <FontAwesomeIcon icon={faTimes}/> Lemondás
                </Button>
            );
        } else {
            return;
        }
    }

    function togglePopover(text) {
        setDescriptionPopoverText(text);
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
                    <td>Leírás</td>
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
                        <td>
                        { consultation.description && consultation.description !== '' ?
                            <OverlayTrigger
                                placement="left"
                                trigger="click"
                                overlay={descriptionPopover}>
                                <FontAwesomeIcon
                                    icon={faEye}
                                    className="text-primary"
                                    cursor="pointer"
                                    onClick={() => togglePopover(consultation.description)}
                                />
                            </OverlayTrigger>
                            : '-' }
                        </td>
                        <td className="d-flex justify-content-center align-content-center">
                            {renderOptionsColumn(consultation)}
                        </td>
                    </tr>
                ))
                }
                </tbody>
            </Table>
            { consultationErrorMessage && (
                <Alert type="danger" message={consultationErrorMessage} />
            )}
            { !isLoading && !consultationErrorMessage && filteredConsultations.length === 0 && (
                <Alert type="danger" message="A megadott feltételekkel nincs elérhető konzultáció!" />
            )}
        </div>
    );
}

export default AvailableConsultations;
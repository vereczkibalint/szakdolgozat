import React from "react";
import moment from "moment";
import { useHistory } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Table} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {deleteConsultation} from "../../services/consultationService";

const ConsultationDatatable = ({ consultations }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleConsultationDelete = (consultationId) => {
        if(window.confirm('Biztosan törölni szeretné ezt a konzultációt?')) {
            dispatch(deleteConsultation(consultationId, history));
        }
    }

    function redirectToConsultationEditPage(consultationId) {
        history.push(`/user/consultations/edit/${consultationId}`);
    }

    return (
        <Table hover responsive className="text-center">
            <thead className="font-weight-bold">
            <tr>
                <td>Konzultáció kezdete</td>
                <td>Konzultáció vége</td>
                <td>Konzultáció helyszíne</td>
                <td>Elérhetőség</td>
                <td>Műveletek</td>
            </tr>
            </thead>
            <tbody>
            { consultations.map(consultation => (
                <tr key={consultation._id}>
                    <td>{moment(consultation.startTime).format('YYYY.MM.DD. HH:mm')}</td>
                    <td>{moment(consultation.endTime).format('YYYY.MM.DD. HH:mm')}</td>
                    <td>{consultation.location}</td>
                    <td>
                        {!consultation.reservation ?
                            (<FontAwesomeIcon icon={faCheckCircle} className="text-success" title="Elérhető"/>) :
                            (<small><span className="font-weight-bold">Hallgató:</span> {consultation.reservation.student.lastName + ' ' + consultation.reservation.student.firstName + '(' + consultation.reservation.student.neptun + ')'}</small>)
                        }
                    </td>
                    <td className="d-flex justify-content-center align-content-center">
                        <FontAwesomeIcon
                            style={{cursor: 'pointer'}}
                            icon={faPen}
                            className="text-primary"
                            onClick={() => redirectToConsultationEditPage(consultation._id)}
                            title="Részletek megtekintése"/>
                        <FontAwesomeIcon
                            style={{cursor: 'pointer'}}
                            icon={faTrash}
                            className="text-danger ml-3"
                            onClick={() => handleConsultationDelete(consultation._id)}
                            title="Konzultáció törlése"/>
                    </td>
                </tr>
            ))
            }
            </tbody>
        </Table>
    );
}

export default ConsultationDatatable;
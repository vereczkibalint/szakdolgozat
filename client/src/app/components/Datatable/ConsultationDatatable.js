import React, {useRef, useState} from "react";
import moment from "moment";
import { useHistory } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faEye, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {OverlayTrigger, Popover, Table} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {deleteConsultation} from "../../services/consultationService";

const ConsultationDatatable = ({ consultations }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [popoverText, setPopoverText] = useState('');

    const handleConsultationDelete = (consultationId) => {
        if(window.confirm('Biztosan törölni szeretné ezt a konzultációt?')) {
            dispatch(deleteConsultation(consultationId, history));
        }
    }

    function redirectToConsultationEditPage(consultationId) {
        history.push(`/user/consultations/edit/${consultationId}`);
    }

    function togglePopover(text) {
        setPopoverText(text);
    }

    const popover = (
        <Popover>
            <Popover.Title className="font-weight-bold">Konzultáció leírása</Popover.Title>
            <Popover.Content>
                <div dangerouslySetInnerHTML={{ __html: popoverText }} />
            </Popover.Content>
        </Popover>
    );

    return (
        <Table hover responsive className="text-center">
            <thead className="font-weight-bold">
            <tr>
                <td>Konzultáció kezdete</td>
                <td>Konzultáció vége</td>
                <td>Konzultáció helyszíne</td>
                <td>Elérhetőség</td>
                <td>Leírás</td>
                <td>Műveletek</td>
            </tr>
            </thead>
            <tbody>
            { consultations.map((consultation, index) => (
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
                    <td>
                        { consultation.description && consultation.description !== '' ?
                            <OverlayTrigger
                                placement="left"
                                trigger="click"
                                overlay={popover} rootClose={true}>
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className="text-primary"
                                        cursor="pointer"
                                        onClick={(e) => togglePopover(consultation.description)}
                                    />
                            </OverlayTrigger>
                            : '-' }
                    </td>
                    <td className="d-flex justify-content-around">
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
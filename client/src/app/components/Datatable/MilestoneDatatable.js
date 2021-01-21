import React from "react";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faEye, faHourglassHalf, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";

const MilestoneDatatable = ({ milestones }) => {
    return (
        <Table hover responsive className="text-center">
            <thead className="font-weight-bold">
            <tr>
                <td>Mérföldkő címe</td>
                <td>Határidő</td>
                <td>Állapot</td>
                <td>Műveletek</td>
            </tr>
            </thead>
            <tbody>
            { milestones.map(milestone => (
                <tr key={milestone._id}>
                    <td>{milestone.title}</td>
                    <td>{moment(milestone.deadline).format('YYYY.MM.DD. HH:mm')}</td>
                    <td>
                        {
                            {
                                'pending': <FontAwesomeIcon title="Folyamatban" icon={faHourglassHalf} />,
                                'accepted': <FontAwesomeIcon title="Elfogadva" style={{color: 'green'}} icon={faCheckCircle} />,
                                'rejected': <FontAwesomeIcon title="Elutasítva" style={{color: 'red'}} icon={faTimesCircle} />
                            }[milestone.status]
                        }
                    </td>
                    <td className="d-flex justify-content-around align-content-center">
                        <Link to={{
                        pathname: `/user/milestones/${milestone._id}`
                        }}>
                            <FontAwesomeIcon
                                style={{fontSize: '18px', cursor: 'pointer'}}
                                icon={faEye}
                                title="Részletek megtekintése" />
                        </Link>
                    </td>
                </tr>
            ))
            }
            </tbody>
        </Table>
    );
}

export default MilestoneDatatable;
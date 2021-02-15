import React, {useEffect, useState} from "react";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faEye, faHourglassHalf, faTimesCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link, useHistory} from "react-router-dom";
import {Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {deleteMilestone} from "../../services/milestoneService";

const MilestoneDatatable = ({ milestones }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.auth.user);
    const [filteredMilestones, setFilteredMilestones] = useState(milestones.filter(milestone => milestone.isDraft === false));

    useEffect(() => {
        setFilteredMilestones(milestones.filter(milestone => milestone.isDraft === false));
    }, [milestones]);

    const handleMilestoneDelete = (milestoneId) => {
        if(window.confirm('Biztosan törölni szeretné ezt a mérföldkövet?')) {
            dispatch(deleteMilestone(milestoneId, history));
            history.push('/user/milestones');
        }
    }

    function renderDatatable(dataSource) {
        return (
            dataSource.map(milestone => {
                let isExpired = moment(milestone.deadline).isBefore(moment());
                let diffInDays = moment(milestone.deadline).diff(moment(), 'days');
                let duration = moment.duration(moment(milestone.deadline).diff(moment()));
                let diffInHours = parseInt(duration.asHours());
                let diffInMins = parseInt(duration.asMinutes()) % 60;

                return (
                <tr key={milestone._id}>
                    <td><span
                        className={milestone.isDraft ? 'text-danger' : ''}>{milestone.title} {milestone.isDraft && '(piszkozat)'}</span>
                    </td>
                    <td className={milestone.status !== 'accepted' && !isExpired ? 'text-danger font-weight-bolder' : ''}>
                        {moment(milestone.deadline).format('YYYY.MM.DD. HH:mm')}

                        { isExpired && (
                            <span className="font-weight-bolder"> (lejárt)</span>
                        )}

                        { !isExpired && diffInDays < 1 && (
                            ` (${diffInHours} óra ${diffInMins} perc)`
                        )}
                        { !isExpired && diffInDays > 1 && (
                            ` (${diffInDays} nap)`
                        )}
                    </td>
                    <td>
                        {
                            {
                                'pending': <FontAwesomeIcon title="Folyamatban" icon={faHourglassHalf}/>,
                                'accepted': <FontAwesomeIcon title="Elfogadva" style={{color: 'green'}}
                                                             icon={faCheckCircle}/>,
                                'rejected': <FontAwesomeIcon title="Elutasítva" style={{color: 'red'}}
                                                             icon={faTimesCircle}/>
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
                                title="Részletek megtekintése"/>
                        </Link>

                        { user.role === 'LECTURER' && (
                            <FontAwesomeIcon
                                style={{fontSize: '18px', cursor: 'pointer'}}
                                icon={faTrash}
                                className="text-danger"
                                title="Törlés"
                                onClick={() => handleMilestoneDelete(milestone._id)}
                            />
                        )}
                    </td>
                </tr>
                );
            })
        )
    }

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
            { user.role === 'LECTURER' && renderDatatable(milestones) }
            { user.role === 'STUDENT' && renderDatatable(filteredMilestones) }
            </tbody>
        </Table>
    );
}

export default MilestoneDatatable;
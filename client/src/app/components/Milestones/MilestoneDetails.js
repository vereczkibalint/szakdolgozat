import React, {useState,Fragment} from "react";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faHourglassHalf,
    faPencilAlt,
    faTimesCircle,
    faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {changeMilestoneStatus} from "../../services/milestoneService";
import { useHistory } from 'react-router-dom';
import EditMilestoneForm from "./EditMilestoneForm";
import MilestoneCommentsSection from "./MilestoneCommentsSection";

const MilestoneDetails = ({ milestone }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(false);

    function handleStatusChange(newStatus) {
        dispatch(changeMilestoneStatus(milestone._id, newStatus, history));
    }

    return (
        <div className="mt-2">
            <h2 className={editMode ? "d-none" : "text-center"}>
                "{milestone.title}" szerkesztése
            </h2>
            <div className="d-flex flex-md-row flex-column text-sm-center justify-content-md-between text-center mt-3">
                <small><span className="font-weight-bold text-danger">Határidő:</span> {moment(milestone.deadline).format('YYYY.MM.DD. HH:mm')}</small>
                <small>
                    {
                        {
                            'pending': (
                                <div className="font-weight-bold">
                                    <FontAwesomeIcon title="Folyamatban" icon={faHourglassHalf} /> - Folyamatban
                                </div>
                            ),
                            'accepted': (
                                <div className="text-success font-weight-bold">
                                    <FontAwesomeIcon title="Elfogadva" icon={faCheckCircle} /> - Elfogadva
                                </div>
                            ),
                            'rejected': (
                                <div className="text-danger font-weight-bold">
                                    <FontAwesomeIcon title="Elutasítva" icon={faTimesCircle} /> - Elutasítva
                                </div>
                            )
                        }[milestone.status]
                    }
                </small>
                <small><span className="font-weight-bold">Létrehozva:</span> {moment(milestone.createdAt).format('YYYY.MM.DD. HH:mm')}</small>
            </div>
            <hr />
            <div className="row">
                <div className="col-md-8 border-right p-4">
                    { editMode ? (
                        <EditMilestoneForm milestone={milestone} />
                    ) : (
                        <Fragment>
                            <h5 className="font-weight-bold mb-4">Leírás:</h5>
                            <div dangerouslySetInnerHTML={{
                                __html: milestone.description
                            }} />
                        </Fragment>
                    )}
                    <small><span className="font-weight-bold">Utolsó frissítés:</span> {moment(milestone.updatedAt).format('YYYY.MM.DD. HH:mm')}</small>
                </div>
                <div className="col-md-4">
                    <div className="d-flex flex-column justify-content-center">
                        <Button
                            variant={editMode ? 'primary' : 'outline-primary'}
                            className={editMode ? 'd-none' : 'd-block'}
                            onClick={() => setEditMode(true)}>
                            <FontAwesomeIcon icon={faPencilAlt} /> Szerkesztés
                        </Button>

                        <Button
                            variant="danger"
                            className={editMode ? 'd-block' : 'd-none'}
                            onClick={() => setEditMode(false)}
                            >
                            <FontAwesomeIcon icon={faWindowClose} /> Szerkesztés elvetése
                        </Button>

                        <hr className={editMode ? "d-none" : "border-dark w-100"} />

                        <Button
                            variant={milestone.status === 'accepted' ? 'success': 'outline-success'}
                            className={editMode ? 'd-none' : 'mb-3'}
                            onClick={() => handleStatusChange('accepted')}>
                            <FontAwesomeIcon icon={faCheckCircle} /> Elfogadás
                        </Button>
                        <Button
                            variant={milestone.status === 'pending' ? 'dark': 'outline-dark'}
                            className={editMode ? 'd-none' : 'mb-3'}
                            onClick={() => handleStatusChange('pending')}>
                            <FontAwesomeIcon icon={faHourglassHalf} /> Függőben
                        </Button>
                        <Button
                            variant={milestone.status === 'rejected' ? 'danger': 'outline-danger'}
                            className={editMode ? 'd-none' : 'mb-3'}
                            onClick={() => handleStatusChange('rejected')}>
                            <FontAwesomeIcon icon={faTimesCircle} /> Elutasítás
                        </Button>
                    </div>
                </div>
            </div>
            <div className={editMode ? "d-none" : "row border-top mt-3"}>
                <MilestoneCommentsSection milestoneId={milestone._id} comments={milestone.comments} />
            </div>
        </div>
    );
}

export default MilestoneDetails;
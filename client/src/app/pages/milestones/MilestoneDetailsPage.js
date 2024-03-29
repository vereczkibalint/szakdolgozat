import React, {Fragment, useEffect, useState} from "react";
import { useHistory, useParams, withRouter } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import {
    changeMilestoneStatus,
    fetchMilestoneById, insertMilestoneComment
} from "../../services/milestoneService";
import Alert from "../../../common/components/Alert";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faHourglassHalf,
    faPencilAlt,
    faTimesCircle,
    faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import EditMilestoneForm from "../../components/Milestones/EditMilestoneForm";
import MilestoneCommentsSection from "../../components/Milestones/MilestoneCommentsSection";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import GoBackButton from "../../../common/components/GoBackButton";
import {Chip} from "@material-ui/core";

const MilestoneDetailsPage = () => {
    let dispatch = useDispatch();
    const { milestoneId } = useParams();
    const history = useHistory();

    const user = useSelector(state => state.auth.user);
    const milestoneErrorMessage = useSelector(state => state.milestones.errors.message);

    useEffect(() => {
        dispatch(fetchMilestoneById(milestoneId));
    }, [dispatch, milestoneId]);

    const [editMode, setEditMode] = useState(false);
    let milestone = useSelector(state => state.milestones.milestones[0]);
    let isLoading = useSelector(state => state.milestones.isLoading);

    if(isLoading) {
        return (
            <LoadingSpinner />
        );
    }

    if(!isLoading && !milestone) {
        history.push('/user/milestones');
    }

    function handleStatusChange(newStatus) {
        dispatch(changeMilestoneStatus(milestone._id, newStatus, history));
        let commentNewStatusFormat = "";
        switch (newStatus) {
            case 'accepted':
                commentNewStatusFormat = "<span class='text-success font-weight-bold'>Elfogadva</span>";
                break;
            case 'pending':
                commentNewStatusFormat = "<span class='font-weight-bold'>Folyamatban</span>";
                break;
            case 'rejected':
                commentNewStatusFormat = "<span class='text-danger font-weight-bold'>Elutasítva</span>";
                break;
            default:
                commentNewStatusFormat = "";
        }
        let newComment = {
            author: user._id,
            body: `A mérföldkő státusza megváltozott: ${commentNewStatusFormat}!`
        };
        dispatch(insertMilestoneComment(milestone._id, newComment));
    }

    const toggleEditMode = () => {
        setEditMode(prevState => !prevState);
    }

    return (
        <Fragment>
            <div className="mt-3">
                <div className="d-flex justify-content-between">
                    <GoBackButton/>
                </div>
                <div className="mt-2">
                    <h2 className={editMode ? "d-none" : "text-center"}>
                        <span
                            className={milestone.isDraft ? 'text-danger' : ''}>{milestone.title} {milestone.isDraft ? '(piszkozat)' : ''}</span>
                    </h2>
                    <div
                        className="d-flex flex-md-row flex-column text-sm-center justify-content-md-between text-center mt-3">
                        <small><span
                            className="font-weight-bold text-danger">Határidő:</span> {moment(milestone.deadline).format('YYYY.MM.DD. HH:mm')}
                        </small>
                        <small>
                            {
                                {
                                    'pending': (
                                        <div className="font-weight-bold">
                                            <FontAwesomeIcon title="Folyamatban" icon={faHourglassHalf}/> -
                                            Folyamatban
                                        </div>
                                    ),
                                    'accepted': (
                                        <div className="text-success font-weight-bold">
                                            <FontAwesomeIcon title="Elfogadva" icon={faCheckCircle}/> - Elfogadva
                                        </div>
                                    ),
                                    'rejected': (
                                        <div className="text-danger font-weight-bold">
                                            <FontAwesomeIcon title="Elutasítva" icon={faTimesCircle}/> - Elutasítva
                                        </div>
                                    )
                                }[milestone.status]
                            }
                        </small>
                        <small><span
                            className="font-weight-bold">Létrehozva:</span> {moment(milestone.createdAt).format('YYYY.MM.DD. HH:mm')}
                        </small>
                    </div>
                    { milestoneErrorMessage && (
                        <div className="mt-5 d-flex justify-content-center mx-auto">
                            <Alert type="danger" message={milestoneErrorMessage} />
                        </div>
                    )}
                    <hr/>
                    <div className="row">
                        <div className="col-md-8 border-right p-2">
                            {editMode ? (
                                <EditMilestoneForm milestone={milestone} toggleEditMode={toggleEditMode}/>
                            ) : (
                                <Fragment>
                                    <h2 className="font-weight-bold mb-4">Leírás:</h2>
                                    <div dangerouslySetInnerHTML={{
                                        __html: milestone.description
                                    }}/>
                                </Fragment>
                            )}
                            <small><span
                                className="font-weight-bold">Utolsó frissítés:</span> {moment(milestone.updatedAt).format('YYYY.MM.DD. HH:mm')}
                            </small>
                        </div>
                        <div className="col-md-4">
                            <div className={milestone.tags.length === 0 || editMode ? 'd-none' : 'd-block'}>
                                <p className='font-weight-bold'>Címkék:</p>
                                <div className="mb-3">
                                    {milestone.tags.map((tag, index) => (
                                        <Chip label={tag} key={index} className="mr-1"/>
                                    ))}
                                </div>
                            </div>
                            {user.role === 'LECTURER' && (
                                <div className="d-flex flex-column justify-content-center">
                                    <Button
                                        variant={editMode ? 'primary' : 'outline-primary'}
                                        className={editMode ? 'd-none' : 'd-block'}
                                        onClick={() => toggleEditMode()}>
                                        <FontAwesomeIcon icon={faPencilAlt}/> Szerkesztés
                                    </Button>

                                    <Button
                                        variant="danger"
                                        className={editMode ? 'd-block' : 'd-none'}
                                        onClick={() => toggleEditMode()}
                                    >
                                        <FontAwesomeIcon icon={faWindowClose}/> Szerkesztés elvetése
                                    </Button>

                                    <hr className={editMode ? "d-none" : "border-dark w-100"}/>

                                    <Button
                                        variant={milestone.status === 'accepted' ? 'success' : 'outline-success'}
                                        className={editMode ? 'd-none' : 'mb-3'}
                                        disabled={milestone.status === 'accepted'}
                                        onClick={() => handleStatusChange('accepted')}>
                                        <FontAwesomeIcon icon={faCheckCircle}/> Elfogadás
                                    </Button>
                                    <Button
                                        variant={milestone.status === 'pending' ? 'dark' : 'outline-dark'}
                                        className={editMode ? 'd-none' : 'mb-3'}
                                        disabled={milestone.status === 'pending'}
                                        onClick={() => handleStatusChange('pending')}>
                                        <FontAwesomeIcon icon={faHourglassHalf}/> Folyamatban
                                    </Button>
                                    <Button
                                        variant={milestone.status === 'rejected' ? 'danger' : 'outline-danger'}
                                        className={editMode ? 'd-none' : 'mb-3'}
                                        disabled={milestone.status === 'rejected'}
                                        onClick={() => handleStatusChange('rejected')}>
                                        <FontAwesomeIcon icon={faTimesCircle}/> Elutasítás
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={editMode ? "d-none" : "row border-top mt-3"}>
                        <MilestoneCommentsSection milestoneId={milestone._id} comments={milestone.comments}/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default withRouter(MilestoneDetailsPage);

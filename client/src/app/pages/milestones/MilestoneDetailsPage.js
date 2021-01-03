import React from "react";
import { useHistory } from 'react-router-dom';
import GoBackButton from "../../../common/components/GoBackButton";
import MilestoneDetails from "../../components/Milestones/MilestoneDetails";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import {deleteMilestone} from "../../services/milestoneService";
import Alert from "../../../common/components/Alert";

const MilestoneDetailsPage = ({ location }) => {
    let milestone = location.state.milestone;
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.auth.user);
    const milestoneErrorMessage = useSelector(state => state.milestones.errors.message);

    if(!milestone) {
        history.goBack();
    }

    const handleMilestoneDelete = () => {
        if(window.confirm('Biztosan törölni szeretné ezt a mérföldkövet?')) {
            dispatch(deleteMilestone(milestone._id, history));
        }
    }

    return (
        <>
            <div className="mt-3">
                <div className="d-flex justify-content-between">
                    <GoBackButton />
                    { user.role === 'LECTURER' ?
                        (
                            <>
                            <Button
                                variant="outline-danger"
                                className="mb-3"
                                onClick={handleMilestoneDelete}
                            >Törlés</Button>
                            </>
                        ) :
                    ''}
                </div>
                { milestoneErrorMessage && <Alert type="danger" message={milestoneErrorMessage} /> }
                <MilestoneDetails milestone={milestone} />
            </div>
        </>
    );
}

export default MilestoneDetailsPage;
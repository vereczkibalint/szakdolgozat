import React, {useEffect, useState, Fragment} from "react";
import Form from "react-bootstrap/Form";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import Alert from "../../../common/components/Alert";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllTheses} from "../../services/thesesService";
import {fetchAllMilestone} from "../../services/milestoneService";
import MilestoneDatatable from "./MilestoneDatatable";

const MilestoneListing = () => {
    const milestones = useSelector(state => state.milestones);
    const theses = useSelector(state => state.theses);

    const [thesisId, setThesisId] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllTheses());
        if(thesisId !== ''){
            dispatch(fetchAllMilestone(thesisId));
        }
    }, [dispatch, thesisId]);

    const [filteredMilestones, setFilteredMilestones] = useState([...milestones.milestones]);

    useEffect(() => {
        setFilteredMilestones([...milestones.milestones]);
    }, [milestones.milestones]);

    useEffect(() => {
        const filterMilestones = () => {
            setFilteredMilestones(milestones.milestones.filter(milestone => milestone.thesis._id === thesisId));
        }
        if(thesisId !== ''){
            filterMilestones();
        } else {
            setFilteredMilestones(milestones.milestones);
        }
    }, [thesisId]);

    return (
        <Fragment>
        <Form.Group>
            <Form.Label htmlFor="thesisIdSelect">Szakdolgozat:</Form.Label>
            <Form.Control
                id="thesisIdSelect"
                as="select"
                disabled={theses.isLoading}
                onChange={(e) => setThesisId(e.target.value)}>
                    <option value="">Kérem válasszon...</option>
                    { theses.theses.map(thesis => (
                        <option value={thesis._id} key={thesis._id}>{thesis.student.lastName.concat(' ',thesis.student.firstName)} - {thesis.title}</option>
                      ))
                    }
            </Form.Control>
        </Form.Group>

        {(theses.isLoading || milestones.isLoading) && (
            <div className="d-flex align-content-center justify-content-center mb-3">
                <LoadingSpinner />
            </div>
        )}

        { !theses.isLoading && !milestones.isLoading && thesisId !== '' && filteredMilestones.length === 0 ? (
                <Alert type="danger" message="Nem található mérföldkő az adatbázisban!" />
            ) : (
                <MilestoneDatatable milestones={filteredMilestones} />
            )
        }
    </Fragment>
    );
}

export default MilestoneListing;
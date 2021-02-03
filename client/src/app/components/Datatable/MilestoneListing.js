import React, {useEffect, useState, Fragment} from "react";
import Form from "react-bootstrap/Form";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import Alert from "../../../common/components/Alert";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllTheses} from "../../services/thesesService";
import {fetchAllMilestone} from "../../services/milestoneService";
import MilestoneDatatable from "./MilestoneDatatable";

const MilestoneListing = () => {
    const dispatch = useDispatch();
    const [thesisId, setThesisId] = useState('');

    useEffect(() => {
        dispatch(fetchAllTheses());
    }, [dispatch]);

    useEffect(() => {
        if(thesisId !== ''){
            dispatch(fetchAllMilestone(thesisId));
        } else {
            setFilteredMilestones([]);
        }
    }, [dispatch, thesisId]);

    const milestones = useSelector(state => state.milestones);
    const theses = useSelector(state => state.theses);


    const [titleFilter, setTitleFilter] = useState('');
    const [dateOrderBy, setDateOrderBy] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        filterMilestonesByTitle(titleFilter);
    }, [titleFilter]);

    const [filteredMilestones, setFilteredMilestones] = useState([...milestones.milestones]);

    useEffect(() => {
        setFilteredMilestones([...milestones.milestones]);
    }, [milestones.milestones]);


    function handleThesisChange(newThesis) {
        setThesisId(newThesis);
        if(newThesis !== '') {
            filterMilestonesByThesisId();
        } else {
            setFilteredMilestones([]);
        }
    }

    function filterMilestonesByTitle(title) {
        if(title !== '') {
            setFilteredMilestones(milestones.milestones.filter(milestone => milestone.thesis._id === thesisId && milestone.title.toLowerCase().includes(title.toLowerCase())));
        } else {
            filterMilestonesByThesisId();
        }
    }

    function handleDateOrderChange(orderBy) {
        setDateOrderBy(orderBy);

        switch(dateOrderBy) {
            case 'desc':
                sortByDateDesc();
                break;
            case 'asc':
            default:
                sortByDateAsc();
                break;
        }
    }

    function sortByDateAsc() {
        filteredMilestones.sort(function(prev, next) {
            return new Date(next.deadline) - new Date(prev.deadline);
        });
    }

    function sortByDateDesc() {
        filteredMilestones.sort(function(prev, next) {
            return new Date(prev.deadline) - new Date(next.deadline);
        });
    }

    function handleStatusFilterChange(status) {
        setStatusFilter(status);

        if(thesisId !== '') {
            if(status === '') {
                filterMilestonesByThesisId();
            } else {
                setFilteredMilestones(milestones.milestones.filter(milestone => milestone.thesis._id === thesisId && milestone.status === status).sort(
                    dateOrderBy === 'asc' ? sortByDateAsc : sortByDateDesc
                ));
                // TODO: sort miután status change volt
            }
        }
    }

    function filterMilestonesByThesisId() {
        setFilteredMilestones(milestones.milestones.filter(milestone => milestone.thesis._id === thesisId));
    }

    return (
        <Fragment>
        <Form.Group>
            <Form.Label htmlFor="thesisIdSelect">Szakdolgozat:</Form.Label>
            <Form.Control
                id="thesisIdSelect"
                as="select"
                disabled={theses.isLoading}
                onChange={(e) => handleThesisChange(e.target.value)}>
                <option value="">Kérem válasszon...</option>
                { theses.theses.map(thesis => (
                    <option value={thesis._id} key={thesis._id}>{thesis.student.lastName.concat(' ',thesis.student.firstName)} - {thesis.title}</option>
                ))}
            </Form.Control>
            { thesisId !== '' && (
                <div className="d-flex flex-md-row flex-column mt-2">
                    <Form.Group className="mr-3">
                        <Form.Label htmlFor="title">Cím</Form.Label>
                        <Form.Control
                            id="title"
                            type="text"
                            placeholder="Mérföldkő címe"
                            value={titleFilter}
                            onChange={(e) => setTitleFilter(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mr-3">
                        <Form.Label>Dátum</Form.Label>
                        <Form.Control as="select" value={dateOrderBy} onChange={(e) => handleDateOrderChange(e.target.value)}>
                            <option value="asc">Növekvő</option>
                            <option value="desc">Csökkenő</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Állapot</Form.Label>
                        <Form.Control as="select" value={statusFilter} onChange={(e) => handleStatusFilterChange(e.target.value)}>
                            <option value="">Összes</option>
                            <option value="pending">Folyamatban</option>
                            <option value="accepted">Elfogadott</option>
                            <option value="rejected">Elutasított</option>
                        </Form.Control>
                    </Form.Group>
                </div>
            )}
        </Form.Group>

        {(theses.isLoading || milestones.isLoading) && (
            <LoadingSpinner />
        )}

        { !theses.isLoading && !milestones.isLoading && thesisId !== '' && filteredMilestones.length === 0 ? (
                <Alert type="danger" message="A megadott kritériumokkal nem található mérföldkő!" />
            ) : (
                <MilestoneDatatable milestones={filteredMilestones} />
            )
        }
    </Fragment>
    );
}

export default MilestoneListing;
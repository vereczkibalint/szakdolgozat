import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchThesisByStudent} from "../../services/thesesService";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import {fetchAllMilestone} from "../../services/milestoneService";
import MilestoneDatatable from "../Datatable/MilestoneDatatable";
import Form from "react-bootstrap/Form";
import Alert from "../../../common/components/Alert";

const OwnMilestones = () => {
    const dispatch = useDispatch();

    const thesisIsLoading = useSelector(state => state.theses.isLoading);
    const thesis = useSelector(state => state.theses.theses[0]);
    const milestonesIsLoading = useSelector(state => state.milestones.isLoading);
    const milestones = useSelector(state => state.milestones.milestones);

    const [filteredMilestones, setFilteredMilestones] = useState([...milestones]);

    const [titleFilter, setTitleFilter] = useState('');
    const [dateOrderBy, setDateOrderBy] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        filterMilestonesByTitle(titleFilter);
    }, [titleFilter]);

    useEffect(() => {
        setFilteredMilestones([...milestones]);
    }, [milestones]);

    function filterMilestonesByTitle(title) {
        if(title !== '') {
            setFilteredMilestones(milestones.filter(milestone => milestone.title.toLowerCase().includes(title.toLowerCase())));
        } else {
            setFilteredMilestones([...milestones]);
        }
    }

    function handleDateOrderChange(orderBy) {
        setDateOrderBy(orderBy);

        switch(orderBy) {
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
        if(status !== '') {
            setFilteredMilestones(milestones.filter(milestone => milestone.status === status).sort(
                dateOrderBy === 'asc' ? sortByDateAsc : sortByDateDesc
            ));
        } else {
            setFilteredMilestones([...milestones]);
        }
        // TODO: sort miután status change volt
    }

    useEffect(() => {
        dispatch(fetchThesisByStudent());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchAllMilestone(thesis._id));
    }, [dispatch, thesis]);

    if(thesisIsLoading || milestonesIsLoading) {
        return (
            <LoadingSpinner />
        );
    }


    return (
        <div className="mt-5">
            <h2 className="text-center mb-3">Mérföldköveim</h2>

            <div className="d-flex flex-md-row flex-column mt-2">
                <Form.Group className="mr-3">
                    <Form.Label htmlFor="title">Cím</Form.Label>
                    <Form.Control
                        id="title"
                        type="text"
                        value={titleFilter}
                        onChange={(e) => setTitleFilter(e.target.value)}
                        placeholder="Mérföldkő címe"
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

            <MilestoneDatatable milestones={filteredMilestones} />

            { !filteredMilestones.length && (
                <Alert type="danger" message="A keresett feltételekkel nem található mérföldkő!" />
            ) }
        </div>
    );
}

export default OwnMilestones;
import React, {useEffect, useState, Fragment} from "react";
import Form from "react-bootstrap/Form";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import Alert from "../../../common/components/Alert";
import {useDispatch, useSelector} from "react-redux";
import ConsultationDatatable from "./ConsultationDatatable";
import {fetchAllConsultation} from "../../services/consultationService";

const MilestoneListing = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllConsultation());
    }, [dispatch]);

    const consultations = useSelector(state => state.consultations);

    /*const [titleFilter, setTitleFilter] = useState('');
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
    }*/

    if(consultations.isLoading) {
        return (
            <LoadingSpinner />
        );
    }

    return (
        <Fragment>
            { !consultations.isLoading && consultations.consultations.length === 0 ? (
                <Alert type="danger" message="Nem található konzultáció!" />
            ) : (
                <ConsultationDatatable consultations={consultations.consultations} />
            )
            }
        </Fragment>
    );
}

export default MilestoneListing;
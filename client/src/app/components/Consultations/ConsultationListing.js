import React, {useEffect, Fragment} from "react";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import Alert from "../../../common/components/Alert";
import {useDispatch, useSelector} from "react-redux";
import ConsultationDatatable from "../Datatable/ConsultationDatatable";
import {fetchAllConsultation} from "../../services/consultationService";

const MilestoneListing = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllConsultation());
    }, [dispatch]);

    const consultations = useSelector(state => state.consultations);

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
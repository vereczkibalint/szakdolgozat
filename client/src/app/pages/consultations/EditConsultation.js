import React, {useEffect} from "react";
import { useHistory, useParams } from 'react-router-dom';
import GoBackButton from "../../../common/components/GoBackButton";
import {useDispatch, useSelector} from "react-redux";
import {consultationFetchById} from "../../services/consultationService";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import EditConsultationForm from "../../components/Consultations/EditConsultationForm";

const EditConsultation = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { consultationId } = useParams();

    const isLoading = useSelector(state => state.consultations.isLoading);
    const consultation = useSelector(state => state.consultations.consultations[0]);

    useEffect(() => {
        dispatch(consultationFetchById(consultationId));
    }, [dispatch]);

    if(isLoading) {
        return (
            <LoadingSpinner />
        );
    }

    return (
        <div className="mt-4 w-75 mx-auto">
            <GoBackButton />
            {<EditConsultationForm consultation={consultation} history={history}/>}
        </div>
    );
}

export default EditConsultation;
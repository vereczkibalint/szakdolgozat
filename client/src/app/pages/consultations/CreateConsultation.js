import React from "react";
import { useHistory } from 'react-router-dom';
import GoBackButton from "../../../common/components/GoBackButton";
import CreateConsultationForm from "../../components/Consultations/CreateConsultationForm";

const CreateConsultation = () => {
    const history = useHistory();
    return (
        <div className="mt-4 w-75 mx-auto">
            <GoBackButton />
            <h1 className="text-center mb-4">Új konzultáció felvétele</h1>
            <CreateConsultationForm history={history}/>
        </div>
    );
}

export default CreateConsultation;
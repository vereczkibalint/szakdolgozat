import React from "react";
import {useSelector} from "react-redux";
import ManageConsultations from "../../components/Consultations/ManageConsultations";
import AvailableConsultations from "../../components/Consultations/AvailableConsultations";

const ConsultationPage = () => {
    const role = useSelector(state => state.auth.user.role);
    return (
        <div className="mt-3">
            { role === 'STUDENT' && <AvailableConsultations /> }
            { role === 'LECTURER' && <ManageConsultations /> }
        </div>
    );
}

export default ConsultationPage;
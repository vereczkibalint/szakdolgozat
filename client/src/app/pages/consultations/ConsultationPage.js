import React from "react";
import {useSelector} from "react-redux";
import ManageConsultations from "../../components/Consultations/ManageConsultations";

const ConsultationPage = () => {
    const role = useSelector(state => state.auth.user.role);
    return (
        <div className="mt-3">
            {/* role === 'STUDENT' && <OwnThesis /> */}
            { role === 'LECTURER' && <ManageConsultations /> }
        </div>
    );
}

export default ConsultationPage;
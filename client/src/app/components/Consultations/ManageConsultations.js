import React from "react";
import ConsultationListing from "./ConsultationListing";

const ManageConsultations = () => {
    return (
        <div style={{width: "85%"}} className="mt-5 mx-auto">
            <h2 className="text-center mb-4">Saját konzultációk kezelése</h2>
            <ConsultationListing />
        </div>
    );
}

export default ManageConsultations;
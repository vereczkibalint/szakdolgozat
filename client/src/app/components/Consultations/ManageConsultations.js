import React from "react";
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";
import ConsultationListing from "./ConsultationListing";

const ManageConsultations = () => {
    const history = useHistory();

    function redirectToCreateConsultationPage() {
        history.push('/user/consultations/create');
    }

    return (
        <div style={{width: "85%"}} className="mt-4 mx-auto">
            <div className="d-flex align-content-center justify-content-end">
                <Button variant="success" className="mb-3" onClick={() => redirectToCreateConsultationPage()}>
                    <FontAwesomeIcon icon={faPlus} /> Új felvétele
                </Button>
            </div>

            <h2 className="text-center mb-3">Saját konzultációk kezelése</h2>
            <ConsultationListing />
        </div>
    );
}

export default ManageConsultations;
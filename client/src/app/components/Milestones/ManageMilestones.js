import React from "react";
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import GoBackButton from "../../../common/components/GoBackButton";
import {useHistory} from "react-router-dom";
import MilestoneListing from "../Datatable/MilestoneListing";

const ManageMilestones = () => {
    const history = useHistory();

    function redirectToCreateMilestonePage() {
        history.push('/user/milestones/create');
    }

    return (
        <div style={{width: "85%"}} className="mt-4 mx-auto">
            <div className="d-flex align-content-center justify-content-between">
                <GoBackButton />
                <Button variant="success" className="mb-3" onClick={() => redirectToCreateMilestonePage()}>
                    <FontAwesomeIcon icon={faPlus} /> Új felvétele
                </Button>
            </div>

            <h2 className="text-center mb-3">Mérföldkövek kezelése</h2>
            <MilestoneListing />
        </div>
    );
}

export default ManageMilestones;
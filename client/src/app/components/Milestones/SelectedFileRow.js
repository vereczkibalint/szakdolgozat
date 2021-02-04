import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

const SelectedFileRow = ({ fileName, deleteFileFromList }) => {
    return (
        <div className="d-flex justify-content-start mb-3">
            <span className="mr-2">{ fileName }</span>
            <FontAwesomeIcon icon={faTimes} className="text-danger" cursor="pointer" onClick={() => deleteFileFromList(fileName)} />
        </div>
    );
}

export default SelectedFileRow;
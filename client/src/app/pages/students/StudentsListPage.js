import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllStudent, importStudents} from "../../services/userService";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import StudentsDatatable from "../../components/Datatable/StudentsDatatable";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Alert from "../../../common/components/Alert";

const StudentsListPage = () => {
    const dispatch = useDispatch();

    const importErrorMessage = useSelector(state => state.users.errors.message);
    const importErrors = useSelector(state => state.users.errors.errors);

    const isLoadingStudents = useSelector(state => state.users.isLoading);
    const students = useSelector(state => state.users.students);

    const importInputFile = useRef(null);

    useEffect(() => {
        dispatch(fetchAllStudent());
    }, [dispatch]);

    if(isLoadingStudents) {
        return (
            <LoadingSpinner />
        );
    }

    function handleFileImport(file) {
        dispatch(importStudents(file));
    }

    return (
        <div style={{width: "85%"}} className="mt-4 mx-auto">
            <div className="d-flex align-content-center justify-content-end">
                <input type="file" ref={importInputFile} style={{ display: 'none' }} onChange={(e) => handleFileImport(e.target.files[0])} />
                <Button variant="success" className="mb-3" onClick={() => importInputFile.current.click()}>
                    <FontAwesomeIcon icon={faPlus} /> Importálás
                </Button>
            </div>
            { importErrorMessage && <Alert type="danger" message={importErrorMessage} /> }
            { importErrors && importErrors.map((importError, i) => {
                return (
                    <Alert type="danger" message={importError.message} key={i} />
                );
            }) }
            <h2 className="text-center mb-3">Hallgatók kezelése</h2>

            <StudentsDatatable students={students} />
        </div>
    );
}

export default StudentsListPage;
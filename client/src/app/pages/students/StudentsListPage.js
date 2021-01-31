import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllStudent} from "../../services/userService";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import StudentsDatatable from "../../components/Datatable/StudentsDatatable";
import {Button, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const StudentsListPage = () => {
    const dispatch = useDispatch();
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

    return (
        <div style={{width: "85%"}} className="mt-4 mx-auto">
            <div className="d-flex align-content-center justify-content-end">
                <input type="file" ref={importInputFile} style={{ display: 'none' }} />
                <Button variant="success" className="mb-3" onClick={() => importInputFile.current.click()}>
                    <FontAwesomeIcon icon={faPlus} /> Importálás
                </Button>
            </div>

            <h2 className="text-center mb-3">Hallgatók kezelése</h2>
            <StudentsDatatable students={students} />
        </div>
    );
}

export default StudentsListPage;
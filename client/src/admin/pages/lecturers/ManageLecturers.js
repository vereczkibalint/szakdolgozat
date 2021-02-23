import React, {useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import LoadingSpinner from '../../../common/components/Loading/LoadingSpinner';

import Datatable from '../../components/Datatable/Datatable';
import {fetchAllLecturer, importUsers} from '../../services/userService';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Alert from "../../../common/components/Alert";

const ManageLecturers = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllLecturer());
    }, [dispatch]);

    let lecturers = useSelector(state => state.users.lecturers);
    let errorMessage = useSelector(state => state.users.errors.message);
    let importErrors = useSelector(state => state.users.errors.errors);
    let isLoading = useSelector(state => state.users.isLoading);

    let importInputRef = useRef(null);

    function redirectToCreateLecturerPage() {
        history.push('/admin/dashboard/lecturer/create');
    }

    const headers = [
        'Teljes név',
        'NEPTUN kód',
        'Email',
        'Műveletek'
    ];

    if(isLoading) {
        return (
            <LoadingSpinner />
        );
    }

    function handleFileImport(importFile) {
        dispatch(importUsers(importFile, 'lecturer'));
    }

    return (
        <div className="mt-3">
            <h2 className="m-3 text-center">
                Oktatók kezelése
            </h2>

            <div className="d-flex justify-content-between">
                <Button variant="primary" className={"mb-2"} onClick={redirectToCreateLecturerPage}>
                    Új felvétele
                </Button>

                <input type="file" ref={importInputRef} style={{ display: 'none' }} onChange={(e) => handleFileImport(e.target.files[0])} />

                <Button variant="success" className="mr-3 mb-2" onClick={() => importInputRef.current.click()}>
                    <FontAwesomeIcon icon={faPlus} /> Importálás
                </Button>
            </div>

            { errorMessage && <Alert type="danger" message={errorMessage} /> }

            { importErrors && importErrors.map((importError, i) => {
                return (
                    <Alert type="danger" message={importError.message} key={i} />
                );
            }) }

            { !isLoading &&
                <Datatable headers={headers} body={lecturers} history={history}/>
            }
        </div>
    );
}

export default ManageLecturers;
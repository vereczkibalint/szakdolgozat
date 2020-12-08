import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAllStudent } from '../../services/studentService';

import LoadingSpinner from '../../../components/Loading/LoadingSpinner';
import Datatable from '../../components/Datatable/Datatable';
import Button from "react-bootstrap/Button";

const ManageStudents = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    let students = useSelector(state => state.student.students);
    let isLoading = useSelector(state => state.student.isLoading);

    useEffect(() => {
        dispatch(fetchAllStudent());
    }, [dispatch]);

    function redirectToCreateStudentPage() {
        history.push('/admin/dashboard/students/create');
    }

    const headers = [
        'Teljes név',
        'NEPTUN kód',
        'Email',
        'Műveletek'
    ];

    return (
        <div className="mt-3">
            <h2 className="m-3 text-center">
                Hallgatók kezelése
            </h2>

            <Button variant="primary" className={"mb-2"} onClick={redirectToCreateStudentPage}>
                Új felvétele
            </Button>

            { isLoading &&
                <div className="d-flex align-content-center justify-content-center mt-5">
                    <LoadingSpinner />
                </div>
            }

            { !isLoading &&
                <Datatable headers={headers} body={students} history={history}/>
            }
        </div>
    );
}

export default ManageStudents;

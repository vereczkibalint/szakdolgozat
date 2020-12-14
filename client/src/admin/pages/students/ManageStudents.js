import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import LoadingSpinner from '../../../components/Loading/LoadingSpinner';
import Datatable from '../../components/Datatable/Datatable';
import Button from "react-bootstrap/Button";

import { fetchAllStudent } from '../../services/userService';

const ManageStudents = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    let students = useSelector(state => state.user.students);
    let isLoading = useSelector(state => state.user.isLoading);

    useEffect(() => {
        dispatch(fetchAllStudent());
    }, [dispatch]);

    function redirectToCreateStudentPage() {
        history.push('/admin/dashboard/student/create');
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

            <div className="d-flex justify-content-start">
                <Button variant="primary" className="mr-3 mb-2" onClick={redirectToCreateStudentPage}>
                    Új felvétele
                </Button>
            </div>



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

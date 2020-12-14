import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import LoadingSpinner from '../../../components/Loading/LoadingSpinner';

import Datatable from '../../components/Datatable/Datatable';
import { fetchAllLecturer } from '../../services/userService';

const ManageLecturers = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllLecturer());
    }, [dispatch]);

    let lecturers = useSelector(state => state.user.lecturers);
    let isLoading = useSelector(state => state.user.isLoading);

    function redirectToCreateLecturerPage() {
        history.push('/admin/dashboard/lecturer/create');
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
                Oktatók kezelése
            </h2>

            <Button variant="primary" className={"mb-2"} onClick={redirectToCreateLecturerPage}>
                Új felvétele
            </Button>

            { isLoading &&
            <div className="d-flex align-content-center justify-content-center mt-5">
                <LoadingSpinner />
            </div>
            }

            { !isLoading &&
            <Datatable headers={headers} body={lecturers} history={history}/>
            }
        </div>
    );
}

export default ManageLecturers;
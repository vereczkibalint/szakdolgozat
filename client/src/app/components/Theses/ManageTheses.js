import React, {useEffect} from "react";
import {fetchAllTheses} from "../../services/thesesService";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import ThesisDatatable from "../Datatable/ThesisDatatable";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import Button from "react-bootstrap/Button";

const ManageTheses = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllTheses());
    }, [dispatch]);

    const isLoading = useSelector(state => state.theses.isLoading);
    const theses = useSelector(state => state.theses.theses);

    function redirectToCreateThesisPage() {
        history.push('/user/theses/create');
    }

    const headers = [
        'Hallgató neve',
        'Téma',
        'Cím',
        'Műveletek'
    ];

    return (
        <div className="mt-3">
            <h2 className="m-3 text-center">
                Szakdolgozatok kezelése
            </h2>

            <Button variant="primary" className="mb-2" onClick={redirectToCreateThesisPage}>
                Új felvétele
            </Button>

            { isLoading &&
            <div className="d-flex align-content-center justify-content-center mt-5">
                <LoadingSpinner />
            </div>
            }

            { !isLoading &&
                <ThesisDatatable headers={headers} body={theses} history={history}/>
            }
        </div>
    );
}

export default ManageTheses;
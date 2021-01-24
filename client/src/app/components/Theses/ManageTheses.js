import React, {useEffect} from "react";
import {fetchAllTheses} from "../../services/thesesService";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import ThesisDatatable from "../Datatable/ThesisDatatable";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

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

    if(isLoading) {
        return (
            <LoadingSpinner />
        );
    }

    return (
        <div style={{width: "85%"}} className="mt-4 mx-auto">
            <div className="d-flex align-content-center justify-content-end">
                <Button variant="success" className="mb-3" onClick={() => redirectToCreateThesisPage()}>
                    <FontAwesomeIcon icon={faPlus} /> Új felvétele
                </Button>
            </div>

            <h2 className="text-center mb-3">Szakdolgozatok kezelése</h2>

            { !isLoading &&
            <ThesisDatatable headers={headers} body={theses} history={history}/>
            }
        </div>
    );
}

export default ManageTheses;
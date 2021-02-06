import React, {useEffect} from "react";
import {fetchAllTheses} from "../../services/thesesService";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import ThesisDatatable from "../Datatable/ThesisDatatable";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";

const ManageTheses = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllTheses());
    }, [dispatch]);

    const isLoading = useSelector(state => state.theses.isLoading);
    const theses = useSelector(state => state.theses.theses);

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
        <div style={{width: "85%"}} className="mt-5 mx-auto">
            <h2 className="text-center mb-4">Szakdolgozatok kezelése</h2>

            { !isLoading &&
            <ThesisDatatable headers={headers} body={theses} history={history}/>
            }
        </div>
    );
}

export default ManageTheses;
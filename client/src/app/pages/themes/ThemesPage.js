import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchThesisThemes} from "../../services/thesesThemeService";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import ThesisThemeDatatable from "../../components/Datatable/ThesisThemeDatatable";
import Alert from "../../../common/components/Alert";

const ThemesPage = () => {
    const isLoading = useSelector(state => state.themes.isLoading);
    const themes = useSelector(state => state.themes.themes);
    const errors = useSelector(state => state.themes.errors);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchThesisThemes());
    }, [dispatch]);

    if(isLoading) {
        return (
            <LoadingSpinner />
        );
    }

    const headers = [
        'Téma megnevezése',
        'Létrehozás dátuma',
        'Műveletek'
    ];

    return (
        <div className="mt-5">
            <h2 className="text-center">Szakdolgozati témák kezelése</h2>
            { errors.message && <Alert type="danger" message={errors.message} /> }
            <div className="d-flex justify-content-start mt-3 mb-3">

            </div>
            <ThesisThemeDatatable body={themes} headers={headers} />
        </div>
    );

}

export default ThemesPage;
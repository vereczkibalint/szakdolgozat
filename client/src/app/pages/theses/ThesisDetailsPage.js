import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import Alert from "../../../common/components/Alert";
import GoBackButton from "../../../common/components/GoBackButton";
import {fetchThesisById} from "../../services/thesesService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTimes} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import ThesisDetails from "../../components/Theses/ThesisDetails";
import EditThesisForm from "../../components/Theses/EditThesisForm";

const ThesisDetailsPage = () => {
    let dispatch = useDispatch();
    const { thesisId } = useParams();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchThesisById(thesisId));
    }, [dispatch]);

    const [editMode, setEditMode] = useState(false);
    let thesis = useSelector(state => state.theses.theses[0]);
    let isLoading = useSelector(state => state.theses.isLoading);
    let thesisErrorMessage = useSelector(state => state.theses.errors.message);

    if(isLoading) {
        return (
            <LoadingSpinner />
        );
    }

    if(!isLoading && !thesis) {
        history.push('/user/theses');
    }

    if(thesisErrorMessage) {
        return (
            <div className="mt-5 d-flex justify-content-center mx-auto">
                <Alert type="danger" message={thesisErrorMessage} />
            </div>
        );
    }

    return (
        <Fragment>
            <div className="mt-3">
                <div className="d-flex justify-content-between">
                    <GoBackButton/>
                    <Button variant={editMode ? "danger" : "primary"} className="mb-3" onClick={() => setEditMode(prevState => !prevState)}>
                        { editMode ? (
                            <Fragment>
                                <FontAwesomeIcon icon={faTimes}/> Szerkesztés elvetése
                            </Fragment>
                        ) : (
                            <Fragment>
                                <FontAwesomeIcon icon={faPen}/> Szerkesztés
                            </Fragment>
                        ) }
                    </Button>
                </div>
                <h2 className="text-center font-weight-bold">{ thesis.title }</h2>
                { editMode ? (
                    <EditThesisForm thesis={thesis} history={history} />
                ) : (
                    <ThesisDetails thesis={thesis} />
                )}
            </div>
        </Fragment>
    );
}

export default ThesisDetailsPage;
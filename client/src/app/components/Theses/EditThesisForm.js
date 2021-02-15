import React, {Fragment, useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllStudent} from "../../services/userService";
import {updateThesis} from "../../services/thesesService";
import Alert from "../../../common/components/Alert";
import {Typeahead} from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.min.css";
import {fetchThesisThemes} from "../../services/thesesThemeService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";

const EditThesisForm = ({ thesis, history }) => {
    const dispatch = useDispatch();

    const themesIsLoading = useSelector(state => state.themes.isLoading);
    const themes = useSelector(state => state.themes.themes);
    const studentsIsLoading = useSelector(state => state.users.isLoading);
    const students = useSelector(state => state.users.students);
    const thesesErrorMessage = useSelector(state => state.theses.errors.message);
    const thesesErrors = useSelector(state => state.theses.errors.errors);

    useEffect(() => {
        dispatch(fetchAllStudent());
        dispatch(fetchThesisThemes());
    }, [dispatch]);

    const [updatedStudent, setUpdatedStudent] = useState(thesis.student._id);
    const [updatedTheme, setUpdatedTheme] = useState(thesis.topic._id);
    const [updatedTitle, setUpdatedTitle] = useState(thesis.title);

    if(!thesis) {
        history.push('/user/theses');
    }

    function checkErrorExists(path) {
        return thesesErrors && !!thesesErrors.find(err => err.path === path);
    }

    function getErrorMessage(path) {
        if(checkErrorExists(path)){
            return thesesErrors.find(err => err.path === path).message;
        }
    }

    const canCreate = updatedStudent !== "" && updatedTheme && updatedTheme !== '' && updatedTitle.length >= 5;

    function handleStudentChange(newStudent) {
        if(newStudent) {
            setUpdatedStudent(newStudent._id);
        }
    }

    function handleThemeChange(newTheme) {
        if(newTheme) {
            setUpdatedTheme(newTheme._id);
        }
    }

    function handleThesisCreate() {
        if(canCreate){
            const updatedThesis = {
                ...thesis,
                student: updatedStudent,
                topic: updatedTheme,
                title: updatedTitle
            };
            dispatch(updateThesis(updatedThesis, history));
        }
    }

    return (
        <Fragment>
            { thesesErrorMessage && <Alert type="danger" message={thesesErrorMessage} /> }
            <Form className="w-auto mx-auto">
                <Form.Group>
                    <Form.Label htmlFor="student">Hallgató</Form.Label>
                    <Typeahead
                        id="student"
                        options={students}
                        defaultInputValue={`${thesis.student.lastName} ${thesis.student.firstName} (${thesis.student.neptun})`}
                        labelKey={option => `${option.lastName} ${option.firstName} (${option.neptun})`}
                        onChange={(value) => handleStudentChange(value[0])}
                        disabled={studentsIsLoading || (!studentsIsLoading && students.length === 0)}
                        placeholder="Hallgató neve / NEPTUN kódja"
                        highlightOnlyResult={true}
                        maxResults={15}
                        paginate={true}
                    />

                    { checkErrorExists('student') && (
                        <div className="invalid-feedback d-block">
                            {getErrorMessage('student')}
                        </div>
                    )}
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="topic">Szakdolgozat témája</Form.Label>
                    <Typeahead
                        id="theme"
                        options={themes}
                        defaultInputValue={thesis.topic.title}
                        labelKey={option => `${option.title}`}
                        onChange={(value) => handleThemeChange(value[0])}
                        disabled={themesIsLoading || (!themesIsLoading && themes.length === 0)}
                        placeholder={!themesIsLoading && themes.length > 0 ? "Szakdolgozat témája" : "Nincsen rögzített téma!"}
                        highlightOnlyResult={true}
                        maxResults={15}
                        paginate={true}
                    />

                    { checkErrorExists('theme') && (
                        <div className="invalid-feedback d-block">
                            {getErrorMessage('theme')}
                        </div>
                    )}
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="title">Szakdolgozat címe</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Cím"
                        id="title"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                        isInvalid={!!getErrorMessage('title')}
                    />
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('title')}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        Legalább 5 karakter.
                    </Form.Text>
                </Form.Group>
                <Button className="mb-3" variant="success" onClick={() => handleThesisCreate()} disabled={!canCreate}>
                    <FontAwesomeIcon icon={faSave} /> Mentés
                </Button>
            </Form>
        </Fragment>
    );
}

export default EditThesisForm;
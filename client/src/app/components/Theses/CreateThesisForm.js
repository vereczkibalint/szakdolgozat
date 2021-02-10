import React, {Fragment, useEffect, useState} from "react";
import {Button, Form, FormGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllStudent} from "../../services/userService";
import {insertThesis} from "../../services/thesesService";
import Alert from "../../../common/components/Alert";
import {Typeahead} from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.min.css";
import {fetchThesisThemes} from "../../services/thesesThemeService";

const CreateThesisForm = ({ history }) => {
    const dispatch = useDispatch();

    const isLoading = useSelector(state => state.users.isLoading);
    const themes = useSelector(state => state.themes.themes);
    const students = useSelector(state => state.users.students);
    const lecturer = useSelector(state => state.auth.user._id);
    const thesesErrorMessage = useSelector(state => state.theses.errors.message);
    const thesesErrors = useSelector(state => state.theses.errors.errors);

    useEffect(() => {
        dispatch(fetchAllStudent());
        dispatch(fetchThesisThemes());
    }, [dispatch]);

    const [student, setStudent] = useState('');
    const [theme, setTheme] = useState('');
    const [title, setTitle] = useState('');

    function checkErrorExists(path) {
        return thesesErrors && !!thesesErrors.find(err => err.path === path);
    }

    function getErrorMessage(path) {
        if(checkErrorExists(path)){
            return thesesErrors.find(err => err.path === path).message;
        }
    }

    const canCreate = student !== "" && theme && theme !== '' && title.length >= 5;

    function handleStudentChange(newStudent) {
        if(newStudent) {
            setStudent(newStudent._id);
        }
    }

    function handleThemeChange(newTheme) {
        if(newTheme) {
            setTheme(newTheme._id);
        }
    }

    function handleThesisCreate() {
        if(canCreate){
            const thesis = {
                lecturer,
                student,
                theme,
                title
            };
            dispatch(insertThesis(thesis, history));
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
                        labelKey={option => `${option.lastName} ${option.firstName} (${option.neptun})`}
                        onChange={(value) => handleStudentChange(value[0])}
                        disabled={isLoading || (!isLoading && students.length === 0)}
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
                        labelKey={option => `${option.title}`}
                        onChange={(value) => handleThemeChange(value[0])}
                        disabled={isLoading || (!isLoading && themes.length === 0)}
                        placeholder={!isLoading && themes.length > 0 ? "Szakdolgozat témája" : "Nincsen rögzített téma!"}
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
                <FormGroup>
                    <Form.Label htmlFor="title">Szakdolgozat címe</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Cím"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        isInvalid={!!getErrorMessage('title')}
                    />
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('title')}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        Legalább 5 karakter.
                    </Form.Text>
                </FormGroup>
                <Button
                    className="mb-3"
                    variant="success"
                    onClick={() => handleThesisCreate()}
                    disabled={!canCreate}>Mentés</Button>
            </Form>
        </Fragment>
    );
}

export default CreateThesisForm;
import React, {useEffect, useState} from "react";
import { withRouter } from 'react-router-dom';
import { fetchAllStudent } from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../../common/components/Alert";
import GoBackButton from "../../../common/components/GoBackButton";
import {Button, Form, FormGroup} from "react-bootstrap";

import {insertThesis} from "../../services/thesesService";

const CreateThesis = ({ history }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllStudent());
    }, [dispatch]);

    const lecturer = useSelector(state => state.auth.user._id);
    const errorMessage = useSelector(state => state.users.errors.message);
    const errors = useSelector(state => state.users.errors.errors);
    const students = useSelector(state => state.users.students);
    const isLoading = useSelector(state => state.users.isLoading);

    const [student, setStudent] = useState('');
    const [topic, setTopic] = useState('');
    const [title, setTitle] = useState('');

    function checkErrorExists(path) {
        return errors && !!errors.find(err => err.path === path);
    }

    function getErrorMessage(path) {
        if(checkErrorExists(path)){
            return errors.find(err => err.path === path).message;
        }
    }

    const canCreate = student !== "" && topic.length >= 5 && title.length >= 5;

    function handleThesisCreate() {
        if(canCreate){
            const thesis = {
                lecturer,
                student,
                topic,
                title
            };

            dispatch(insertThesis(thesis, history));
        }
    }

    return (
        <div className="mt-4 w-75 mx-auto">
            <GoBackButton />
            <h1 className="text-center mb-4">Új szakdolgozat felvétele</h1>
            { errorMessage && <Alert type="danger" message={errorMessage} /> }
            <Form className="w-auto mx-auto">
                <FormGroup>
                    <Form.Label htmlFor="student">Hallgató</Form.Label>
                    <Form.Control as="select"
                          onChange={(e) => setStudent(e.target.value)}
                          disabled={isLoading || (!isLoading && students.length === 0)}>
                        {isLoading &&
                            <option value="">Adatok betöltése folyamatban...</option>
                        }

                        {!isLoading && students.length === 0 &&
                            <option value="">Nincs hallgató az adatbázisban!</option>
                        }

                        <option value="">Kérem válasszon...</option>
                        { students.map(student => (
                            <option value={student._id}>{student.lastName.concat(' ', student.firstName)}</option>
                        )) }
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('student')}
                    </Form.Control.Feedback>
                </FormGroup>
                <FormGroup>
                    <Form.Label htmlFor="topic">Szakdolgozat témája</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Téma"
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        isInvalid={!!getErrorMessage('topic')}
                    />
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('topic')}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        Legalább 5 karakter.
                    </Form.Text>
                </FormGroup>
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
                    variant="primary"
                    onClick={() => handleThesisCreate()}
                    disabled={!canCreate}>Mentés</Button>
            </Form>
        </div>
    );
}

export default withRouter(CreateThesis);
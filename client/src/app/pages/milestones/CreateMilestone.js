import React, {useEffect, useState} from "react";
import GoBackButton from "../../../common/components/GoBackButton";
import {Button, Form, OverlayTrigger, Popover} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import { withRouter } from 'react-router-dom';
import {fetchAllTheses} from "../../services/thesesService";
import TextEditor from "../../../common/components/TextEditor";
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {insertMilestone} from "../../services/milestoneService";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment from "moment";
import Alert from "../../../common/components/Alert";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile, faQuestion, faSave} from "@fortawesome/free-solid-svg-icons";
import ChipInput from "material-ui-chip-input";

const CreateMilestone = ({ history }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllTheses());
    }, [dispatch]);

    const thesesIsLoading = useSelector(state => state.theses.isLoading);
    const theses = useSelector(state => state.theses.theses);

    const errors = useSelector(state => state.milestones.errors.errors);
    const errorMessage = useSelector(state => state.milestones.errors.message);

    const [thesisId, setThesisId] = useState('');
    const [milestoneTitle, setMilestoneTitle] = useState('');
    const [milestoneDeadline, setMilestoneDeadline] = useState(moment().add(1, 'day'));
    const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText('')));
    const [tags, setTags] = useState([]);

    function changeTags(tags) {
        setTags(tags);
    }

    function handleTextEditorChange(state) {
        setEditorState(state);
    }

    function checkErrorExists(path) {
        return errors && !!errors.find(err => err.path === path);
    }

    function getErrorMessage(path) {
        if(checkErrorExists(path)){
            return errors.find(err => err.path === path).message;
        }
    }

    function handleSubmit(saveType) {
        if(canSubmit) {
            const milestone = {
                thesis: thesisId,
                title: milestoneTitle,
                description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
                deadline: milestoneDeadline,
                status: 'pending',
                isDraft: saveType !== 'save',
                tags
            };
            dispatch(insertMilestone(milestone, history));
        }
    }

    function valid(current) {
        let today = new Date();
        return current.isAfter(today);
    }

    const canSubmit = thesisId !== '' && milestoneTitle.length >= 3 && editorState.getCurrentContent().hasText();

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Címkék kezelése</Popover.Title>
            <Popover.Content>
                <span className="font-weight-bold">Címke mentéséhez:</span> Enter <br />
                <span className="font-weight-bold">Címke törlése:</span> dupla Backspace
            </Popover.Content>
        </Popover>
    );

    return (
        <div className="mt-4 w-75 mx-auto">
            <GoBackButton />
            <h1 className="text-center mb-4">Új mérföldkő felvétele</h1>
            { errorMessage && <Alert type="danger" message={errorMessage} /> }

            <Form className="w-auto mx-auto">
                <Form.Group>
                    <Form.Label htmlFor="student">Szakdolgozat</Form.Label>
                    <Form.Control as="select" disabled={thesesIsLoading || theses.length === 0} value={thesisId} onChange={(e) => setThesisId(e.target.value)}>
                        { thesesIsLoading && <option value="">Adatok betöltése folyamatban...</option> }
                        { !thesesIsLoading && theses.length === 0 && <option value="">Nincs elérhető szakdolgozat!</option> }
                        <option value="">Kérem válasszon!</option>
                        { !thesesIsLoading && theses.length > 0 && theses.map(thesis => (
                            <option key={thesis._id} value={thesis._id}>{thesis.student.lastName.concat(' ', thesis.student.firstName)} - {thesis.title}</option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('thesis')}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="title">Mérföldkő címe</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Mérföldkő címe"
                        id="title"
                        value={milestoneTitle}
                        onChange={(e) => setMilestoneTitle(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        Legalább 5 karakter.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('title')}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="deadline">Határidő</Form.Label>
                    <Datetime
                        isValidDate={valid}
                        dateFormat="YYYY-MM-DD"
                        timeFormat="HH:mm"
                        initialValue={milestoneDeadline}
                        closeOnSelect={true}
                        inputProps={{
                            onKeyDown: (e) => e.preventDefault()
                        }}
                        onChange={(e) => setMilestoneDeadline(e.toISOString())}
                    />
                    <Form.Text className="text-muted">
                        A maitól későbbi időpont.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('deadline')}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="d-flex flex-column">
                    <Form.Label>
                        Címkék
                        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                            <FontAwesomeIcon className="ml-2" icon={faQuestion} style={{fontSize: '100%'}} />
                        </OverlayTrigger>
                    </Form.Label>
                    <ChipInput
                        variant="outlined"
                        onChange={(tags) => changeTags(tags)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="description">Mérföldkő leírása</Form.Label>
                    <TextEditor state={editorState} onChange={(state) => handleTextEditorChange(state)} />
                    <Form.Text className="text-muted">
                        Legalább 5 karakter.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('description')}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button
                    onClick={() => handleSubmit('save')}
                    className="mb-3 mr-3"
                    variant="success"
                    disabled={!canSubmit}
                ><FontAwesomeIcon icon={faSave} /> Közzététel</Button>
                <Button
                    onClick={() => handleSubmit('save-draft')}
                    className="mb-3"
                    variant="primary"
                    disabled={!canSubmit}
                ><FontAwesomeIcon icon={faFile}/> Mentés piszkozatként</Button>
            </Form>
        </div>
    );
}

export default withRouter(CreateMilestone);
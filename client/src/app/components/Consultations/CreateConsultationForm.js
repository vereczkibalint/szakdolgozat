import React, {Fragment, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Alert from "../../../common/components/Alert";
import moment from 'moment';
import 'moment/locale/hu';
import "react-bootstrap-typeahead/css/Typeahead.min.css";
import Datetime from "react-datetime";
import {createConsultation} from "../../services/consultationService";
import TextEditor from "../../../common/components/TextEditor";
import {ContentState, convertToRaw, EditorState} from "draft-js";
import draftToHtml from "draftjs-to-html";

const CreateConsultationForm = ({ history }) => {
    const dispatch = useDispatch();

    const lecturer = useSelector(state => state.auth.user._id);
    const consultationErrorMessage = useSelector(state => state.consultations.errors.message);
    const consultationErrors = useSelector(state => state.consultations.errors.errors);

    const [startTime, setStartTime] = useState(moment());
    const [endTime, setEndTime] = useState(moment().add('30', 'minutes'));
    const [location, setLocation] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText('')));

    function handleTextEditorChange(state) {
        setEditorState(state);
    }

    function checkErrorExists(path) {
        return consultationErrors && !!consultationErrors.find(err => err.path === path);
    }

    function getErrorMessage(path) {
        if(checkErrorExists(path)){
            return consultationErrors.find(err => err.path === path).message;
        }
    }

    const canCreate = moment(endTime).isAfter(moment(startTime)) && location.length > 0;

    function validStartTime(currentStartTime) {
        let today = new Date();
        return currentStartTime.year() <= today.getFullYear() + 1 && currentStartTime.isAfter(today);
    }

    function handleConsultationCreate() {
        if(canCreate){
            const consultation = {
                lecturer,
                startTime,
                endTime,
                location,
                description: editorState.getCurrentContent().hasText() ? draftToHtml(convertToRaw(editorState.getCurrentContent())) : ''
            };
            dispatch(createConsultation(consultation, history));
        }
    }

    return (
        <Fragment>
            { consultationErrorMessage && <Alert type="danger" message={consultationErrorMessage} /> }
            <Form className="w-auto mx-auto">
                <Form.Group>
                    <Form.Label htmlFor="startTime">Konzultáció kezdete</Form.Label>
                    <Datetime
                        isValidDate={validStartTime}
                        dateFormat="YYYY-MM-DD"
                        timeFormat="HH:mm"
                        initialValue={startTime}
                        closeOnSelect={true}
                        locale="hu"
                        inputProps={{
                            onKeyDown: (e) => e.preventDefault()
                        }}
                        onChange={(e) => setStartTime(e.format())}
                    />
                    { checkErrorExists('startTime') && (
                        <div className="invalid-feedback d-block">
                            {getErrorMessage('startTime')}
                        </div>
                    )}
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="endTime">Konzultáció vége</Form.Label>
                    <Datetime
                        dateFormat="YYYY-MM-DD"
                        timeFormat="HH:mm"
                        initialValue={endTime}
                        closeOnSelect={true}
                        locale="hu"
                        inputProps={{
                            onKeyDown: (e) => e.preventDefault()
                        }}
                        onChange={(e) => setEndTime(e.toISOString())}
                    />
                    { checkErrorExists('endTime') && (
                        <div className="invalid-feedback d-block">
                            {getErrorMessage('endTime')}
                        </div>
                    )}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Konzultáció helyszíne</Form.Label>
                    <Form.Control
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        />
                    { checkErrorExists('location') && (
                        <div className="invalid-feedback d-block">
                            {getErrorMessage('location')}
                        </div>
                    )}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Leírás <span className="font-italic">(opcionális)</span></Form.Label>
                    <TextEditor state={editorState} onChange={(state) => handleTextEditorChange(state)} />
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('description')}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button
                    className="mb-3"
                    variant="primary"
                    onClick={() => handleConsultationCreate()}
                    disabled={!canCreate}>Mentés</Button>
            </Form>
        </Fragment>
    );
}

export default CreateConsultationForm;
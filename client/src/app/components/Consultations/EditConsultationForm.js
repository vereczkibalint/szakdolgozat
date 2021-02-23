import React, {Fragment, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Alert from "../../../common/components/Alert";
import moment from 'moment';
import 'moment/locale/hu';
import "react-bootstrap-typeahead/css/Typeahead.min.css";
import Datetime from "react-datetime";
import {updateConsultation} from "../../services/consultationService";
import {ContentState, convertFromHTML, convertToRaw, EditorState} from "draft-js";
import TextEditor from "../../../common/components/TextEditor";
import draftToHtml from "draftjs-to-html";

const EditConsultationForm = ({ consultation, history }) => {
    const dispatch = useDispatch();

    const consultationErrorMessage = useSelector(state => state.consultations.errors.message);
    const consultationErrors = useSelector(state => state.consultations.errors.errors);

    const [startTime, setStartTime] = useState(moment(consultation.startTime));
    const [endTime, setEndTime] = useState(moment(consultation.endTime));
    const [location, setLocation] = useState(consultation.location);

    const blocksFromHTML = convertFromHTML(consultation.description);

    const descriptionEditorState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
    );

    const [textEditorDescriptionState, setTextEditorDescriptionState] = useState(EditorState.createWithContent(descriptionEditorState));

    function checkErrorExists(path) {
        return consultationErrors && !!consultationErrors.find(err => err.path === path);
    }

    function getErrorMessage(path) {
        if(checkErrorExists(path)){
            return consultationErrors.find(err => err.path === path).message;
        }
    }

    const canCreate = moment(endTime).isAfter(moment(startTime)) && location.length > 0;

    function handleConsultationEdit() {
        if(canCreate){
            const updatedConsultation = {
                ...consultation,
                startTime,
                endTime,
                location,
                description: textEditorDescriptionState.getCurrentContent().hasText() ? draftToHtml(convertToRaw(textEditorDescriptionState.getCurrentContent())) : ''
            };

            dispatch(updateConsultation(updatedConsultation, history));
        }
    }

    return (
        <Fragment>
            { consultationErrorMessage && <Alert type="danger" message={consultationErrorMessage} /> }
            <h2 className="text-center">Konzultáció szerkesztése</h2>
            <Form className="w-auto mx-auto">
                <Form.Group>
                    <Form.Label htmlFor="startTime">Konzultáció kezdete</Form.Label>
                    <Datetime
                        dateFormat="YYYY-MM-DD"
                        timeFormat="HH:mm"
                        initialValue={startTime}
                        closeOnSelect={true}
                        locale="hu"
                        inputProps={{
                            onKeyDown: (e) => e.preventDefault()
                        }}
                        onChange={(e) => setStartTime(e.toISOString())}
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
                    <TextEditor state={textEditorDescriptionState} onChange={(state) => setTextEditorDescriptionState(state)} />
                </Form.Group>
                <Button
                    className="mb-3"
                    variant="primary"
                    onClick={() => handleConsultationEdit()}
                    disabled={!canCreate}>Mentés</Button>
            </Form>
        </Fragment>
    );
}

export default EditConsultationForm;
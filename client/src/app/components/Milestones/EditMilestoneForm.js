import React, {Fragment, useState} from "react";
import {Button, Form, OverlayTrigger, Popover} from "react-bootstrap";
import {useHistory} from 'react-router-dom';
import Datetime from "react-datetime";
import moment from "moment";
import {ContentState, convertFromHTML, convertToRaw, EditorState} from "draft-js";
import TextEditor from "../../../common/components/TextEditor";
import draftToHtml from "draftjs-to-html";
import {updateMilestone} from "../../services/milestoneService";
import {useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile, faQuestion, faSave} from "@fortawesome/free-solid-svg-icons";
import ChipInput from "material-ui-chip-input";

const EditMilestoneForm = ({ milestone, toggleEditMode }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [editedTitle, setEditedTitle] = useState(milestone.title);
    const [editedDeadline, setEditedDeadline] = useState(moment(milestone.deadline));

    const blocksFromHTML = convertFromHTML(milestone.description);
    const descriptionEditorState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
    );

    const [textEditorDescriptionState, setTextEditorDescriptionState] = useState(EditorState.createWithContent(descriptionEditorState));
    const [tags, setTags] = useState([...milestone.tags]);

    function changeTags(tags) {
        setTags(tags);
    }

    function validDate(current){
        let today = new Date();
        return current.isAfter(today);
    }

    const canSubmit = editedTitle.length >= 3 && textEditorDescriptionState.getCurrentContent().hasText();

    function handleMilestoneSave(saveType) {
        if(canSubmit) {
            let updatedMilestone = {
                ...milestone,
                title: editedTitle,
                description: draftToHtml(convertToRaw(textEditorDescriptionState.getCurrentContent())),
                deadline: editedDeadline,
                isDraft: saveType !== 'save',
                tags
            };

            dispatch(updateMilestone(updatedMilestone, history));
            toggleEditMode();
        }
    }

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
        <Fragment>
            <div className="mb-3">
                <h5 className="font-weight-bold">Cím:</h5>
                <Form.Control
                    value={editedTitle}
                    className="mb-2"
                    onChange={(e) => setEditedTitle(e.target.value)}
                />
                <h5 className="font-weight-bold">Határidő:</h5>
                <Datetime
                    isValidDate={validDate}
                    dateFormat="YYYY-MM-DD"
                    timeFormat="HH:mm"
                    className="mb-2"
                    initialValue={editedDeadline}
                    closeOnSelect={true}
                    inputProps={{
                        onKeyDown: (e) => e.preventDefault()
                    }}
                    onChange={(e) => setEditedDeadline(e.toISOString())}
                />

                <h5 className="font-weight-bold">Leírás:</h5>
                <TextEditor state={textEditorDescriptionState} onChange={(state) => setTextEditorDescriptionState(state)} />
                <Form.Group className="d-flex flex-column mt-3">
                    <Form.Label>
                        Címkék
                        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                            <FontAwesomeIcon className="ml-2" icon={faQuestion} style={{fontSize: '100%'}} />
                        </OverlayTrigger>
                    </Form.Label>
                    <ChipInput
                        variant="outlined"
                        defaultValue={tags}
                        onChange={(tags) => changeTags(tags)}
                    />
                </Form.Group>
                <div className="d-flex flex-row justify-content-start mt-3">
                    <Button
                        onClick={() => handleMilestoneSave('save')}
                        className="mb-3 mr-3"
                        variant="success"
                        disabled={!canSubmit}
                    ><FontAwesomeIcon icon={faSave} /> Közzététel</Button>
                    <Button
                        onClick={() => handleMilestoneSave('save-draft')}
                        className="mb-3"
                        variant="primary"
                        disabled={!canSubmit}
                    ><FontAwesomeIcon icon={faFile}/> Mentés piszkozatként</Button>
                </div>
            </div>
        </Fragment>
    );
}

export default EditMilestoneForm;
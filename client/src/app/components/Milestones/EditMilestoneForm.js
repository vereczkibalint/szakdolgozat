import React, {Fragment, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useHistory} from 'react-router-dom';
import Datetime from "react-datetime";
import moment from "moment";
import {ContentState, convertFromHTML, convertToRaw, EditorState} from "draft-js";
import TextEditor from "../../../common/components/TextEditor";
import draftToHtml from "draftjs-to-html";
import {updateMilestone} from "../../services/milestoneService";
import {useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";

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

    const [textEditorDescriptionState, settextEditorDescriptionState] = useState(EditorState.createWithContent(descriptionEditorState));

    function validDate(current){
        let today = new Date();
        return current.isAfter(today);
    }

    const canSubmit = editedTitle.length >= 3 && textEditorDescriptionState.getCurrentContent().hasText();

    function handleMilestoneSave() {
        if(canSubmit) {
            let updatedMilestone = {
                ...milestone,
                title: editedTitle,
                description: draftToHtml(convertToRaw(textEditorDescriptionState.getCurrentContent())),
                deadline: editedDeadline,
            };

            dispatch(updateMilestone(updatedMilestone, history));
            toggleEditMode();
        }
    }

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
                <TextEditor state={textEditorDescriptionState} onChange={(state) => settextEditorDescriptionState(state)} />

                <Button
                    variant="success"
                    className="mt-3"
                    disabled={!canSubmit}
                    onClick={handleMilestoneSave}>
                    <FontAwesomeIcon icon={faSave} /> Mentés
                </Button>
            </div>
        </Fragment>
    );
}

export default EditMilestoneForm;
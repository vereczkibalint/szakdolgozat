import React, {Fragment, useState} from "react";
import TextEditor from "../../../common/components/TextEditor";
import {ContentState, convertToRaw, EditorState} from "draft-js";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import draftToHtml from "draftjs-to-html";
import {insertMilestoneComment} from "../../services/milestoneService";
import MilestoneCommentBox from "./MilestoneCommentBox";

const MilestoneCommentsSection = ({ milestoneId, comments }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.auth.user);

    const [textEditorCommentState, settextEditorCommentState] = useState(EditorState.createWithContent(ContentState.createFromText('')));

    const canSubmit = textEditorCommentState.getCurrentContent().hasText();

    const handleCommentSubmit = () => {
        if(canSubmit){
            let newComment = {
                author: user._id,
                body: draftToHtml(convertToRaw(textEditorCommentState.getCurrentContent())),
            };
            dispatch(insertMilestoneComment(milestoneId, newComment, history));
        }
    }

    return (
        <Fragment>
            <div className="col-md-12">
                <h2 className="m-4">Megjegyzések</h2>
                <TextEditor state={textEditorCommentState} onChange={(state) => settextEditorCommentState(state)}/>
                <Button variant="primary" className="mt-2" onClick={handleCommentSubmit}>Küldés</Button>
            </div>

            <div className="w-100 mx-auto mb-3">
                { comments && comments.length === 0 && (
                    <h2>Nincsenek hozzászólások!</h2>
                )}
                { comments && comments.length > 0 && comments.map(comment => (
                    <MilestoneCommentBox key={comment._id} comment={comment} />
                ))}
            </div>
        </Fragment>
    );
}

export default MilestoneCommentsSection;
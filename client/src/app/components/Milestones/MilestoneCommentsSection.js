import React, {Fragment, useState} from "react";
import TextEditor from "../../../common/components/TextEditor";
import {ContentState, convertFromHTML, convertToRaw, EditorState} from "draft-js";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import draftToHtml from "draftjs-to-html";
import {insertMilestoneComment, updateMilestoneComment} from "../../services/milestoneService";
import MilestoneCommentBox from "./MilestoneCommentBox";
import MilestoneCommentFileUpload from "./MilestoneCommentFileUpload";

const MilestoneCommentsSection = ({ milestoneId, comments }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.auth.user);

    const [textEditorCommentState, settextEditorCommentState] = useState(EditorState.createWithContent(ContentState.createFromText('')));

    const [commentEditState, setCommentEditState] = useState(false);
    const [commentToEdit, setCommentToEdit] = useState({});
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [fileUploadProgress, setFileUploadProgress] = useState(0);

    const canSubmit = textEditorCommentState.getCurrentContent().hasText();

    const changeSelectedFiles = (files) => {
        setSelectedFiles(files);
    }

    const fillEditorWithComment = (comment) => {
        setCommentEditState(prevState => !prevState);
        if(commentEditState) {
            settextEditorCommentState(EditorState.createWithText(''));
        } else {
            setCommentToEdit(comment);
            const blocksFromHTML = convertFromHTML(comment.body);
            const commentEditorState = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap,
            );
            settextEditorCommentState(EditorState.createWithContent(commentEditorState));
        }
    }

    const handleCommentSubmit = () => {
        if(canSubmit){
            let newComment = {
                author: user._id,
                body: draftToHtml(convertToRaw(textEditorCommentState.getCurrentContent())),
            };
            dispatch(insertMilestoneComment(milestoneId, newComment, history));
        }
    }

    const handleCommentEdit = () => {
        if(canSubmit) {
            let updatedComment = {
                body: draftToHtml(convertToRaw(textEditorCommentState.getCurrentContent()))
            };
            dispatch(updateMilestoneComment(milestoneId, commentToEdit._id, updatedComment));
        }
    }

    return (
        <Fragment>
            <div className="col-md-12 mb-3">
                <h3 className="m-4">Megjegyzések</h3>
                <TextEditor state={textEditorCommentState} onChange={(state) => settextEditorCommentState(state)}/>
                <MilestoneCommentFileUpload setFiles={changeSelectedFiles} />
                { commentEditState ?
                    <Fragment>
                        <Button variant="primary" className="mt-2" onClick={handleCommentEdit}>Komment mentése</Button>
                        <Button variant="danger" className="mt-2 ml-2" onClick={fillEditorWithComment}>Szerkesztés elvetése</Button>
                    </Fragment>

                    : <Button variant="primary" className="mt-2" onClick={handleCommentSubmit}>Küldés</Button>
                }
            </div>

            <div className="mx-auto mb-3" style={{ width: '100%' }}>
                { comments && comments.length === 0 && (
                    <h2 className="text-center">Nincsenek hozzászólások!</h2>
                )}
                { comments && comments.length > 0 && comments.map(comment => (
                    <MilestoneCommentBox key={comment._id} editComment={fillEditorWithComment} milestoneId={milestoneId} comment={comment} />
                ))}
            </div>
        </Fragment>
    );
}

export default MilestoneCommentsSection;
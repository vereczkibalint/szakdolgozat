import React, {Fragment, useState} from "react";
import TextEditor from "../../../common/components/TextEditor";
import {ContentState, EditorState} from "draft-js";

const MilestoneCommentsSection = () => {
    const [textEditorCommentState, settextEditorCommentState] = useState(EditorState.createWithContent(ContentState.createFromText('')));

    return (
        <Fragment>
            <div className="col-md-12">
                <h2 className="m-4">Megjegyzések</h2>
                <TextEditor state={textEditorCommentState} onChange={(state) => settextEditorCommentState(state)}/>
            </div>
        </Fragment>
    );
}

export default MilestoneCommentsSection;
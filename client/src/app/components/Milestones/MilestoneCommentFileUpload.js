import React from "react";
import { Form } from 'react-bootstrap';

const MilestoneCommentFileUpload = ({ setFiles }) => {
    return (
        <div className="mt-2">
            <Form.Group>
                <Form.Label>Csatolmányok <br /> <small>Elfogadott formátumok: png, jpg, pdf, docx, xlsx</small></Form.Label>
                <Form.Control
                    type="file"
                    id="commentFiles"
                    multiple
                    onChange={(e) => setFiles(e.target.files)} />
            </Form.Group>
        </div>
    );
}

export default MilestoneCommentFileUpload;

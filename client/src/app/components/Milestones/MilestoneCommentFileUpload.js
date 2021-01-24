import React from "react";
import { Form, FormControl } from 'react-bootstrap';

const MilestoneCommentFileUpload = ({ setSelectedFiles }) => {
    return (
        <div className="mt-2">
            <Form.Group>
                <Form.Label>Csatolmányok <br /> <small>Elfogadott formátumok: png, jpg, pdf</small></Form.Label>
                <FormControl
                    type="file"
                    id="commentFiles"
                    multiple
                    onChange={(e) => setSelectedFiles(e.target.files)} />
            </Form.Group>
        </div>
    );
}

export default MilestoneCommentFileUpload;
import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Alert from "../../../common/components/Alert";
import {changePassword} from "../../services/authService";

const ChangePasswordForm = () => {
    const dispatch = useDispatch();

    const errorMessage = useSelector(state => state.auth.error.message);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setnewPasswordConfirm] = useState('');

    const canSubmit = currentPassword.length >= 8 && newPassword.length >= 8 && newPassword === newPasswordConfirm;


    function changePasswordSubmit() {
        if(canSubmit) {
            dispatch(changePassword(currentPassword, newPassword));
        }
    }

    return (
        <div className="w-75 mx-auto mt-3">
            { errorMessage && <Alert type="danger" message={errorMessage}/> }
            <Form className="p-3" style={{border: '.2rem solid #ececec', borderRadius: '10px'}}>
                <Form.Group>
                    <Form.Label htmlFor="current_password">Jelenlegi jelszó:</Form.Label>
                    <Form.Control
                        id="current_password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="new_password">Új jelszó:</Form.Label>
                    <Form.Control
                        id="new_password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="new_password_confirm">Új jelszó megerősítése:</Form.Label>
                    <Form.Control
                        id="new_password_confirm"
                        type="password"
                        value={newPasswordConfirm}
                        onChange={(e) => setnewPasswordConfirm(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" disabled={!canSubmit} onClick={changePasswordSubmit}>Mentés</Button>
            </Form>
        </div>
    );
}

export default ChangePasswordForm;
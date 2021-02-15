import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Alert from "../../../common/components/Alert";
import {changePassword} from "../../services/authService";

const ChangePasswordForm = () => {
    const dispatch = useDispatch();

    const errorMessage = useSelector(state => state.auth.error.message);
    const passwordChangeMessage = useSelector(state => state.auth.passwordChangeMessage);

    const [showPassword, setShowPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const canSubmit = currentPassword.length >= 8 && newPassword.length >= 8 && newPassword === newPasswordConfirm;


    function changePasswordSubmit() {
        if(canSubmit) {
            dispatch(changePassword(currentPassword, newPassword));
        }
    }

    const newPasswordInvalid = newPassword !== '' && newPassword.length < 8;
    const passwordConfirmInvalid = newPasswordConfirm !== '' && newPasswordConfirm !== newPassword;

    return (
        <div className="mx-auto w-75 mt-3">
            { errorMessage && <Alert type="danger" message={errorMessage}/> }
            { passwordChangeMessage && <Alert type="success" message={passwordChangeMessage} /> }

            <Form className="p-3" style={{border: '.2rem solid #ececec', borderRadius: '10px'}}>
                <Form.Check label="Jelszavak mutatása" className="text-right mb-1" onChange={(e) => setShowPassword(e.target.checked)} />
                <Form.Group>
                    <Form.Label htmlFor="current_password">Jelenlegi jelszó<span className="text-danger">*</span>:</Form.Label>
                    <Form.Control
                        id="current_password"
                        type={showPassword ? "text" : "password"}
                        style={{ marginBottom: '20px' }}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="new_password">Új jelszó<span className="text-danger">*</span>:</Form.Label>
                    <Form.Control
                        id="new_password"
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        style={{ marginBottom: '20px' }}
                        isInvalid={newPasswordInvalid}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Form.Text className={newPasswordInvalid ? "text-danger" : "text-muted"}>
                        Legalább 8 karakter.
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="new_password_confirm">Új jelszó megerősítése<span className="text-danger">*</span>:</Form.Label>
                    <Form.Control
                        id="new_password_confirm"
                        type={showPassword ? "text" : "password"}
                        value={newPasswordConfirm}
                        style={{ marginBottom: '20px' }}
                        isInvalid={passwordConfirmInvalid}
                        onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    />
                    { passwordConfirmInvalid && (
                        <Form.Control.Feedback type="invalid">
                            A két jelszó nem egyezik meg!
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <Button variant="primary" disabled={!canSubmit} onClick={changePasswordSubmit}>Mentés</Button>
            </Form>
        </div>
    );
}

export default ChangePasswordForm;
import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {userLogin} from "../../services/authService";
import Alert from "../../../common/components/Alert";


const LoginForm = () => {
    const dispatch = useDispatch();
    let error = useSelector(state => state.auth.error);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if(email.length > 0 && password.length > 0) {
            dispatch(userLogin(email, password));
        }
    }

    return (
        <div className="wrapper">
            <div className="form-signin">
                <h3 className="form-signin-heading">Belépés az oldalra</h3>
                <hr className="colorgraph" />
                {error && <Alert type="danger" message={error.message} />}
                <input type="email"
                       className="form-control mb-4"
                       name="email"
                       placeholder="Email"
                       onChange={(e) => setEmail(e.target.value)}
                       required
                       autoFocus />
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Jelszó"
                    onChange={(e) => setPassword(e.target.value)}
                    required />

                <button
                    className="btn btn-lg btn-login btn-block"
                    name="login_submit"
                    onClick={() => handleLogin()}
                    type="Submit">Bejelentkezés</button> <br />
            </div>
        </div>
    )
}

export default LoginForm;
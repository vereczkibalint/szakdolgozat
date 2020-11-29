import React, { useState } from 'react';
import Alert from '../components/Alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { adminLogin } from '../actions/authActions';


const LoginForm = ({ adminLogin, error }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if(email.length > 0 && password.length > 0) {
            adminLogin(email, password);
        }
    }

    return (
        <div className="wrapper">
            <div className="form-signin">       
                <h3 className="form-signin-heading">Admin vezérlőpult</h3>
                <hr className="colorgraph" />
                { error && <Alert type="danger" message={error.message} />}
                <input type="email" 
                    className="form-control"
                    name="email"
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    autoFocus /> <br />
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

LoginForm.propTypes = {
    error: PropTypes.object,
    adminLogin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    error: state.auth.error
});

export default connect(mapStateToProps, { adminLogin })(LoginForm);

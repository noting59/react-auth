import React from 'react';
import SignupForm from './signupForm';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';

class SignupPage extends React.Component {
    render() {
        const { userSignupRequest, addFlashMessage } = this.props;
        return (
            <div className="container">
                <div className="auth">
                    <h5 className="auth-title">Join our community!</h5>
                    <div className="col-md-12">
                        <SignupForm userSignupRequest={userSignupRequest} addFlashMessage = {addFlashMessage}/>
                    </div>
                </div>
            </div>
        );
    }
}

SignupPage.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
}

export default connect( null, { userSignupRequest, addFlashMessage })(SignupPage);
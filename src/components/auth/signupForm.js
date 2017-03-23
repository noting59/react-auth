import React from 'react';
import classnames from 'classnames';
import validateInput from '../../vendor/signupValidator';
import TextFieldGroup from '../common/textFieldGroup';


class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: {},
            isLoading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.isValid()) {
            this.setState({ errors: {} , isLoading: true});
            this.props.userSignupRequest(this.state).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You signed up successfully. Welcome!'
                    })
                    this.context.router.push('/');

                },
                ( err ) => this.setState({ errors: err.response.data.data.error, isLoading: false })
            );
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join our community!</h1>
                <TextFieldGroup
                    onChange = {this.onChange}
                    field = 'name'
                    error = {errors.name}
                    label = 'Name'
                    value = {this.state.name}
                />
                <TextFieldGroup
                    onChange = {this.onChange}
                    field = 'email'
                    error = {errors.email}
                    label = 'Email'
                    value = {this.state.email}
                />
                <TextFieldGroup
                    onChange = {this.onChange}
                    field = 'password'
                    error = {errors.password}
                    label = 'Password'
                    value = {this.state.password}
                    type  = 'password'
                />
                <TextFieldGroup
                    onChange = {this.onChange}
                    field = 'password_confirmation'
                    error = {errors.password_confirmation}
                    label = 'Confirm Password'
                    value = {this.state.password_confirmation}
                    type  = 'password'
                />
                <div className="form-group">
                    <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">Sign up</button>
                </div>
            </form>
        )
    }
}

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default SignupForm;
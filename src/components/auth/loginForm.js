import React from 'react';
import validateInput from '../../vendor/loginValidator';
import TextFieldGroup from '../common/textFieldGroup';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
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
            this.props.login(this.state).then(
                (res) => this.context.router.push('/'),
                ( err ) => this.setState({ errors: err.response.data.data.error, isLoading: false })
            );
        }
    }

    render() {
        const { errors, email, password, isLoading } = this.state;
        return (
            <form onSubmit={this.onSubmit}>

                { errors.form && <div className='alert alert-danger'>{errors.form}</div> }

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
                <div className="form-group">
                    <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">Log in</button>
                </div>
            </form>
        )
    }
}

LoginForm.propTypes = {
    login: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);

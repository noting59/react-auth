import React from 'react';
import classnames from 'classnames';
import validateInput from '../../vendor/signupValidator'


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
                () => {},
                ( err ) => this.setState({ errors: err.response.data.data.error, isLoading: false })
            );
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join our community!</h1>

                <div className={classnames("form-group", { 'has-error': errors.name })}>
                    <label className="control-label">Name</label>
                    <input
                    onChange={this.onChange}
                        value={this.state.name}
                        type="text"
                        name="name"
                        className="form-control"
                    />
                    {errors.name && <span className="help-block">{errors.name}</span>}
                </div>
                <div className={classnames("form-group", { 'has-error': errors.email })}>
                    <label className="control-label">Email</label>
                    <input
                    onChange={this.onChange}
                        value={this.state.email}
                        type="email"
                        name="email"
                        className="form-control"
                    />
                    {errors.email && <span className="help-block">{errors.email}</span>}
                </div>
                <div className={classnames("form-group", { 'has-error': errors.password })}>
                    <label className="control-label">Password</label>
                    <input
                    onChange={this.onChange}
                        value={this.state.password}
                        type="password"
                        name="password"
                        className="form-control"
                    />
                    {errors.password && <span className="help-block">{errors.password}</span>}
                </div>
                <div className={classnames("form-group", { 'has-error': errors.password }, { 'has-error': errors.password_confirmation })}>
                    <label className="control-label">Confirm Password</label>
                    <input
                    onChange={this.onChange}
                        value={this.state.password_confirmation}
                        type="password"
                        name="password_confirmation"
                        className="form-control"
                    />
                    {errors.password && <span className="help-block">{errors.password_confirmation}</span>}
                </div>
                <div className="form-group">
                    <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">Sign up</button>
                </div>
            </form>
        )
    }
}

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;
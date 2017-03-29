import React from 'react';
import LoginForm from './loginForm';
import FacebookLogin from './facebookLogin';
import VKLogin from './vkLogin';
import classnames from 'classnames';
import { socialLogin } from '../../actions/authActions';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../actions/flashMessages';

class LoginPage extends React.Component {
    constructor (props, context) {
        super(props, context);

        this.state = {
            errors: {},
            isLoading: false
        };

        this.setState.bind(this);
    }

    responseFacebook = (res) => {
        this.setState({ errors:{ social: '' } });

        if(res.error) {
            this.setState({ errors:{ social: res.error.message } })
        } else {
            let userData = {
                name: res.name,
                social_id: res.id,
                social_link: res.link,
                service: 'fb'
            }
            this.props.socialLogin(userData).then(
                () => { this.props.addFlashMessage({
                        type: 'success',
                        text: 'You logged in with Facebook successfully. Welcome!'
                    })
                    this.context.router.push('/');
                },
                ( err ) => this.setState({ errors: err.response.data.data.error, isLoading: false })
            );
        }
    };

    responseVk = (response) => {
        this.setState({ errors:{ social: '' } });
        console.log(response);
    }

    render() {
        return (
            <div className="container">
                <div className="auth">
                    <h5 className="auth-title">Login</h5>
                    <div className="col-md-12">
                        <LoginForm />

                        <div className="auth-or">OR</div>
                    </div>

                    <div className={classnames("col-md-12 clearfix", { 'has-error': this.state.errors.social })}>
                        <FacebookLogin socialId="745695028928250"
                           language="en_US"
                           scope="public_profile,email"
                           fields="name,email,picture,link,locale"
                           xfbml={true}
                           version="v2.5"
                           className="btn btn-social btn-facebook"
                           callback={this.responseFacebook}
                           textButton="Connect with Facebook"/>
                         <VKLogin
                            apiId="5947767"
                            autoLoad={true}
                            scope="public_profile, email"
                            className='btn btn-social btn-vk'
                            textButton="Connect with VK"
                            callback={this.responseVk} />
                            {this.state.errors.social && <span className="help-block">{this.state.errors.social}</span>}
                    </div>
                </div>
            </div>
        );
    }
}

LoginPage.contextTypes = {
    router: React.PropTypes.object.isRequired
}


export default connect(null, { addFlashMessage, socialLogin })(LoginPage);

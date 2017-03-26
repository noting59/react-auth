import React from 'react';
import LoginForm from './loginForm';
import FacebookLogin from './facebookLogin';
import VKLogin from './vkLogin';
import classnames from 'classnames';

class LoginPage extends React.Component {
    constructor (props, context) {
        super(props, context);

        this.state = {
            errors: {}
        };

        this.setState.bind(this);
    }

    responseFacebook = (res) => {
        this.setState({ errors:{ social: '' } });

        if(res.error) {
            this.setState({ errors:{ social: res.error.message } })
        } else {
            console.log(res);
        }
    };

    responseVk = (response) => {
        this.setState({ errors:{ social: '' } });
        console.log(response);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="col-md-12">
                        <h1 className="text-center">Login!</h1>
                    </div>
                    <div className={classnames("col-md-12 clearfix", { 'has-error': this.state.errors.social })}>
                        <FacebookLogin socialId="745695028928250"
                           language="en_US"
                           scope="public_profile,email"
                           fields="name,email,picture,link,locale"
                           xfbml={true}
                           version="v2.5"
                           className="loginBtn loginBtn--facebook"
                           callback={this.responseFacebook}
                           textButton="Sign In"/>
                         <VKLogin
                            apiId="5947767"
                            autoLoad={true}
                            scope="public_profile, email"
                            className='loginBtn loginBtn--vk'
                            textButton="Sign In"
                            callback={this.responseVk} />
                            {this.state.errors.social && <span className="help-block">{this.state.errors.social}</span>}
                    </div>
                    <div className='col-md-12 line'>
                    </div>
                    <div className="col-md-12">
                        <h5 className="text-center">OR</h5>
                    </div>
                    <div className='col-md-12 line'>
                    </div>
                    <div className="col-md-12">
                        <LoginForm />
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;

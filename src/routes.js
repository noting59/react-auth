import React from 'react';
import { Route } from 'react-router';
import { IndexRoute } from 'react-router';

import App from './components/app';
import Greetings from './components/greetings';
import SignupPage from './components/auth/signupPage';
import LoginPage from './components/auth/loginPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Greetings} />
        <Route path="signup" component={SignupPage} />
        <Route path="login" component={LoginPage} />
    </Route>
)
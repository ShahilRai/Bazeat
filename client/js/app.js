import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Route, browserHistory } from 'react-router';
import ReactStormpath, { Router, HomeRoute, LoginRoute, AuthenticatedRoute } from 'react-stormpath';
import { ChangePasswordPage, ForgotPasswordModal, MasterPage, IndexPage, LoginModal, RegisterPage, ResetPasswordPage, VerifyEmailPage, ProfilePage } from './pages';

ReactStormpath.init();

ReactDOM.render(
  <Router history={browserHistory}>
    <HomeRoute path='/' component={MasterPage}>
      <IndexRoute component={IndexPage} />      
      <Route path='/verify' component={VerifyEmailPage} />
      <Route path='/passwordReset' component={ResetPasswordPage} />
      <Route path='/change' component={ChangePasswordPage} />
      <Route path='/forgot' component={ForgotPasswordModal} />
      <AuthenticatedRoute>
        <Route path='/profile' component={ProfilePage} />
      </AuthenticatedRoute>
    </HomeRoute>
  </Router>,
  document.getElementById('app-container')
);
import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Route, browserHistory } from 'react-router';
import ReactStormpath, { Router, HomeRoute, LoginRoute, AuthenticatedRoute } from 'react-stormpath';
//import { ChangePasswordPage, ForgotPasswordModal, MasterPage, IndexPage, LoginModal, RegisterPage, ResetPasswordPage, VerifyEmailPage, ProfileContainer, ReactSlider, UserHomePage, AdminLoginModal, AdminRegisterModal, AdminPanel, UserSettingPage, HelpPage, AboutPage, TermsPage, PrivacyPage, FaqPage, MapViewContainer, DisplaySearch} from './pages';
import { ProjectRouter } from './pages';
ReactStormpath.init();

var _arr  = {};
function loadScript(scriptName, callback) {
  if (!_arr[scriptName]) {
    _arr[scriptName] = true;

    var body   = document.getElementsByTagName('body')[0];
    var script   = document.createElement('script');
    script.type  = 'text/javascript';
    script.src   = scriptName;
    script.onload = callback;
    // fire the loading
    body.appendChild(script);
  } else if (callback) {
   callback();
  }
}

ReactDOM.render(
  <div>
    <ProjectRouter />
  </div>,
  document.getElementById('app-container')
);

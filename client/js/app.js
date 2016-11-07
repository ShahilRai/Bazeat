import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Route, browserHistory } from 'react-router';
import ReactStormpath, { Router, HomeRoute, LoginRoute, AuthenticatedRoute } from 'react-stormpath';
import { ChangePasswordPage, ForgotPasswordModal, MasterPage, IndexPage, LoginModal, RegisterPage, ResetPasswordPage, VerifyEmailPage, ProfilePage, ProfileContainer } from './pages';

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

function loadJquery() {
  loadScript('/javascript/jquery-1.11.1.js', function() {
    loadScript('/javascript/bootstrap.min.js', function() {
      loadScript('/javascript/jaliswall.js', function() {
        $('.grid_wall_wrapper').jaliswall({item:'.grid_single_item'});
      });
    });
  });
}

ReactDOM.render(
  <Router history={browserHistory} onUpdate={() => loadJquery()}>
    <HomeRoute path='/' component={MasterPage}>
      <IndexRoute component={IndexPage} />
      <Route path='/login' component={IndexPage} />
      <Route path='/register' component={IndexPage} />
      <Route path='/verify' component={VerifyEmailPage} />
      <Route path='/passwordReset' component={ChangePasswordPage} />
      <Route path='/change' component={ChangePasswordPage} />
      <Route path='/forgot' component={ForgotPasswordModal} />
      <AuthenticatedRoute>
        <Route path='/profile' component={ProfileContainer} />
      </AuthenticatedRoute>
    </HomeRoute>
  </Router>,
  document.getElementById('app-container')
);

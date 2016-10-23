import React from 'react';
import { Link } from 'react-router';

import { LoginLink, LogoutLink, NotAuthenticated, Authenticated } from 'react-stormpath';

export default class LoginModal extends React.Component {
  render() {
    return (
     	 <div className="modal login_modal" id="login_modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">X</span>
              </button>
              <a href="login.html" className="login_logo">
                <img src={require('../../images/login_logo.png')} />
              </a>
              <h4 className="modal-title" id="myModalLabel">LOG IN</h4>
              <h5><span>or </span><a href="#">Register</a></h5>
            </div>
            <div className="modal-body">
             	<p>Alle skal ha mulighet å spise mat laget av hender</p>
                <p spIf="form.error">
    				<strong>Error:</strong> <span spBind="form.errorMessage" />
  				</p>
             <form className="login_form">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="User name"  name="username"/>
                  <i className="fa fa-envelope-o" aria-hidden="true"></i>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control passwrd_txt" name="password" placeholder="******" />
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </div>

                <div className="checkbox custom_checkbox">
                  <input type="checkbox" id="checkbox1" />
                  <label>
                    Remember me 
                  </label>
                </div>
                <input type="submit" value="Log in" className="login_sbmit" />
                <span className="error_txt"><a href="#">Have you forgotten your password?</a></span>
              </form>
              <span className="or_txt">or</span>
              <div className="social_btn">
                <i className="fa fa-facebook" aria-hidden="true"></i>
                <a href="#"  className="modal_btns fb_btn">Log in with <b>Facebook</b></a>
              </div>
              <div className="social_btn">
                <a href="#" className="modal_btns google_btn">Log in with <b>Google</b></a>
              </div>
            </div>
            <div className="modal-footer">
            </div>
          </div>
          </div>
        </div>
    );
  }
}


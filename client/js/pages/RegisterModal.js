import React from 'react';

import { RegistrationForm } from 'react-stormpath';

export default class RegisterModal extends React.Component {

  render() {
    return (            
      <div className="modal login_modal" id="register_modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">X</span>
              </button>
              <a href="login.html" className="login_logo">
                <img src={require('../../images/login_logo.png')} />
              </a>
              <h4 className="modal-title" id="myModalLabel">REGISTRER DEG</h4>
              <h5><span>eller </span><a href="#">Logg inn</a></h5>
              <h5 className="register_heading"><a href="#">Er du en produsent?</a></h5>
            </div>
            <div className="modal-body">
              <RegistrationForm className="login_form mtop0">
                <div className="form-group">
                  <input type="text" className="form-control" id="givenName" name="firstName" placeholder="First Name" required={ true } />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" id="surname" name="lastName" placeholder="Last Name" required={ true } />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" id="email" name="email" placeholder="Email" required={ true } />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" id="password" name="password" placeholder="Password" required={ true } />
                </div>
                <p className="alert alert-danger" data-spIf="form.error"><span data-spBind="form.errorMessage" /></p>
                
                <input type="submit" value="Bli en Bazeater" className="login_sbmit" />
              </RegistrationForm>
              <span className="or_txt mtop10">eller</span>
              <div className="social_btn">
                <i className="fa fa-facebook" aria-hidden="true"></i>
                <a href="#"  className="modal_btns fb_btn">Register with <b>Facebook</b></a>
              </div>
              <div className="social_btn">
                <a href="#" className="modal_btns google_btn">Register with <b>Google</b></a>
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
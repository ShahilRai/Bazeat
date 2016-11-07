import React from 'react';

import { RegistrationForm, SocialLoginLink } from 'react-stormpath';

export default class RegisterModal extends React.Component {

  onFormSubmit(e, next){
    var data = e.data;

    if (data.password.length < 8) {
      return next(new Error('Password must be at least 8 characters long.'));
    }
    if (data.password.search(/\d/) == -1){
    return next(new Error('Password must contain one digit.'));
    }
    if (data.password.search(/^(?=.*[a-z]).+$/) == -1) {
    return next(new Error('Password must contain one lower case character.'));
    }
    if (data.password.search(/^(?=.*[A-Z]).+$/) == -1) {
    return next(new Error('Password must contain one upper case character.'));
    }
    next(null, data);
  }


  onFormSubmitSuccess(e, next) {
    $("#register_modal").modal('hide')
    next();
  }

  onFormSubmitError(e, next) {
    next();
  }

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
                <img src={require('../../../images/login_logo.png')} />
              </a>
              <h4 className="modal-title" id="myModalLabel">REGISTRER DEG</h4>
              <h5><span>eller </span><a href="#register_modal" data-dismiss="modal" data-toggle="modal" data-target="#login_modal">Log in</a></h5>
              <h5 className="register_heading"><a href="#register_modal" data-dismiss="modal" data-toggle="modal" data-target="#producer_modal">Er du en produsent?</a></h5>
            </div>
            <div className="modal-body">
              <RegistrationForm onSubmit={this.onFormSubmit.bind(this)}  onSubmitSuccess={this.onFormSubmitSuccess.bind(this)} onSubmitError={this.onFormSubmitError.bind(this)} className="login_form mtop0">
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
                <p className="alert alert-danger" data-spIf="form.error">
                  <span data-spBind="form.errorMessage" />
                </p>

                <input type="hidden" className="form-control" id="customData.is_producer" name="customData.is_producer" value="false" onChange={function() {}}/>
                <input type="submit" value="Bli en Bazeater" className="login_sbmit" />
              </RegistrationForm>
              <span className="or_txt mtop10">eller</span>
              <div className="social_btn">
                <i className="fa fa-facebook" aria-hidden="true"></i>
                <SocialLoginLink providerId='facebook' className="modal_btns fb_btn">Register with <b>Facebook</b></SocialLoginLink>
              </div>
              <div className="social_btn">
                <SocialLoginLink providerId='google' className="modal_btns google_btn">Register with <b>Google</b></SocialLoginLink>
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

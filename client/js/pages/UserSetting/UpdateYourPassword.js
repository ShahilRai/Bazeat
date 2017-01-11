import React from 'react';
import { ResetPasswordForm } from 'react-stormpath';


export default class UpdateYourPassword extends React.Component {
  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };
 constructor(props, context) {
    super(props, context);
    this.state = {
      email: ''
    };
  }
  onFormSubmit(e, next) {
    this.setState({
      email:this.context.user.email
    })
    console.log("Form submitted",this.context.user.email);
     next(null, this.context.user.email);
  }
  render() {
    return (
      <div className="col-lg-9 col-md-8 col-sm-10 col-xs-12 edit_profile_rht_sidebar">
        <div className="edit_prfile_detail_form">
          <h3>Update your password</h3>
          <ResetPasswordForm className="ptop30"  action="/password-reset" onSubmit={this.onFormSubmit.bind(this)} >
            <div className="passwrd_txt">
              <p className="">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
            </div>
            <div className="passwrd_form">
              <div className="form-group row">
                <label for="example-search-input" className="col-md-4 col-xs-12 col-form-label">Old password</label>
                <div className="col-md-7 col-xs-12">
                   <input type="text" className="form-control" id="Old password" name="Old password" required/>
                </div>
              </div>
              <div className="form-group row">
                <label for="example-search-input" className="col-md-4 col-xs-12 col-form-label">New password</label>
                <div className="col-md-7 col-xs-12">
                 <input type="text" className="form-control" id="New password" name="New password" required />
                </div>
              </div>
              <div className="form-group row">
                <label for="example-url-input" className="col-md-4 col-xs-12 col-form-label">Confirm new password</label>
                <div className="col-md-7 col-xs-12">
                  <input type="text" className="form-control" id="Confirm new password" name="Confirm new password" required/>
                </div>
              </div>
            </div>
            <div className="profile_gry_bot_bar">
              <button type="submit" className="btn pull-right">Update password</button>
            </div>
          </ResetPasswordForm>
        </div>
      </div>
    );
  }
}



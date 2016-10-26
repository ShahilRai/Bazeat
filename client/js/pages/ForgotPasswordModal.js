import React from 'react';
import DocumentTitle from 'react-document-title';

import { ResetPasswordForm } from 'react-stormpath';

export default class ForgotPasswordModal extends React.Component {

  render() {
    return (
            <div className="modal fade login_modal" id="forgot_modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">X</span>
                  </button>
                  <a href="login.html" className="login_logo">
                    <img src={require('../../images/login_logo.png')}/>
                  </a>
                  <h4 className="modal-title" id="myModalLabel">REGISTRER DEG</h4>
                  <h5><span>eller </span><a href="#register_modal" data-dismiss="modal" data-toggle="modal" data-target="#login_modal">Log in</a></h5>
                                   
                </div>
                <div className="modal-body">
                  <p>Alle skal ha mulighet å spise mat laget av hender</p>
                  <ResetPasswordForm className="login_form">
                    <div className="form-group">
                      <input type="text" className="form-control"  name="email"  placeholder="E-post" />
                    </div>
                    <input type="submit" value="Bli en Bazeater" className="login_sbmit"  data-dismiss="modal" />
                  </ResetPasswordForm>
                </div>
                <div className="modal-footer">
                </div>
              </div>
              </div>
            </div>
    );
  }
}

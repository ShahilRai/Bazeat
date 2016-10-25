import React from 'react';
import DocumentTitle from 'react-document-title';

import { ResetPasswordForm } from 'react-stormpath';

export default class ResetPasswordPage extends React.Component {

  render() {
    return (
        <div className="col-lg-4 margin_auto mtop30" id="" >
         <form  className="login_form reset_form">
            <div className="form-group">
              <input type="password" className="form-control" id="password" name="password" placeholder="Password" required={ true } />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" id="confirmpassword" name="confirmpassword" placeholder="Confirm Password" required={ true } />
            </div>
            <input type="submit" value="Bli en Bazeater" className="login_sbmit" />
          </form>
        </div>
    );
  }
}

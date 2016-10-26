import React from 'react';
import DocumentTitle from 'react-document-title';

import { ResetPasswordForm } from 'react-stormpath';

export default class ResetPasswordPage extends React.Component {

  render() {
    var spToken = this.props.location.query.sptoken;
    return (
      <div className="col-lg-4 margin_auto mtop30" id="" >
        <form id="resetPasswordForm" method="post" action="/passwordReset" novalidate="novalidate"  className="login_form reset_form">
          <div class="form-group">
            <label for="password" path="password">Password</label>
            <input type="password" path="password" className="form-control" id="password" name="password" placeholder="Password" required={ true } />
          </div>
          <div class="form-group">
            <label for="confirmedPassword" path="confirmedPassword">Password (confirm)</label>
            <input type="password" className="form-control" id="confirmedPassword" name="confirmedPassword" placeholder="Confirm Password" required={ true } />
          </div>
          <input path="sptoken" type="hidden" id="sptoken" name="sptoken" value={spToken} />
          <input name="csrfToken" type="hidden" value="" />
          <input name="hpvalue" type="hidden" value="" />
          <input type="submit" value="Bli en Bazeater" className="login_sbmit" />
        </form>
      </div>
    );
  }
}

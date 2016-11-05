import React from 'react';
import DocumentTitle from 'react-document-title';

import { ResetPasswordForm } from 'react-stormpath';

export default class ResetPasswordPage extends React.Component {

  onFormSubmit(e, next) {
    var data = e.data;
    data.username = data.username.toLowerCase();
    next(null, data);
  }

  render() {
    var spToken = this.props.location.query.sptoken;
    return (
      <div className="col-lg-4 margin_auto mtop30" id="" >
        <form id="resetPasswordForm" method="get" action="/passwordReset" onSubmit={this.onFormSubmit.bind(this)} novalidate="novalidate"  className="login_form reset_form">
          <div className="form-group">
            <label htmlFor="password" path="password">Password</label>
            <input type="password" path="password" className="form-control" id="password" name="password" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmedPassword" path="confirmedPassword">Password (confirm)</label>
            <input type="password" className="form-control" id="confirmedPassword" name="confirmedPassword" />
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

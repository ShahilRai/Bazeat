import React from 'react';
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

export default class AdminLoginModal extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  emailChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  passwordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  loginMessage(isFail,msg) {
    if(isFail){
      this.refs.container.error(msg);
    }
  }

  submit(e){
    e.preventDefault()
    var self = this

    var data = {
      email: this.state.email,
      password: this.state.password
    }

    $.ajax({
      type: 'POST',
      url: '/api/admin/authenticate/login',
      data: data
    })
    .done(function(data) {
      self.context.router.push('/admin-dashboard');
    })
    .fail(function(xhr) {
      self.loginMessage(true, xhr.responseJSON.message)
    });
  }

  render() {
    return (
      <div className="modal-dialog">
      <ToastContainer ref="container" toastMessageFactory={ToastMessageFactory} className="toast-top-right" />
        <div className="well">
          <div className="modal-header">
            <a href="javascript:void(0)" className="login_logo">
              <img src={require('../../../images/login_logo.png')} />
            </a>
            <h4 className="modal-title">LOG IN</h4>
          </div>
          <div className="modal-body">
            <form onSubmit={this.submit.bind(this)} className="login_modal">
              <div className="form-group">
                <input type="email" className="form-control" placeholder="E-mail"  name="login" onChange={this.emailChange.bind(this)} required/>
                <i className="fa fa-envelope-o" aria-hidden="true"></i>
              </div>
              <div className="form-group">
                <input type="password" className="form-control " name="password" placeholder="******" onChange={this.passwordChange.bind(this)} required/>
                <i className="fa fa-lock" aria-hidden="true"></i>
              </div>
              <input type="submit" value="Log in" className="login_sbmit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}


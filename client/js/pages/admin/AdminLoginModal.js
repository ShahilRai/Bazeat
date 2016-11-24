import React from 'react';

export default class AdminLoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  clearForm(){
    this.setState({
      name: "",
      email: "",
      comment: ""
    });
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
      this.clearForm.bind(this);
    })
    .fail(function(jqXhr) {
      console.log('failed to register');
    });
  }

  render() {
    return (
      <div className="modal-dialog">
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
                <input type="email" className="form-control" placeholder="E-mail"  name="login" onChange={this.emailChange.bind(this)} value={this.state.email}/>
                <i className="fa fa-envelope-o" aria-hidden="true"></i>
              </div>
              <div className="form-group">
                <input type="password" className="form-control " name="password" placeholder="******" onChange={this.passwordChange.bind(this)} value={this.state.password}/>
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


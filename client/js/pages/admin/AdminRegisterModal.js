import React from 'react';
export default class AdminRegisterModal extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
      this.state = {
      full_name: "",
      email:"",
      password:"",
      registered: false,
      ErrorMessage:""
    };
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  SubmitAfterValidate(e) {
    if(this.validateFormField()){
      this.submit(e)
    }
  }

  validateFormField(){
    var valid = true
    var password = this.refs.pwd.value
    var full_name = this.refs.name.value
    var email = this.refs.email.value
    if (full_name == "") {
      valid = false
      this.setState({
       ErrorMessage: <span className="text-center"><p>Please fill the full name</p></span>
      })
    } else if (email == "") {
        valid = false
        this.setState({
        ErrorMessage: <span className="text-center"><p>Please fill the email</p></span>
        })
    }else if (password == "") {
      valid = false
      this.setState({
       ErrorMessage: <span className="text-center"><p>Please fill the password</p></span>
      })
    }else{
    if (password.length < 8){
      valid = false
      this.setState({
       ErrorMessage: <span className="text-center"><p>Password must be at least 8 characters long.</p></span>
     })
    }else if (password.search(/\d/) == -1){
      valid = false
      this.setState({
       ErrorMessage: <span className="text-center"><p>Password must contain one digit.</p></span>
     })
    }else if (password.search(/^(?=.*[a-z]).+$/) == -1) {
      valid = false
      this.setState({
      ErrorMessage: <span className="text-center"><p>Password must contain one lower case character.</p></span>
    })
    }else if (password.search(/^(?=.*[A-Z]).+$/) == -1) {
       valid = false
       this.setState({
       ErrorMessage: <span className="text-center"><p>Password must contain one upper case character.</p></span>
     })
    }
  }
    return valid
  }

  submit(e){
    e.preventDefault()
    var self = this
    $.ajax({
      type: 'POST',
      url: '/api/admin/authenticate/register',
      data: self.state
      }).done(function(data) {
          self.setState({
            registered : true
          })
        self.context.router.push('/admin-dashboard');
      }).fail(function() {
          console.log('failed to register');
    });
  }

  render() {
    var error = "";
    if(this.state.ErrorMessage){
     error = <span className="text-center"><p>{this.state.ErrorMessage}</p></span>
    }
    return (
      <div className="modal-dialog">
        <div className="well">
          <div className="modal-header">
            <a href="javascript:void(0)" className="login_logo">
              <img src={require('../../../images/login_logo.png')} />
            </a>
            <h4 className="modal-title">REGISTER</h4>
          </div>
          <div className="modal-body">
            {error}
            <form  className="login_form">
              <div className="form-group">
                <input type="text" ref="name" className="form-control" id="full_name" name="full_name" placeholder="full name" onChange={this.handleChange.bind(this)} required="true"/>
              </div>
              <div className="form-group">
                <input type="email" ref="email" className="form-control" id="email" name="email" placeholder="email"  onChange={this.handleChange.bind(this)} required="true"/>
              </div>
              <div className="form-group">
                <input type="password" ref="pwd"className="form-control" id="password" name="password" placeholder="password"  onChange={this.handleChange.bind(this)} required="true" />
              </div>
              <input type="button" value="Register" onClick={this.SubmitAfterValidate.bind(this)} className="login_sbmit form-group" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

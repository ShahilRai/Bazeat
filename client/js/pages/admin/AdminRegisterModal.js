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
      registered: false
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
    alert("sdddddddsad");
      var valid = true
      var password = this.refs.pwd.value
       console.log("......................password")
      console.log(password)
    if (password.length < 8) {
      valid = false
      alert('Password must be at least 8 characters long.');
    }
    if (password.search(/\d/) == -1){
      valid = false
       alert('Password must contain one digit.');
    }
    if (password.search(/^(?=.*[a-z]).+$/) == -1) {
      valid = false
      alert('Password must contain one lower case character.');
    }
    if (password.search(/^(?=.*[A-Z]).+$/) == -1) {
       valid = false
       alert('Password must contain one upper case character.');
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
    var successMessage = "";

    if(this.state.registered){
     successMessage = <span className="text-center"><p>You have Successfully Registered</p></span>
    }else{
     successMessage = <span/>
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
            <form onSubmit={this.SubmitAfterValidate.bind(this)} className="login_form">
              <div className="form-group">
                <input type="text" className="form-control" id="full_name" name="full_name" placeholder="full name" onChange={this.handleChange.bind(this)} required="true"/>
              </div>
              <div className="form-group">
                <input type="email" className="form-control" id="email" name="email" placeholder="email"  onChange={this.handleChange.bind(this)} required="true"/>
              </div>
              <div className="form-group">
                <input type="password" ref="pwd"className="form-control" id="password" name="password" placeholder="password"  onChange={this.handleChange.bind(this)} required="true" />
              </div>
              <input type="submit" value="Register" className="login_sbmit form-group" />
              {successMessage}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

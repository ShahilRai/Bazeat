import React from 'react';
import toastr from 'toastr';
import cookie from 'react-cookie';
import { LoginForm, SocialLoginLink } from 'react-stormpath';
let id;

export default class LoginModal extends React.Component {

   static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      loader: "collapse"
    }
  }

  onFormSubmit(e, next) {
    this.setState({loader: ""})
    var data = e.data;
    data.username = data.username.toLowerCase();
    next(null, data);
  }

  onFormSubmitSuccess(e, next) {
    this.setState({loader: "collapse"})
    toastr.success('Successfully sign in');
    $("#login_modal").modal('hide')
    $(".modal-backdrop.in").remove()
    $(".modal-open").removeClass("modal-open")
    next();
    id = cookie.load('cart_cuid') ? cookie.load('cart_cuid') : ''
    if(id){
      this.context.router.push('/checkout');
    }
    else{
      this.context.router.push('/profile');
    }
  }

  onFormSubmitError(e, next) {
    this.setState({loader: "collapse"})
    next();
  }

  render() {
    return (
     	 <div className="modal login_modal" id="login_modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">X</span>
              </button>
              <a href="javascript:void(0)" className="login_logo">
                <img src={require('../../../images/login_logo.png')} />
              </a>
              <span id="login_loader" className={"pull-right mtop20 " + this.state.loader}>
                <img src={require('../../../images/rolling.gif')}  alt="loading..." width="20"/>
              </span>
              <h4 className="modal-title" id="myModalLabel">LOG IN</h4>
              <h5><span>or </span><a href="#login_modal" data-dismiss="modal" data-toggle="modal" data-target="#register_modal">Register</a></h5>
            </div>
            <div className="modal-body">
              <p>Alle skal ha mulighet å spise mat laget av hender</p>
              <LoginForm onSubmit={this.onFormSubmit.bind(this)} onSubmitSuccess={this.onFormSubmitSuccess.bind(this)} onSubmitError={this.onFormSubmitError.bind(this)} className="login_form">

                <div className="form-group">
                  <input type="text" className="form-control" placeholder="User name"  name="login"/>
                  <i className="fa fa-envelope-o" aria-hidden="true"></i>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control passwrd_txt" name="password" placeholder="******" />
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </div>
                <div className="checkbox prod_checkbox login_chkbox">
                </div>
                <input type="submit" value="Log in" className="login_sbmit" />
                <p className="alert alert-danger" data-spIf="form.error">
                  <span data-spBind="form.errorMessage" />
                </p>
                <span className="error_txt"><a href="#login_modal" data-dismiss="modal" data-toggle="modal" data-target="#forgot_modal">Have you forgotten your password?</a></span>
                <span className="or_txt">or</span>

              </LoginForm>
            </div>
            <div className="modal-footer">
            </div>
          </div>
          </div>
        </div>
    );
  }
}


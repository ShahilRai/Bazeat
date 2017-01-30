import React from 'react';
import SearchInputBox from '../common/SearchInputBox';
import Menu from './Menu';
import Logo from './Logo';
import NearMeIcon from './NearMeIcon';
import axios from 'axios';
let email;
let check_email = true;

export default class Header extends React.Component {
  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
  };

  constructor(props, context){
    super(props);
    this.state={
      currentUser_cuid:{},
      _cartList: [],
      allMessages: []
    };
  }

  loadingUser(){
    this.loadCurrentUser(email).then((response) => {
        if(response.data.user) {
          this.setState({
            currentUser_cuid: response.data.user ? response.data.user.cuid : ''
          });
        }
    }).catch((err) => {
        console.log(err);
    });
  }

//load the Current user detail
  loadCurrentUser(email) {
    return axios.get("/api/user?email="+email);
  }


   loadAllMessages(){
      this.getAllMessages(email).then((response) => {
      if(response.data) {
        this.setState({
          allMessages: response.data.conversations
        })
      }
    })
      .catch((err) => {
    console.log(err);
    });
  }

  getAllMessages(emailAddress){
    return axios.get("/api/conversations?email="+emailAddress);
  }

  render() {
    if(this.context.authenticated) {
      email = this.context.user.email
      if(check_email) {
        this.loadingUser()
        this.loadAllMessages()
        check_email = false;
      }
    }
    var headerClass = "header_wrapper";
    if(this.context.router.location.pathname == "/search"){
      headerClass = "header_wrapper border_bottom"
    }
    var userId = this.state.currentUser_cuid ? this.state.currentUser_cuid : ''
    return (
      <div className={headerClass}>
        <div className="container pad_25">
          <div className="row">
            <Logo />
            <SearchInputBox />
            <NearMeIcon />
            <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 pull-right">
              <Menu _cartList = {this.state._cartList}  cuid={userId} allMessages={this.state.allMessages}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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
      allMessages: [],
      all_reviews:[],
      offset: 0,
      producer_info: {},
      user_info:{}
    };
  }

  loadingUser(){
    this.loadCurrentUser(email).then((response) => {
        if(response.data.user) {
          this.setState({
            currentUser_cuid: response.data.user ? response.data.user.cuid : '',
            producer_info: response.data.user.producer_info,
            user_info: response.data.user
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

  loadAllReviews(){
    this.getAllReviews(this.context.user.email,this.state.offset,2).then((response) => {
      if(response.data) {
          this.setState({
            all_reviews : response.data.reviews
          });
      }
    }).catch((err) => {
        console.log(err);
    });
  }

  getAllReviews(email, off_set, per_page ){
     return axios.get("/api/review?email="+email+"&off_set="+off_set+"&per_page="+per_page)
  }

  render() {
    if(this.context.authenticated) {
      email = this.context.user.email
      if(check_email) {
        this.loadingUser()
        this.loadAllMessages()
        this.loadAllReviews()
        check_email = false;
      }
    }
    var headerClass = "header_wrapper";
    if(this.context.router.location.pathname == "/search"){
      headerClass = "header_wrapper border_bottom"
    }
    if(this.context.router.location.pathname == "/checkout"){
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
              <Menu _cartList = {this.state._cartList}  cuid={userId} allMessages={this.state.allMessages} allReviews={this.state.all_reviews} producer_name={this.state.producer_info} user_info={this.state.user_info}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

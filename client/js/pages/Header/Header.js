import React from 'react';
import SearchBox1 from '../common/SearchBox1';
import Menu from './Menu';
import Logo from './Logo';
import NearMeIcon from './NearMeIcon';
import axios from 'axios';

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
      _cartList: []
    };
  }

  componentDidMount(){
    var email=this.context.user ? this.context.user.username : ''
    this.loadCurrentUser(email).then((response) => {
        if(response.data.user) {
          this.setState({
            currentUser_cuid: response.data.user ? response.data.user.cuid : ''
          });
        }
    }).catch((err) => {
        console.log(err);
    });
    this._loadUserCartData(email).then((response) => {
        if(response.data) {
          this.setState({
            _cartList: response.data.cart ? response.data.cart.cartitems : []
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
  //load current user cart's data
  _loadUserCartData(email){
    return axios.get("/api/cart/"+email);
  }

  render() {
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
            <SearchBox1 />
            <NearMeIcon />
            <div className="col-lg-5 pull-right">
              <Menu _cartList = {this.state._cartList}  cuid={userId}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

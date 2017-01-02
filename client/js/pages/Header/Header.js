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
  };

  constructor(props, context){
    super(props);
    this.state={
      currentUser_cuid:{}
    };
  }
  componentDidMount(){
    var email=this.context.user ? this.context.user.username : ''
    this.loadCurrentUser(email).then((response) => {
        if(response.data) {
          this.setState({
            currentUser_cuid: response.data.user.cuid
          });
        }
    }).catch((err) => {
        console.log(err);
    });
  }

//load the Current user detail
  loadCurrentUser(email) {
    return axios.get("/api/user/" + email);
  }

  render() {
    var userId = this.state.currentUser_cuid ? this.state.currentUser_cuid : ''
    return (
      <div className="header_wrapper">
        <div className="container pad_25">
          <div className="row">
            <Logo />
            <SearchBox1 />
            <NearMeIcon />
            <div className="col-lg-5 pull-right">
              <Menu cuid={userId}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

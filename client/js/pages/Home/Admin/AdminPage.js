import React from 'react';
import Adminpanel from './AdminPanel';

export default class AdminPage extends React.Component {
 static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  }
/*constructor(props) {
    super(props);
    this.state = {
      user:{},
      data_loaded: false
    }
}
getUsers() {
  this.loadUserData().then((response) => {
       console.log("response")
       console.log(response.data)
        console.log("response1")
       console.log(response.data.users)
        if(response.data.users) {
          this.setState({
            user: response.data.users,
            data_loaded: true
          });
        }
    }).catch((err) => {
        console.log(err);
    });
    console.log("all..user")
    console.log(this.state.user)
}
loadUserData() {
   return axios.get("/api/admin/users/allusers" , {
    });
}*/
render(){

  return(
    <div>
    <Adminpanel />
   </div>
    );
}
}


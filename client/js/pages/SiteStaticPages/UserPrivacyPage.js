import React from 'react';
import axios from 'axios';
export default class UserPrivacyPage extends React.Component {

  constructor(props){
    super(props);
    this.state={
      user : {}
    }
  }

  componentDidMount(){
    this.loadStaticData().then((response) => {
        if(response.data) {
          this.setState({
            user: response.data
          });
        }
    }).catch((err) => {
        console.log(err);
    });
  }

  loadStaticData() {
    return axios.get("/admin/pages/Privacy")
  }

  render(){
      if(this.state.user){
        return(
          <div>
            <div style= { {padding:' 400px '} }>{this.state.user.page ? this.state.user.page.description : ''}</div>
          </div>
      );
     }else{
      return(
          <div>
            <div>loading...........</div>
          </div>
      );
    }
  }
}

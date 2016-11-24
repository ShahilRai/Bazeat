import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import Banner from './Banner';
import ProducerDetails from './ProducerDetails';
export default class ProducerPage extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
   }

  constructor(props, context) {
    super(props, context);
    this.state = {
      user : {}
    };
  }

  componentDidMount() {
    var userEmail = this.context.user.email;
    this.loadUserData(userEmail).then((response) => {
      if(response.data.producer) {
        this.setState({
          user: response.data.producer,
        });
      }
    })
    .catch((err) => {
    console.log(err);
    });
  }

  loadUserData(emailAddress) {
    return axios.get("/api/user_products/"+emailAddress);
  }

  render(){
    return(
      <div className="page_wrapper">
        <Banner name="review_banner.jpg"/>
        <ProducerDetails userInfo = {this.state.user}/>
      </div>
    )
  }
}

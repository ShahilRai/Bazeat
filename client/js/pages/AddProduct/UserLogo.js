import React from 'react';
import { Link } from 'react-router';
export default class UserLogo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
    return(
      <Link to={"/user/"+this.props.current_cuid}><img src={this.props.url} height={this.props.height? this.props.height:''} width={this.props.width? this.props.width:''} className={this.props.p_class? this.props.p_class:''} /></Link>
    );
  }
}







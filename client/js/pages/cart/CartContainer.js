import React from 'react';
import { browserHistory } from 'react-router'
export default class CartContainer extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {      
    }
  }

  render(){
    return(
    );
  }
}

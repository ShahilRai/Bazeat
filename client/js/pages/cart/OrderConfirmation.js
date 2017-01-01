import React from 'react';

export default class OrderConfirmation extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

   constructor() {
      super();
      this.state = {
      }
   }

  render() {
    return (
      <div>
        OrderConfirmation
        <button type="button" className="btn btn-default continue_btn" onClick={this.props.nextStep}>Continue</button>
      </div>
    );
  }
}


import React from 'react';
import ShoppingBag from './ShoppingBag'
import DeliveryType from './DeliveryType'
import ProductPickupDate from './ProductPickupDate'
import OrderConfirmation from './OrderConfirmation'
import ShoppingBag from './ShoppingBag'
export default class CheckoutContainer extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
    step: React.PropTypes.Number
  };

  constructor() {
    super();
    this.state = {
      step = 1
    }
  }

  nextStep() {
    this.setState({
      step : this.state.step + 1
    })
  }

  checkoutStep() {
    switch (this.state.step) {
      case 1:
        return <ShoppingBag nextStep={this.nextStep}/>
      case 2:
        return <DeliveryType nextStep={this.nextStep}/>
      case 3:
        return <ProductPickupDate nextStep={this.nextStep}/>
      case 4:  
        return <OrderConfirmation nextStep={this.nextStep}/>
      case 5:          
        return <ShoppingBag nextStep={this.nextStep}/>
    }
  }

  render() {
    return (
      <div>
        {this.checkoutStep}
      <div>
    );
  }
}


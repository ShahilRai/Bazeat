import React from 'react';
import ShoppingBag from './ShoppingBag'
import DeliveryType from './DeliveryType'
import ProductPickupDate from './ProductPickupDate'
import OrderConfirmation from './OrderConfirmation'
export default class CheckoutContainer extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      step: 1
    }
    this.nextStep = this.nextStep.bind(this)
  }

  nextStep() {
    var self = this
    this.setState({
      step : self.state.step + 1
    })
  }

  checkoutStep() {
    switch (this.state.step) {
      case 1:
        return <ShoppingBag nextStep={this.nextStep} step={this.state.step}/>
      case 2:
        return <DeliveryType nextStep={this.nextStep} step={this.state.step}/>
      case 3:
        return <ProductPickupDate nextStep={this.nextStep} step={this.state.step}/>
      case 4:
        return <OrderConfirmation nextStep={this.nextStep} step={this.state.step}/>
      case 5:
        return <Payment nextStep={this.nextStep} step={this.state.step}/>
    }
  }

  render() {
    return (
      <div className="full_width">
        {this.checkoutStep()}
      </div>
    );
  }
}

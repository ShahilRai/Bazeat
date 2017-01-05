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

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      selected_method:''
    }
    this.nextStep = this.nextStep.bind(this)
    this.methodChange =this.methodChange.bind(this)
  }

  nextStep() {
    var self = this
    this.setState({
      step : self.state.step + 1
    })
  }

  methodChange(selected){
    this.setState({
      selected_method: selected
    });
  }

  checkoutStep() {
    switch (this.state.step) {
      case 1:
        return <ShoppingBag nextStep={this.nextStep} step={this.state.step}/>
      case 2:
        return <DeliveryType nextStep={this.nextStep} step={this.state.step} deliveryMethodChange={this.methodChange}/>
      case 3:
        return <ProductPickupDate nextStep={this.nextStep} step={this.state.step} method={this.state.selected_method}/>
      case 4:  
        return <OrderConfirmation nextStep={this.nextStep} step={this.state.step}/>
      case 5:          
        return <Payment nextStep={this.nextStep} step={this.state.step}/>
    }
  }

  render() {
    return (
      <div>
        {this.checkoutStep()}
      </div>
    );
  }
}


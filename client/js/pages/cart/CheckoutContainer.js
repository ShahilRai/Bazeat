import React from 'react';
import ShoppingBag from './ShoppingBag'
import DeliveryType from './DeliveryType'
import ProductPickupDate from './ProductPickupDate'
import OrderConfirmation from './OrderConfirmation'
import Payment from './Payment';
export default class CheckoutContainer extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      cart_cuid : '',
      step: 1,
      selected_method:'',
      orderDetail : {},
      alternateAddressChoosen : ''
    }
    this.nextStep = this.nextStep.bind(this)
    this.methodChange =this.methodChange.bind(this)
  }

  nextStep(cart_cuid, orderDetailResponse, alternateAddress) {
    var self = this
    this.setState({
      step : self.state.step + 1,
      cartCuid : cart_cuid,
      orderDetail : orderDetailResponse,
      alternateAddressChoosen : alternateAddress
    })
  }

  methodChange(selected){
    this.setState({
      selected_method: selected,
      step : 3
    });
  }

  checkoutStep() {
    switch (this.state.step) {
      case 1:
        return <ShoppingBag nextStep={this.nextStep} step={this.state.step}/>
      case 2:
        return <DeliveryType nextStep={this.nextStep} step={this.state.step} deliveryMethodChange={this.methodChange} cartCuid={this.state.cartCuid}/>
      case 3:
        return <ProductPickupDate nextStep={this.nextStep} step={this.state.step} method={this.state.selected_method} cartCuid={this.state.cartCuid}/>
      case 4:
        return <OrderConfirmation nextStep={this.nextStep} step={this.state.step} method={this.state.selected_method} orderDetail={this.state.orderDetail} addressChange={this.state.alternateAddressChoosen}/>
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

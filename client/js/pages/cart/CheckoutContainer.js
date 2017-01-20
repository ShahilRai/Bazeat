import React from 'react';
import ShoppingBag from './ShoppingBag'
import DeliveryType from './DeliveryType'
import ProductPickupDate from './ProductPickupDate'
import OrderConfirmation from './OrderConfirmation'
import Payment from './Payment';
let orderDetailForPayment ;
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
      selected_method : '',
      selected_price : '',
      orderDetail : {},
      cart_detail : {},
      alternateAddressChoosen : ''
    }
    this.nextStep = this.nextStep.bind(this)
    this.methodChange =this.methodChange.bind(this)
  }

  nextStep(cart_detail, orderDetailResponse) {
    var self = this
    this.setState({
      step : self.state.step + 1,
      orderDetail : orderDetailResponse,
      cart_detail : cart_detail
    })
    orderDetailForPayment = this.state.orderDetail
  }

  methodChange(selected, selectedPrice){
    this.setState({
      selected_method: selected,
      step : 3,
      selected_price : selectedPrice
    });
  }

  checkoutStep() {
    switch (this.state.step) {
      case 1:
        return <ShoppingBag nextStep={this.nextStep} step={this.state.step}/>
      case 2:
        return <DeliveryType nextStep={this.nextStep} step={this.state.step} deliveryMethodChange={this.methodChange} cart_detail={this.state.cart_detail}/>
      case 3:
        return <ProductPickupDate nextStep={this.nextStep} step={this.state.step} method={this.state.selected_method} cart_detail={this.state.cart_detail} _price={this.state.selected_price}/>
      case 4:
        return <OrderConfirmation nextStep={this.nextStep} step={this.state.step} method={this.state.selected_method} orderDetail={this.state.orderDetail}/>
      case 5:
        return <Payment nextStep={this.nextStep} step={this.state.step} method={this.state.selected_method} orderDetail={orderDetailForPayment} />
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

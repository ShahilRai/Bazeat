import React from 'react';
import axios from 'axios';
import toastr from 'toastr';
import Loading from 'react-loading';
import CheckoutStep from './CheckoutStep';
let item = [];
let productArray = [];
let selectedPrice ;
let sendemat_shipping_detail = null;
let sendematSelected = null;
export default class DeliveryType extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      item : [],
      shipmentDetails : [],
      sendematSelectedState : ''
    }
  }

  deliveryAlternateSelected(e){
    selectedPrice = e.currentTarget.value
  }

  shippingAlternateDetail(){
    this.setState({
      sendematSelectedState : 'waiting'
    })
    var cart_cuid = this.props.cart_detail.cuid
    var email = this.context.user.email;
    if(this.props.cart_detail.total_weight<10){
      this.loadShippingDetail(email, cart_cuid).then((response) => {
      if(response.data.res_body) {
        sendematSelected = 'sendemat';
        this.setState({
          shipmentDetails : response.data.res_body ? response.data.res_body.Product : 'noelement'
        })
      }
      }).catch((err) => {
        console.log(err);
      });
    }
    else{
      toastr.error('cart weight is more than 10 kg so choose delivery method hentemat or budmat');
    }
  }

  loadShippingDetail(email, cart_cuid){
     return axios.put("/api/shipping_price?email="+email+"&cart_cuid="+cart_cuid);
  }

  shipping_alternate_selected(){
    if(selectedPrice)
    {
      this.props.deliveryMethodChange('Sendemat', selectedPrice)
    }
    else{
      alert("please select delivery alternative")
    }
  }

  goToBackPage(){
    this.props.backStep()
  }

  render() {
    if(sendematSelected == 'sendemat'){
      sendemat_shipping_detail = <div className="table-main mtop40">
          <div className="table-wrapper">
            <table className="table table-striped">
              <thead>
               <tr>
                <th className="text-left">Delivery alternative</th>
                <th className="text-left ">Info</th>
                <th className="">Price</th>
                </tr>
              </thead>
              <tbody>
                {this.state.shipmentDetails.map((product, i)=>
                <tr key={i}>
                  <td className="text-left">
                      <span className="custom_radio_edit del_alter hot_food">
                        <input id={i} type="radio" name="c_detail" value={product.Price.PackagePriceWithoutAdditionalServices.AmountWithVAT} onChange={this.deliveryAlternateSelected}/>
                        <label htmlFor={i}>{product.GuiInformation.DisplayName}</label>
                      </span>
                  </td>
                  <td className="text-left">
                    {product.GuiInformation.DescriptionText}
                  </td>
                  <td>
                    {product.Price.PackagePriceWithoutAdditionalServices.AmountWithVAT}
                  </td>
                </tr>
                )}
              </tbody>
            </table>
               <button type="button" className="btn btn-default continue_btn" onClick={this.shipping_alternate_selected.bind(this)} ref="myRef">Continue</button>
          </div>
        </div>
    }
    else if(this.state.sendematSelectedState == 'waiting' && (this.props.cart_detail.total_weight<10)){
        sendemat_shipping_detail = <div className="loading_spinner">
        <Loading type='spokes' color='#ff0000'/>
        </div>
    }
    return (
      <div className="full_width_container">
        <div className="full_width ptop0">
          <div className="chkout_pg chkoutstep2">
            <h3>Delivery method</h3>
            <h4>Chose the desired delivery method for your order</h4>
            <CheckoutStep step={this.props.step}/>
            <div className="delvery_steps">
              <div className="del_step1">
                <a href="javascript:void(0)" onClick={() =>{this.props.deliveryMethodChange('hentemat')}}><img src="images/hentemat.png" /></a>
                <h4>Hentemat</h4>
                <span>kr. 0,-</span>
                <p>You pick up the goods at the producer</p>
              </div>
              <div className="del_step1 ">
                <a className="dilvery_method_sendemat"  href="javascript:void(0)" onClick={this.shippingAlternateDetail.bind(this)}>&nbsp;</a>
                <h4>Sendemat</h4>
                <span>From kr. 99,-</span>
                <p>Bring delivers to you with a range of deliverey methods</p>
              </div>
              <div className="del_step1">
                <a href="javascript:void(0)" onClick={() =>{this.props.deliveryMethodChange('Budmat')}}><img src="images/budmat.png" /></a>
                <h4>Budmat</h4>
                <span>From kr. 99,-</span>
                <p>The producer delivers to your desired location</p>
              </div>
            </div>
            <div className="back_fwd_btn">
               <button type="button" className="btn btn-default continue_btn" onClick={ this.goToBackPage.bind(this)}>Back</button>
            </div>
          </div>
          <div className="table-main mtop40">
          {sendemat_shipping_detail}
          </div>
        </div>
      </div>
    );
  }
}

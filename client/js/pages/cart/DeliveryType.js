import React from 'react';
import CheckoutStep from './CheckoutStep';

export default class DeliveryType extends React.Component {

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
              <div className="del_step1">
                <a href="javascript:void(0)" onClick={() =>{this.props.deliveryMethodChange('Sendemat')}}><img src="images/del_car.png" /></a>
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
          </div>
        </div>
      </div>
    );
  }
}

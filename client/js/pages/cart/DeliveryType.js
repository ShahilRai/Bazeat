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
      delivery_method:"",
    }
  }

  deliveryMethodChange(hkj){
  alert(hkj)
    this.setState({
      delivery_method: hkj
    });
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
                <a href="javascript:void(0)"><img src="images/hentemat.png" onClick={this.deliveryMethodChange}/></a>
                <h4>Hentemat</h4>
                <span>kr. 0,-</span>
                <p>You pick up the goods at the producer</p>
              </div>
              <div className="del_step1">
                <a href="javascript:void(0)"><img src="images/del_car.png" onClick={this.deliveryMethodChange}/></a>
                <h4>Sendemat</h4>
                <span>From kr. 99,-</span>
                <p>Bring delivers to you with a range of deliverey methods</p>
              </div>
              <div className="del_step1">
                <a href="javascript:void(0)"><img src="images/hentemat.png" onClick={this.deliveryMethodChange}/></a>
                <h4>Budmat</h4>
                <span>From kr. 99,-</span>
                <p>The producer delivers to your desired location</p>
              </div>
            </div>
            <div className="delivery_details">
              <div className="del_det_head">
                <span className="del_alter">Delivery alternative</span>
                <span className="del_info">Info</span>
                <span className="del_date">Delivery date</span>
                <span className="del_price">Price</span>
              </div>
              <div className="del_info_row grey_bg">
                <span className="custom_radio_edit del_alter hot_food">
                  <input id="detail6" type="radio" name="c_detail" value="detail1"/>
                  <label for="detail6">Hjem p&aring; kvelden, 17-21</label>
                </span>
                <span className="del_info">
                  <p className="pbot0">
                    Pakken leveres hjem til deg, sj&aring;f&oslash;ren<br/>ringer 30-60 min. f&oslash;r ankomst
                  </p>
                </span>
                <span className="del_date text-center">
                  <p className="pbot0">
                    2016-12-12
                  </p>
                </span>
                <span className="del_price text-center">
                  <p className="pbot0">
                    134,00
                  </p>
                </span>
              </div>
              <div className="del_info_row">
                <span className="custom_radio_edit del_alter hot_food">
                  <input id="detail7" type="radio" name="c_detail" value="detail1"/>
                  <label for="detail7">P&aring; posten, 08-16</label>
                </span>
                <span className="del_info">
                  <p className="pbot0">
                    Majorstuen postkontor. &Aring;pningstider Man - Fre: 0800-1800, L&oslash;r: 1000-1500
                  </p>
                </span>
                <span className="del_date text-center">
                  <p className="pbot0">
                    2016-12-12
                  </p>
                </span>
                <span className="del_price text-center">
                  <p className="pbot0">
                    134,00
                  </p>
                </span>
              </div>
            </div>
            <div className="chkout_step1btns">
              <button type="button" className="btn btn-default continue_btn" onClick={this.props.nextStep}>Continue</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

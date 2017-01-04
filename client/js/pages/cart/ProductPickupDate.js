import React from 'react';
import ProductStep from './ProductStep';

export default class ProductPickupDate extends React.Component {

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
      <div className="full_width ptop0">
        <div className="chkout_pg chkoutstep3">
          <h3>Pickup date</h3>
          <h4>When can we expect to see you?</h4>
          <ProductStep step={this.props.step}/>
          <div className="pick_update">
            <div className="pickup_row1">
              <span className="pickup_day">Monday - December 11</span>
              <span className="chkout_pickup_time">10:00 - 17:00</span>
            </div>
            <div className="pickup_row1">
              <span className="pickup_day green_txt">Tuesday - December 12</span>
              <span className="chkout_pickup_time green_txt">10:00 - 17:00</span>
            </div>
            <div className="pickup_row1">
              <span className="pickup_day">Wednesday - December 13</span>
              <span className="chkout_pickup_time">10:00 - 17:00</span>
            </div>
            <div className="pickup_row1">
              <span className="pickup_day">Thursday - December 14</span>
              <span className="chkout_pickup_time">10:00 - 17:00</span>
            </div>
            <div className="pickup_row1">
              <span className="pickup_day">Friday - December 15</span>
              <span className="chkout_pickup_time">10:00 - 17:00</span>
            </div>
            <div className="pickup_row1">
              <span className="pickup_day">Saturday - December 16</span>
              <span className="chkout_pickup_time">10:00 - 17:00</span>
            </div>
            <div className="chkout_step1btns">
            <button type="button" className="btn btn-default more_days_btn">Show more days</button>
            <button type="button" className="btn btn-default continue_btn" onClick={this.props.nextStep}>Continue</button>
            </div>
          </div
        </div>
      </div>
    );
  }
}


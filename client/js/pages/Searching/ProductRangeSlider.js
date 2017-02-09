import React from 'react';
import $ from 'jquery';
import ionRangeSlider from 'ion-rangeslider';
import "ion-rangeslider/css/ion.rangeSlider.skinHTML5.css";
import "ion-rangeslider/css/ion.rangeSlider.css";

export default class ProductRangeSlider extends React.Component {

  componentDidMount(){
    $("#example_id").ionRangeSlider({
      min: 0, max: 4000, from: 0, to:4000,
      type: "double", step: 250, grid: true, onChange: this.props.priceRangeChange
    });
  }

  render() {
    var value= this.props.value
    return (
      <div className="range_slider">
        <div data-role="main" className="ui-content">
          <form method="post" action="">
            <div data-role="rangeslider">
              <label className="range_label" htmlFor="price-min">Price</label>
              <div className="range_slider_col">
                <input type="text" id="example_id" name="example_name" value="" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

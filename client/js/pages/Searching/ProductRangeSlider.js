import React from 'react';
import RangeSlider from 'react-dual-rangeslider';

export default class ProductRangeSlider extends React.Component {

  render() {
    return (
      <div className="lt_prod_sec">
        <RangeSlider
          min={0}
          max={4000}
          minRange={10}
          onChange={this.props.priceRangeChange}
          step={250}/>
      </div>
    );
  }
}

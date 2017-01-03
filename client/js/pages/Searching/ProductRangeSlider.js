import React from 'react';
import { RangeSlider } from 'reactrangeslider';

export default class ProductRangeSlider extends React.Component {

  render() {
    var value= this.props.value
    return (
      <div className="range_slider">
        <div data-role="main" className="ui-content">
          <form method="post" action="">
            <div data-role="rangeslider">
              <label htmlFor="price-min">Price:</label>
              <div className="range_slider_col">
                <RangeSlider
                  defaultValue={ value }
                  min={ 0 }
                  max={ 4000 }
                  onChange={this.props.priceRangeChange}
                  step={ 250 }/>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

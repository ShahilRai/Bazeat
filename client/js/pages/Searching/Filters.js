import React from 'react';
import ProductRangeSlider from './ProductRangeSlider';
import CategoryDropDown from './CategoryDropDown';
import Otherfilters from './Otherfilters';

export default class Filters extends React.Component {

  render() {
    return (
      <div className="container pad_lf151">
        <ProductRangeSlider value={this.props.value} priceRangeChange={this.props.priceRangeChange}/>
        <CategoryDropDown searchCategory={this.props.searchCategory} handleChange={this.props.handleChange} handleCheckBoxChange={this.props.handleCheckBoxChange}/>
        <Otherfilters />
      </div>
    );
  }
}

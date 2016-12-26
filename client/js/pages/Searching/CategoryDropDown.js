import React from 'react';
import InputRange from 'react-input-range';

export default class CategoryDropDown extends React.Component {

  render() {
    return (
      <div className="rt_prod_sec">
        <div className="form-group custom_select">
          <select className="form-control srch_categ" name="product_category" ref="product_category" id="product_category" name="product_category" onChange={this.props.handleChange}>
            <option>Category</option>
            {
              this.props.searchCategory.map((product_category_list, index) => {
                return <option key={ index } id={product_category_list.id} value={product_category_list.id}>{product_category_list.name}</option>
              })
            }
          </select>
          <span className="select_bg"><small className="select__arrow"></small></span>
        </div>
      </div>
    );
  }
}

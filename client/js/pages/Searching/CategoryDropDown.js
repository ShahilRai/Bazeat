import React from 'react';

export default class CategoryDropDown extends React.Component {

  render() {
    return (
      <div className="prod_category">
        <label htmlFor="price-min">Product:</label>
        <dl className="dropdown prod_dropdown">
          <div className="mutliSelect">
            <select className="form-control srch_categ" name="product_category" ref="product_category" id="product_category" onChange={this.props.handleChange}>
            {
              this.props.searchCategory.map((product_category_list, index) => {
                return <option key={ index } id={product_category_list.id} value={product_category_list.id}>{product_category_list.name}</option>
              })
            }
            </select>
            <span className="select_bg"><small className="select__arrow"></small></span>
          </div>
        </dl>
      </div>
    );
  }
}

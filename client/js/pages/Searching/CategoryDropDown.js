import React from 'react';

export default class CategoryDropDown extends React.Component {

  render() {
    return (
      <div className="prod_category">
        <label htmlFor="price-min">Product:</label>
        <dl className="dropdown">
          <dt>
            <a href="#">
              <span className="hida">Select</span>
              <p className="multiSel text_overflow"></p>
            </a>
          </dt>
          <dd>
            <div className="mutliSelect">
              <ul>
                {this.props.searchCategory.map((product_category_list, index) => {
                  return (
                    <li>
                      <div className="checkbox prod_checkbox">
                        <input key={ index } id={product_category_list.id} name={product_category_list.name} value={product_category_list.id} type="checkbox" onChange={this.props.handleCheckBoxChange}/>
                        <label htmlFor={product_category_list.id}>
                          {product_category_list.name}
                        </label>
                      </div>
                    </li>
                  )
                })
                }
              </ul>
            </div>
          </dd>
        </dl>
      </div>
    );
  }
}

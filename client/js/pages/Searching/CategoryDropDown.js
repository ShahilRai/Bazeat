import React from 'react';
import ToggleDisplay from 'react-toggle-display';

export default class CategoryDropDown extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      showDropDown: false
    }
    this.displayDropdown = this.displayDropdown.bind(this)
  }

  displayDropdown(){
    this.setState({
      showDropDown: !this.state.showDropDown
    })
  }

  render() {
    return (
      <div className="prod_category">
        <label htmlFor="price-min">Product:</label>
        <dl className="dropdown">
          <dt>
            <a href="javascript:void(0)" onClick={this.displayDropdown}>
              <span className="hida">Select</span>
              <p className="multiSel text_overflow"></p>
            </a>
          </dt>
          <ToggleDisplay show={this.state.showDropDown}>
            <dd>
              <div className="mutliSelect">
                <ul>
                  {this.props.searchCategory.map((product_category_list, index) => {
                    return (
                      <li key={index}>
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
          </ToggleDisplay>
        </dl>
      </div>
    );
  }
}

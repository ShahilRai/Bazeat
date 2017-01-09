import React from 'react';

export default class AppliedFilters extends React.Component {

  render() {
    return (
      <div className="products_filter">
        <div className="container pad_lf151">
          <div className="inner_filters">
            <h3>Apply Filters :</h3>
              <ul>
                {this.props.categoryName.map((categNames, index) => {
                  return (
                    <li>
                      <a href="javascript:void(0)">{categNames}<span onClick={this.props.handlecategoryFilter} className={this.props.categoryIds[index]}>X</span></a>
                    </li>
                  )
                })
                }
                <li>
                  <a href="javascript:void(0)">Clear all<span onClick={this.props.clearFilters}>X</span></a>
                </li>
              </ul>
          </div>
        </div>
      </div>
    );
  }
}

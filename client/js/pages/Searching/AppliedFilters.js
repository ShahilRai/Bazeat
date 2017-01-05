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
                      <a href="#">{categNames}<span>X</span></a>
                    </li>
                  )
                })
                }
                <li>
                  <a href="#">Clear all<span>X</span></a>
                </li>
              </ul>
          </div>
        </div>
      </div>
    );
  }
}

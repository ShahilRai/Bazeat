import React from 'react';
import LazyLoad from 'react-lazy-load';
import WallImageViewer from '../Home/WallImageViewer';
import Filters from './Filters';
import AppliedFilters from './AppliedFilters';

export default class ShowProductsSearch extends React.Component {

  render() {
     var varNotify = this.props.notify ? this.props.notify : 'products';
    return (
      <div className="tab-content clearfix">
        <div className="tab-pane active" id="productss">
          <div className="prod_tab_section">
            <Filters value={this.props.value} priceRangeChange={this.props.priceRangeChange} searchCategory={this.props.searchCategory} handleChange={this.props.handleChange}/>
            <AppliedFilters />
            <div className="prod_result1">
              <div className="container pad_lf120">
                <h3 className="search_tabbd_heading text-left">Your search for <span className="italic">'{varNotify}'</span> returned <span className="italic">{this.props.allProductsData.length}</span> results</h3>
                <div className="grid_wall_wrapper">
                  {this.props.allProductsData.map((prodlist, index) => {
                    return (
                      <LazyLoad key={index}>
                        <WallImageViewer prodlist={prodlist} index={index+1}/>
                      </LazyLoad>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

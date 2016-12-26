import React from 'react';
import LazyLoad from 'react-lazy-load';
import WallImageViewer from '../Home/WallImageViewer';

export default class ShowProductsSearch extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="mid_container">
          <div className="grid_wall_wrapper">
            {this.props.allProductsData.map((prodlist, index) => {
              return (
                <LazyLoad key={index} height={100}>
                  <WallImageViewer prodlist={prodlist} index={index+1}/>
                </LazyLoad>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

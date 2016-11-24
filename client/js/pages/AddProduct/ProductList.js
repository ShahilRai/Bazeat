import React from 'react';
import Button from './Button';
export default class ProductList extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
   }

  constructor(props, context) {
    super(props, context);
    this.state = {
      product_list: {}
    };
  }

  render(){
    return(
      <div className="grid_single_item">
        <Button/>
        <a href="#">
          <img src="images/grid_img_1.png" />
          <div className="grid_tile_desc">
            <h2>Speltbaguetter</h2>
            <span className="price_tag">kr 35.00</span>
            <p>Tradisjonelle franske baguetter laget med spelt og i vedovn...</p>
          </div>
        </a>
      </div>
    );
  }
}

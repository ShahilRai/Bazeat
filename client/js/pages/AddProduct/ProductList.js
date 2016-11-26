import React from 'react';
import Button from './Button';
import ProductDetails from './ProductDetails';
export default class ProductList extends React.Component {
  render(){
    return(
      <div className="wall-column">
        <div className="grid_single_item">
          <Button/>
          <a href="#" data-toggle="modal" data-target="#product_desc">
            <img src= {this.props.productData.photo}/>
          </a>
          <div className="grid_tile_desc">
            <h2>Speltbaguetter</h2>
            <span className="price_tag">{this.props.productData.price}</span>
            <p>Tradisjonelle franske baguetter laget med spelt og i vedovn...</p>
          </div>
        </div>
        <ProductDetails/>
      </div>
    );
  }
}

import React from 'react';
import Button from './Button';
  export default class ProductList extends React.Component {
    render(){
      return(
        <div className="wall-column">
          <div className="grid_single_item">
            <Button/>
            <a href="#">
              <img src= {this.props.imageData.photo}/>
            </a>
            <div className="grid_tile_desc">
              <h2>Speltbaguetter</h2>
              <span className="price_tag">{this.props.imageData.price}</span>
              <p>Tradisjonelle franske baguetter laget med spelt og i vedovn...</p>
            </div>
          </div>
        </div>
      );
    }
  }

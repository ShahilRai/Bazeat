import React from 'react';
import Button from './Button';
import ProductList from './ProductList';

export default class AddnewProducts extends React.Component {

  render(){
    console.log("products:- " + JSON.stringify(this.props.productInfo))
    return(
      <div>
      <div className="wall-column">
        <div className="grid_single_item no_brdr add_item_pduct">
          <div className="add_prod_div">
            <a href="javascript:void(0)" data-toggle="modal" data-target="#step_1">
               <img src="images/add_prod.png" />
                <div className="grid_tile_desc">
                 <h3>Add new <br/> product</h3>
                </div>
            </a>
          </div>
        </div>
      </div>
      {this.props.productInfo.products.map((image, index) =>
       <ProductList key = {index} imageData = {image}/>)}
    </div>
    )
  }
}

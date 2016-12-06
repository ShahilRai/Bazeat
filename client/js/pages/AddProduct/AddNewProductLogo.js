import React from 'react';
import ReactSlider from '../Product/ReactSlider';

export default class AddNewProductLogo extends React.Component {

  render(){
   return(
    <div className="wall-column">
      <div className="grid_single_item no_brdr add_item_pduct">
        <div className="add_prod_div">
          <a href="#" data-toggle="modal" data-target="#add">
           <img src="images/add_prod.png" />
            <div className="grid_tile_desc">
             <h3>Add new <br/> product</h3>
            </div>
          </a>
        </div>
      </div>
      <ReactSlider id="add"/>
    </div>
    )
  }
}

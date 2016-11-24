import React from 'react';
import Button from './Button';

export default class AddnewProducts extends React.Component {
  render(){
    return(
      <div className="grid_wall_wrapper prod_producer_grid products_section">
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
       <div className="grid_single_item">
         <Button />
        <a href="#">
        <img src="images/grid_img_2.png" />
        <div className="grid_tile_desc">
          <h2>Julekake</h2>
        <p>Tradisjonelle franske baguetter laget med spelt og i vedovn...</p>
        </div>
        </a>
       </div>
        <div className="grid_single_item">
            <Button />
         <a href="#">
         <img src="images/grid_img_2.png" />
         <div className="grid_tile_desc">
          <h2>Julekake</h2>
           <p>Tradisjonelle franske baguetter laget med spelt og i vedovn...</p>
        </div>
         </a>
        </div>

        <div className="grid_single_item">
               <Button />
            <a href="#">
            <img src="images/grid_img_3.png" />
             <div className="grid_tile_desc">
              <a href="#" data-toggle="modal" data-target="#prod1_Modal"><h2>Klassisk baguette</h2></a>
              <p>Tradisjonelle franske baguetter laget med spelt og i vedovn...</p>
        </div>
              </a>
        </div>

        <div className="grid_single_item">
                <Button />
             <a href="#">
              <img src="images/grid_img_9.png" />
                 <div className="grid_tile_desc">
                   <h2>Surdeigsbrød</h2>
                    <p>Tradisjonelle franske baguetter laget med spelt og i vedovn...</p>
                 </div>
                </a>
        </div>

              <div className="grid_single_item">
                    <Button />
                <a href="#">
                  <img src="images/grid_img_5.png" />
                  <div className="grid_tile_desc">
                    <h2>Farmors spelt</h2>
                    <p>Tradisjonelle franske baguetter laget med spelt og i vedovn...</p>
                  </div>
                </a>
              </div>
       </div>

    )
  }
}

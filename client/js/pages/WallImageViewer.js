import React from 'react';

export default class WallImageViewer extends React.Component {

   constructor() {
      super();
      this.state = {
      }
   }

  render() {
    return (
      <div className="wall-column">
        <div className="grid_single_item"> 
          <div className="hover_box">
              <a href="#" className="like_btn_bg"><i className="fa fa-heart" aria-hidden="true"></i></a>
                <a href="#" className="like_btn_bg"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                <a href="#" className="buy_btn">Buy</a>
            </div>
            <a href="#">
            <img src={require("../../images/" +this.props.wallImages.name)} />
            <div className="grid_tile_desc">
              <h2>{this.props.wallImages.product_price}</h2>
                <span className="price_tag">kr 35.00</span>
                <p>{this.props.wallImages.product_details}</p>
            </div>
           </a>
        </div>
      </div>           
    );
  }
}


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
            <a href="#" className="hover_icon"><img src="images/like_icon.png"/>
              <small className="icon_text">Like</small>
            </a>
            <a href="#" className="hover_icon"><img src="images/share_icon.png"/>
              <small className="icon_text">Share</small>
            </a>
            <a href="#" className="hover_icon"><img src="images/cart_plus_icon.png"/>
              <small className="icon_text">Buy</small>
            </a>
          </div>
          <a href="javascript:void(0)">
            <img src={require("../../../images/" +this.props.wallImages.name)} />
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


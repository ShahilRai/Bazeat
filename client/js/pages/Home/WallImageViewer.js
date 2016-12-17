import React from 'react';
import ProductDetails from '../AddProduct/ProductDetails';

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
          <a href="#" data-target={"#id1" + this.props.index} data-toggle="modal">
            <img src={this.props.wallImages.photo} />
            <div className="grid_tile_desc">
              <h2>{this.props.wallImages.product_name}</h2>
              <span className="price_tag">kr {this.props.wallImages.price}.00</span>
              <p>{this.props.wallImages.description}</p>
            </div>
          </a>
          <ProductDetails index={this.props.index} dsplyProdDetails={this.props.wallImages}/>
        </div>
      </div>
    );
  }
}


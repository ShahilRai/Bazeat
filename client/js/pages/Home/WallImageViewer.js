import React from 'react';
import ProductDetails from '../AddProduct/ProductDetails';
import ReactSlider from '../Product/ReactSlider';
import pubSub from 'pubsub-js';
export default class WallImageViewer extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

   constructor() {
      super();
      this.state = {
        added : false
      }
   }

  addToCart(e) {
    console.log(this.props.wallImages)
      if(!this.state.added) {
        PubSub.publish('cart.added', this.props.wallImages);
      }
       if(!this.state.added){
          this.setState({
            added: !this.state.added
          });
        }
  }

  render() {
    const data = this.props.wallImages;
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
            <a href="javaScript:void(0)" className="hover_icon" onClick={this.addToCart.bind(this)}><img src="images/cart_plus_icon.png"/>
              <small className="icon_text">Buy</small>
            </a>
          </div>
          <a href="#" data-target={this.context.authenticated == true && this.context.user.email == (this.props.wallImages ? this.props.wallImages._producer.email : this.props.prodlist._producer.email )? "#" + this.props.index : "#id1" + this.props.index} data-toggle="modal">
            <img src={this.props.wallImages ? this.props.wallImages.photo : this.props.prodlist.photo} />
            <div className="grid_tile_desc">
              <h2>{this.props.wallImages ? this.props.wallImages.product_name : this.props.prodlist.product_name}</h2>
              <span className="price_tag">kr {this.props.wallImages ? this.props.wallImages.price : this.props.prodlist.price}.00</span>
              <p>{this.props.wallImages ? this.props.wallImages.description : this.props.prodlist.description}</p>
            </div>
          </a>
          <ProductDetails index={this.props.index} dsplyProdDetails={this.props.wallImages ? this.props.wallImages : this.props.prodlist}/>
          <ReactSlider prod_to_edit={this.props.wallImages ? this.props.wallImages : this.props.prodlist} index={this.props.index}/>
        </div>
      </div>
    );
  }
}


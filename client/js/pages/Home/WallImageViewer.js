import React from 'react';
import ProductDetails from '../AddProduct/ProductDetails';
import ReactSlider from '../Product/ReactSlider';
import pubSub from 'pubsub-js';
import axios from 'axios';
export default class WallImageViewer extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

   constructor(props, context) {
      super(props, context);
      this.state = {
        added : false,
        items : {},
        cartProductItems: {
          product_id: '',
          qty: 1
        }
      }
   }

  addToCart(e) {
    var self = this
    var cartProduct = this.state.cartProductItems
    var cartData = this.props.wallImages?this.props.wallImages:this.props.prodlist;
    cartData.qty = 1;
    cartProduct.product_id = cartData.id
    this.sendCartData(cartProduct, self.context.user.email).then((response) => {
      if(response.data) {
        this.setState({
          items : response.data.cart
        })
       if(!self.state.added) {
          PubSub.publish('cart.added', this.state.items);
        }
       if(!self.state.added){
        self.setState({
          added: !self.state.added
        });
       }
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  sendCartData(cartArray, emailAddress) {
    return axios.post("/api/carts" , {
      email: emailAddress,
      cartitems: cartArray
    });
  }

  render() {
    var disable=(this.props.wallImages?this.props.wallImages.is_disable:false)
    var blur_class = (disable == true) ? 'blur':''
    return (
      <div className="wall-column">
        <div className={"grid_single_item "+ blur_class}>
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
              <span className="price_tag">kr {this.props.wallImages ? this.props.wallImages.calculated_price : this.props.prodlist.calculated_price}</span>
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

import React from 'react';
import ProductDetails from '../AddProduct/ProductDetails';
import ReactSlider from '../Product/ReactSlider';
import CartModal from '../Header/CartModal';
import cookie from 'react-cookie';
import pubSub from 'pubsub-js';
import axios from 'axios';
import toastr from 'toastr';
import ShareProduct from './ShareProduct';
import LoginModal from '../Authenticate/LoginModal';
let cart_id;
let cuid;
let available_prod_msg;
export default class WallImageViewer extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
  };

   constructor(props, context) {
      super(props, context);
      this.state = {
        added : false,
        is_like: this.props.wall_is_like,
        items : {},
        cartProductItems: {
          product_id: '',
          qty: 1,
          available_msg : ''
        },
        likeProduct:''
      }
   }

  addToCart(e) {
    var self = this
    var cartProduct = this.state.cartProductItems
    var cartData = this.props.wallImages?this.props.wallImages:this.props.prodlist;
    cartData.qty = 1;
    cartProduct.product_id = cartData.id
    var qty = cartProduct.qty
    var product_id = cartProduct.product_id

    this.chkProdAvailability(product_id,qty).then((response) => {
      if(response.data){
        this.setState({
        available_msg : response.data.msg
        })
        if(response.data.msg == 'Product Available'){
          cart_id = cookie.load('cart_cuid') ? cookie.load('cart_cuid') : ''
          this.sendCartData(cartProduct, cart_id).then((response) => {
            if(response.data) {
              cookie.save('cart_cuid', response.data.cart.cuid);
              this.setState({
                items : response.data.cart
              })
              PubSub.publish('cart.added', this.state.items);
            }
          }).catch((err) => {
            console.log(err);
            toastr.success("Sorry you can only Add product of same producer");
            });
        }
        else if(response.data.msg == 'Out of stock'){
          toastr.error('Out of stock');
        }
      }
    }).catch((err) =>{
      console.log(err);
      });
  }

  sendCartData(cartArray, cart_id) {
    return axios.post("/api/carts" , {
      cuid: cart_id,
      cartitems: cartArray
    })
  }
  chkProdAvailability(product_id,qty){
    return axios.get("/api/check_product_qty?product_id="+product_id+"&qty="+qty)
  }

  likeProduct(){
    cuid = this.props.wallImages?this.props.wallImages.cuid:this.props.prodlist.cuid
    if(this.context.authenticated == true){
      this.getProductlike(this.context.user.email,cuid).then((response) => {
      if(response.data) {
        this.setState({
          is_like : response.data.is_like
        })
      }
    }).catch((err) => {
        console.log(err);
    });

    }else{
        <LoginModal />
    }
  }

  getProductlike(email,cuid) {
    return axios.post("/api/like/"+cuid+"?email="+email)
  }

  render() {
    var disable
    var hidden
    let is_like_src = (this.state.is_like == true)? 'images/like_icon_red.png' : 'images/like_icon.png'
    if(this.props.wallImages){
       disable=this.props.wallImages.is_disable
    }
    else if(this.props.prodlist){
      disable=this.props.prodlist.is_disable
    }
    else{
      disable=false
    }
    if(this.props.wallImages){
      hidden=this.props.wallImages.is_hidden
    }

    else if(this.props.prodlist){
      hidden=this.props.prodlist.is_hidden
    }
    else{
      hideen=false
    }
    var blur_class = (disable == true) ? 'blur':''
    var hidden_class = (hidden == true) ? 'hidden':''
    return (
        <div className={"grid_single_item "+ blur_class +" "+hidden_class }>
          <div className="hover_box">
            <a href="javaScript:void(0)" className="hover_icon" data-toggle="modal" data-target="#login_modal"  onClick={this.likeProduct.bind(this)}><img src={is_like_src}/>
              <small className="icon_text">Like</small>
            </a>
            <a href="javaScript:void(0)" className="hover_icon"  data-toggle="modal" data-target={"#share_prod" +this.props.index} ><img src="images/share_icon.png"/>
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
              <span className="price_tag">kr {this.props.wallImages ? this.props.wallImages.base_price : this.props.prodlist.base_price}</span>
              <p>{this.props.wallImages ? this.props.wallImages.description : this.props.prodlist.description}</p>
            </div>
          </a>
          <ProductDetails index={this.props.index} dsplyProdDetails={this.props.wallImages ? this.props.wallImages : this.props.prodlist}/>
          <ReactSlider prod_to_edit={this.props.wallImages ? this.props.wallImages : this.props.prodlist} index={this.props.index}/>
          <ShareProduct shareIndex={this.props.index} wall_photo={this.props.wallImages ? this.props.wallImages.photo : this.props.prodlist.photo} wall_images ={this.props.wallImages ? this.props.wallImages : this.props.prodlist}/>
      </div>
    );
  }
}

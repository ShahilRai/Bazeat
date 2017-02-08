import React from 'react';
import toastr from 'toastr';
import axios from 'axios';
import cookie from 'react-cookie';
import LoginModal from '../Authenticate/LoginModal';
let cart_id;
export default class CartModal extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    cart_id = cookie.load('cart_cuid') ? cookie.load('cart_cuid') : ''
    this.state = {
      items: this.props._cartList ? this.props._cartList : [],
      total_price: '',
      currency: 'kr',
      incrCartProductItems: {
        product_id: '',
        qty: 1
      }
    }
    this.addItem = this.addItem.bind(this);
    PubSub.subscribe('cart.added', this.addItem);
  }

  addItem(e, item) {
    this.setState({
      items: item.cartitems,
      total_price: item.total_price
    })
    this.forceUpdate();
  }

  incrNumItems(e, i) {
    var self = this
    var incrCartProduct = this.state.incrCartProductItems
    incrCartProduct.product_id = this.state.items[i].product_id
    incrCartProduct.qty = 1
    cart_id = cookie.load('cart_cuid') ? cookie.load('cart_cuid') : ''
    this.incrCartData(incrCartProduct, cart_id).then((response) => {
      if(response.data) {
        toastr.success('Your item successfully increased');
        this.setState({
          items: response.data.cart.cartitems,
          total_price: response.data.cart.total_price
        })
      }
    }).catch((err) => {
      toastr.error(err);
      console.log(err);
    });
   }

  decrNumItems(e, i) {
   var self = this
   if(this.state.items[i].qty > 1){
    var incrCartProduct = this.state.incrCartProductItems
    incrCartProduct.product_id = this.state.items[i].product_id
    incrCartProduct.qty = -1
    cart_id = cookie.load('cart_cuid') ? cookie.load('cart_cuid') : ''
     this.incrCartData(incrCartProduct, cart_id).then((response) => {
        if(response.data) {
          toastr.success('Your item successfully decreased');
          this.setState({
            items: response.data.cart.cartitems,
            total_price: response.data.cart.total_price
          })
        }
       }).catch((err) => {
        toastr.error(err);
        console.log(err);
      });
    }
  }

  incrCartData(cartArray, cart_id) {
    return axios.post("/api/carts" , {
      cuid: cart_id,
      cartitems: cartArray
    });
  }

  removeItem(e, i) {
    cart_id = cookie.load('cart_cuid') ? cookie.load('cart_cuid') : ''
    this.removeCartData(this.state.items[i].id, cart_id).then((response) => {
      if(response.data) {
        toastr.success('Your item successfully removed');
        this.setState({
          items: response.data.doc.cartitems,
          total_price: response.data.doc.total_price
        })
      }
    }).catch((err) => {
      toastr.error(err);
      console.log(err);
    });
   }

  removeCartData(cartitem_id, cart_id) {
    return axios.delete("/api/remove/cart_items" , {
      params: {
        cuid: cart_id,
        cartitem_id: cartitem_id
      }
    });
  }

  removeAllItems() {
     cart_id = cookie.load('cart_cuid') ? cookie.load('cart_cuid') : ''
     this.removeAllCartData(cart_id).then((response) => {
       if(response.data) {
        toastr.success('all items removed successfully');
        this.setState({
          items : [],
          total_price: 0.0
        })
       }
    }).catch((err) => {
      toastr.error(err);
       console.log(err);
    });
  }

  removeAllCartData(cart_id) {
    return axios.delete("/api/empty/cart", {
      params: {
        cuid: cart_id
      }
    });
  }

  openBag() {
    if(this.context.authenticated == true){
      this.context.router.push('/checkout');
    }
    else
      {
        <LoginModal />
      }
  }

  getCart() {
    if(this.context.authenticated == true) {
      cart_id = cookie.load('cart_cuid') ? cookie.load('cart_cuid') : this.context.user.email
      // cart_id = this.context.user.email
    } else {
      cart_id = cookie.load('cart_cuid') ? cookie.load('cart_cuid') : ''
    }
    this.loadCartItem(cart_id).then((response) => {
      if(response.data){
        this.setState({
        item : response.data.cart,
        items : response.data.cart.cartitems,
        total_price : response.data.cart.total_price
        })
      }
    }).catch((err) =>{
      console.log(err);
      });
  }

  loadCartItem(cart_id) {
    return axios.get("/api/cart/"+cart_id);
  }

  render(){
    var goTOBagBtn
    if(this.state.items.length<1){
      goTOBagBtn = <button type="submit" className="btn pull-right redish_btn" data-toggle="modal" data-target="#login_modal" onClick={this.openBag.bind(this)} disabled>Go to bag</button>
    }else{
      goTOBagBtn = <button type="submit" className="btn pull-right redish_btn" data-toggle="modal" data-target="#login_modal" onClick={this.openBag.bind(this)}>Go to bag</button>
    }
    return(
      <span>
      <li className="next_list" id="demo">
      <a href="#" onClick={this.getCart.bind(this)}></a>
      </li>
          <div className="items_list_info">
            <p className="empty_item_text">You have {this.state.items.length} items in your bag • <span  className="empty_bag" onClick={this.removeAllItems.bind(this)} >Empty bag</span></p>
            <ul>
            {this.state.items.map((item, i)=>
              <li key={i}>
                <span className="sr_no">
                  <button className="fa fa-caret-up" onClick={(e) => this.incrNumItems(e, i)}></button>
                    <input type="text" className="form-control text-center" value={item.qty} data-rule="quantity" type="text" />
                  <button className="fa fa-caret-down" onClick={(e) => this.decrNumItems(e, i)}></button>
                </span>
                <span className="list_images"><img src={item.product_image} height="50" width="50"/>
                   <small>{item.product_name}</small>
                </span>
                <span className="items_price">{"kr " + item.product_amt}</span>
                <span className="cross_items"><button className="delete_time" onClick={(e) => this.removeItem(e, i)} >X</button></span>
              </li>
            )}
            </ul>
              <div className="list_item_footer">
                <span className="tot_price_item">Total</span>
                <span className="gross_price">kr {this.state.total_price}</span>
                {goTOBagBtn}
              </div>
          </div>
      </span>
    );
  }
}

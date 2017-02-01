import React from 'react';
import CheckoutStep from './CheckoutStep';
import axios from "axios";
import cookie from 'react-cookie';
let cart_id;
let cart_detail;
export default class ShoppingBag extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    cart_id = cookie.load('cart_cuid') ? cookie.load('cart_cuid') : ''
    console.log(cart_id)
    this.state = {
      items: [],
      step:this.props.step,
      total_price: 0,
      total_items : 0,
      currency: 'kr',
      item : {},
      incrCartProductItems: {
      product_id: '',
      qty: 1
      }
    }
  }

  incrNumItems(e, i) {
  var self = this
  var incrCartProduct = this.state.incrCartProductItems
  incrCartProduct.product_id = this.state.items[i].product_id
  incrCartProduct.qty = this.state.items[i].qty + 1
  cart_id = cookie.load('cart_cuid') ? cookie.load('cart_cuid') : ''
  this.incrCartData(incrCartProduct, cart_id).then((response) => {
    if(response.data) {
      this.setState({
        items: response.data.cart.cartitems,
        item : response.data.cart,
        total_price : response.data.cart.total_price
      })
    }
  }).catch((err) => {
      console.log(err);
    });
  }

  decrNumItems(e, i) {
   var self = this
   if(this.state.items[i].qty > 1){
    var incrCartProduct = this.state.incrCartProductItems
    incrCartProduct.product_id = this.state.items[i].product_id
    incrCartProduct.qty = this.state.items[i].qty - 1
    cart_id = cookie.load('cart_cuid') ? cookie.load('cart_cuid') : ''
     this.incrCartData(incrCartProduct, cart_id).then((response) => {
        if(response.data) {
          this.setState({
            items: response.data.cart.cartitems,
            item : response.data.cart,
            total_price : response.data.cart.total_price
          })
        }
       }).catch((err) => {
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

  removeAllItems(){
    var self = this
    cart_id = cookie.load('cart_cuid') ? cookie.load('cart_cuid') : ''
    this.emptyBag(cart_id).then((response) => {
      if(response.data) {
        this.setState({
          items : [],
          total_price: 0,
          total_items : 0
        })
      }
    }).catch((err) => {
      console.log(err);
    });
  }

//delete all item from bag
  emptyBag(cart_id) {
    return axios.delete("/api/empty/cart?cuid="+cart_id);
  }

  removeSingleitem(i){
    var self = this
    var cartitem_id = this.state.items[i].id
    cart_id = cookie.load('cart_cuid') ? cookie.load('cart_cuid') : ''
    this.removeItem(cart_id, cartitem_id).then((response) => {
      if(response.data) {
        this.setState({
          items : response.data.doc.cartitems,
          item : response.data.doc,
          total_price : response.data.doc.total_price
        })
      }
    }).catch((err) => {
      console.log(err);
    });
  }

// delete single item from bag
  removeItem(cart_id, cartitem_id){
    return axios.delete("/api/remove/cart_items/",{
      params:{
        cuid: cart_id,
        cartitem_id: cartitem_id
      }
    });
  }

  gotoHome(){
    //window.location.href = "/"
    this.context.router.push('/');
  }

  goToNextPage(){
    this.props.nextStep(cart_detail)
  }

  componentDidMount() {
    let email = this.context.user.email
    cart_id = cookie.load('cart_cuid') ? cookie.load('cart_cuid') : email
    this.loadCartItem(cart_id, email).then((response) => {
      if(response.data){
        cookie.save('cart_cuid', response.data.cart.cuid);
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

  loadCartItem(cart_id, email) {
    return axios.get("/api/cart/"+cart_id+"?check_email="+email);
  }

  render() {
    cart_detail = this.state.item
    var self = this;
    var goToShopBtn
    if(this.state.items.length<1){
      goToShopBtn = <button type="submit" className="btn pull-left step1_emptybtn goto_shop_btn" onClick={this.gotoHome.bind(this)}>Go to ShopHome</button>
    }else{
      goToShopBtn =<div className="page_wrapper">
        <div className="full_width ptop0">
          <div className="chkout_pg chkoutstep1">
            <h3>Shopping bag</h3>
            <h4>Look over your shopping bag before continuing to payment</h4>
            <CheckoutStep step={this.state.step}/>
            <ul className="shopping_list_heading">
              <li className="shopping_no">Amount</li>
              <li className="shopping_prod">Product</li>
              <li className="shopping_price">Price</li>
              <li className="shopping_mva">MVA</li>
              <li className="shopping_price">Total price</li>
              <li className="items_price">&nbsp;</li>
            </ul>
            <div className="items_list_info" style={{display: 'block'}}>
              <ul>
                {this.state.items.map((item, i)=>
                  <li key={i}>
                    <span className="sr_no">
                      <button className="fa fa-caret-up" onClick={(e) => this.incrNumItems(e, i)}></button>
                        <input type="text" className="form-control text-center" value={item.qty} data-rule="quantity" type="text" />
                      <button className="fa fa-caret-down" onClick={(e) => this.decrNumItems(e, i)} ></button>
                    </span>
                    <span className="list_images"><img src={item.product_image} height="50" width="50"/>
                      <small>{item.product_name}</small>
                    </span>
                    <span className="items_price">{"kr " + item.product_amt}</span>
                    <span className="mva">15%</span>
                    <span className="items_price">{item.product_total_amt.toFixed(2)}</span>
                    <span className="del_bin">
                    <a href= "javaScript:void(0)"><img src="images/del_bin.png" onClick={this.removeSingleitem.bind(this,i)}/></a>
                    </span>
                  </li>
                )}
              </ul>
              <div className="chkout_step1_footer">
                <span className="chkout_step1_prod">{"In total " +this.state.items.length +" products"}</span>
                <span className="chkout_step1_totalprice">{"Total price incl. MVA: kr " +this.state.total_price}</span>
              </div>
            </div>
            <div className="chkout_step1btns">
              <button type="submit" className="btn pull-left step1_emptybtn" onClick={this.removeAllItems.bind(this)}>Empty shopping bag</button>
              <button type="button" className="btn btn-default continue_btn" onClick={ this.goToNextPage.bind(this)} >Continue</button>
            </div>
          </div>
        </div>
      </div>
    }
    return (
      <div className="full_width_container">
        {goToShopBtn}
      </div>
    );
  }
}


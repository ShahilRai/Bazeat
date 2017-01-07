import React from 'react';
import CheckoutStep from './CheckoutStep';
import axios from "axios";

export default class ShoppingBag extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      items: [],
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

  addItem(e, item) {
    this.state.items.push(item);
      this.setState({
        total_price : item.price + this.state.total_price,
        total_items : this.state.total_items + 1
      })
    this.forceUpdate();
  }

  incrNumItems(e, i) {
  var self = this
  var incrCartProduct = this.state.incrCartProductItems
  incrCartProduct.product_id = this.state.items[i].id
  this.incrCartData(incrCartProduct, self.context.user.email).then((response) => {
    if(response.data) {
      this.state.items[i].qty += 1 ;
      this.setState({
        total_price : this.state.total_price + this.state.items[i].price
      })
    }
  }).catch((err) => {
      console.log(err);
    });
  }

   decrNumItems(e, i) {
     var self = this
     var incrCartProduct = this.state.incrCartProductItems
     incrCartProduct.product_id = this.state.items[i].id
     this.incrCartData(incrCartProduct, self.context.user.email).then((response) => {
      if(response.data) {
        if(this.state.items[i].qty > 1){
          this.state.items[i].qty -= 1 ;
          this.setState({
            total_price : this.state.total_price - this.state.items[i].price
          })
        }
      }
    }).catch((err) => {
      console.log(err);
    });
   }

  incrCartData(cartArray, emailAddress) {
    return axios.post("/api/carts" , {
      email: emailAddress,
      cartitems: cartArray
    });
  }

  removeItem(e, i) {
    var self = this
    var total_qty = this.state.items[i].qty
    var price =  self.state.items[i].price
    var total_price = total_qty * price
    this.state.items.splice(i, 1)
    this.setState({
      total_price : self.state.total_price - total_price,
      total_items : self.state.total_items - 1
    })
  }

  removeAllItems(){
    this.setState({
     items : [],
     total_price: 0,
     total_items : 0
    })
  }


  componentDidMount(){
    var email = this.context.user.email;
    this.loadCartItem(email).then((response) => {
      if(response.data){
        this.setState({
        item : response.data.cart,
        items : response.data.cart ? response.data.cart.cartitems : 'null'
        })
      }
    }).catch((err) =>{
      console.log(err);
      });
  }

  loadCartItem(email) {
    return axios.get("/api/cart/"+email);
  }

  render() {
    return (
      <div className="page_wrapper">
        <div className="full_width ptop0">
          <div className="chkout_pg chkoutstep1">
            <h3>Shopping bag</h3>
            <h4>Look over your shopping bag before continuing to payment</h4>
            <CheckoutStep step={this.props.step}/>
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
                  <span className="list_images">{item.id}
                  </span>
                <span className="items_price">{"kr " + item.price}</span>
                <span className="mva">15%</span>
                <span className="items_price">kr 35,00</span>
                <span className="del_bin">
                  <img src="images/del_bin.png"/>
                </span>
                </li>
              )}
            </ul>
              <div className="chkout_step1_footer">
                <span className="chkout_step1_prod">{"In total " +this.state.items.length +" products"}</span>
                <span className="chkout_step1_totalprice">{"Total price incl. MVA: kr " + this.state.item.total_price}</span>
              </div>
            </div>
            <div className="chkout_step1btns">
              <button type="submit" className="btn pull-left step1_emptybtn">Empty shopping bag</button>
              <button type="button" className="btn btn-default continue_btn" onClick={this.props.nextStep}>Continue</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


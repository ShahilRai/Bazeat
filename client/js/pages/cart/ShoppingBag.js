import React from 'react';
import ProductStep from './ProductStep';

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
  this.loadCartItem().then((response) => {
    if(response.data){
      this.setState({
      items : response.data.cartItem,
      })
    }
  }).catch((err) =>{
    console.log(err);
    });
  }

  loadCartItem() {
    return axios.get("/api/cart?email="+email);
  }

  render() {
    return (
      <div className="page_wrapper">
        <div className="full_width ptop0">
          <div className="chkout_pg chkoutstep1">
            <h3>Shopping bag</h3>
            <h4>Look over your shopping bag before continuing to payment</h4>
            <ProductStep step={this.props.step}/>
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
                <li className="grey_bg">
                  <span className="sr_no">
                    <i className="fa fa-caret-up"></i>
                    <input className="form-control text-center" value="1" data-rule="quantity" type="text"/>
                    <i className="fa fa-caret-down"></i>
                  </span>
                  <span className="list_images"><img src="/images/list_item1.png"/>
                    <small>Spelt baguettes á la Hauge, Belgium</small>
                  </span>
                  <span className="items_price">kr 35,00</span>
                  <span className="mva">15%</span>
                  <span className="items_price">kr 35,00</span>
                  <span className="del_bin">
                    <img src="images/del_bin.png"/>
                  </span>
                </li>
                <li>
                  <span className="sr_no">
                    <i className="fa fa-caret-up"></i>
                    <input className="form-control text-center" value="1" data-rule="quantity" type="text"/>
                    <i className="fa fa-caret-down"></i>
                  </span>
                  <span className="list_images"><img src="/images/list_item1.png"/>
                    <small>Spelt baguettes á la Hauge, Belgium</small>
                  </span>
                  <span className="items_price">kr 35,00</span>
                  <span className="mva">15%</span>
                  <span className="items_price">kr 35,00</span>
                  <span className="del_bin">
                    <img src="images/del_bin.png"/>
                  </span>
                </li>
                <li className="grey_bg">
                  <span className="sr_no">
                    <i className="fa fa-caret-up"></i>
                    <input className="form-control text-center" value="1" data-rule="quantity" type="text"/>
                    <i className="fa fa-caret-down"></i>
                  </span>
                  <span className="list_images"><img src="/images/list_item1.png"/>
                    <small>Spelt baguettes á la Hauge, Belgium</small>
                  </span>
                  <span className="items_price">kr 35,00</span>
                  <span className="mva">15%</span>
                  <span className="items_price">kr 35,00</span>
                  <span className="del_bin">
                    <img src="images/del_bin.png"/>
                  </span>
                </li>
              </ul>
              <div className="chkout_step1_footer">
                <span className="chkout_step1_prod">In total 7 products</span>
                <span className="chkout_step1_totalprice">Total price incl. MVA: kr 1999,00</span>
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


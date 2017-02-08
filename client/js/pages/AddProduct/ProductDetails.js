import React from 'react';
import cookie from 'react-cookie';
import pubSub from 'pubsub-js';
import axios from 'axios';
import toastr from 'toastr';
let delivery_info;
let start_time;
let end_time;
let day;
let bought_items;
let cart_id;
let cuid;
let available_prod_msg;
export default class ProductDetails extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
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
    var cartData = this.props.dsplyProdDetails?this.props.dsplyProdDetails:this.props.prodlist;
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
          toastr.success("Out of stock");
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


	render(){
    if(this.props.dsplyProdDetails._producer){
    this.props.dsplyProdDetails._producer.timeslots.map((result,index)=>{
      start_time = result.start_time
      end_time = result.end_time
      day = result.day
    })
   }
    if(this.props.dsplyProdDetails.send && this.props.dsplyProdDetails.pickup){
      delivery_info = <li className="prod_vehicle"><a href="#">Can be delivered <br />Can be picked up</a></li>
    }
    else if(this.props.dsplyProdDetails.send){
      delivery_info = <li className="prod_vehicle"><a href="#">Can be delivered</a></li>
    }
    else if(this.props.dsplyProdDetails.pickup){
      delivery_info = <li className="prod_vehicle"><a href="#">Can be picked up</a></li>
    }

    if(this.props.dsplyProdDetails.bought_items && this.props.dsplyProdDetails.locally_produced_items){
      bought_items = <li className="prod_pin">
                      <a href="#">
                        <img src="images/house.png" />
                      </a>
                    </li>
    }
    else if(this.props.dsplyProdDetails.bought_items){
      bought_items = <li>
                      <a href="#">
                        <img src="images/house.png" />
                      </a>
                    </li>
    }
    else if(this.props.dsplyProdDetails.locally_produced_items){
      bought_items = <li>
                      <a href="#">
                        <img src="images/prod_pin.png" />
                      </a>
                    </li>
    }
    var nutrtnTab;
    if(this.props.dsplyProdDetails._producer){
      if(this.props.dsplyProdDetails._producer.if_producer){
        nutrtnTab = <li className=""><a href="#" data-target={"#prd2" + this.props.index} data-toggle="tab">Nutrition</a></li>
      }
    }

    var IngrLen;
    var AllrgnLen;
    if(this.props.dsplyProdDetails.ingredients){
      IngrLen = this.props.dsplyProdDetails.ingredients.length
      AllrgnLen = this.props.dsplyProdDetails.allergens.length
    }
		return(
			<div className="modal fade prod_modal" id={"id1" + this.props.index} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog add_prduct_modal" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close modal_close" data-dismiss="modal" aria-label="Close"></button>
              <h3 className="modal-title" id="myModalLabel">{this.props.dsplyProdDetails.product_name}</h3>
                <h5 className="prod_sponsor">{this.props.dsplyProdDetails._producer? this.props.dsplyProdDetails._producer.full_name: ""}</h5>
            </div>
            <div className="modal-body pad_btm0">
              <div className="prod_descrip_top">
                <div className="prod_img_lt">
                  <img src={this.props.dsplyProdDetails.photo} />
                </div>
                <div className="prod_descr_rt">
                  <div className="prod_price">
                    <h4 className="">kr {this.props.dsplyProdDetails.base_price}<sup>00</sup></h4>
                    <span className="">per portion</span>
                    <button type="button" className="btn btn-default nxt_btn prod_buy_btn" onClick={this.addToCart.bind(this)}>Buy</button>
                  </div>
                  <p className="abt_prod">{this.props.dsplyProdDetails.description}</p>
                  <ul className="prod_del_details">
                    {day? day.map((result,index)=>{
                    return <li className="prod_del" key={index}><a href="#">{result}: {start_time}-{end_time}</a></li>
                  }): ""}
                    {delivery_info}
                    {bought_items}
                  </ul>
                  <button type="button" className="btn btn-default open_btn mtop15">Open</button>
                </div>
              </div>
              <div className="inner_prod_tab">
                <div id="" className="review_menu">
                  <ul className="nav nav-pills">
                    <li className="active"><a href="#" data-target={"#prd1" + this.props.index} data-toggle="tab">Product details</a></li>
                    {nutrtnTab}
                  </ul>
                </div>
                <div className="tab-content clearfix">
                  <div className="tab-pane active" id={"prd1" + this.props.index}>
                    <div className="inner_prod_category">
                      <ul>
                        <li>
                          <span className="categ_title">Category:</span>
                          <span className="categ_content">{this.props.dsplyProdDetails.product_category? this.props.dsplyProdDetails.product_category.name: ""}</span>
                        </li>
                        <li>
                          <span className="categ_title">Ingredients:</span>
                          <span className="categ_content">{this.props.dsplyProdDetails.ingredients? this.props.dsplyProdDetails.ingredients.map(
                            (ingredientsName, index) => <span key={index}> {ingredientsName.name}{index == IngrLen-1?"":","}</span>): ""} </span>
                        </li>
                        <li>
                          <span className="categ_title">Allergens:</span>
                          <span className="categ_content">
                            <span className="warning_icon"><img src="images/warning_icon.png" /></span>{this.props.dsplyProdDetails.allergens? this.props.dsplyProdDetails.allergens.map((allergensName, index) =><span key={index}> {allergensName.name}{index == AllrgnLen-1?"":","} </span>): ""}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="tab-pane" id={"prd2" + this.props.index}>
                    <div className="inner_prod_category">
                      <span className="categ_title">carbs:</span>
                      <span className="categ_content">{this.props.dsplyProdDetails.nutrition_fact? this.props.dsplyProdDetails.nutrition_fact.carbs: ""}</span>
                      <span className="categ_title">fat:</span>
                      <span className="categ_content">{this.props.dsplyProdDetails.nutrition_fact? this.props.dsplyProdDetails.nutrition_fact.fat: ""}</span>
                      <span className="categ_title">fiber:</span>
                      <span className="categ_content">{this.props.dsplyProdDetails.nutrition_fact? this.props.dsplyProdDetails.nutrition_fact.fiber: ""}</span>
                      <span className="categ_title">kcal:</span>
                      <span className="categ_content">{this.props.dsplyProdDetails.nutrition_fact? this.props.dsplyProdDetails.nutrition_fact.kcal: ""}</span>
                      <span className="categ_title">kj:</span>
                      <span className="categ_content">{this.props.dsplyProdDetails.nutrition_fact? this.props.dsplyProdDetails.nutrition_fact.kj: ""}</span>
                      <span className="categ_title">protein:</span>
                      <span className="categ_content">{this.props.dsplyProdDetails.nutrition_fact? this.props.dsplyProdDetails.nutrition_fact.protein: ""}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
		)
	}
}

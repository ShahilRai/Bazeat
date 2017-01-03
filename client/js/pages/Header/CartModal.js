import React from 'react';
import { browserHistory } from 'react-router'
export default class CartModal extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      items_bag: [{'p_img':'list_item1.png', 'p_name':"Spelt baguettes á la Hauge, Belgium", 'p_price':'35,00'}]
    }
    this.goToCheckout = this.goToCheckout.bind(this);
  }

  goToCheckout = () =>{
    window.location = "/"
    // browserHistory.push('/terms');
  }

  render(){
    return(
      <li className="next_list" id="demo">
        <a href="javascript:void(0)">
          <div className="items_list_info">
            <p className="empty_item_text">You have # items in your bag • <span  className="empty_bag">Empty bag</span></p>
            <ul>
            {this.state.items_bag.map((item, i)=>
              <li key={i}>
                <span className="sr_no">
                  <i className="fa fa-caret-up"></i>
                  <input type="text" className="form-control text-center" defaultValue="1" data-rule="quantity" />
                  <i className="fa fa-caret-down"></i>
                </span>
                <span className="list_images"><img src={require("../../../images/"+item.p_img)}/>
                  <small>{item.p_name}</small>
                </span>
                <span className="items_price">{"kr" + item.p_price}</span>
                <span className="cross_items">x</span>
              </li>
            )}
            </ul>
              <div className="list_item_footer">
                <span className="tot_price_item">Total</span>
                <span className="gross_price">kr 1999,00</span>
                <button type="submit" className="btn pull-right redish_btn" onClick={this.goToCheckout}>Go to bag</button>
              </div>
          </div>
        </a>
      </li>
    );
  }
}

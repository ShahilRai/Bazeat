import React from 'react';
export default class CartModal extends React.Component {
  render(){
    return(
        <li className="next_list" id="demo">
          <a href="#">
            <div className="items_list_info">
              <p className="empty_item_text">You have # items in your bag • <span  className="empty_bag">Empty bag</span></p>
              <ul>
                <li>
                  <span className="sr_no">
                    <i className="fa fa-caret-up"></i>
                    <input className="form-control text-center" defaultValue="1" data-rule="quantity" type="text"/>
                    <i className="fa fa-caret-down"></i>
                  </span>
                  <span className="list_images"><img src={require("../../../images/list_item1.png")}/>
                    <small>Spelt baguettes á la Hauge, Belgium</small>
                  </span>
                  <span className="items_price">kr 35,00</span>
                  <span className="cross_items">x</span>
                </li>
                <li>
                  <span className="sr_no">
                    <i className="fa fa-caret-up"></i>
                    <input className="form-control text-center" defaultValue="1" data-rule="quantity" type="text"/>
                    <i className="fa fa-caret-down"></i>
                  </span>
                  <span className="list_images"><img src={require("../../../images/list_item2.png")}/>
                    <small>Spelt baguettes á la Hauge, Belgium</small>
                  </span>
                  <span className="items_price">kr 35,00</span>
                  <span className="cross_items">x</span>
                </li>
              </ul>
                <div className="list_item_footer">
                  <span className="tot_price_item">Total</span>
                  <span className="gross_price">kr 1999,00</span>
                  <button type="submit" className="btn pull-right redish_btn">Go to bag</button>
                </div>
            </div>
          </a>
        </li>
    );
  }
}

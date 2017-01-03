import React from 'react';
export default class CartModal extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      items: [],
      total_price: 0,
      total_items : 0,
      currency: 'kr'
    }
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    PubSub.subscribe('cart.added', this.addItem);
    this.incrNumItems = this.incrNumItems.bind(this);
    this.decrNumItems = this.decrNumItems.bind(this);
  }

  addItem(e, item) {
    this.state.items.push(item);
      this.setState({
        total_price : item.quantity*item.price + this.state.total_price,
        total_items : this.state.total_items + 1
      })
    this.forceUpdate();
   }

   incrNumItems(e, i) {
     this.state.items[i].quantity += 1 ;
     this.setState({
        total_price : this.state.total_price + this.state.items[i].price
     })
   }

   decrNumItems(e, i) {
     if(this.state.items[i].quantity > 1){
       this.state.items[i].quantity -= 1 ;
     }
    this.setState({
      total_price : this.state.total_price - this.state.items[i].price
    })
   }

   removeItem(e, i) {
    var self = this
    var total_qty = this.state.items[i].quantity
    var price =  self.state.items[i].price
    var total_price = total_qty * price
    this.state.items.splice(i, 1)
    this.setState({
      total_price :  self.state.total_price - total_price,
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

  render(){
    return(
        <li className="next_list" id="demo">
          <a href="#">
            <div className="items_list_info">
              <p className="empty_item_text">You have {this.state.total_items} items in your bag • <span  className="empty_bag" onClick={this.removeAllItems.bind(this)}>Empty bag</span></p>
              <ul>
              {this.state.items.map((item, i)=>
                <li key={i}>
                  <span className="sr_no">
                    <i><button className="fa fa-caret-up" onClick={(e) => this.incrNumItems(e, i)}></button></i>
                      <input type="text" className="form-control text-center" value={item.quantity} data-rule="quantity" type="text" />
                    <i><button className="fa fa-caret-down" onClick={(e) => this.decrNumItems(e, i)} ></button></i>
                  </span>
                  <span className="list_images"><img src={item.photo} height="50" width="50"/>
                     <small>{item.product_name}</small>
                     <small>{item.description}</small>
                  </span>
                <span className="items_price">{"kr" + item.price}</span>
                  <span className="cross_items"><button className="delete_time" onClick={(e) => this.removeItem(e, i)}>X</button></span>
                </li>
              )}
              </ul>
                <div className="list_item_footer">
                  <span className="tot_price_item">Total</span>
                  <span className="gross_price">{this.state.currency} {this.state.total_price} </span>
                  <button type="submit" className="btn pull-right redish_btn">Go to bag</button>
                </div>
            </div>
          </a>
        </li>
    );
  }
}

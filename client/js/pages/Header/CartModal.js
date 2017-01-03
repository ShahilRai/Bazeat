import React from 'react';
import pubSub from 'pubsub-js';
import cookie from 'react-cookie';
export default class CartModal extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      items: [],
      total_price: 0,
      total_items : 0,
      currency: 'EUR',
      value : 1
    }
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.countTotal = this.countTotal.bind(this);
    //PubSub.subscribe('cart.added', this.addItem);
    PubSub.subscribe('cart.addedId', this.addItem);
  }

  /*componentWillMount() {
    this.state =  { id: cookie.load('id') };
  }

  onLogin(id) {
    this.setState({ id });
    cookie.save('id', id, { path: '/' });
  }

  onLogout() {
    cookie.remove('userId', { path: '/' });
  }*/

  addItem(e, item) {
      this.state.items.push(item);
      this.forceUpdate();
      this.countTotal();
      this.setState({
         total_items : this.state.total_items + 1
      })
   }

   removeItem(e, itemId) {
      let itemIndexInArray;
      this.setState({
         total_items : this.state.total_items - 1
      })
      this.state.items.some((item, index) => {
        if(item.id === itemId) {
          itemIndexInArray = index;
          return true;
        }
      });

      this.state.items.splice(itemIndexInArray, 1);
      this.forceUpdate();
      this.countTotal();
    }

  countTotal() {
      let total = 0;

      this.state.items.forEach((item, index) => {
        total += item.price;
      });

      this.setState({
        total_price : total
      })
    }

    removeAllItems(){
       this.setState({
         items : [],
         total_price: 0,
         total_items : 0
      })
    }

   incrAddedItems(){
       this.setState({
        value : this.state.value + 1
       })
   }

   decrAddedItems(){
    if(this.state.value>1)
      {
        this.setState({
          value : this.state.value - 1
        })
    }
   }

  render(){
      console.log("add value")
      console.log(this.state.value)
    return(
        <li className="next_list" id="demo">
          <a href="#">
            <div className="items_list_info">
              <p className="empty_item_text">You have {this.state.total_items} items in your bag • <span  className="empty_bag" onClick={this.removeAllItems.bind(this)}>Empty bag</span></p>
              <ul>
              {this.state.items.map((item, i)=>
                <li key={i}>
                  <span className="sr_no">
                    <i><button className="fa fa-caret-up" onClick={this.incrAddedItems.bind(this)}></button></i>
                      <input type="text" className="form-control text-center" value={this.state.value} data-rule="quantity" type="text" />
                    <i><button className="fa fa-caret-down" onClick={this.decrAddedItems.bind(this)}></button></i>
                  </span>
                  <span className="list_images">
                     <small>{item.name}</small>
                  </span>
                <span className="items_price">{"kr" + item.price}</span>
                  <span className="cross_items"><button className="delete_time" onClick={this.removeItem}>X</button></span>
                </li>
              )}
              </ul>
                <div className="list_item_footer">
                  <span className="tot_price_item">Total</span>
                  <span className="gross_price">{this.state.total_price} {this.state.currency}</span>
                  <button type="submit" className="btn pull-right redish_btn">Go to bag</button>
                </div>
            </div>
          </a>
        </li>
    );
  }
}

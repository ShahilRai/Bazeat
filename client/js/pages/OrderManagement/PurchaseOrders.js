import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import PurchaseOrdersList from './PurchaseOrdersList';

let orderCuid= '';
let purchaseOrdrId: '';

export default class PurchaseOrders extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    router: React.PropTypes.object.isRequired,
    user: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);
    this.purchsCuid= "";
    this.state = {
      ordersList: []
    };
  }

  componentDidMount(){
    var user_email = this.context.user.username;
    this.getOrders(user_email).then((response) => {
      if(response.data) {
        this.setState({
          ordersList: response.data
        });
      }
    }).catch((err) => {
        console.log(err);
    });
  }

  getOrders(emailAddress){
    return axios.get("/api/get_orders?email="+emailAddress , {
    });
  }

  _renderleftMenus(){
    return(
      <ul className="edit_sidbar_list">
        <li className="active"><Link to="/orders">Purchase orders</Link></li>
        <li><Link to="/packages">Packages</Link></li>
      </ul>
    )
  }

  render(){
    let purchaseTable;
    if(this.state.ordersList.length > 0){
      let thValue=['Date','Package order#','Customer','Status','Packed','Shipped','Amount']
      purchaseTable = (
        <div className="table-main">
          <div className="table-wrapper">
            <table className="table purchase_order_table">
              <thead>
                <tr className="f2f2f2_bg">
                  {thValue.map((heading, index) =>
                      <th key={index} className="">{heading}</th>
                    )}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.ordersList.map((order, index) =>
                <PurchaseOrdersList key = {index} index = {index} order={order} />)}
              </tbody>
            </table>
          </div>
        </div>
      )
    }
    else {
      purchaseTable = (
        <div>
          <h3 className="search_tabbd_heading text-left pad_lf211">You dont have any orders yet</h3>
        </div>
      )
    }
    return(
      <div className="container padd_87">
        <div className="full_width">
          <div className="row">
            <div className="col-lg-3 col-md-2 col-sm-2 col-xs-12 purchase_order_left_sidebar order_purchse_lt_wdth edit_profile_sidebar">
              {this._renderleftMenus()}
            </div>
            <div className="col-lg-9 col-md-9 col-sm-10 col-xs-12 purchase_order_rght_sidebar rt_order_mgmnt">
              {purchaseTable}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

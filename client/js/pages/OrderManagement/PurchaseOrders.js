import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';

export default class PurchaseOrders extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    router: React.PropTypes.object.isRequired,
    user: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
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

  render(){
    var statusClass = "";
    var statusText = "";
    var packed = "";
    var shipped = "";
    var smallSpan = "";
    var orderId = "";
    {this.state.ordersList.map((order, index) =>{
      {order.orderitems.map((item, i) =>{
        orderId = item.id
        this.props.receiveCuid(order.cuid, item.id)
      })}
        if(order.after_payment_status == 'Received'){
          statusClass = "bold grey_txt";
          statusText  = "RECEIVED";
          packed = "active_inactive inactive_grey";
          shipped = "active_inactive inactive_grey";
        }
        else if(order.after_payment_status == 'Confirmed'){
          statusClass = "blue_txt";
          statusText  = "CONFIRMED";
          packed = "active_inactive inactive_grey";
          shipped = "active_inactive inactive_grey";
          smallSpan = <small className="half_green"></small>
        }
        else if(order.after_payment_status == 'Shipped'){
          statusClass = "green_txt";
          statusText  = "SHIPPED";
          packed = "active_inactive active_green";
          shipped = "active_inactive active_green";
        }
        else if(order.after_payment_status == 'Fulfilled'){
          statusClass = "green_txt";
          statusText  = "FULFILLED";
          packed = "active_inactive active_green";
          shipped = "active_inactive active_green";
        }
        else if(order.after_payment_status == 'Partially Shipped'){
          statusClass = "yellow_txt";
          statusText  = "PARTIALLY SHIPPED";
          packed = "active_inactive active_green";
          shipped = "active_inactive inactive_grey";
          smallSpan = <small className="half_green"></small>
        }
     })
  }
    var thValue=['Date','Package order#','Customer','Status','Packed','Shipped','Amount']
    return(
      <div className="col-lg-9 col-md-9 col-sm-10 col-xs-12 purchase_order_rght_sidebar rt_order_mgmnt">
        <div className="table-main">
          <div className="table-wrapper">
            <table className="table purchase_order_table">
              <thead>
                <tr className="f2f2f2_bg">
                  {thValue.map((heading, index) =>
                      <th key={index} className="">{heading}</th>
                    )}
                </tr>
              </thead>
              <tbody>
                {this.state.ordersList.map((order, index) =>
                  <tr>
                    <td className="bold">
                      21-10-2016
                    </td>
                    <td className="text-left bold">
                      <Link to="/orders/received-order" onClick={this.props.receivedOrderStatus}>{orderId}</Link>
                    </td>
                    <td className="bold">Kari Norman</td>
                    <td className={statusClass}>{statusText}</td>
                    <td><span className={packed}></span></td>
                    <td><span className={shipped}></span></td>
                    <td className="bold">kr {order.total_amount}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

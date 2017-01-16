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
    var pckd = "";
    var shppd = "";
    var pckdSpan = "";
    var orderId = "";
    var shppdSpan= "";
    {this.state.ordersList.map((order, index) =>{
      {order.orderitems.map((item, i) =>{
        orderId = item.id
        this.props.receiveCuid(order.cuid, item.id)
      })}
        if(order.after_payment_status == 'Received'){
          statusClass = "bold grey_txt";
          statusText  = "RECEIVED";
          pckd = "active_inactive inactive_grey";
          shppd = "active_inactive inactive_grey";
        }
        else if(order.after_payment_status == 'Confirmed'){
          statusClass = "blue_txt";
          statusText  = "CONFIRMED";
          pckd = "active_inactive active_green";
          shppd = "active_inactive inactive_grey";
            if(order.packages.length > 1){
              pckd = "active_inactive inactive_grey";
              pckdSpan = <small className="half_green"></small>
            }
        }
        else if(order.after_payment_status == 'Shipped'){
          statusClass = "green_txt";
          statusText  = "SHIPPED";
          pckd = "active_inactive active_green";
          shppd = "active_inactive active_green";
        }
        else if(order.after_payment_status == 'Fulfilled'){
          statusClass = "green_txt";
          statusText  = "FULFILLED";
          pckd = "active_inactive active_green";
          shppd = "active_inactive active_green";
        }
        else if(order.after_payment_status == 'Partially Shipped'){
          statusClass = "yellow_txt";
          statusText  = "PARTIALLY SHIPPED";
          pckd = "active_inactive active_green";
          shppd = "active_inactive inactive_grey";
          if(order.packages.length > 1){
              shppd = "active_inactive inactive_grey";
              shppdSpan = <small className="half_green"></small>
            }
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
                  <tr key={index}>
                    <td className="bold">
                      21-10-2016
                    </td>
                    <td className="text-left bold">
                      <Link to={"/orders/"+orderId} onClick={this.props.receivedOrderStatus}>{orderId}</Link>
                    </td>
                    <td className="bold">{order._buyer ? order._buyer.full_name : ""}</td>
                    <td className={statusClass}>{statusText}</td>
                    <td><span className={pckd}>{pckdSpan}</span></td>
                    <td><span className={shppd}>{shppdSpan}</span></td>
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

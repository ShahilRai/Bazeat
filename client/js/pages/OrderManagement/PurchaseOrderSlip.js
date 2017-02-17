import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router';

export default class PurchaseOrderSlip extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orderData: [],
      orderItems: []
    };
  }

  componentDidMount(){
    this.getOrderData(this.props.orderId).then((response) => {
      if(response.data) {
        this.setState({
          orderData: response.data,
          orderItems: response.data.orderitems
        });
      }
    }).catch((err) => {
        console.log(err);
    });
  }

  getOrderData(cuid){
    return axios.get("/api/get_order?cuid="+cuid , {
    });
  }

  render(){
    let full_name;
    let photo= "../../../images/producer_logo.png"
    let email;
    let cmp_address;
    let cmp_city;
    let cmp_phone_number;
    let cmp_postal_code;
    let cmp_web_site;
    {this.state.orderItems.map((order, index) =>{
      full_name = order._product._producer.full_name;
      photo = order._product._producer.photo;
      email = order._product._producer.email;
      if(order._product._producer.if_producer== false){
        cmp_address = order._product._producer.address;
        cmp_phone_number = order._product._producer.phone;
        cmp_city = order._product._producer.city;
        cmp_postal_code = order._product._producer.postal_code;
      }
      else{
        cmp_address = order._product._producer.producer_info.cmp_address;
        cmp_city = order._product._producer.producer_info.cmp_city;
        cmp_phone_number = order._product._producer.producer_info.cmp_phone_number;
        cmp_postal_code = order._product._producer.producer_info.cmp_postal_code;
        cmp_web_site = order._product._producer.producer_info.cmp_web_site;
      }
    })}
    return(
      <div id="orderPdf" className="col-lg-9 col-md-9 col-sm-12 col-xs-12 rt_order_mgmnt po_modal_width">
        <div className="received_order_rght">
          <div className="order_information po_slip">
            <div>
              <img className="order_info_rt" src={"../../../images/producer_logo.png"} />
            </div>
            <div className="order_info_lt">
              <h3>PURCHASE ORDER SLIP</h3>
              <h4>{full_name? full_name.toUpperCase(): ""}</h4>
              <p>{cmp_address},{cmp_postal_code},{cmp_city}<br/>
                Tel:{cmp_phone_number},E-mail:{email}<br/>
                {cmp_web_site}
              </p>
            </div>
          </div>
          <div className="payslip_details">
            <div className="payslip_left">
              <ul>
                <li>
                  <h4>Purchase order#</h4>
                  <p>{"PO-" + this.state.orderData.orderId}</p>
                </li>
                <li>
                  <h4>Order date</h4>
                  <p>{this.state.orderData.createdAt? moment(this.state.orderData.createdAt).format('DD-MM-YYYY'): ""}</p>
                </li>
              </ul>
            </div>
            <div className="payslip_right">
              <h4>Delivery address</h4>
              <p>{this.state.orderData.address? this.state.orderData.address.first_name: ""} {this.state.orderData.address? this.state.orderData.address.last_name: ""}
                <br/>{this.state.orderData.address? this.state.orderData.address.line1: ""}<br/>
                {this.state.orderData.address? this.state.orderData.address.postal_code: ""} {this.state.orderData.address? this.state.orderData.address.city: ""}
              </p>
            </div>
          </div>
          <div className="rcvd_order_table">
            <div className="table-main">
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr className="blue_bg">
                      <th className="">#</th>
                      <th className="order_item_wdth">Item</th>
                      <th className="order_item_order text-center">Ordered</th>
                      <th className="order_status_wdth">Status</th>
                      <th className="text-right">Cost</th>
                      <th className="text-right prht61">Total amount</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.orderItems.map((order, index) =>{
                    return(
                      <tr key={index}>
                        <td className="">
                          {index+ 1}
                        </td>
                        <td className="">
                          {order._product ? order._product.product_name : ""}
                        </td>
                        <td className="text-center">{order.product_qty}</td>
                        <td className="">
                          <span>{order.packed_qty+ " Packed     "}</span>
                          <span>{order.shipped_qty+ " Shipped"}</span>
                        </td>
                        <td className="text-right">{order.product_price.toFixed(2)}</td>
                        <td className="text-right">{order.total_price.toFixed(2)}</td>
                      </tr>
                    )
                  })}
                  </tbody>
                </table>
                <div className="order_subtotal order_rcvd_subtot">
                  <div className="inner_order_subtot">
                    <span className="mrht75">Sub total </span>
                    <span>{this.state.orderData.net_price? this.state.orderData.net_price.toFixed(2): "0.00"}</span>
                  </div>
                  <div className="inner_order_subtot">
                    <span className="mrht75 prht15">Where of MVA (15%) </span>
                    <span>{this.state.orderData.food_vat_value? this.state.orderData.food_vat_value.toFixed(2): "0.00"}</span>
                  </div>
                  <div className="inner_order_subtot">
                    <span className="mrht75">Shipment </span>
                    <span>{this.state.orderData.shipment_price ? this.state.orderData.shipment_price.toFixed(2): "0.00"}</span>
                  </div>
                  <div className="inner_order_subtot">
                    <span className="mrht75 prht15">Where of MVA (25%) </span>
                    <span>{this.state.orderData.shipment_vat_value? this.state.orderData.shipment_vat_value.toFixed(2): "0.00"}</span>
                  </div>
                </div>
                <div className="gross_order">
                  <span className="mrht40">Total</span>
                  <span> {"kr "+(this.state.orderData.total_amount ? this.state.orderData.total_amount.toFixed(2): "0.00")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

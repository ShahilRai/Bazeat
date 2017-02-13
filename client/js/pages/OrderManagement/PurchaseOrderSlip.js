import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router';

export default class PurchaseOrderSlip extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orderData: ""
    };
  }

  componentDidMount(){
    this.getOrderData(this.props.orderId).then((response) => {
      if(response.data) {
        this.setState({
          orderData: response.data,
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
    return(
      <div className="full_width_container">
        <div className="container padd_87 ">
          <div className="full_width">
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 rt_order_mgmnt po_modal_width">
                <div className="received_order_rght">
                  <div className="order_information po_slip">
                    <div className="order_info_rt">
                      <img src={require("../../../images/producer_logo.png")} />
                    </div>
                    <div className="order_info_lt">
                      <h3>PURCHASE ORDER SLIP</h3>
                      <h4>{this.state.orderData.address? this.state.orderData.address.first_name: ""} {this.state.orderData.address? this.state.orderData.address.last_name: ""}</h4>
                      <p>{this.state.orderData.address? this.state.orderData.address.line1: ""},{this.state.orderData.address? this.state.orderData.address.postal_code: ""},{this.state.orderData.address? this.state.orderData.address.city: ""}<br/>
                        Tel:{this.state.orderData.address? this.state.orderData.address.phone_num: ""},E-mail:{this.state.orderData.address? this.state.orderData.address.email: ""}<br/>
                        Website:www.producer.com
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
                            <tr>
                              <td className="">
                                1
                              </td>
                              <td className="">
                                Item name
                              </td>
                              <td className="text-center">5</td>
                              <td className="prchs_section">
                                <span>0 Packed</span>
                                <span>0 Shipped</span>
                              </td>
                              <td className="text-right">200,00</td>
                              <td className="text-right prht61">1000,00</td>
                            </tr>
                            <tr>
                              <td className="">
                                1
                              </td>
                              <td className="">
                                Item name
                              </td>
                              <td className="text-center">5</td>
                              <td className="prchs_section">
                                <span>0 Packed</span>
                                <span>0 Shipped</span>
                              </td>
                              <td className="text-right">200,00</td>
                              <td className="text-right prht61">1000,00</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="order_subtotal order_rcvd_subtot">
                          <div className="inner_order_subtot">
                            <span className="mrht75">Sub total</span>
                            <span>1250,00</span>
                          </div>
                          <div className="inner_order_subtot">
                            <span className="mrht75 prht15">Where of MVA (15%)</span>
                            <span>163,05</span>
                          </div>
                          <div className="inner_order_subtot">
                            <span className="mrht75">Shipment</span>
                            <span>150,00</span>
                          </div>
                          <div className="inner_order_subtot">
                            <span className="mrht75 prht15">Where of MVA (25%)</span>
                            <span>30,00</span>
                          </div>
                        </div>
                        <div className="gross_order">
                          <span className="mrht40">Total</span>
                          <span>kr 1400,00</span>
                        </div>
                      </div>
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

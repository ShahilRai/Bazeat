import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router';

export default class PackageSlip extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      packageDetails: [],
      orderItems: [],
      _order: [],
      packageItems:[],
      _producer: []
    };
  }

  componentDidMount(){
    let packageId;
    if(this.props.packageId){
      packageId= this.props.packageId
    }
    else{
      packageId= this.props.params.packageId
    }
    this.getPackageData(packageId).then((response) => {
      if(response.data) {
        this.setState({
          packageDetails: response.data,
          _order: response.data._order,
          orderItems: response.data._order.orderitems,
          packageItems: response.data.packageitems,
          _producer: response.data._producer
        });
      }
    }).catch((err) => {
        console.log(err);
    });
  }

  getPackageData(cuid){
    return axios.get("/api/get_package?cuid="+cuid , {
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
    if(this.state._producer){
      full_name = this.state._producer.full_name;
      photo = this.state._producer.photo;
      email = this.state._producer.email;
      if(this.state._producer.if_producer== false){
        cmp_address = this.state._producer.address;
        cmp_city = this.state._producer.city;
        cmp_phone_number = this.state._producer.phone;
        cmp_postal_code = this.state._producer.postal_code;
      }
      else{
        cmp_address = this.state._producer.producer_info? this.state._producer.producer_info.cmp_address: "";
        cmp_city = this.state._producer.producer_info? this.state._producer.producer_info.cmp_city: "";
        cmp_phone_number = this.state._producer.producer_info? this.state._producer.producer_info.cmp_phone_number: "";
        cmp_postal_code = this.state._producer.producer_info? this.state._producer.producer_info.cmp_postal_code: "";
        cmp_web_site = this.state._producer.producer_info? this.state._producer.producer_info.cmp_web_site: "";
      }
    }
    return(
      <div className="container padd_87">
        <div className="full_width">
          <div className="row">
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 rt_order_mgmnt po_modal_width">
              <div className="received_order_rght">
                <div className="order_information po_slip">
                  <div>
                    <img className="order_info_rt" src={"../../../images/producer_logo.png"} />
                  </div>
                  <div className="order_info_lt">
                    <h3>PACKAGE SLIP</h3>
                    <h4>{full_name? full_name.toUpperCase(): ""}</h4>
                    <p>{cmp_address},{cmp_postal_code},{cmp_city}<br/>
                      Tel:{cmp_phone_number},E-mail:{email}<br/>
                      {cmp_web_site}
                    </p>
                  </div>
                </div>
                <div className="payslip_details">
                  <div className="payslip_left">
                    <ul className="pay_top">
                      <li>
                        <h4>Package#</h4>
                        <p>{"PKG-" + this.state._order? this.state._order.orderId: ""}</p>
                      </li>
                      <li>
                        <h4>&nbsp;&nbsp;&nbsp;Purchase order#</h4>
                        <p>&nbsp;&nbsp;&nbsp;{"PO-" + this.state.packageDetails.pkgId}</p>
                      </li>
                    </ul>
                    <ul className="pay_top">
                      <li>
                        <h4>Order date</h4>
                        <p>{this.state._order.createdAt? moment(this.state._order.createdAt).format('DD-MM-YYYY'): ""}</p>
                      </li>
                      <li>
                        <h4>Package quantity</h4>
                         {this.state.packageItems.map((order, index) =>{
                          return(
                            order.packed_qty
                          )
                        })}
                      </li>
                    </ul>
                  </div>
                  <div className="payslip_right">
                    <h4>Delivery address</h4>
                    <p>{this.state._order.address? this.state._order.address.first_name: ""} {this.state._order.address? this.state._order.address.last_name: ""}
                      <br/>{this.state._order.address? this.state._order.address.line1: ""}<br/>
                      {this.state._order.address? this.state._order.address.postal_code: ""} {this.state._order.address? this.state._order.address.city: ""}
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
                            <th className="text-right prht61">Quantity</th>
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
                              <td className="text-right">{order.product_qty}</td>
                            </tr>
                          )
                        })}
                        </tbody>
                      </table>
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

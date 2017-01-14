import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import PackagesList from './PackagesList';
import EditPurchaseOrder from './EditPurchaseOrder';
import newPackageCreateLink from './newPackageCreateLink';
import ProfileContainer from '../Profile/ProfileContainer';
import NewShipment from './NewShipment';
import ToggleDisplay from 'react-toggle-display';

export default class ReceivedOrder extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    router: React.PropTypes.object.isRequired,
    user: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      orderDetails: [],
      fullAddress: [],
      orderItems:[],
      toggle_box: false
    };
    this.dropDownOption = this.dropDownOption.bind(this)
  }

  componentDidMount(){
    var orderCuid = this.props.orderCuid;
    this.getSingleOrder(orderCuid).then((response) => {
      if(response.data) {
        this.setState({
          orderDetails: response.data,
          fullAddress: response.data.address,
          orderItems: response.data.orderitems
        });
      }
    }).catch((err) => {
        console.log(err);
    });
  }

  getSingleOrder(orderCuid){
    return axios.get("/api/get_order?cuid="+orderCuid , {
    });
  }

  dropDownOption(){
    this.setState({
      toggle_box: !this.state.toggle_box
    })
  }

  render(){
    var showPackage = <div className="order_caption">
      <p>No packages yet for this order.<span className="green_txt"> <Link to="/orders/new-package" onClick={this.props.createPackageStatus}>Create new package</Link></span></p>
    </div>
    if(this.state.orderDetails.packages){
      if(this.state.orderDetails.packages.length > 0)
        {
          showPackage = <PackagesList packages= {this.state.orderDetails ? this.state.orderDetails.packages : ""} />
        }
    }
    var paymnt_status= "";
    var paymnt_text= "";
    if(this.state.orderDetails){
      if(this.state.orderDetails.after_payment_status == 'Received'){
        paymnt_status= "rcvd_btn"
        paymnt_text= "RECEIVED"
      }
      else if(this.state.orderDetails.after_payment_status == "Confirmed"){
        paymnt_status= "rcvd_btn cnfrmd_btn"
        paymnt_text= "CONFIRMED"
      }
      else if(this.state.orderDetails.after_payment_status == 'Shipped'){
        paymnt_status= "rcvd_btn green_bg"
        paymnt_text= "SHIPPED"
      }
      else if(this.state.orderDetails.after_payment_status == 'Fulfilled'){
        paymnt_status= "rcvd_btn darkgreen_bg"
        paymnt_text= "FULFILLED"
      }
       else if(this.state.orderDetails.after_payment_status == 'Partially Shipped'){
        paymnt_status= "rcvd_btn yellow_bg"
        paymnt_text= "PARTIALLY SHIPPED"
       }
    }
    return(
      <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
          <div className="received_order_rght">
            <div className="rcv_order_header">
              <h2 className="text-left">{this.props.purchaseOrdrId}</h2>
              <div className="order_header_rght">
                <ul>
                  <li className="active">
                    <a href="#" data-toggle="modal" data-target="#edit_purchase"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                  </li>
                  <li className="fax_icon">
                    <a href="#"></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-file-pdf-o" aria-hidden="true"></i></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-envelope-o" aria-hidden="true"></i></a>
                  </li>
                </ul>
                <EditPurchaseOrder />
                <div className="form-group portion_form custom_select_box portion_select" onClick={this.dropDownOption}>
                  <ToggleDisplay show={this.state.toggle_box}>
                    <ul>
                      <li><Link to="/orders/new-package" onClick={this.props.createPackageStatus}>New package</Link></li>
                      <li><a href="#" data-toggle="modal" data-target="#Create_new_shipment">New Shipment</a></li>
                    </ul>
                  </ToggleDisplay>
                </div>
                <NewShipment id="Create_new_shipment" />
                <span className="close_order">
                  <a href="#"><img src={require('../../../images/close_order.png')} /></a>
                </span>
              </div>
            </div>
            {showPackage}
            <div className="order_information">
              <div className="order_info_lt">
                <h3>PURCHASE ORDER</h3>
                <h4>Purchase order# {this.props.purchaseOrdrId}</h4>
              <span className={paymnt_status}>{paymnt_text}</span>
                  <div className="delivery_process">
                    <div className="full_width_del">
                      <span><strong>Order date</strong></span>
                      <span className="text-left">21-10-2016</span>
                  </div>
                  <div className="full_width_del">
                    <span><strong>Delivery method</strong></span>
                    <span className="text-left">Bring</span>
                  </div>
                </div>
              </div>
              <div className="order_info_rt">
                <h3>Delivery address</h3>
                <p>Kari Norman<br/>{this.state.fullAddress.line1}<br/>{this.state.fullAddress.postal_code} {this.state.fullAddress.city}<br/>{this.state.fullAddress.country}</p>
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
                        <th className="text-right">Total amount</th>
                        <th className=""></th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.orderItems.map((order, index) =>{
                      return(
                        <tr key={index}>
                          <td className="">
                            1
                          </td>
                          <td className="">
                            Item name
                          </td>
                          <td className="text-center">{order.product_qty}</td>
                          <td className="">
                            <span>{order.packed_qty} Packed</span>
                            <span>{order.shipped_qty} Shipped</span>
                          </td>
                          <td className="text-right">{order.product_price}</td>
                          <td className="text-right">1000,00</td>
                          <td className="">
                            <a href="#" className="red_font"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                          </td>
                        </tr>
                      )
                    })}
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
    )
  }
}

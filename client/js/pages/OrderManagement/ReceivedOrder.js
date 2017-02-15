import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import moment from 'moment';
import PackagesList from './PackagesList';
import EditPurchaseOrder from './EditPurchaseOrder';
import ProfileContainer from '../Profile/ProfileContainer';
import PurchaseOrders from './PurchaseOrders';
import PurchaseOrderSlip from './PurchaseOrderSlip';
import ToggleDisplay from 'react-toggle-display';
import PubSub from 'pubsub-js';

export default class ReceivedOrder extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    router: React.PropTypes.object.isRequired,
    user: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    PurchaseOrders.purchsCuid= this.props.params.orderId
    this.state = {
      orderDetails: [],
      orderItems:[],
      toggle_box: false
    };
    this.dropDownOption = this.dropDownOption.bind(this)
    this.showDialog = this.showDialog.bind(this)
    this._updateAddress = this._updateAddress.bind(this)
    this._showPackage = this._showPackage.bind(this)
    this._updateShpQty = this._updateShpQty.bind(this)
    this.getSingleOrder = this.getSingleOrder.bind(this)
    this.generatePdf = this.generatePdf.bind(this)
  }

  componentDidMount(){
    var orderCuid = this.props.params.orderId;
    this.getSingleOrder(orderCuid).then((response) => {
      if(response.data) {
        this.setState({
          orderDetails: response.data,
          orderItems: response.data.orderitems,
          packages: response.data.packages
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

  generatePdf(){
    var pdf = new jsPDF('p', 'pt', 'letter');
    var source = $('#HTMLtoPDF')[0];
    var specialElementHandlers = {
      '#bypassme': function(element, renderer) {
        return true
      }
    };

    var margins = {
      top: 50,
      left: 60,
      width: 500
    };

    pdf.fromHTML (
      source
      , margins.left
      , margins.top
      , {
          'width': margins.width
          , 'elementHandlers': specialElementHandlers
        },
      function (dispose) {
        pdf.save('po-slip');
      }
    )
  }

  dropDownOption(){
    this.setState({
      toggle_box: !this.state.toggle_box
    })
  }

  showDialog(){
    var confirmCreate = confirm("To create a shipment you need to create a package. Do you want to create a new package?");
    if (confirmCreate == true) {
      this.context.router.push('/orders/'+this.props.params.orderId+'/new-package')
    }
  }

  _showPackage(getMsg,rcvDetails){
    this.setState({
      packages: rcvDetails
    })
  }

  _updateShpQty(shpMnt){
    this.setState({
      orderItems: shpMnt
    })
  }

  _updateAddress(details){
    this.setState({
      orderDetails: details
    })
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
    PubSub.publish( 'state', this._showPackage );
    let showPackage;
    if(undefined !== this.state.packages && this.state.packages.length > 0){
      showPackage = <PackagesList getSingleOrder={this.getSingleOrder} _showPackage={this._showPackage} _updateShpQty={this._updateShpQty} packages= {this.state.packages} orderDetails={this._updateAddress} order_cuid={this.props.params.orderId}/>
    }
    else{
      showPackage = <div className="order_caption">
        <p>No packages yet for this order.<span className="green_txt"> <Link to={"/orders/"+this.props.params.orderId+"/new-package"}>Create new package</Link></span></p>
      </div>
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
      <div className="container padd_87">
        <div className="full_width">
          <div className="row">
            <div className="col-lg-3 col-md-2 col-sm-2 col-xs-12 purchase_order_left_sidebar order_purchse_lt_wdth edit_profile_sidebar">
              {this._renderleftMenus()}
            </div>
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                <div className="received_order_rght">
                  <div className="rcv_order_header">
                    <h2 className="text-left">{"PO-"+this.state.orderDetails.orderId}</h2>
                    <div className="order_header_rght">
                      <ul>
                        <li>
                          <a href="#" data-toggle="modal" data-target="#edit_purchase"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                        </li>
                        <li className="fax_icon">
                          <a href="#"></a>
                        </li>
                        <li>
                          <a href="javascript:void(0)" onClick={this.generatePdf}><i className="fa fa-file-pdf-o" aria-hidden="true"></i></a>
                        </li>
                        <li>
                          <Link to={"/orders/"+this.state.orderDetails.id+"/e-mail"}><i className="fa fa-envelope-o" aria-hidden="true"></i></Link>
                        </li>
                      </ul>
                      <EditPurchaseOrder _updateAddress={this._updateAddress} orderDetails={this.state.orderDetails} orderItems={this.state.orderItems}/>
                      <div className="form-group portion_form custom_select_box portion_select" onClick={this.dropDownOption}>
                        <ToggleDisplay show={this.state.toggle_box}>
                          <ul>
                            <li><Link to={"/orders/"+this.props.params.orderId+"/new-package"}>New package</Link></li>
                            <li><a href="#" onClick={this.showDialog}>New Shipment</a></li>
                          </ul>
                        </ToggleDisplay>
                      </div>
                      <span className="close_order">
                        <Link to="/orders"><img src={require('../../../images/close_order.png')} /></Link>
                      </span>
                    </div>
                  </div>
                  {showPackage}
                  <div className="order_information">
                    <div className="order_info_lt">
                      <h3>PURCHASE ORDER</h3>
                      <h4>Purchase order# {"PO-"+this.state.orderDetails.orderId}</h4>
                      <span className={paymnt_status}>{paymnt_text}</span>
                        <div className="delivery_process">
                          <div className="full_width_del">
                            <span><strong>Order date</strong></span>
                            <span className="text-left">{this.state.orderDetails.createdAt? moment(this.state.orderDetails.createdAt).format('DD-MM-YYYY'): ""}</span>
                        </div>
                        <div className="full_width_del">
                          <span><strong>Delivery method</strong></span>
                          <span className="text-left"></span>
                        </div>
                      </div>
                    </div>
                    <div className="order_info_rt">
                      <h3>Delivery address</h3>
                      <p>{this.state.orderDetails.address? this.state.orderDetails.address.first_name: ""} {this.state.orderDetails.address? this.state.orderDetails.address.last_name: ""}
                      <br/>{this.state.orderDetails.address? this.state.orderDetails.address.line1: ""}<br/>{this.state.orderDetails.address? this.state.orderDetails.address.postal_code: ""} {this.state.orderDetails.address? this.state.orderDetails.address.city: ""}
                      <br/>{this.state.orderDetails.address? this.state.orderDetails.address.country: ""}
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
                              <th className="text-right">Total amount</th>
                              <th className=""></th>
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
                                  <span>{order.packed_qty} Packed</span>
                                  <span>{order.shipped_qty} Shipped</span>
                                </td>
                                <td className="text-right">{order.product_price.toFixed(2)}</td>
                                <td className="text-right">{order.total_price.toFixed(2)}</td>
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
                            <span>{this.state.orderDetails.net_price? this.state.orderDetails.net_price.toFixed(2): "0.00"}</span>
                          </div>
                          <div className="inner_order_subtot">
                            <span className="mrht75 prht15">Where of MVA (15%)</span>
                            <span>{this.state.orderDetails.food_vat_value? this.state.orderDetails.food_vat_value.toFixed(2): "0.00"}</span>
                          </div>
                          <div className="inner_order_subtot">
                            <span className="mrht75">Shipment</span>
                            <span>{this.state.orderDetails.shipment_price ? this.state.orderDetails.shipment_price.toFixed(2): "0.00"}</span>
                          </div>
                          <div className="inner_order_subtot">
                            <span className="mrht75 prht15">Where of MVA (25%)</span>
                            <span>{this.state.orderDetails.shipment_vat_value? this.state.orderDetails.shipment_vat_value.toFixed(2): "0.00"}</span>
                          </div>
                        </div>
                        <div className="gross_order">
                          <span className="mrht40">Total</span>
                          <span> kr {this.state.orderDetails.total_amount ? this.state.orderDetails.total_amount.toFixed(2): "0.00"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div className="fade" id="HTMLtoPDF">
            <PurchaseOrderSlip className="fade" orderId={this.props.params.orderId}/>
          </div>
        </div>
      </div>
    )
  }
}

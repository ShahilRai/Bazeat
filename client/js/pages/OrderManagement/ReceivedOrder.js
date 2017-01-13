import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import PackagesList from './PackagesList';
import EditPurchaseOrder from './EditPurchaseOrder';
import newPackageCreateLink from './newPackageCreateLink';
import ProfileContainer from '../Profile/ProfileContainer';

export default class ReceivedOrder extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    router: React.PropTypes.object.isRequired,
    user: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      orderDetails: []
    };
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  componentDidMount(){
    var orderCuid = this.props.orderCuid;
    this.getSingleOrder(orderCuid).then((response) => {
      if(response.data) {
        this.setState({
          orderDetails: response.data
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

  handleSelectChange(event){
    if(event.target.value == "New package"){
        this.context.router.push('/orders/new-package');
    }
    else if(event.target.value == "New Shipment"){

    }
  }

  render(){
    var _ordr = [this.state.orderDetails]
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
              <div className="form-group portion_form custom_select_box portion_select">
                <ul>
                  <li>New package</li>
                  <li>New Shipment</li>
                </ul>
              </div>
              <span className="close_order">
                <a href="#"><img src={require('../../../images/close_order.png')} /></a>
              </span>
            </div>
          </div>
          <div className="order_caption">
            <p>No packages yet for this order.<span className="green_txt"> <Link to="/orders/new-package" onClick={this.props.createPackageStatus}>Create new package</Link></span></p>
          </div>
          <div className="order_information">
            <div className="order_info_lt">
              <h3>PURCHASE ORDER</h3>
              <h4>Purchase order# {this.props.purchaseOrdrId}</h4>
              <span className="rcvd_btn">RECEIVED</span>
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
              {_ordr.map((listItems, index) =>{
                  return <p>Kari Norman<br/>{listItems.address ? listItems.address.line1 : ""}<br/>{listItems.address ? listItems.address.postal_code : ""} {listItems.address ? listItems.address.city : ""}<br/>{listItems.address ? listItems.address.country : ""}</p>
              })}
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
                    <tr>
                      <td className="">
                        1
                      </td>
                      <td className="">
                        Item name
                      </td>
                      <td className="text-center">5</td>
                      <td className="">
                        <span>0 Packed</span>
                        <span>0 Shipped</span>
                      </td>
                      <td className="text-right">200,00</td>
                      <td className="text-right">1000,00</td>
                      <td className="">
                        <a href="#" className="red_font"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                      </td>
                    </tr>
                    <tr>
                      <td className="">
                        1
                      </td>
                      <td className="">
                        Item name
                      </td>
                      <td className="text-center">5</td>
                      <td className="">
                        <span>0 Packed</span>
                        <span>0 Shipped</span>
                      </td>
                      <td className="text-right">200,00</td>
                      <td className="text-right">1000,00</td>
                      <td className="">
                        <a href="#" className="red_font"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                      </td>
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
    )
  }
}

import React from 'react';
import { Link } from 'react-router';
import PackagesList from './PackagesList';

export default class ReceivedOrder extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleSelectChange(event){
    if(event.target.value == "New package"){
        this.context.router.push('/orders/new-package');
    }
    else if(event.target.value == "New Shipment"){

    }
  }

  render(){
    return(
      <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 full_width_container">
        <div className="received_order_rght">
          <div className="rcv_order_header">
            <h2 className="text-left">PO-000001</h2>
            <div className="order_header_rght">
              <ul>
                <li className="active">
                  <a href="#"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
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
              <div className="form-group portion_form custom_select_box portion_select">
                <select onClick={this.handleSelectChange} name="">
                  <option>New package</option>
                  <option>New Shipment</option>
                </select>
              </div>
              <span className="close_order">
                <a href="#"><img src={require('../../../images/close_order.png')} /></a>
              </span>
            </div>
          </div>
          <div className="order_caption">
            <p>No packages yet for this order.<span className="green_txt"> <Link to="/orders/new-package">Create new package</Link></span></p>
          </div>
          <div className="order_information">
            <div className="order_info_lt">
              <h3>PURCHASE ORDER</h3>
              <h4>Purchase order# PO-000001</h4>
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
              <p>Kari Norman<br/>Gaten 1<br/>0355 Oslo<br/>Norge</p>
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

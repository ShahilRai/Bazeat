import React from 'react';
import { Link } from 'react-router';

export default class PurchaseOrders extends React.Component {

  render(){
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
                <tr>
                  <td className="bold">
                    21-10-2016
                  </td>
                  <td className="text-left bold">
                    <Link to="/orders/received-order" onClick={this.props.receivedOrderStatus}>SO-000001</Link>
                  </td>
                  <td className="bold">Kari Norman</td>
                  <td className="bold grey_txt">RECEIVED</td>
                  <td><span className="active_inactive inactive_grey"></span></td>
                  <td><span className="active_inactive inactive_grey"></span></td>
                  <td className="bold">kr 1400,00</td>
                </tr>
                <tr>
                  <td>
                    21-10-2016
                  </td>
                  <td className="text-left">
                    <a href="#">SO-000002</a>
                  </td>
                  <td>Ali Vindenes Fetouni</td>
                  <td className="green_txt">FULFILLED</td>
                  <td><span className="active_inactive active_green"></span></td>
                  <td><span className="active_inactive active_green"></span></td>
                  <td>kr 122,00</td>
                </tr>
                <tr className="f2f2f2_bg">
                  <td>
                    21-10-2016
                  </td>
                  <td className="text-left">
                    <a href="#">SO-000003</a>
                  </td>
                  <td>Ola Norman</td>
                  <td className="green_txt">SHIPPED</td>
                  <td><span className="active_inactive active_green"></span></td>
                  <td><span className="active_inactive active_green"></span></td>
                  <td>kr 1400,00</td>
                </tr>
                <tr>
                  <td>
                    21-10-2016
                  </td>
                  <td className="text-left">
                    <a href="#">SO-000004</a>
                  </td>
                  <td>Anders Andersson</td>
                  <td className="blue_txt">CONFIRMED</td>
                  <td><span className="active_inactive inactive_grey"><small className="half_green"></small></span></td>
                  <td><span className="active_inactive inactive_grey"></span></td>
                  <td>kr 1400,00</td>
                </tr>
                <tr>
                  <td>
                    21-10-2016
                  </td>
                  <td className="text-left">
                    <a href="#">SO-000005</a>
                  </td>
                  <td>Bengt-Gunnar Løvåsen</td>
                  <td className="yellow_txt">PARTIALLY SHIPPED</td>
                  <td><span className="active_inactive active_green"></span></td>
                  <td><span className="active_inactive inactive_grey"><small className="half_green"></small></span></td>
                  <td>kr 1400,00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

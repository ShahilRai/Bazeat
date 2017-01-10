import React from 'react';
import { Link } from 'react-router';

export default class OrderMgmntPackages extends React.Component {

  render(){
    var tableheadValue=['Package date','Package#','Carrier','Sales order#','Status','Shipped date','Customer','Quantity']
    return(
      <div className="col-lg-9 col-md-9 col-sm-10 col-xs-12 purchase_order_rght_sidebar rt_order_mgmnt full_width_container">
        <div className="table-main">
          <div className="table-wrapper">
            <table className="table purchase_order_table">
              <thead>
                <tr className="f2f2f2_bg">
                  {tableheadValue.map((head, index) =>
                        <th key={index} className="text-center">{head}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">
                    21-10-2016
                  </td>
                  <td className="text-left">PKG-0001</td>
                  <td className="text-center">Bring</td>
                  <td className="text-center">
                    <a href="#">SO-000001</a>
                  </td>
                  <td className="green_txt">DELIVERED</td>
                  <td className="text-center">
                    21-10-2016
                  </td>
                  <td className="text-center">Kari Norman</td>
                  <td className="text-center">5.00</td>
                </tr>
                <tr>
                  <td className="text-center">
                    21-10-2016
                  </td>
                  <td className="text-left">PKG-0001</td>
                  <td className="text-center">Bring</td>
                  <td className="text-center">
                    <a href="#">SO-000001</a>
                  </td>
                  <td className="red_txt">NOT SHIPPED</td>
                  <td className="text-center">
                    21-10-2016
                  </td>
                  <td className="text-center">Kari Norman</td>
                  <td className="text-center">5.00</td>
                </tr>
                <tr className="f2f2f2_bg">
                  <td className="text-center">
                    21-10-2016
                  </td>
                  <td className="text-left">PKG-0001</td>
                  <td className="text-center">Bring</td>
                  <td className="text-center">
                    <a href="#">SO-000001</a>
                  </td>
                  <td className="green_txt">DELIVERED</td>
                  <td className="text-center">
                    21-10-2016
                  </td>
                  <td className="text-center">Kari Norman</td>
                  <td className="text-center">5.00</td>
                </tr>
                <tr>
                  <td className="text-center">
                    21-10-2016
                  </td>
                  <td className="text-left">PKG-0001</td>
                  <td className="text-center">Bring</td>
                  <td className="text-center">
                    <a href="#">SO-000001</a>
                  </td>
                  <td className="blue_txt">SHIPPED</td>
                  <td className="text-center">
                    21-10-2016
                  </td>
                  <td className="text-center">Kari Norman</td>
                  <td className="text-center">5.00</td>
                </tr>
                <tr>
                  <td className="text-center">
                    21-10-2016
                  </td>
                  <td className="text-left">PKG-0001</td>
                  <td className="text-center">Bring</td>
                  <td className="text-center">
                    <a href="#">SO-000001</a>
                  </td>
                  <td className="blue_txt">SHIPPED</td>
                  <td className="text-center">
                    21-10-2016
                  </td>
                  <td className="text-center">Kari Norman</td>
                  <td className="text-center">5.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

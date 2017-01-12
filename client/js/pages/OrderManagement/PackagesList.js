import React from 'react';

export default class PackagesList extends React.Component {

  render(){
    return(
      <div className="new_pckg_table">
        <div className="table-main overflow_none">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr className="dark_greybg">
                  <th className="plft30">Package#</th>
                  <th className="order_item_wdth">Date</th>
                  <th className="cnfrm_status_wdth text-left">Status</th>
                  <th className="order_carrier_wdth">Carrier</th>
                  <th className="text-left">Date of shipment</th>
                  <th className="text-left prht30"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="plft30">
                    PKG-00001
                  </td>
                  <td className="">
                    25-10-2016
                  </td>
                  <td className="text-left blue_txt">NOT SHIPPED</td>
                  <td className="">Bring</td>
                  <td className="text-center prht30">25-10-2016</td>
                  <td className="text-left prht30 ">
                  <span className="shipping_toggle">
                    <i className="fa fa-align-left" aria-hidden="true"></i>
                      <ul>
                        <li>Ship package</li>
                        <li>Mark for pickup</li>
                        <li>PDF package slip </li>
                        <li>Print package slip</li>
                        <li>Delete shipment</li>
                      </ul>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

import React from 'react';

export default class CreateNewPackage extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {

    };
    this.savePackageDetails = this.savePackageDetails.bind(this)
  }

  savePackageDetails(){
    this.props.receivedOrderStatus()
  }

  render(){
    return(
      <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
        <div className="received_order_rght">
          <div className="rcv_order_header">
            <ul className="order_breadcrumb">
              <li className="active"><a href="#"> &lt; PO-000001 </a></li>
              <li><a href="#"> / New package</a></li>
            </ul>
            <div className="order_header_rght">
              <span className="close_order pckg_close_order">
                <a href="#"><img src={require('../../../images/close_order.png')} /></a>
              </span>
            </div>
          </div>
          <div className="pckg_information">
            <form className="pckg_form">
              <div className="form-group">
                <label htmlFor="" className="col-form-label">Package#</label>
                <input type="text" className="form-control" placeholder="PKG-000001" />
              </div>
              <div className="form-group">
                <label htmlFor="" className="col-form-label">Date</label>
                <input type="text" className="form-control" placeholder="21-10-2016" />
              </div>
            </form>
          </div>
          <div className="rcvd_order_table create_pckg_table">
            <div className="table-main">
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr className="blue_bg">
                      <th className="">#</th>
                      <th className="order_item_wdth">Item</th>
                      <th className="order_item_order text-center">Ordered</th>
                      <th className="text-center">Packed</th>
                      <th className="text-center">Quantity to pack</th>
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
                      <td className="text-center">
                        <span>0</span>
                      </td>
                      <td className="text-center">
                        <input type="text" className="form-control pck_input" placeholder="5" />
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
                      <td className="text-center">
                        <span>0</span>
                      </td>
                      <td className="text-center">
                        <input type="text" className="form-control pck_input" placeholder="0" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="gross_order">
                  <button type="button" className="btn btn-default pckg_cncel_btn mtop0">Cancel</button>
                  <button type="button" className="btn btn-default nxt_btn orange_bg mtop0" onClick={this.savePackageDetails}>Save details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

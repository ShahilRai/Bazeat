import React from 'react';
import axios from 'axios';

export default class CreateNewPackage extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      orderItems: [],
      packed_qty_value : 0
    };
    this.savePackageOrder = this.savePackageOrder.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.checkProductQty = this.checkProductQty.bind(this)
  }

  componentDidMount(){
    var orderCuid = this.props.orderCuid;
    this.getOrderDetail(orderCuid).then((response) => {
      if(response.data) {
        this.setState({
          orderItems: response.data.orderitems
        });
      }
    }).catch((err) => {
        console.log(err);
    });
  }

  getOrderDetail(orderCuid){
    return axios.get("/api/get_order?cuid="+orderCuid , {
    });
  }

  savePackageOrder(){
    var p_qty = this.state.packed_qty_value;
    var p_Id = this.props.purchaseOrdrId;
    var orderitems =[];
      orderitems.push({
        packed_qty: p_qty,
        _id: p_Id
      })
    this.addPackageOrder(orderitems).then((response) => {
      if(response.data) {
        console.log("redirect-to");
      }
    }).catch((err) => {
      console.log(err);
    });
    this.context.router.push('/orders/'+p_Id)
    this.props.receivedOrderStatus()
  }

  addPackageOrder(orderitems){
    return axios.post("/api/purchaseorders", {
      orderitems: orderitems
    });
  }

  checkProductQty(){
    var p_qty = this.state.packed_qty_value;
    var p_Id = this.props.purchaseOrdrId;
    this.isValidQty(p_Id, p_qty).then((response) => {
      if(response.data) {
        this.savePackageOrder()
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  isValidQty(p_Id, p_qty){
    return axios.get("/api/valid_qty?order_id="+ p_Id+ "&packed_qty=" + p_qty, {
    });
  }

  handleInputChange(event){
    this.setState({
      packed_qty_value: event.target.value
    })
  }

  render(){
    return(
      <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
        <div className="received_order_rght">
          <div className="rcv_order_header">
            <ul className="order_breadcrumb">
              <li className="active"><a href="#"> &lt; {this.props.purchaseOrdrId} </a></li>
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
                <input type="date" className="form-control" placeholder="21-10-2016" />
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
                        <td className="text-center">
                          <span>{order.packed_qty}</span>
                        </td>
                        <td className="text-center">
                          <input type="text" className="form-control pck_input" value={this.state.packed_qty_value} onChange={this.handleInputChange} />
                        </td>
                      </tr>
                    )
                  })}
                  </tbody>
                </table>
                <div className="gross_order">
                  <button type="button" className="btn btn-default pckg_cncel_btn mtop0">Cancel</button>
                  <button type="button" className="btn btn-default nxt_btn orange_bg mtop0" onClick={this.checkProductQty}>Save details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

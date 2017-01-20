import React from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import { Link } from 'react-router';

export default class CreateNewPackage extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      orderItems: [],
      packed_qty_value : 0,
      _updateState: [],
      pckge_date: '',
      newPackageDetails: []
    };
    this.savePackageOrder = this.savePackageOrder.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.checkProductQty = this.checkProductQty.bind(this)
    this.handlePackageDate = this.handlePackageDate.bind(this)
    this.getViewPackge = this.getViewPackge.bind(this)
    PubSub.subscribe('pckg detail', this.getViewPackge);
  }

  componentDidMount(){
    this.generatePackageId()
    var orderCuid = this.props.params.orderId;
    this.getOrderDetail(orderCuid).then((response) => {
      if(response.data) {
        this.setState({
          orderItems: response.data
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

  handlePackageDate(event){
    this.setState({
      pckge_date : event.target.value
    },function(){
    })
  }

  generatePackageId() {
    console.log("=====")
    this.newPackageId().then((response) => {
      if(response.data) {
        this.setState({
          newPackageDetails: response.data
        })
      }
    }).catch((err) => {
    console.log(err);
    });
  }

  newPackageId(){
    return axios.post("/api/create_package");
  }

  savePackageOrder(){
    var p_qty = this.state.packed_qty_value;
    var o_Id = this.props.params.orderId;
    var p_Id = this.state.newPackageDetails.id;
    var p_date = this.state.pckge_date;
    var orderitems =[];
      orderitems.push({
        packed_qty: p_qty,
        _id: o_Id
      })
    this.addPackageOrder(orderitems, p_Id, p_date).then((response) => {
      if(response.data) {
        console.log("redirect-to");
      }
      this.getViewPackge("status", response.data)
    }).catch((err) => {
      console.log(err);
    });
    this.context.router.push('/orders/'+o_Id)
  }

  addPackageOrder(orderitems, p_Id, p_date){
    return axios.put("/api/update_package", {
      orderitems: orderitems,
      package_id: p_Id,
      pkg_date: p_date
    });
  }

  checkProductQty(){
    var p_qty = this.state.packed_qty_value;
    var o_Id = this.props.purchaseOrdrId;
    this.isValidQty(o_Id, p_qty).then((response) => {
      if(response.data) {
        this.savePackageOrder()
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  isValidQty(o_Id, p_qty){
    return axios.get("/api/valid_qty?order_id="+ o_Id+ "&packed_qty=" + p_qty, {
    });
  }

  handleInputChange(event){
    this.setState({
      packed_qty_value: event.target.value
    })
  }

  getViewPackge(msg, result){
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
                      <input type="text" className="form-control" value= {"PKG-"+this.state.newPackageDetails.pkgId} required disabled />
                    </div>
                    <div className="form-group">
                      <label htmlFor="" className="col-form-label">Date</label>
                      <input type="date" className="form-control" placeholder="21-10-2016" onChange={this.handlePackageDate}/>
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
          </div>
        </div>
      </div>
    )
  }
}
import React from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import { Link } from 'react-router';
import ReceivedOrder from './ReceivedOrder';
import PurchaseOrders from './PurchaseOrders';
import OrderItemsList from './OrderItemsList';
import toastr from 'toastr';

var orderItemID;
var orderCuid;
var _orditems =[];
var _pckdQty =[];

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
      newPackageDetails: [],
      po: ""
    };
    this.savePackageOrder = this.savePackageOrder.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.checkProductQty = this.checkProductQty.bind(this)
    this.handlePackageDate = this.handlePackageDate.bind(this)
    this.getViewPackge = this.getViewPackge.bind(this)
    this.validate = this.validate.bind(this)
    PubSub.subscribe('pckg detail', this.getViewPackge);
  }

  componentDidMount(){
    this.generatePackageId()
    orderCuid = PurchaseOrders.purchsCuid;
    this.getOrderDetail(orderCuid).then((response) => {
      if(response.data) {
        this.setState({
          orderItems: response.data.orderitems,
          po: response.data.orderId
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

  validate() {
    var valid= true;
    var _date = this.state.pckge_date
    if (_date == "") {
      alert("Date cannot be blank");
      valid = false;
    }
    return valid
  }

  handlePackageDate(event){
    this.setState({
      pckge_date : event.target.value
    })
  }

  generatePackageId() {
    this.newPackageId().then((response) => {
      if(response.data) {
        this.setState({
          newPackageDetails: response.data
        })
        console.log(this.state.newPackageDetails)
      }
    }).catch((err) => {
    console.log(err);
    });
  }

  newPackageId(){
    return axios.post("/api/create_package");
  }

  savePackageOrder(){
    if(this.validate()){
      console.log(_orditems)
      //var p_qty = this.state.packed_qty_value;
      var o_Id = orderItemID;
      var p_Id = this.state.newPackageDetails.id;
      var p_date = this.state.pckge_date;
      /*var orderitems =[];
        orderitems.push({
          packed_qty: p_qty,
          _id: o_Id
        })*/
      this.addPackageOrder(_orditems, p_Id, p_date).then((response) => {
        toastr.success('Package successfully created');
         console.log(response.statusText)
        if(response.statusText== "Ok") {
          this.getViewPackge("status", response.data)
        }
      }).catch((err) => {
        toastr.error('Creating Package failed. Packed order quantity cannot be null');
        console.log(err);
      });
      this.context.router.push('/orders/'+orderCuid)
    }
  }

  addPackageOrder(_orditems, p_Id, p_date){
    if(_orditems.length == 0){
      toastr.error('Creating Package failed. Packed order quantity must be less than ordered quantity');
    }
    return axios.put("/api/update_package", {
      orderitems: _orditems,
      package_id: p_Id,
      pkg_date: p_date
    });
  }

  checkProductQty(shp_value, id){
    var p_qty = shp_value;
    var o_Id = id;
    this.isValidQty(o_Id, p_qty).then((response) => {
      if(response.data.msg== "Ok") {
        if (_orditems.length == 0){
          _orditems.push({
            packed_qty: p_qty,
            _id: o_Id
          })
        }
        else {
          {_orditems.map((ord, i) => {
            if(_orditems[i]._id == o_Id && _orditems[i].packed_qty == p_qty ) {
            }
            else if(_orditems[i]._id == o_Id && _orditems[i].packed_qty !== p_qty){
              _orditems[i].packed_qty = p_qty;
            }
            else if(_orditems[i]._id !== o_Id){
              _orditems.push({
                packed_qty: p_qty,
                _id: o_Id
              })
            }
          })}
        }
        console.log(_orditems)
      }
      else{
        alert("Please fill Quantity to pack less than Ordered")
        return false;
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  isValidQty(o_Id, p_qty){
    return axios.get("/api/valid_qty?order_id="+ o_Id+ "&packed_qty=" + p_qty, {
    });
  }

  handleInputChange(event, index, oID){
    this.setState({
      [event.target.name]: event.target.value
    })
    this.checkProductQty(event.target.value, oID)
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
                    <li className="active"><a href="#"> &lt; {"PO-"+this.state.po} </a></li>
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
                      <input type="text" className="form-control" value= {"PKG-"+this.state.newPackageDetails.pkgId} disabled />
                    </div>
                    <div className="form-group">
                      <label htmlFor="" className="col-form-label">Date</label>
                      <input type="date" className="form-control" onChange={this.handlePackageDate} />
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
                            {this.state.orderItems.map((order, index) => 
                              <OrderItemsList name={"ord"+index} ref="ordItem"
                              key = {index} index = {index} order={order} 
                              value={this.state.packed_qty_value} 
                              handleInputChange={(event) => this.handleInputChange(event, index, order.id)} />)}
                        </tbody>
                      </table>
                      <div className="gross_order">
                        <button type="button" className="btn btn-default pckg_cncel_btn mtop0">Cancel</button>
                        <button type="button" className="btn btn-default nxt_btn orange_bg mtop0" onClick={this.savePackageOrder}>Save details</button>
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
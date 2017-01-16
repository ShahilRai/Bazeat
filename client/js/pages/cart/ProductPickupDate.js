import React from 'react';
import axios from 'axios';
import CheckoutStep from './CheckoutStep';
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let months = ["january","Feburary","March","April","May","June","July","August","September","October","November","December"];
let perPageDateDisplay = 5;
let orderDetailResponse ;
export default class ProductPickupDate extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props) {
    super(props);
      this.state = {
        method:this.props.method,
        _arrayOfMonthDayAndDate: [],
        currentUser_Detail : {},
        orderDetail : {}
      }
      this.pickupdate = this.pickupdate.bind(this);
      this.destination = this.destination.bind(this);
      this.deliverToPerson = this.deliverToPerson.bind(this);
      this.deliveryDetails = this.deliveryDetails.bind(this);
      this.displayForm = this.displayForm.bind(this);
      this.createOrder = this.createOrder.bind(this);
  }

  displayDataMonthDay(){
    let date = new Date();
    var self = this
    var startingday = 0
    var i;
    var _placeHolderArr = []
    var _currentDay = date.getDay()
    for( i=0;i<perPageDateDisplay;i++)
    {
      var getCDay = _currentDay + i
      if(getCDay > 6){
        getCDay = startingday
        startingday++
        _placeHolderArr.push({
          day: days[getCDay],
          month: months[date.getMonth()],
          current_date: date.getDate() + i
        })
      }else{
        _placeHolderArr.push({
          day: days[getCDay],
          month: months[date.getMonth()],
          current_date: date.getDate() + i
        })
      }
    }
    this.setState({
      _arrayOfMonthDayAndDate: _placeHolderArr
    })
  }

  componentDidMount(){
    this.displayDataMonthDay();
    var email=this.context.user ? this.context.user.username : ''
    this.loadCurrentUserAddress(email).then((response) => {
        if(response.data.user) {
          this.setState({
            currentUser_Detail: response.data.user
          });
        }
    }).catch((err) => {
        console.log(err);
    });
  }

  displayForm(){
    document.getElementById("checkout_form").style.display = "block";
  }

  showMoreDays(){
    perPageDateDisplay = perPageDateDisplay+5;
    this.displayDataMonthDay();
    this.setState({
    _arrayOfMonthDayAndDate : _placeHolderArr
    });
    this.pickupdate();
  }

  /*displayTimeSlot(){

  }

  loadTimeSlot(){
    return axios.post("/api/get_time_slots?product_id="+product_id);
  }*/
  loadCurrentUserAddress(email) {
    return axios.get("/api/user?email="+email);
  }

  createOrder(){
    var cart_cuid = this.props.cartCuid
    var email=this.context.user ? this.context.user.username : ''
    this.createOrderRequest(email, cart_cuid).then((response) => {
        if(response.data) {
          if(this.refs.myRef){
           this.setState({
            orderDetail : response.data
           });
          }
    orderDetailResponse = response.data.order
    if(orderDetailResponse)
      {
        this.props.nextStep("id",orderDetailResponse);
      }
       }
    }).catch((err) => {
        console.log(err);
    });
  }

  createOrderRequest(email, cart_cuid){
    return axios.post("api/orders",
      {
        email : email,
        cart_cuid : cart_cuid,
        shipment_price : 100
      });
  }

  pickupdate(){
    return(
      <div className="full_width ptop0">
        <div className="chkout_pg chkoutstep3">
          <h3>Pickup date</h3>
          <h4>When can we expect to see you?</h4>
          <CheckoutStep step={this.props.step}/>
          <div className="pick_update">
            {this.state._arrayOfMonthDayAndDate.map((monthDayDate, index) =>
              <div className="pickup_row1" key={index}>
                <span className="pickup_day" >{monthDayDate.day} - {monthDayDate.month}-{monthDayDate.current_date}</span>
                <span className="chkout_pickup_time">{monthDayDate.date}</span>
              </div>
            )}
            <div className="chkout_step1btns">
            <button type="button" className="btn btn-default more_days_btn" onClick={this.showMoreDays.bind(this)}>Show more days</button>
            <button type="button" className="btn btn-default continue_btn" onClick={this.props.nextStep}>Continue</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  destination(){
    return(
      <div className="full_width ptop0">
        <div className="chkout_pg chkoutstep3_2">
          <h3>Destination</h3>
          <h4>Where do you want your products delivered?</h4>
          <CheckoutStep step={this.props.step}/>
          <h5>We will ship the goods to <br/>{this.state.currentUser_Detail.address}<br/>{this.state.currentUser_Detail.postal_code}<br/>{this.state.currentUser_Detail.city}.</h5>
          <div className="del_addr_heading"><a href="javascript:void(0)" onClick={() =>{this.displayForm()}}><h6>Please deliver at this address instead</h6></a></div>
          <div  className="del_det_form">
            <div id="checkout_form" className="edit_prfile_detail_form">
              <h3>Details</h3>
                {this.deliveryDetails()}
            </div>
          </div>
          <button type="button" className="btn btn-default continue_btn" onClick={this.createOrder} ref="myRef">Continue</button>
        </div>
      </div>
    );
  }

  deliverToPerson(){
    return(
      <div className="full_width ptop0">
        <div className="chkout_pg">
          <h3>A couple of words from {this.state.currentUser_Detail.full_name}</h3>
          <h4>We would like you to know that...</h4>
          <CheckoutStep step={this.props.step}/>
          <h5>We will ship the the goods to <br/>{this.state.currentUser_Detail.address}<br/>{this.state.currentUser_Detail.postal_code}<br/>{this.state.currentUser_Detail.city}.</h5>
          <div className="del_addr_heading"><a href="javascript:void(0)" onClick={() =>{this.displayForm()}}><h6>Please deliver at this address instead</h6></a></div>
          <div  className="del_det_form">
            <div id="checkout_form" className="edit_prfile_detail_form">
              <h3>Details</h3>
              {this.deliveryDetails()}
            </div>
          </div>
          <p>
          { this.state.currentUser_Detail ? this.state.currentUser_Detail.delivery_options : 'undefined'}
          </p>
          <button type="button" className="btn btn-default continue_btn" onClick={this.createOrder}>Continue</button>
        </div>
      </div>
    );
  }

  selected(){
    if(this.state.method == 'hentemat'){
      return(
      this.pickupdate()
      )
    }
    if(this.state.method == 'Sendemat'){
      return(
      this.destination()
      )
    }
    if(this.state.method == 'Budmat'){
      return(
      this.deliverToPerson()
      )
    }
  }

  deliveryDetails(){
    return(
      <div className="delivery_details">
        <form className="ptop30">
          <div className="passwrd_form">
            <div className="form-group row">
              <label for="example-search-input" className="col-md-5 col-xs-12 col-form-label">E-mail*</label>
              <div className="col-md-7 col-xs-12">
                <input className="form-control" type="text" name="email"/>
              </div>
            </div>
            <div className="form-group row">
              <label for="example-search-input" className="col-md-5 col-xs-12 col-form-label">First name*</label>
              <div className="col-md-7 col-xs-12">
                <input className="form-control" type="text" name="firstname"/>
              </div>
            </div>
            <div className="form-group row">
              <label for="example-url-input" className="col-md-5 col-xs-12 col-form-label">C/O</label>
              <div className="col-md-7 col-xs-12">
                <input className="form-control" type="text" name="c/o"/>
              </div>
            </div>
            <div className="form-group row">
              <label for="example-search-input" className="col-md-5 col-xs-12 col-form-label">Post code*</label>
              <div className="col-md-7 col-xs-12">
                <input className="form-control" type="text" name="postCode"/>
              </div>
            </div>
          </div>
          <div className="passwrd_form">
            <div className="form-group row">
              <label for="example-search-input" className="col-md-5 col-xs-12 col-form-label">Phone number*</label>
              <div className="col-md-7 col-xs-12">
                <input className="form-control" type="text" name="phoneNo"/>
              </div>
            </div>
            <div className="form-group row">
              <label for="example-url-input" className="col-md-5 col-xs-12 col-form-label">Last Name*</label>
              <div className="col-md-7 col-xs-12">
              <input className="form-control" type="text" name="lastName"/>
              </div>
            </div>
            <div className="form-group row">
              <label for="example-url-input" className="col-md-5 col-xs-12 col-form-label">Address*</label>
              <div className="col-md-7 col-xs-12">
              <input className="form-control" type="text" name="address"/>
              </div>
            </div>
            <div className="form-group row">
              <label for="example-search-input" className="col-md-5 col-xs-12 col-form-label">City*</label>
              <div className="col-md-7 col-xs-12">
                <input className="form-control" type="text" name="city"/>
              </div>
            </div>
          </div>
          <p className="mandatory_txt">* Mandatory fields</p>
        </form>
        <div className="profile_gry_bot_bar chkout_step1btns">
          <button type="submit" className="btn btn-default continue_btn" onClick={this.props.nextStep}>Continue</button>
        </div>
        <div className="del_det_head">
          <span className="del_alter">Delivery alternative</span>
          <span className="del_info">Info</span>
          <span className="del_date">Delivery date</span>
          <span className="del_price">Price</span>
        </div>
        <div className="del_info_row grey_bg">
          <span className="custom_radio_edit del_alter hot_food">
            <input id="detail6" type="radio" name="c_detail" value="detail1"/>
            <label for="detail6">Hjem p&aring; kvelden, 17-21</label>
          </span>
          <span className="del_info">
            <p className="pbot0">
              Pakken leveres hjem til deg, sj&aring;f&oslash;ren<br/>ringer 30-60 min. f&oslash;r ankomst
            </p>
          </span>
          <span className="del_date text-center">
            <p className="pbot0">
              2016-12-12
            </p>
          </span>
          <span className="del_price text-center">
            <p className="pbot0">
              134,00
            </p>
          </span>
        </div>
        <div className="del_info_row">
          <span className="custom_radio_edit del_alter hot_food">
            <input id="detail7" type="radio" name="c_detail" value="detail1"/>
            <label for="detail7">P&aring; posten, 08-16</label>
          </span>
          <span className="del_info">
            <p className="pbot0">
              Majorstuen postkontor. &Aring;pningstider Man - Fre: 0800-1800, L&oslash;r: 1000-1500
            </p>
          </span>
          <span className="del_date text-center">
            <p className="pbot0">
              2016-12-12
            </p>
          </span>
          <span className="del_price text-center">
            <p className="pbot0">
              134,00
            </p>
          </span>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="full_width_container">
        {this.selected()}
      </div>
    );
  }
}


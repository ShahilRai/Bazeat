import React from 'react';
import axios from 'axios';
import CheckoutStep from './CheckoutStep';
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let months = ["january","Feburary","March","April","May","June","July","August","September","October","November","December"];
let dayInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
let perPageDateDisplay = 5;
let orderDetailResponse ;
let alternateAddress ;
let timeslots = [];
let timeslotss = [];
let timeslotday;
let start_time;
let end_time;
let day;

export default class ProductPickupDate extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props) {
    super(props);
      this.state = {
        method:this.props.method,
        shippingPrice : this.props._price,
        cart_detail : this.props.cart_detail,
        currentTimeSlot : [],
        _arrayOfMonthDayAndDate: [],
        currentUser_Detail : {},
        orderDetail : {},
        sendematAlternateAddressDetail : {},
        budmatAlternateAddressDetail : {}
      }
      this.pickupdate = this.pickupdate.bind(this);
      this.destination = this.destination.bind(this);
      this.deliverToPerson = this.deliverToPerson.bind(this);
      this.deliveryDetails = this.deliveryDetails.bind(this);
      this.displayForm = this.displayForm.bind(this);
      this.createOrder = this.createOrder.bind(this);
      this.sendematAlternateAddress =this.sendematAlternateAddress.bind(this);
      this.budmatAlternateAddress = this.budmatAlternateAddress.bind(this);
      this.OptionalAlternateAddessButton = this.OptionalAlternateAddessButton.bind(this);
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
      if(date.getDate() + i > dayInMonth[date.getMonth()]){
        if(getCDay > 6){
          getCDay = startingday
          startingday++
          _placeHolderArr.push({
            day: days[getCDay],
            month: months[date.getMonth()+1],
            current_date: (date.getDate() + i)- dayInMonth[date.getMonth()],
            start_time:this.start_time,
            end_time:this.end_time
          })
        }else{
          _placeHolderArr.push({
            day: days[getCDay],
            month: months[date.getMonth()+1],
            current_date: (date.getDate() + i)- dayInMonth[date.getMonth()],
            start_time:this.start_time,
            end_time:this.end_time
          })
        }
      }else if(getCDay > 6){
        getCDay = startingday
        startingday++
        _placeHolderArr.push({
          day: days[getCDay],
          month: months[date.getMonth()],
          current_date: date.getDate() + i,
          start_time:this.start_time,
          end_time:this.end_time
        })
      }else{
        _placeHolderArr.push({
          day: days[getCDay],
          month: months[date.getMonth()],
          current_date: date.getDate() + i,
          start_time:this.start_time,
          end_time:this.end_time
        })
      }
    }
    this.setState({
      _arrayOfMonthDayAndDate: _placeHolderArr
    })
  }

  componentDidMount(){
    
    this.displayDataMonthDay();
    this.displayTimeSlot()
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

  loadCurrentUserAddress(email) {
    return axios.get("/api/user?email="+email);
  }

  displayForm(){
    document.getElementById("checkout_form").style.display = "block";
  }

//display more 5 days for the deliver method Hentemat
  showMoreDays(){
    perPageDateDisplay = perPageDateDisplay+5;
    this.displayDataMonthDay();
    this.setState({
    _arrayOfMonthDayAndDate : _placeHolderArr
    });
    this.pickupdate();
  }

  displayTimeSlot(){
    var email=this.context.user ? this.context.user.email : ''
    this.loadTimeSlot(email).then((response) => {
        if(response.data) {
          this.setState({
            currentTimeSlot: response.data.timeslot
          });
        }
    }).catch((err) => {
        console.log(err);
    });
  }

//load the time slot for producer
  loadTimeSlot(email){
    return axios.get("/api/get_time?email="+email);
  }

  createOrder(){
    var cart_cuid = this.props.cart_detail.cuid
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
          this.props.nextStep(orderDetailResponse,orderDetailResponse);
        }
      }
      }).catch((err) => {
          console.log(err);
      });
  }

  createOrderRequest(email, cart_cuid){
    if(this.props.method == 'hentemat')
    {
      return axios.post("api/orders",
      {
        email : email,
        cart_cuid : cart_cuid,
        shipment_price : 0
      });
    }
    else
    {
      return axios.post("api/orders",
      {
        email : email,
        cart_cuid : cart_cuid,
        shipment_price : this.props._price
      });
    }
  }

  budmatAlternateAddress(){
    var cart_cuid = this.props.cart_detail.cuid
    var _newEmail = this.refs.newEmail.value
    var _firstName = this.refs.firstName.value
    var _co = this.refs.co.value
    var _postCode = this.refs.postCode.value
    var _phoneNo = this.refs.phoneNo.value
    var _lastName = this.refs.lastName.value
    var _address  = this.refs.address.value
    var _city = this.refs.city.value
    this.budmatAlternateAddressRequest( cart_cuid, _newEmail, _firstName, _co, _postCode, _phoneNo, _lastName, _address, _city).then((response) => {
      if(response.data) {
          this.setState({
            budmatAlternateAddressDetail: response.data.updated_order
          });
        }
    }).catch((err) => {
        console.log(err);
    });
  }

// save alternate address for delivery method budmat
  budmatAlternateAddressRequest(cart_cuid, _newEmail, _firstName, _co, _postCode, _phoneNo, _lastName, _address, _city){
    return axios.put("api/budamat_address?cart_cuid="+cart_cuid,
      {
        email : _newEmail,
        first_name : _firstName,
        co : _co,
        postal_code : _postCode,
        phone_num : _phoneNo,
        last_name : _lastName,
        line1 : _address,
        city : _city
      });
  }

  sendematAlternateAddress(){
    var cart_cuid = this.props.cart_detail.cuid
    var email=this.context.user ? this.context.user.username : ''
    var _newEmail = this.refs.newEmail.value
    var _firstName = this.refs.firstName.value
    var _co = this.refs.co.value
    var _postCode = this.refs.postCode.value
    var _phoneNo = this.refs.phoneNo.value
    var _lastName = this.refs.lastName.value
    var _address  = this.refs.address.value
    var _city = this.refs.city.value
    var type = this.refs.updateaddress.value
    this.sendematAlternateAddressRequest(email, cart_cuid, _newEmail, _firstName, _co, _postCode, _phoneNo, _lastName, _address, _city, type).then((response) => {
        if(response.data) {
          this.setState({
            sendematAlternateAddressDetail: response.data
          });
        }
    }).catch((err) => {
        console.log(err);
    });
  }

// save alternate address for delivery method sendemat
  sendematAlternateAddressRequest(email, cart_cuid, _newEmail, _firstName, _co, _postCode, _phoneNo, _lastName, _address, _city, type){
    return axios.put("/api/shipping_price?email="+email+"&cart_cuid="+cart_cuid,
      {
        email : _newEmail,
        first_name : _firstName,
        co : _co,
        postal_code : _postCode,
        phone_num : _phoneNo,
        last_name : _lastName,
        line1 : _address,
        city : _city,
        type: type
      });
  }

  OptionalAlternateAddessButton(){
    if(this.props.method == 'Sendemat')
    {
      return(
        <button type="submit" className="btn btn-default continue_btn" onClick={this.sendematAlternateAddress}>Save</button>
        )
    }
    else
    {
      return(
        <button type="submit" className="btn btn-default continue_btn" onClick={this.budmatAlternateAddress}>Save</button>
        )
    }
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
            <button type="button" className="btn btn-default continue_btn" onClick={this.createOrder}>Continue</button>
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
          <h5>We will ship the goods to <br/>{this.props.cart_detail.address.line1}<br/>{this.props.cart_detail.address.postal_code}<br/>{this.props.cart_detail.address.city}.</h5>
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
          <h3>A couple of words from {this.props.cart_detail.address.first_name}</h3>
          <h4>We would like you to know that...</h4>
          <CheckoutStep step={this.props.step}/>
          <h5>We will ship the the goods to <br/>{this.props.cart_detail.address.line1}<br/>{this.props.cart_detail.address.postal_code}<br/>{this.props.cart_detail.address.city}.</h5>
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
          <button type="button" className="btn btn-default continue_btn" onClick={this.createOrder} ref="myRef">Continue</button>
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
                <input className="form-control" type="text" name="_newEmail" ref="newEmail" value={this.state._newEmail} />
              </div>
            </div>
            <div className="form-group row">
              <label for="example-search-input" className="col-md-5 col-xs-12 col-form-label">First name*</label>
              <div className="col-md-7 col-xs-12">
                <input className="form-control" type="text" name="_firstName" ref="firstName" value={this.state._firstName} />
              </div>
            </div>
            <div className="form-group row">
              <label for="example-url-input" className="col-md-5 col-xs-12 col-form-label">C/O</label>
              <div className="col-md-7 col-xs-12">
                <input className="form-control" type="text" name="_co" ref="co" value={this.state._co} />
              </div>
            </div>
            <div className="form-group row">
              <label for="example-search-input" className="col-md-5 col-xs-12 col-form-label">Post code*</label>
              <div className="col-md-7 col-xs-12">
                <input className="form-control" type="text" name="postCode" ref="postCode" value={this.state._postCode} />
              </div>
            </div>
          </div>
          <div className="passwrd_form">
            <div className="form-group row">
              <label for="example-search-input" className="col-md-5 col-xs-12 col-form-label">Phone number*</label>
              <div className="col-md-7 col-xs-12">
                <input className="form-control" type="text" name="_phoneNo" ref="phoneNo" value={this.state._phoneNo} />
              </div>
            </div>
            <div className="form-group row">
              <label for="example-url-input" className="col-md-5 col-xs-12 col-form-label">Last Name*</label>
              <div className="col-md-7 col-xs-12">
              <input className="form-control" type="text" name="_lastName" ref="lastName" value={this.state._lastName} />
              </div>
            </div>
            <div className="form-group row">
              <label for="example-url-input" className="col-md-5 col-xs-12 col-form-label">Address*</label>
              <div className="col-md-7 col-xs-12">
              <input className="form-control" type="text" name="_address" ref="address" value={this.state._address} />
              </div>
            </div>
            <div className="form-group row">
              <label for="example-search-input" className="col-md-5 col-xs-12 col-form-label">City*</label>
              <div className="col-md-7 col-xs-12">
                <input className="form-control" type="text" name="_city" ref="city" value={this.state._city} />
              </div>
            </div>
            <div className="form-group row">

              <div className="col-md-7 col-xs-12">
                <input className="form-control" type="hidden" name="update" ref="updateaddress" value="update_address" />
              </div>
            </div>
          </div>
          <p className="mandatory_txt">* Mandatory fields</p>
        </form>
        <div className="profile_gry_bot_bar chkout_step1btns">
            { this.OptionalAlternateAddessButton() }
        </div>
      </div>
    )
  }

  render() {
    timeslots== this.state.currentTimeSlot.map((result, index) => {
      timeslotss=result.timeslots
    });
    timeslots== timeslotss.map((result, index) => {
      timeslotday=result.day
    });
    timeslots== timeslotss.map((result, index) => {
      start_time=result.start_time
      end_time=result.end_time
    });
    var id=this.state.currentTimeSlot?this.state.currentTimeSlot.id:'';
    return (
      <div className="full_width_container">
        {this.selected()}
      </div>
    );
  }
}


import React from 'react';
import axios from 'axios';
import toastr from 'toastr';
import CheckoutStep from './CheckoutStep';
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
let months = ["january","Feburary","March","April","May","June","July","August","September","October","November","December"];
let dayInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
let perPageDateDisplay = 5;
let orderDetailResponse ;
let alternateAddress ;
let budmat_shipment_price;
let producer_timeslots = [];
let producer_ifo ;
let openTime;
let openDay;
let date_value_day;
let time_value_day;
let product_id;
let start_time;
let end_time;
let day = [];

export default class ProductPickupDate extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props) {
    super(props);
      this.state = {
        e_mail:'',
        phone_number:'',
        first_name:'',
        last_name:'',
        address:'',
        postal_code:'',
        city:'',
        method:this.props.method,
        shippingPrice : this.props._price,
        cart_detail : this.props.cart_detail,
        currentTimeSlot : [],
        _arrayOfMonthDayAndDate: [],
        currentUser_Detail : {},
        orderDetail : {},
        sendematAlternateAddressDetail : {},
        budmatAlternateAddressDetail : {},
        select_input: false,
        disabled: false
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
            start_time: start_time,
            end_time: end_time
          })
        }else{
          _placeHolderArr.push({
            day: days[getCDay],
            month: months[date.getMonth()+1],
            current_date: (date.getDate() + i)- dayInMonth[date.getMonth()],
            start_time: start_time,
            end_time: end_time
          })
        }
      }else if(getCDay > 6){
        getCDay = startingday
        startingday++
        _placeHolderArr.push({
          day: days[getCDay],
          month: months[date.getMonth()],
          current_date: date.getDate() + i,
          start_time: start_time,
          end_time: end_time
        })
      }else{
        _placeHolderArr.push({
          day: days[getCDay],
          month: months[date.getMonth()],
          current_date: date.getDate() + i,
          start_time: start_time,
          end_time: end_time
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

  /*displayForm(){
    document.getElementById("checkout_form").style.display = "block";
  }*/

  displayForm(){
    var el = document.getElementById('checkout_form');
    if ( el.style.display != 'block' ){
      el.style.display = 'block';
    }
    else{
      el.style.display = 'none';
    }
  }

  goToBackPage(){
    this.props.backStep()
  }

//display more 5 days for the deliver method Hentemat
  showMoreDays(){

    perPageDateDisplay = perPageDateDisplay+5;
    if(perPageDateDisplay>10)
    {
      this.handleClik()
      toastr.error('sorry, you can not do it again');
    }
    else{
      this.displayDataMonthDay();
      this.setState({
      _arrayOfMonthDayAndDate : _placeHolderArr
      });
      this.pickupdate();

    }
  }

  handleClik() {
    this.setState( {disabled: !this.state.disabled} )
  }

  getSelectedDate(e){
    date_value_day = e.target.value
    $(e.target).addClass("input_green_txt");
    this.setState({
      select_input: true
    })
  }

  displayTimeSlot(){
    this.loadTimeSlot(product_id).then((response) => {
        if(response.data) {
          this.setState({
            currentTimeSlot: response.data.producer
          });
        }
    }).catch((err) => {
        console.log(err);
    });
  }

//load the time slot for producer with address
  loadTimeSlot(email){
    return axios.get("/api/hentemat_address?product_id="+product_id);
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
      if((orderDetailResponse) || (producer_ifo,date_value_day,time_value_day))
        {
          this.props.nextStep(orderDetailResponse,orderDetailResponse,producer_ifo,date_value_day,time_value_day);
        }
      }
      }).catch((err) => {
          console.log(err);
          toastr.success('Please add your bank account first');
      });
  }

  createOrderRequest(email, cart_cuid){
    if(this.props.method == 'hentemat')
    {
      return axios.post("api/orders",
      {
        email : email,
        cart_cuid : cart_cuid,
        shipment_price : 0,
        delivery_method : this.props.method
      });
    }
    else if(this.props.method == 'Budmat')
    {
      return axios.post("api/orders",
      {
        email : email,
        cart_cuid : cart_cuid,
        shipment_price : budmat_shipment_price,
        delivery_method : this.props.method
      });
    }
    else
    {
      return axios.post("api/orders",
      {
        email : email,
        cart_cuid : cart_cuid,
        shipment_price : this.props._price,
        delivery_method : this.props.method
      });
    }
  }

  isValidate(){
    var valid = true;
    var email = document.getElementById('E-mail');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email.value)) {
      this.setState({
        e_mail:(<p>Please provide a valid email address</p>)
      })
      email.focus;
      valid = false
      document.getElementById('incorrect').style.visibility="visible";
      document.getElementById('correct').style.visibility="hidden";
    }else{
      this.setState({
      e_mail:''
      })
    }
    if (!this.refs.phoneNo.value){
      this.setState({
      phone_number:(<p>Please fill your phone number</p>)
      })
      valid = false
    }else{
      this.setState({
      phone_number:''
      })
    }if (!this.refs.firstName.value){
      this.setState({
      first_name:(<p>Please fill your first name</p>)
      })
      valid = false
    }else{
      this.setState({
      first_name:''
      })
    }if (!this.refs.lastName.value){
      this.setState({
      last_name:(<p>Please fill your last name</p>)
      })
      valid = false
    }else{
      this.setState({
      last_name:''
      })
    }if (!this.refs.address.value){
      this.setState({
      address:(<p>Please fill your address</p>)
      })
      valid = false
    }else{
      this.setState({
      address:''
      })
    }if (!this.refs.postCode.value){
      this.setState({
      postal_code:(<p>Please fill your post code</p>)
      })
      valid = false
    }else{
      this.setState({
      postal_code:''
      })
    }if (!this.refs.city.value){
      this.setState({
      city:(<p>Please fill your city name</p>)
      })
      valid = false
    }else{
      this.setState({
      city:''
      })
    }
    return valid;
  }

  budmatAlternateAddress(){
    if(this.isValidate()){
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
          toastr.success('Your have changed your address for delivery');
          this.setState({
            budmatAlternateAddressDetail: response.data.updated_order
          });
          }
      }).catch((err) => {
        toastr.success('sorry, address has not change ');
        console.log(err);
      });
    }
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
    if(this.isValidate()){
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
            toastr.success('Your have changed your address for delivery');
            this.setState({
              sendematAlternateAddressDetail: response.data
            });
          }
      }).catch((err) => {
        toastr.success('sorry, address has not change ');
        console.log(err);
      });
    }
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
            {this.state._arrayOfMonthDayAndDate.map((monthDayDate, index)=>{
              if(day.includes(monthDayDate.day)){
                return(
                  <div className="pickup_row1 span" key={index} ref="wrapperdiv">
                    <a href="javascript:void(0)">
                      <span className="pickup_day" id ="sp1" ref="span_value"  onClick={this.getSelectedDate.bind(this)}><input className="pickup_day rdonly" id ="txt1" type="text" readonly disabled="disabled" value={(monthDayDate.day)+" - "+(monthDayDate.month)+" "+(monthDayDate.current_date)+"   "+(start_time)+" - "+(end_time)}/></span>
                    </a>
                  </div>
                )
              }else
                return(
                  <div className="pickup_row1 span" key={index} ref="wrapperdiv">
                    <a href="javascript:void(0)" >
                      <span className="pickup_day" onClick={this.getSelectedDate.bind(this)}><input className="pickup_day_time rdonly" id ="txt1" type="text" readonly disabled="disabled" value={(monthDayDate.day)+" - "+(monthDayDate.month)+" "+(monthDayDate.current_date)}/></span>
                    </a>
                  </div>
                )
              }
            )}
            <div className="chkout_step1btns">
            <button type="button" className="btn btn-default more_days_btn" disabled={this.state.disabled?"disabled":''}onClick={this.showMoreDays.bind(this)}>Show more days</button>
            <button type="button" className="btn btn-default continue_btn" onClick={this.createOrder}>Continue</button>
            </div>
            <button type="button" className="btn btn-default continue_btn" onClick={ this.goToBackPage.bind(this)}>Back</button>
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
          <div className="del_addr_heading "><a href="javascript:void(0)" onClick={() =>{this.displayForm()}}><h6>Please deliver at this address instead</h6></a></div>
          <div  className="del_det_form">
            <div id="checkout_form" className="edit_prfile_detail_form">
              <h3>Details</h3>
                {this.deliveryDetails()}
            </div>
          </div>
          <button type="button" className="btn btn-default continue_btn" onClick={this.createOrder} ref="myRef">Continue</button>
          <button type="button" className="btn btn-default continue_btn" onClick={ this.goToBackPage.bind(this)}>Back</button>
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
          <button type="button" className="btn btn-default continue_btn mrht10" onClick={ this.goToBackPage.bind(this)}>Back</button>
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
                <input id="E-mail" className="form-control" type="email" name="_newEmail" ref="newEmail" value={this.state._newEmail} required={ true }/>
                {this.state.e_mail}
              </div>
            </div>
            <div className="form-group row">
              <label for="example-search-input" className="col-md-5 col-xs-12 col-form-label">First name*</label>
              <div className="col-md-7 col-xs-12">
                <input className="form-control" type="text" name="_firstName" ref="firstName" value={this.state._firstName} required={ true }/>
                {this.state.first_name}
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
                <input className="form-control" type="text" name="postCode" ref="postCode" value={this.state._postCode} required={ true }/>
                {this.state.postal_code}
              </div>
            </div>
          </div>
          <div className="passwrd_form">
            <div className="form-group row">
              <label for="example-search-input" className="col-md-5 col-xs-12 col-form-label">Phone number*</label>
              <div className="col-md-7 col-xs-12">
                <input className="form-control" type="text" name="_phoneNo" ref="phoneNo" value={this.state._phoneNo} required={ true }/>
                {this.state.phone_number}
              </div>
            </div>
            <div className="form-group row">
              <label for="example-url-input" className="col-md-5 col-xs-12 col-form-label">Last Name*</label>
              <div className="col-md-7 col-xs-12">
              <input className="form-control" type="text" name="_lastName" ref="lastName" value={this.state._lastName} required={ true }/>
              {this.state.last_name}
              </div>
            </div>
            <div className="form-group row">
              <label for="example-url-input" className="col-md-5 col-xs-12 col-form-label">Address*</label>
              <div className="col-md-7 col-xs-12">
              <input className="form-control" type="text" name="_address" ref="address" value={this.state._address} required={ true }/>
              {this.state.address}
              </div>
            </div>
            <div className="form-group row">
              <label for="example-search-input" className="col-md-5 col-xs-12 col-form-label">City*</label>
              <div className="col-md-7 col-xs-12">
                <input className="form-control" type="text" name="_city" ref="city" value={this.state._city} required={ true }/>
                {this.state.city}
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
    this.state.currentTimeSlot.map((result, i) =>{
    producer_ifo = result._producer
    producer_timeslots = result._producer.timeslots
    budmat_shipment_price = result.shipment
    });

    producer_timeslots.map((result, i) =>{
      start_time = result.start_time
      end_time = result.end_time
      day = result.day
    });

    openTime= (start_time)+" - "+(end_time)
    var cart_info = this.props.cart_detail.cartitems
    cart_info.map((result, i) =>{
      product_id = result.product_id
    });

    return (
      <div className="full_width_container">
        {this.selected()}
      </div>
    );
  }
}

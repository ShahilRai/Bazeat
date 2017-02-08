import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import toastr from 'toastr';
import DocumentTitle from 'react-document-title';
import { UserProfileForm } from 'react-stormpath';
import ImageUploader from './ImageUploader';
import TextAreaField from '../components/TextAreaField';
import TextAreaFieldForUser from '../components/TextAreaFieldForUser';
import InputField from '../components/InputField';
import DateComponent from '../components/DateComponent';
import LabelField from '../components/LabelField';
import SelectField from '../components/SelectField';
import SelectFieldBirthDate from '../components/SelectFieldBirthDate';
import SelectFieldBirthMonth from '../components/SelectFieldBirthMonth';
import SelectFieldBirthYear from '../components/SelectFieldBirthYear';
import AddHoursDetail from './AddHoursDetail';
var moment = require('moment');

export default class UserProfilePage extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      user : {},
      user_info: {},
      birth_date: {},
      data_loaded: false
    };
    this.handleDateChange = this.handleDateChange.bind(this)
    this.formatDate=this.formatDate.bind(this)
    this.onFormSubmitSuccess=this.onFormSubmitSuccess.bind(this)
  }

  componentDidMount() {
    var userEmail = this.context.user.email
    this.loadUserData(userEmail).then((response) => {
        if(response.data.user) {
          this.setState({
            user: response.data.user,
            user_info:response.data.user.user_info,
            birth_date: moment(response.data.user.birth_date).format('YYYY-MM-DD'),
            data_loaded: true
          });
        }
    }).catch((err) => {
        console.log(err);
    });
  }

  loadUserData(emailAddress) {
    return axios.get("/api/edit" , {
      params: {
        email: emailAddress
      }
    });
  }

  formatDate(date) {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  onFormSubmitSuccess(e, next){
    next();
    toastr.success('Profile successfully Updated');
    this.context.router.push('/add-account');
  }

  handleDateChange(event) {
    if(this.formatDate(new Date())>=event.target.value){
      this.setState({ birth_date: event.target.value});
      if (this.state.onChange){
        this.state.onChange(event);
      }
    }else{
      alert("Please enter a valid date")
    }
  }

  _renderleftMenus(){
    return(
      <ul className="edit_sidbar_list">
        <li className="active"><Link to="/profile">Edit Profile</Link></li>
        <li><Link to="javascript:void(0)">Verification</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
        <li><Link to="/add-account">Bank Account</Link></li>
        <li><Link to="/message">Messages</Link></li>
      </ul>
    )
  }

  render() {
    if(!this.state.data_loaded){
      return (<div></div>);
    }
    return (
      <DocumentTitle title={`My Profile`}>
        <div className="container padd_87">
          <div className="full_width">
            <div className="row">
              <div className="col-lg-3 col-md-2 col-sm-2 col-xs-12 edit_profile_sidebar">
                {this._renderleftMenus()}
              </div>
              <div className="col-lg-9 col-md-8 col-sm-10 col-xs-12 edit_profile_rht_sidebar">
                  <div className="edit_prfile_detail_form">
                    <h3>Profile details </h3>
                    <ImageUploader image={this.state.user.photo} />
                    <UserProfileForm method = "post" onSubmit={this.onFormSubmitSuccess.bind(this)}>
                      <div className="edt_prf_inner_detail ptop0">
                        <div className="form-group row">
                          <LabelField className = "col-md-4 col-xs-12 col-form-label" htmlFor="givenName" label="First name*" />
                          <div className="col-md-8 col-xs-12">
                            <input type="text" className="form-control capitalize" id="givenName" name="givenName" required />
                          </div>
                        </div>
                        <div className="form-group row">
                          <LabelField className = "col-md-4 col-xs-12 col-form-label" htmlFor="lastName" label="Last name*" />
                          <div className="col-md-8 col-xs-12">
                            <input type="text" className="form-control capitalize" id="surname" name="surname" required/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <LabelField className = "col-md-4 col-xs-12 col-form-label" htmlFor="gender" label="Gender" />
                          <div className="col-md-8 col-xs-12">
                            <div className="custom_select_box">
                              <SelectField className="form-control" name="gender" value = {this.state.user_info.gender} />
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <LabelField className = "col-md-4 col-xs-12 col-form-label" htmlFor="Birth date" label="Birth date" />
                          <div className="col-md-8 col-xs-12">
                            <div className="custom_select_box day_select_edit">
                              <SelectFieldBirthDate name="day" value = {this.state.user.birth_date ? this.state.user.birth_date.day : ''}/>
                            </div>
                            <div className="custom_select_box month_select_edit">
                              <SelectFieldBirthMonth name="month" value = {this.state.user.birth_date ? this.state.user.birth_date.month : ''}/>
                            </div>
                            <div className="custom_select_box day_select_edit">
                              <SelectFieldBirthYear name="year" value = {this.state.user.birth_date ? this.state.user.birth_date.year : ''}/>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <LabelField className = "col-md-4 col-xs-12 col-form-label" htmlFor="email" label="E-mail address" />
                          <div className="col-md-8 col-xs-12">
                            <input type="email" className="form-control" id="email" name="email" required disabled />
                          </div>
                        </div>
                        <div className="form-group row">
                          <LabelField className = "col-md-4 col-xs-12 col-form-label" htmlFor="phone" label="Phone number" />
                          <InputField type="number" name="phone" value = {this.state.user.phone} />
                        </div>
                        <div className="form-group row">
                          <LabelField className = "col-md-4 col-xs-12 col-form-label" htmlFor="example-search-input" label="Address*" />
                          <InputField type="search" name="address" value = {this.state.user.address} />
                        </div>
                        <div className="form-group row">
                          <LabelField className = "col-md-4 col-xs-12 col-form-label" htmlFor="example-email-input" label="City*" />
                          <InputField name="city" value = {this.state.user.city} />
                        </div>
                        <div className="form-group row">
                          <LabelField className = "col-md-4 col-xs-12 col-form-label" htmlFor="example-url-input" label="Country*" />
                          <InputField name="country" value = {this.state.user.country} />
                        </div>
                        <div className="form-group row">
                          <LabelField className = "col-md-4 col-xs-12 col-form-label" htmlFor="example-url-input" label="Postal code*" />
                          <InputField type="number" name="postal_code" value = {this.state.user.postal_code} />
                        </div>
                        <div className="form-group row">
                          <LabelField className = "col-md-4 col-xs-12 col-form-label" htmlFor="desc" label="Description" />
                          <TextAreaField name="desc" value = {this.state.user.description}>{this.state.user.description}</TextAreaField>
                        </div>
                      </div>
                      <div className="edt_prf_inner_detail ">
                        <div className="form-group row">
                          <LabelField htmlFor="desc" className="col-md-4 col-xs-12 col-form-label" label="Delivery information" />
                          <TextAreaFieldForUser name="delivery_options"  value = {this.state.user.delivery_options} >{this.state.user.delivery_options}</TextAreaFieldForUser>
                          
                        </div>
                        <div className="form-group row">
                            <LabelField htmlFor="example-tel-input" className="col-md-4 col-xs-12 col-form-label" label="Visiting hours"/>
                            <AddHoursDetail  email = {this.context.user.email} />
                        </div>
                      </div>
                      <div key="update-button" className="profile_gry_bot_bar">
                          <p className="alert alert-danger" data-spIf="form.error"><span data-spBind="form.errorMessage" /></p>
                          <p className="alert alert-success" data-spIf="form.successful">Profile updated.</p>
                          <button type="submit" className="btn pull-right">
                            <span data-spIf="!form.processing">Save details</span>
                            <span data-spIf="form.processing">Updating...</span>
                          </button>
                      </div>
                    </UserProfileForm>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import { UserProfileForm } from 'react-stormpath';
import InputField from '../components/InputField';
import TextAreaField from '../components/TextAreaField';
import TextAreaFieldForUser from '../components/TextAreaFieldForUser';
import ImageUploader from './ImageUploader';
import LabelField from '../components/LabelField';
import SelectField from '../components/SelectField';
import SelectFieldBirthDate from '../components/SelectFieldBirthDate';
import SelectFieldBirthMonth from '../components/SelectFieldBirthMonth';
import SelectFieldBirthYear from '../components/SelectFieldBirthYear';
import moment from 'moment';
import AddHoursDetail from './AddHoursDetail';

export default class ProducerProfilePage extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      user : {},
      birth_date: {},
      producer_info: {},
      user_info: {},
      data_loaded: false,
      items: []
    };
    this.handleDateChange = this.handleDateChange.bind(this)
    this.formatDate=this.formatDate.bind(this)
  }

  componentDidMount() {
    var userEmail = this.context.user.email
    this.loadUserData(userEmail).then((response) => {
      if(response.data.user) {
        this.setState({
          user: response.data.user,
          producer_info: response.data.user.producer_info,
          //birth_date: moment(response.data.user.birth_date).format('YYYY-MM-DD'),
          user_info: response.data.user.user_info,
          data_loaded: true,
          items: response.data.user.timeslots
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
              <div className="col-lg-3 col-md-2 col-sm-2 col-xs-12 purchase_order_left_sidebar order_purchse_lt_wdth edit_profile_sidebar">
                {this._renderleftMenus()}
              </div>
              <div className="col-lg-9 col-md-8 col-sm-10 col-xs-12 edit_profile_rht_sidebar">
                <UserProfileForm method = "post">
                  <div className="edit_prfile_detail_form">
                    <h3>Business details </h3>
                    <ImageUploader image={this.state.user.photo}/>
                    <div className="edt_prf_inner_detail">
                      <div className="form-group row">
                        <LabelField htmlFor="business_name" className="col-md-4 col-xs-12 col-form-label" label="Business name" />
                        <InputField name="business_name" value = {this.state.producer_info.business_name} />
                      </div>
                      <div className="form-group row">
                        <LabelField htmlFor="org_number" className="col-md-4 col-xs-12 col-form-label" label="Org. number" />
                          <InputField type="number" name="org_number" value = {this.state.producer_info.org_number} />
                      </div>
                      <div className="form-group row">
                        <LabelField htmlFor="subject_to_vat" className="col-md-4 col-xs-12 col-form-label" label="Subject to VAT" />
                        <div className="col-md-8 col-xs-12">
                          <SelectField vat ={true} name="sub_to_vat" value = {this.state.user.sub_to_vat} />
                        </div>
                      </div>
                      <div className="form-group row">
                        <LabelField htmlFor="email" className="col-md-4 col-xs-12 col-form-label" label="E-mail address" />
                        <div className="col-md-8 col-xs-12">
                          <input type="email" className="form-control" id="email" name="email" disabled/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <LabelField htmlFor="phone" className="col-md-4 col-xs-12 col-form-label" label="Phone number" />
                        <InputField type="number" name="cmp_phone_number" value = {this.state.producer_info.cmp_phone_number} />
                      </div>
                      <div className="form-group row">
                        <LabelField htmlFor="pass" className="col-md-4 col-xs-12 col-form-label" label="Company web site" />
                        <InputField name="cmp_web_site" value = {this.state.producer_info.cmp_web_site} required/>
                      </div>
                      <div className="form-group row">
                        <LabelField htmlFor="desc" className="col-md-4 col-xs-12 col-form-label" label="Company description" />
                        <TextAreaField value={this.state.user.description} name="desc">{this.state.user.description}</TextAreaField>
                      </div>
                    </div>
                  </div>
                  <div className="edit_prfile_detail_form">
                    <h3>Personal details </h3>
                    <div className="edt_prf_inner_detail">
                      <div className="form-group row">
                        <LabelField htmlFor="first_name" className="col-md-4 col-xs-12 col-form-label" label="First name" />
                        <div className="col-md-8 col-xs-12">
                          <input type="text" className="form-control" id="givenName" name="givenName" required />
                        </div>
                      </div>
                      <div className="form-group row">
                        <LabelField htmlFor="last_name" className="col-md-4 col-xs-12 col-form-label" label="Last name" />
                        <div className="col-md-8 col-xs-12">
                          <input type="text"  className="form-control" id="surname" name="surname" required/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <LabelField htmlFor="visiting_address" className="col-md-4 col-xs-12 col-form-label" label="Visiting address" />
                        <InputField type="search"  name="address" value = {this.state.user.address}  />
                      </div>
                      <div className="form-group row">
                        <LabelField htmlFor="postal_code" className="col-md-4 col-xs-12 col-form-label" label="Postal code" />
                        <InputField type="number" name="postal_code" value = {this.state.user.postal_code} />
                      </div>
                      <div className="form-group row">
                        <LabelField htmlFor="city" className="col-md-4 col-xs-12 col-form-label" label="City" />
                        <InputField name="city" value = {this.state.user.city} required/>
                      </div>
                      <div className="form-group row">
                          <LabelField className = "col-md-4 col-xs-12 col-form-label" htmlFor="example-url-input" label="Country*" />
                          <InputField name="country" value = {this.state.user.country} />
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
                    </div>
                  </div>
                  <div className="edit_prfile_detail_form">
                    <h3>Location and visiting details</h3>
                    <div className="edt_prf_inner_detail">
                      <div className="form-group row">
                        <LabelField htmlFor="example-search-input" className="col-md-4 col-xs-12 col-form-label" label="Visiting address" />
                         <InputField type="search"  name="cmp_address" value = {this.state.producer_info.cmp_address}  />
                      </div>
                      <div className="form-group row">
                        <LabelField htmlFor="example-url-input" className="col-md-4 col-xs-12 col-form-label" label="Postal code"/>
                        <InputField type="number" name="cmp_postal_code" value = {this.state.producer_info.cmp_postal_code} />
                      </div>
                      <div className="form-group row">
                        <LabelField htmlFor="example-email-input" className="col-md-4 col-xs-12 col-form-label" label="City" />
                        <InputField  name="cmp_city" value = {this.state.producer_info.cmp_city}  />
                      </div>
                      <div className="form-group row">
                        <LabelField htmlFor="example-url-input" className="col-md-4 col-xs-12 col-form-label" label="Country"/>
                        <InputField  name="cmp_country" value = {this.state.producer_info.cmp_country} />
                      </div>
                      <div className="form-group row">
                        <LabelField htmlFor="example-tel-input" className="col-md-4 col-xs-12 col-form-label" label="Visiting hours"/>
                        <AddHoursDetail  email = {this.context.user.email} items={this.state.items} />
                      </div>
                    </div>
                  </div>
                  <div className="edit_prfile_detail_form">
                    <h3>Delivery details </h3>
                    <div className="edt_prf_inner_detail">
                      <div className="form-group row">
                        <LabelField htmlFor="desc" className="col-md-4 col-xs-12 col-form-label" label="Delivery information" />
                        <TextAreaFieldForUser name="delivery_options"  value = {this.state.user.delivery_options} >{this.state.user.delivery_options}</TextAreaFieldForUser>
                      </div>
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
      </DocumentTitle>
    );
  }
}

import React from 'react';
import axios from 'axios';
import DocumentTitle from 'react-document-title';
import { UserProfileForm } from 'react-stormpath';
import InputField from '../components/InputField';
import TextAreaField from '../components/TextAreaField';
import ImageUploader from './ImageUploader';
import LabelField from '../components/LabelField';
import SelectField from '../components/SelectField';
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
      getTime: []
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.getTimeDetails=this.getTimeDetails.bind(this);
  }

  componentDidMount() {
    var userEmail = this.context.user.email
    this.loadUserData(userEmail).then((response) => {
        if(response.data.user) {
          this.setState({
            user: response.data.user,
            producer_info: response.data.user.producer_info,
            birth_date: moment(response.data.user.birth_date).format('YYYY-MM-DD'),
            user_info: response.data.user.user_info,
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

  handleDateChange(event) {
    this.setState({ birth_date: event.target.value});
    if (this.state.onChange){
      this.state.onChange(event);
    }
  }

  getTimeDetails(value){
    this.setState({
      getTime: value
    })
  }
  render() {
    //console.log("get-Time: " + JSON.stringify(this.state.getTime))
    if (!this.state.data_loaded) {
      return (<div></div>);
    }

    return (
      <DocumentTitle title={`My Profile`}>
        <div className="col-lg-9 col-md-8 col-sm-10 col-xs-12 edit_profile_rht_sidebar">
          <UserProfileForm method = "post">
            <div className="edit_prfile_detail_form">
              <h3>Business details </h3>
              <ImageUploader image={this.state.user.photo}/>
              <div className="edt_prf_inner_detail">
                <div className="form-group row">
                  <LabelField htmlFor="business_name" className="col-md-4 col-xs-12 col-form-label" label="Business name" />
                  <InputField  name="business_name" value = {this.state.producer_info.business_name} />
                </div>
                <div className="form-group row">
                  <LabelField htmlFor="org_number" className="col-md-4 col-xs-12 col-form-label" label="Org. number" />
                    <InputField  name="org_number" value = {this.state.producer_info.org_number} />
                </div>
                <div className="form-group row">
                  <LabelField htmlFor="account_number" className="col-md-4 col-xs-12 col-form-label" label="Account number" />
                    <InputField  name="account_number" value = {this.state.user.account_number} />
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
                    <input type="email" className="form-control" id="email" name="email" required />
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
                  <TextAreaField value={this.state.producer_info.cmp_description} name="cmp_description">{this.state.producer_info.cmp_description}</TextAreaField>
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
                <div className="form-group expiry_date_col " id="">
                  <label htmlFor="" className="col-form-label qty_label">Birth date</label>
                  <div id="datetimepicker1" className="date_section">
                  <input type="date" id="birth_date" name="birth_date" value={this.state.birth_date} className="form-control date_input" ref="expiry_date" onChange={this.handleDateChange}/>
                  <span className="add-on"><i aria-hidden="true"></i></span>
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
                  <AddHoursDetail  getTimeDetails={this.getTimeDetails}/>
                  {this.state.getTime.map((time,i)=>
                  <div key ={i}>
                    <input type="hidden" key ={i}  name = {"timeslots["+i+"][start_time]"}  value={time.start_time} />
                    <input type="hidden" key ={i}  name = {"timeslots["+i+"][end_time]"}  value={time.end_time} />
                    <input type="hidden" key ={i}  name = {"timeslots["+i+"][day]"}  value={time.day} />
                  </div>
                  )}
                </div>
              </div>
            </div>
            <div className="edit_prfile_detail_form">
              <h3>Delivery details </h3>
              <div className="edt_prf_inner_detail">
                <div className="form-group row">
                  <LabelField htmlFor="desc" className="col-md-4 col-xs-12 col-form-label" label="Delivery information" />
                  <TextAreaField name="cmp_delivery_options"  value = {this.state.producer_info.cmp_delivery_options} >{this.state.producer_info.cmp_delivery_options}</TextAreaField>
                  <text>if you will deliver the your products to your customers, it would be great to inform them about the particulars. This information will show up under *Delivery details* for Budmat.</text>
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
      </DocumentTitle>
    );
  }
}

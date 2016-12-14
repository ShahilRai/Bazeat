import React from 'react';
import DocumentTitle from 'react-document-title';
import { UserProfileForm } from 'react-stormpath';
import ImageUploader from './ImageUploader';
import TextAreaField from '../components/TextAreaField';
import InputField from '../components/InputField';
import DateComponent from '../components/DateComponent';
import LabelField from '../components/LabelField';
import SelectField from '../components/SelectField';
var moment = require('moment');

export default class UserProfilePage extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      user : {},
      birth_date: {},
      data_loaded: false
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    var userEmail = this.context.user.email
    this.loadUserData(userEmail).then((response) => {
        if(response.data.user) {
          this.setState({
            user: response.data.user,
            birth_date: moment(response.data.user.birth_date).format('YYYY-MM-DD'),
            data_loaded: true
          });
        }else{
          this.setState({
            birth_date: moment(Date()).format('YYYY-MM-DD')
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

  render() {

    if (!this.state.data_loaded) {
      return (<div></div>);
    }

    return (
      <DocumentTitle title={`My Profile`}>
        <div className="col-lg-9 col-md-8 col-sm-10 col-xs-12 edit_profile_rht_sidebar">
            <div className="edit_prfile_detail_form">
              <h3>Profile details </h3>
              <ImageUploader image={this.state.user.photo} />
              <UserProfileForm method = "post">
                <div className="edt_prf_inner_detail">
                  <div className="form-group row">
                    <LabelField htmlFor="givenName" label="First name*" />
                    <div className="col-md-8 col-xs-12">
                      <input type="text" className="form-control" id="givenName" name="givenName" required />
                    </div>
                  </div>
                  <div className="form-group row">
                    <LabelField htmlFor="lastName" label="Last name*" />
                    <div className="col-md-8 col-xs-12">
                      <input type="text" className="form-control" id="surname" name="surname" required/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <LabelField htmlFor="gender" label="Gender" />
                    <div className="col-md-8 col-xs-12">
                      <SelectField className="form-control" name="gender" value = {this.state.user.user_info.gender} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <LabelField htmlFor="Birth date" label="Birth date" />
                    <div className="col-md-8 col-xs-12">
                      <input type="date" id="birth_date" name="birth_date"  onChange={this.handleDateChange} value = {this.state.birth_date}/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <LabelField htmlFor="email" label="E-mail address" />
                    <div className="col-md-8 col-xs-12">
                      <input type="email" className="form-control" id="email" name="email" required />
                    </div>
                  </div>
                  <div className="form-group row">
                    <LabelField htmlFor="phone" label="Phone number" />
                    <InputField type="number" name="phone" value = {this.state.user.phone} />
                  </div>
                  <div className="form-group row">
                    <LabelField htmlFor="example-search-input" label="Address*" />
                    <InputField type="search" name="address" value = {this.state.user.address} />
                  </div>
                  <div className="form-group row">
                    <LabelField htmlFor="example-email-input" label="City*" />
                    <InputField name="city" value = {this.state.user.city} />
                  </div>
                  <div className="form-group row">
                    <LabelField htmlFor="example-url-input" label="Country*" />
                    <InputField name="country" value = {this.state.user.country} />
                  </div>
                  <div className="form-group row">
                    <LabelField htmlFor="example-url-input" label="Postal code" />
                    <InputField type="number" name="postal_code" value = {this.state.user.postal_code} />
                  </div>
                  <div className="form-group row">
                    <LabelField htmlFor="desc" label="Description" />
                    <TextAreaField name="desc" value = {this.state.user.description}>{this.state.user.description}</TextAreaField>
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
      </DocumentTitle>
    );
  }
}

import React from 'react';
import DocumentTitle from 'react-document-title';
import { UserProfileForm } from 'react-stormpath';
import InputField from '../components/InputField';
import TextAreaField from '../components/TextAreaField';
import ImageUploader from './ImageUploader';
import LabelField from '../components/LabelField';
export default class ProducerProfilePage extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      user : {},
      producer_info: {},
      user_info: {},
      data_loaded: false
    };
  }

  componentDidMount() {
    var userEmail = this.context.user.email
    this.loadUserData(userEmail).then((response) => {
        if(response.data.user) {
          this.setState({
            user: response.data.user,
            producer_info: response.data.user.producer_info,
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

  render() {

    if (!this.state.data_loaded) {
      return (<div></div>);
    }

    return (
      <DocumentTitle title={`My Profile`}>
        <div className="col-lg-9 col-md-8 col-sm-10 col-xs-12 edit_profile_rht_sidebar">
          <ImageUploader image={this.state.user.photo}/>
          <UserProfileForm method = "post">
            <div className="edit_prfile_detail_form">
              <h3>Profile details </h3>
              <div className="edt_prf_inner_detail">
                <div className="form-group row">
                  <LabelField htmlFor="givenName" className="col-md-4 col-xs-12 col-form-label" label="Producer name" />
                  <div className="col-md-8 col-xs-12">
                    <input type="text" className="form-control" id="givenName" name="givenName" required />
                  </div>
                </div>
                <div className="form-group row">
                  <LabelField htmlFor="contactPerson" className="col-md-4 col-xs-12 col-form-label" label="Contact person" />
                    <InputField  name="contact_person" value = {this.state.producer_info.contact_person} />
                </div>
                <div className="form-group row">
                  <LabelField htmlFor="email" className="col-md-4 col-xs-12 col-form-label" label="E-mail address" />
                  <div className="col-md-8 col-xs-12">
                    <input type="email" className="form-control" id="email" name="email" required />
                  </div>
                </div>
                <div className="form-group row">
                  <LabelField htmlFor="phone" className="col-md-4 col-xs-12 col-form-label" label="Phone number" />
                  <InputField  name="phone" value = {this.state.user.phone} />
                </div>
                <div className="form-group row">
                  <LabelField htmlFor="pass" className="col-md-4 col-xs-12 col-form-label" label="Company web site" />
                  <InputField name="website" value = {this.state.producer_info.website} required/>
                </div>
                <div className="form-group row">
                  <LabelField htmlFor="desc" className="col-md-4 col-xs-12 col-form-label" label="Company description" />
                  <TextAreaField  name="desc">{this.state.user.description}</TextAreaField>
                </div>
              </div>
            </div>
            <div className="edit_prfile_detail_form">
              <h3>Location and visiting details</h3>
              <div className="edt_prf_inner_detail">
                <div className="form-group row">
                  <LabelField htmlFor="example-search-input" className="col-md-4 col-xs-12 col-form-label" label="Visiting address" />
                   <InputField type="search"  name="address" value = {this.state.user.address}  />
                </div>
                <div className="form-group row">
                  <LabelField htmlFor="example-email-input" className="col-md-4 col-xs-12 col-form-label" label="city" />
                  <InputField  name="city" value = {this.state.user.city}  />
                </div>
                <div className="form-group row">
                  <LabelField htmlFor="example-url-input" className="col-md-4 col-xs-12 col-form-label" label="Country"/>
                  <InputField  name="country" value = {this.state.user.country} />
                </div>
                <div className="form-group row">
                  <LabelField htmlFor="example-tel-input" className="col-md-4 col-xs-12 col-form-label" label="Visiting hours"/>
                  <div className="col-md-8 col-xs-12">
                    <a href="#" className="add_hrs_btn">+ Add hours</a>
                    <span className="visting_hr_time_col">
                      <span className="visting_hr_inner_col">
                        <span className="pull-left">
                          <label>From</label><input className="form-control mrht5" type="text" />
                        </span>
                        <span className="pull-right">
                          <label>to</label><input className="form-control" type="text" />
                        </span>
                        <ul className="attnding_days">
                          <li><a href="#">Mon</a></li>
                          <li><a href="#">Tues</a></li>
                          <li><a href="#">Wed</a></li>
                          <li><a href="#">Thurs</a></li>
                          <li><a href="#">Fri</a></li>
                          <li><a href="#">Sat</a></li>
                          <li><a href="#">Sun</a></li>
                        </ul>
                      </span>
                      <span className="visting_hr_fotter">
                        <div className="checkbox custom_checkbox">
                          <input id="checkbox2" type="checkbox" />
                          <label htmlFor="checkbox2">
                            Apply to all days
                          </label>
                        </div>
                        <span className="app_btns">
                          <a href="#" className="add_btn">Add</a>
                          <a href="#" className="cncl_btn">Cancel</a>
                        </span>
                      </span>
                    </span>
                  </div>
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
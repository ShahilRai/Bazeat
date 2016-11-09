import React from 'react';
import DocumentTitle from 'react-document-title';
import { UserProfileForm } from 'react-stormpath';
import ImageUploader from './ImageUploader';
import InputField from '../components/InputField';
import TextAreaField from '../components/TextAreaField';
export default class UserProfilePage extends React.Component {
  
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
    this.handleChange = this.handleChange.bind(this);
    this.handleProducerInfoChange = this.handleProducerInfoChange.bind(this);
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

  handleChange(event){
    this.setState({
      user: {
        [event.target.name]: event.target.value
      }
    });
  }

  handleProducerInfoChange(event){
    this.setState({
      producer_info: {
        [event.target.name]: event.target.value
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
        <ImageUploader />
          <UserProfileForm method = "post">
            <div className="edit_prfile_detail_form">
              <h3>Profile details </h3>
                
                <div className="edt_prf_inner_detail">
                 
                  <div className="form-group row">
                    <label htmlFor="givenName" className="col-md-4 col-xs-12 col-form-label">First name</label>
                    <div className="col-md-8 col-xs-12">
                      <input type="text" className="form-control" id="givenName" name="givenName" required />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="lastName" className="col-md-4 col-xs-12 col-form-label">Last name</label>
                    <div className="col-md-8 col-xs-12">
                      <input type="text" className="form-control" id="surname" name="surname" required/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="gender" className="col-md-4 col-xs-12 col-form-label">Gender</label>
                    <div className="col-md-8 col-xs-12">  
                      <select className="form-control gender_selct" id="gender" name="gender" value={this.state.user.gender} onChange = {this.handleChange}>
                        <option value="Select one">Select one</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="Birth date" className="col-md-4 col-xs-12 col-form-label">Birth date</label>
                    <div className="col-md-8 col-xs-12">  
                      <select className="form-control custom_selct date_selct">
                        <option value="male">Day</option>
                      </select>

                      <select className="form-control custom_selct mnth_selct">
                        <option value="male">Month</option>
                      </select>

                      <select className="form-control custom_selct date_selct">
                        <option value="male">Year</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="email" className="col-md-4 col-xs-12 col-form-label">E-mail address</label>
                    <div className="col-md-8 col-xs-12">
                      <input type="email" className="form-control" id="email" name="email" required />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="phone" className="col-md-4 col-xs-12 col-form-label">Phone number</label>
                      <InputField type="tel" name="phone" value = {this.state.user.phone} />
                   </div>
                  <div className="form-group row">
                    <label htmlFor="example-search-input" className="col-md-4 col-xs-12 col-form-label">Address</label>
                    <div className="col-md-8 col-xs-12">
                      <input className="form-control" type="search" id="address" name="address" value = {this.state.user.address} onChange = {this.handleChange} />
                    </div>
                  </div>
                  <div className="form-group row">
                      <label htmlFor="example-email-input" className="col-md-4 col-xs-12 col-form-label">City</label>
                      <div className="col-md-8 col-xs-12">
                      <input className="form-control" type="text" id="city" name="city" value = {this.state.user.city} onChange = {this.handleChange} />
                      </div>
                  </div>
                  <div className="form-group row">
                      <label htmlFor="example-url-input" className="col-md-4 col-xs-12 col-form-label">Country</label>
                      <div className="col-md-8 col-xs-12">
                      <input className="form-control" type="text" id="country" name="country" value = {this.state.user.country} onChange = {this.handleChange} />
                      </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="desc" className="col-md-4 col-xs-12 col-form-label">Description</label>
                      <TextAreaField name="desc" value = {this.state.user.desc} />
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
            </div>
          </UserProfileForm>
        </div>
      </DocumentTitle>
    );
  }
}

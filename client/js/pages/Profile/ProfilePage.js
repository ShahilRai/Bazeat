import React from 'react';
import DocumentTitle from 'react-document-title';
import { UserProfileForm } from 'react-stormpath';
import InputField from '../components/InputField';
export default class ProfilePage extends React.Component {

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
    this.handleUserInfoChange = this.handleUserInfoChange.bind(this);
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

  handleUserInfoChange(event){
    this.setState({
      user_info: {
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
          <UserProfileForm method = "post">
            <div className="edit_prfile_detail_form">
              <h3>Profile details </h3>

                <div className="edt_prf_inner_detail">
                  <div className="form-group row">
                    <label htmlFor="file-1" className="col-md-4 col-xs-12 col-form-label">Company logo</label>
                    <div className="col-md-8 col-xs-12">
                      <a href="#"><img src={require('../../../images/producer_logo.png')}/></a>
                      <div className="box__input">
                        <input name="file-1[]" id="file-1" className="logo" data-multiple-caption="{count} files selected" multiple="" type="file" />
                        <label className="input_upload">
                        <span className="file_text">Select one of the files from your computer <br/><span className="drop_txt">or drag and drop them here</span></span></label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="givenName" className="col-md-4 col-xs-12 col-form-label">Producer name</label>
                    <div className="col-md-8 col-xs-12">
                      <input type="text" className="form-control" id="givenName" name="givenName" required />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="contactPerson" className="col-md-4 col-xs-12 col-form-label">Contact person</label>
                    <div className="col-md-8 col-xs-12">
                      <input type="text" className="form-control" id="contact_person" name="contact_person" value = {this.state.producer_info.contact_person} onChange = {this.handleProducerInfoChange} />
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
                    <div className="col-md-8 col-xs-12">
                      <input type="tel" className="form-control" id="phone" name="phone" value = {this.state.user.phone} onChange = {this.handleChange} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="pass" className="col-md-4 col-xs-12 col-form-label">Company web site</label>
                    <div className="col-md-8 col-xs-12">
                      <input type="text" className="form-control" id="website" name="website" value = {this.state.producer_info.website} onChange = {this.handleProducerInfoChange} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="desc" className="col-md-4 col-xs-12 col-form-label">Company description</label>
                    <div className="col-md-8 col-xs-12">
                      <textarea className="form-control" id="company_description" name="company_description" defaultValue = {this.state.producer_info.company_description} onChange = {this.handleProducerInfoChange} />
                    </div>
                  </div>
                </div>
            </div>
            <div className="edit_prfile_detail_form">
              <h3>Location and visiting details</h3>
                <div className="edt_prf_inner_detail">
                  <div className="form-group row">
                    <label htmlFor="example-search-input" className="col-md-4 col-xs-12 col-form-label">Visiting address</label>
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
                      <input className="form-control" type="text" id="country" name="country" value = {this.state.user.country} onChange = {this.handleChange}/>
                      </div>
                  </div>
                  <div className="form-group row">
                      <label htmlFor="example-tel-input" className="col-md-4 col-xs-12 col-form-label">Visiting hours</label>
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



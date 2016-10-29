import React from 'react';
import DocumentTitle from 'react-document-title';
import { UserProfileForm } from 'react-stormpath';

export default class ProfilePage extends React.Component {
  render() {
    return (
      <DocumentTitle title={`My Profile`}>
        <div className="col-lg-9 col-md-8 col-sm-10 col-xs-12 edit_profile_rht_sidebar">
          <div className="edit_prfile_detail_form">
            <h3>Profile details </h3>
            <UserProfileForm method = "post">
              <div className="edt_prf_inner_detail">
                <div className="form-group row">
                  <label for="example-text-input" className="col-md-4 col-xs-12 col-form-label">Company logo</label>
                  <div className="col-md-8 col-xs-12">
                    <a href="#"><img src={require('../../../images/producer_logo.png')}/></a>
                    <div className="box__input">
                      <input name="file-1[]" id="file-1" className="inputfile inputfile-1" data-multiple-caption="{count} files selected" multiple="" type="file" />
                      <label for="file-1" className="input_upload">
                      <span className="file_text">Select one of the files from your computer <br/><span className="drop_txt">or drag and drop them here</span></span></label>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="example-search-input" className="col-md-4 col-xs-12 col-form-label">Producer name</label>
                  <div className="col-md-8 col-xs-12">
                    <input type="text" className="form-control" id="givenName" name="givenName" required />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="example-email-input" className="col-md-4 col-xs-12 col-form-label">Contact person</label>
                  <div className="col-md-8 col-xs-12">
                    <input type="text" className="form-control" id="contactPerson" name="contactPerson" required />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="example-url-input" className="col-md-4 col-xs-12 col-form-label">E-mail address</label>
                  <div className="col-md-8 col-xs-12">
                    <input type="email" className="form-control" id="email" name="email" required />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="example-tel-input" className="col-md-4 col-xs-12 col-form-label">Phone number</label>
                  <div className="col-md-8 col-xs-12">
                    <input type="tel" className="form-control" id="phone" name="phone" />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="example-password-input" className="col-md-4 col-xs-12 col-form-label">Company web site</label>
                  <div className="col-md-8 col-xs-12">
                    <input type="text" className="form-control" id="pass" name="pass" />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="example-number-input" className="col-md-4 col-xs-12 col-form-label">Company description</label>
                  <div className="col-md-8 col-xs-12">
                    <textarea className="form-control" id="desc" name="desc" ></textarea>
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
      </DocumentTitle>
    );
  }
}

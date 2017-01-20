import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import InputField from '../components/InputField';
import LabelField from '../components/LabelField';
import DocumentTitle from 'react-document-title';
import { UserProfileForm } from 'react-stormpath';

export default class AddAccount extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      user:{},
      file:'',
      imagePreviewUrl:'',
      account_number:''
    };
    this.saveBankDetails = this.saveBankDetails.bind(this)
    this.saveAccount =this.saveAccount.bind(this)
    this._handleImageChange = this._handleImageChange.bind(this)
    this.setAccountNumber = this.setAccountNumber.bind(this)
  }

  saveBankDetails() {
    this.saveAccount(this.context.user.email,this.state.file,this.state.account_number).then((response) => {
      if(response.data) {
        this.setState({
        });
      }
    }).catch((err) => {
    console.log(err);
    });
  }

  saveAccount(email,file,account) {
    return axios.post("/api/bank_account",
      {
        email: email,
        file: file,
        account_number: account
      }
    );
  }

  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
  }

  setAccountNumber(e){
    this.setState({
      account_number: (e.target.value)
    });
  }

  _renderleftMenus(){
    return(
      <ul className="edit_sidbar_list">
        <li><Link to="/profile">Edit Profile</Link></li>
        <li><Link to="javascript:void(0)">Verification</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
        <li className="active"><Link to="/add-account">Bank Account</Link></li>
        <li><Link to="/message">Messages</Link></li>
      </ul>
    )
  }

  render() {
    return (
      <DocumentTitle title={`My Profile`}>
        <div className="container padd_87">
          <div className="full_width">
            <div className="row">
              <div className="col-lg-3 col-md-2 col-sm-2 col-xs-12 purchase_order_left_sidebar order_purchse_lt_wdth edit_profile_sidebar">
                {this._renderleftMenus()}
              </div>
              <div className="col-lg-9 col-md-8 col-sm-10 col-xs-12 edit_profile_rht_sidebar">
                <form onSubmit = {this.saveBankDetails}>
                  <div className="edit_prfile_detail_form">
                    <h3>Bank Account</h3>
                    <div className="edt_prf_inner_detail">
                      <div className="form-group row">
                        <LabelField htmlFor="input_file" className="col-md-4 col-xs-12 col-form-label" label="Upload File" />
                        <input type = "file" onChange={this._handleImageChange} />
                      </div>
                    </div>   
                    <div className="edt_prf_inner_detail">
                      <div className="form-group row">
                        <LabelField htmlFor="account_number" className="col-md-4 col-xs-12 col-form-label" label="Account number" />
                        <InputField type="number" name="account_number" value = {this.state.user.account_number} onChange={this.setAccountNumber} />
                      </div>
                    </div>
                  </div>
                  <div key="update-button" className="profile_gry_bot_bar">
                    <button type="submit" className="btn pull-right">
                      <span data-spIf="!form.processing">Save details</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

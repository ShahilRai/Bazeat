import React from 'react';
import axios from 'axios';
import toastr from 'toastr';
import { Link } from 'react-router';
import InputField from '../components/InputField';
import LabelField from '../components/LabelField';
import DocumentTitle from 'react-document-title';
import { UserProfileForm } from 'react-stormpath';
import request from 'superagent';

let verify;
let submitbutton;
let updateDetail;
export default class AddAccount extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      user:{},
      imagePreviewUrl:'',
      account_number:'',
      file :'',
      uploadedImages :'',
      status : true,
      lastDigit :''
    };
    this.saveBankDetails = this.saveBankDetails.bind(this)
    this.saveAccount =this.saveAccount.bind(this)
    this.setAccountNumber = this.setAccountNumber.bind(this)
    this.addAccountDetails = this.addAccountDetails.bind(this)
  }

    componentDidMount() {
      this.addAccountDetails();
    }

  saveBankDetails() {
    this.saveAccount(this.context.user.email,this.state.account_number).then((response) => {
      if(response.data) {
        toastr.success('Your account  successfully created');
        this.setState({
        });
        this.addAccountDetails();
      }
    }).catch((err) => {
      toastr.error('Sorry, your account not created');
    console.log(err);
    });
  }

  saveAccount(email,account) {
    return axios.post("/api/bank_account",
      {
        email: email,
        account_number: account
      }
    );
  }


  setAccountNumber(e){
    this.setState({
      account_number: (e.target.value)
    });
  }

 addAccountDetails() {
    this.addAccount(this.context.user.email).then((response) => {
      if(response.data) {
        if(response.data.status == false && response.data.err_msg) {
          this.context.router.push('/profile');
          toastr.error(response.data.err_msg);
        }
        this.setState({
          status : response.data.status,
          lastDigit : response.data.last4
        });
      }
    }).catch((err) => {
    console.log(err);
    });
  }

 addAccount(email) {
    return axios.get("/api/check_account?email="+email)
  }


  _renderleftMenus(){
    return(
      <ul className="edit_sidbar_list">
        <li><Link to="/profile">Edit Profile</Link></li>
        <li><Link to="javascript:void(0)">Verification</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
        <li className="active" onClick={this.addAccountDetails}><Link to="/add-account">Bank Account</Link></li>
        <li><Link to="/message">Messages</Link></li>
      </ul>
    )
  }


  render() {
    console.log("status")
    console.log(this.state.status)
        submitbutton = <button type="submit" className="btn pull-right" disabled>
                          <span data-spIf="!form.processing" onClick= {this.saveBankDetails} className="disabled" >Save details</span>
                       </button>

        if(this.state.account_number){
          submitbutton = <button type="submit" className="btn pull-right"><span data-spIf="!form.processing" onClick= {this.saveBankDetails}>Save details</span></button>
        }

if(this.state.status){
      updateDetail =  <div className="col-lg-9 col-md-8 col-sm-10 col-xs-12 edit_profile_rht_sidebar">
                        <div className="edit_prfile_detail_form">
                          <h3>Bank Account</h3>
                          <div className="edt_prf_inner_detail">
                            <div className="form-group row">
                                <LabelField htmlFor="input_file" className="col-md-4 col-xs-12 col-form-label" />
                            </div>
                          </div>
                          <div className="edt_prf_inner_detail">
                            <div className="form-group row">
                              <LabelField htmlFor="account_number" className="col-md-4 col-xs-12 col-form-label" label="Account number" />
                              <InputField type="text" name="account_number" value = {this.state.user.account_number} onChange={this.setAccountNumber} Required/>
                            </div>
                          </div>
                        </div>
                        <div key="update-button" className="profile_gry_bot_bar">
                          {submitbutton}
                        </div>
                      </div>
            }else{
                  updateDetail =<div className="col-lg-9 col-md-8 col-sm-10 col-xs-12 edit_profile_rht_sidebar">
                        <div className="edit_prfile_detail_form">
                          <h3>Bank Account</h3>
                          <div className="bank_inner_detail">
                            <div className="form-group row">
                              <center> <h3>your bank  account no is ******************{this.state.lastDigit}</h3></center>
                            </div>
                          </div>
                        </div>
                      </div>
              }
    return (
      <DocumentTitle title={`My Profile`}>
        <div className="container padd_87">
          <div className="full_width">
            <div className="row">
              <div className="col-lg-3 col-md-2 col-sm-2 col-xs-12 purchase_order_left_sidebar order_purchse_lt_wdth edit_profile_sidebar">
                {this._renderleftMenus()}
              </div>
              {updateDetail}
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

import React from 'react';
import { Link } from 'react-router';
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

export default class Notification extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
      this.state = {
    };
  }

   _renderleftMenus(){
    return(
      <ul className="edit_sidbar_list">
        <li className="active"><Link to="/notification">Notification</Link></li>
        <li><Link to="/setting">Account</Link></li>
      </ul>
    )
  }

  render() {
    return (
    <div className="container padd_87">
        <div className="full_width">
          <div className="row">
            <div className="col-lg-3 col-md-2 col-sm-2 col-xs-12 purchase_order_left_sidebar order_purchse_lt_wdth edit_profile_sidebar">
              {this._renderleftMenus()}
            </div>
            <div className="col-lg-9 col-md-8 col-sm-10 col-xs-12 edit_profile_rht_sidebar">
              <div className="edit_prfile_detail_form prod_notification">
                <h3>E-mail settings</h3>
                <form className="">
                  <div className="edt_prf_inner_detail"> 
                    <div className="form-group row">
                      <label for="example-search-input" className="col-md-4 col-xs-12 col-form-label">Please let us know:</label>
                      <div className="col-md-8 col-xs-12 mtop10">
                        <div className="checkbox prod_checkbox">
                          <input id="checkbox23" type="checkbox" />
                          <label for="checkbox23">
                              When we recieve messages from other Bazeaters 
                          </label>
                        </div>
                        <div className="checkbox prod_checkbox">
                          <input id="checkbox24" type="checkbox" />
                          <label for="checkbox24">
                            When someone writes a review about us 
                          </label>
                        </div>
                        <div className="checkbox prod_checkbox">
                          <input id="checkbox25" type="checkbox" />
                          <label for="checkbox25">
                            When Bazeat makes important updates 
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="edit_prfile_detail_form prod_notification">
                <h3>Text message settings</h3>
                <form className="">
                  <div className="edt_prf_inner_detail">
                    <div className="form-group row">
                      <label for="example-search-input" className="col-md-4 col-xs-12 col-form-label">Please send us an SMS:</label>
                      <div className="col-md-8 col-xs-12 mtop10">
                        <div className="checkbox prod_checkbox">
                          <input id="checkbox26" type="checkbox" />
                          <label for="checkbox26">
                            When we recieve messages from other Bazeaters 
                          </label>
                        </div>
                        <div className="checkbox prod_checkbox">
                          <input id="checkbox27" type="checkbox" />
                          <label for="checkbox27">
                            When someone writes a review about us 
                          </label>
                        </div>
                        <div className="checkbox prod_checkbox">
                          <input id="checkbox28" type="checkbox" />
                          <label for="checkbox28">
                            When Bazeat makes important updates 
                          </label>
                        </div>
                      </div>
                    </div>  
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

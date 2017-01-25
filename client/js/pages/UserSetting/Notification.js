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
            <div className="modal-dialog">
              comming soon.....
            </div>
          </div>
        </div>
      </div>
    );
  }
}

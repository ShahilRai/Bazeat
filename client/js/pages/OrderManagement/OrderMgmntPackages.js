import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import ListAllPackages from './ListAllPackages';

export default class OrderMgmntPackages extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    router: React.PropTypes.object.isRequired,
    user: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      packgesList: []
    }
  }

  componentDidMount(){
    var user_email = this.context.user.username;
    this.getAllPackages(user_email).then((response) => {
      if(response.data) {
        this.setState({
          packgesList: response.data
        });
      }
    }).catch((err) => {
        console.log(err);
    });
  }

  getAllPackages(emailAddress){
    return axios.get("/api/get_packages?email="+ emailAddress , {
    });
  }

  _renderleftMenus(){
    return(
      <ul className="edit_sidbar_list">
        <li><Link to="/orders">Purchase orders</Link></li>
        <li className="active"><Link to="/packages">Packages</Link></li>
      </ul>
    )
  }

  render(){
    var tableheadValue=['Package date','Package#','Carrier','Sales order#','Status','Shipped date','Customer','Quantity']
    return(
      <div className="container padd_87">
        <div className="full_width">
          <div className="row">
            <div className="col-lg-3 col-md-2 col-sm-2 col-xs-12 purchase_order_left_sidebar order_purchse_lt_wdth edit_profile_sidebar">
              {this._renderleftMenus()}
            </div>
            <div className="col-lg-9 col-md-9 col-sm-10 col-xs-12 purchase_order_rght_sidebar rt_order_mgmnt">
              <div className="table-main">
                <div className="table-wrapper">
                  <table className="table purchase_order_table">
                    <thead>
                      <tr className="f2f2f2_bg">
                        {tableheadValue.map((head, index) =>
                              <th key={index} className="text-center">{head}</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.packgesList.map((listOfPackage, index) => <ListAllPackages
                      key = {index} listOfPackage = {listOfPackage} />)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
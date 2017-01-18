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

  render(){
    var tableheadValue=['Package date','Package#','Carrier','Sales order#','Status','Shipped date','Customer','Quantity']
    return(
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
    )
  }
}
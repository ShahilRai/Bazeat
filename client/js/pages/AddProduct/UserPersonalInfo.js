import React from 'react';
export default class UserPersonalInfo extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  }

  render(){
    var source;
    if(this.context.user.is_producer){
      source = (
        <div>
          <li className="mail_adrrs">
            <a href="javascript:void(0)">{this.props.userInfo.email}</a>
          </li>
          <li className="review_date">
            <a href="javascript:void(0)">Man-Lør: 08-15</a>
          </li>
        </div>
      )
    }
    return(
      <div>
        <ul className="prod_lft_details">
          <li className="pin_intrest">
            <a href="javascript:void(0)">{this.props.userInfo.city?this.props.userInfo.city + ', ': ""}{this.props.userInfo.country}</a>
          </li>
            {source}
          <li className="review_cal">
            <a href="javascript:void(0)">Became a Bazeater<br/>12.11.2016</a>
          </li>
          </ul>
          <div className="product_left_dsc">
            <h4>Presentation </h4>
            <p>{this.props.userInfo.description}</p>
          </div>
      </div>
    )
  }
}

import React from 'react';
import moment from 'moment';

export default class UserPersonalInfo extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  }

  render(){
    var source;
    if(this.context.user.customData.is_producer == "true"){
      source = (
        <div>
          <li className="mail_adrrs">
            <a href="javascript:void(0)">{this.props.prodInfo?this.props.prodInfo.cmp_web_site:''}</a>
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
            <a href="javascript:void(0)">Became a Bazeater<br/>{moment(this.props.userInfo.date_joined).format('DD-MM-YYYY')}</a>
          </li>
        </ul>
        <div className="product_left_dsc">
          <h4>Presentation </h4>
          <p className="for_last_margin">{this.props.userInfo.description}</p>
        </div>
      </div>
    )
  }
}

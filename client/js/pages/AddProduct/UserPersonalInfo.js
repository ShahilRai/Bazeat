import React from 'react';
import moment from 'moment';
let time_slot;
export default class UserPersonalInfo extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  }

  dayFormat(days){
    var day=[];
    var dayLen = days.length
    for(var i=0;i<dayLen;i++){
      if(i<dayLen-1)
        day[i] = days[i]+"-";
      else
        day[i] = days[i];
    }
    return(day)
  }

  render(){
    var source;
     time_slot=this.props.time_slot?this.props.time_slot:[]
    if(this.context.user.customData.is_producer == "true"){
      source = (
        <div>
          <li className="mail_adrrs">
            <a href="javascript:void(0)">{this.props.prodInfo?this.props.prodInfo.cmp_web_site:''}</a>
          </li>
          <li className="review_date">
            {time_slot.map((result,index)=>{
               return(<a href="javascript:void(0)" key={index}>{this.dayFormat(result.day)}: {result.start_time}-{result.end_time}</a>)
              })
            }
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

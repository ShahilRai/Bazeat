import React from 'react';
export default class ProducerDescription extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  }

  render(){
      if(this.context.user.is_producer){
    return(
      <div>
        <ul className="prod_lft_details">
          <li className="pin_intrest">
            <a href="#">{this.props.userInfo.city},{this.props.userInfo.country}</a>
          </li>
          <li className="mail_adrrs">
            <a href="#">{this.props.userInfo.email}</a>
          </li>
          <li className="review_date">
            <a href="#">Man-Lør: 08-15</a>
          </li>
          <li className="review_cal">
            <a href="#">Became a Bazeater<br/>12.11.2016</a>
          </li>
        </ul>
        <div className="product_left_dsc">
          <h4>Presentation </h4>
          <p>{this.props.userInfo.description}</p>
        </div>
      </div>
      )
    }
      else{
        return(
        <div>
          <ul className="prod_lft_details">
          <li className="pin_intrest">
            <a href="#">{this.props.userInfo.city},{this.props.userInfo.country}</a>
          </li>
          <li className="review_cal">
            <a href="javascript:void()">Became a Bazeater<br/>12.11.2016</a>
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
  }

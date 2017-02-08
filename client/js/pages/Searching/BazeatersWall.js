import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Rating from 'react-simple-rating';


export default class BazeatersWall extends React.Component {
    static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
  };

  upperCase(str){
    var array1 = str.split(' ');
    var newarray1 = [];
      
    for(var x = 0; x < array1.length; x++){
        newarray1.push(array1[x].charAt(0).toUpperCase()+array1[x].slice(1));
    }
    return newarray1.join(' ');
  }
  render() {
    return (
      <div className="bazeater_bg">
        <div className="bazeater1">
          <a href="#" className="search_open">Open</a>
          <div className="bazeater_logo1">
            <span className="pos_rel"><img className="bazeaters_logo" src={this.props.bazeatersData.photo} />
            </span>
          </div>
          <h4 ><Link to={"/user/"+this.props.bazeatersData.cuid} className = "font_colr">{this.upperCase(this.props.bazeatersData.full_name)}</Link></h4>
          <p>{this.props.bazeatersData.city}</p>
          <ul className="food_section">

          </ul>
          <div className="star_rating">
          <span className="rvw_qty">
          <Rating rating={this.props.bazeatersData.avg_rating} displayOnly={true} maxRating={5}  ratingSymbol={"\u2764"} />
        </span>
            <span className="review_num"> {this.props.bazeatersData.reviews_count}reviews</span>
          </div>
        </div>
      </div>
    );
  }
}

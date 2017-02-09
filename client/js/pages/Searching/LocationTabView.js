import React from 'react';
import Rating from 'react-simple-rating';
import { Link } from 'react-router';

export default class LocationTabView extends React.Component {


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
      <div className="search_row1 grey_bg">
        <div className="search_row_wdth">
          <span className="s_name wdth_11"><img  className="location_logo" src={this.props.locData.photo} /></span>
          <span className="s_name name_wdth26"><Link to={"/user/"+this.props.locData.cuid} className = "font_colr">{this.upperCase(this.props.locData.full_name)}</Link></span>
          <span className="rvws_wdth star_rating">
            <Rating rating={this.props.locData.avg_rating} displayOnly={true} maxRating={5}  ratingSymbol={"\u2764"} />
            <span className="review_num">{this.props.locData.reviews_count} reviews</span>
          </span>
          <span className="wdth_15 categ_wdth">
            <ul>
              <li>Pastry</li>
              <li>Bread</li>
              <li>Category3</li>
            </ul>
          </span>
          <span className="city_col wdth_11">{this.props.locData.city}</span>
          <span className="wdth_8">
            <a href="#" className="search_open">Open</a>
          </span>
        </div>
      </div>
    );
  }
}


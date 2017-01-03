import React from 'react';

export default class LocationTabView extends React.Component {

  render() {
    return (
      <div className="search_row1">
        <div className="search_row_wdth">
          <span className="s_name wdth_11"><img  className="location_logo" src={this.props.locData.photo} /></span>
          <span className="s_name name_wdth26">{this.props.locData.full_name}</span>
          <span className="rvws_wdth star_rating">
            <ul>
              <li><a href="#"><img src="images/star_rating.png" /></a></li>
              <li><a href="#"><img src="images/star_rating.png" /></a></li>
              <li><a href="#"><img src="images/star_rating.png" /></a></li>
              <li><a href="#"><img src="images/star_rating.png" /></a></li>
              <li><a href="#"><img src="images/star_rating.png" /></a></li>
            </ul>
            <span className="review_num">613 reviews</span>
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


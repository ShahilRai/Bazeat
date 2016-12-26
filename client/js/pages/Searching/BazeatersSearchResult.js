import React from 'react';
import SearchNotification from './SearchNotification';

export default class BazeatersSearchResult extends React.Component {

  render() {
    return (
      <div className="tab-pane" id="bazeaters">
        <div className="container pad_lf151">
          <div className="bazeaters_sec">
            </SearchNotification>
            <div className="bazeater_bg">
              <div className="bazeater1">
                <a href="#" className="search_open">Open</a>
                <div className="bazeater_logo1">
                  <span className="pos_rel"><img src="images/bazeater_logo1.png">
                    <img src="images/revw_icon.png" className="chkd_img">
                  </span>
                </div>
                <h4>Baker Hans</h4>
                <p>Knanndal</p>
                <ul className="food_section">
                  <li>Pastry</li>
                  <li>Bread</li>
                  <li>Pastry</li>
                </ul>
                <div className="star_rating">
                  <ul>
                    <li><a href="#"><img src="images/star_rating.png"></a></li>
                    <li><a href="#"><img src="images/star_rating.png"></a></li>
                    <li><a href="#"><img src="images/star_rating.png"></a></li>
                    <li><a href="#"><img src="images/star_rating.png"></a></li>
                    <li><a href="#"><img src="images/star_rating.png"></a></li>
                  </ul>
                  <span classNAme="review_num">613 reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

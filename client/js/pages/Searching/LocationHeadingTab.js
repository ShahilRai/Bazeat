import React from 'react';

export default class LocationHeadingTab extends React.Component {

  render() {
    return (
        <div className="search_row1 grey_bg">
          <div className="search_row_wdth">
            <span className="s_header wdth_11">&nbsp;</span>
            <span className="s_header name_wdth26">Name
              <i className="fa fa-long-arrow-up" aria-hidden="true"></i>
              <i className="fa fa-long-arrow-down" aria-hidden="true"></i>
            </span>
            <span className="s_header rvws_wdth">Reviews</span>
            <span className="s_header wdth_15">Categories</span>
            <span className="s_header wdth_11">City</span>
            <span className="s_header wdth_8">Status
              <i className="fa fa-long-arrow-up" aria-hidden="true"></i>
              <i className="fa fa-long-arrow-down" aria-hidden="true"></i>
            </span>
          </div>
        </div>
    );
  }
}

import React from 'react';
import LazyLoad from 'react-lazy-load';
import SearchNotification from './SearchNotification';
import BazeatersWall from './BazeatersWall';

export default class ShowBazeatersSearch extends React.Component {

  render() {
    return (
      <div className="tab-pane" id="bazeaters">
        <div className="container pad_lf151">
          <div className="bazeaters_sec">
            <SearchNotification name="'Bazeaters'" length={this.props.allBazeaters.length}/>
            {this.props.allBazeaters.map((bazeatersData, index) => <BazeatersWall
                key = {index} bazeatersData = {bazeatersData}/>)}
          </div>
        </div>
      </div>
    );
  }
}

import React from 'react';
import LazyLoad from 'react-lazy-load';
import BazeatersWall from './BazeatersWall';

export default class ShowBazeatersSearch extends React.Component {

  render() {
    return (
      <div className="tab-pane" id="bazeaters">
        <div className="container pad_lf151">
          <div className="bazeaters_sec">
            <h3 className="search_tabbd_heading text-left">Your search for <span className="italic">'bazeaters'</span> returned <span className="italic">{this.props.allBazeaters.length}</span> results</h3>
              {this.props.allBazeaters.map((bazeatersData, index) => <LazyLoad key={index}><BazeatersWall
                key = {index} bazeatersData = {bazeatersData}/></LazyLoad>)}
          </div>
        </div>
      </div>
    );
  }
}

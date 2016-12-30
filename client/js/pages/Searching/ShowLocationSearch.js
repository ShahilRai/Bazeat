import React from 'react';
import LocationHeadingTab from './LocationHeadingTab';
import LocationTabView from './LocationTabView';
import LazyLoad from 'react-lazy-load';

export default class ShowLocationSearch extends React.Component {

  render() {
    return (
      <div className="tab-pane" id="location">
        <div className="search_v1">
          <h3 className="search_tabbd_heading text-left pad_lf211">Your search for <span className="italic">'location'</span> returned <span className="italic">{this.props.allBazeaters.length}</span> results</h3>
          <LocationHeadingTab />
          {this.props.allBazeaters.map((locData, index) =>  <LazyLoad key={index}><LocationTabView
            key = {index} locData = {locData} handleProductsSrch={this.handleProductsSrch} /></LazyLoad>)}
        </div>
      </div>
    );
  }
}

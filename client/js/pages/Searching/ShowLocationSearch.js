import React from 'react';
import LocationHeadingTab from './LocationHeadingTab';
import LocationTabView from './LocationTabView';
import LazyLoad from 'react-lazy-load';
import axios from 'axios';
import PubSub from 'pubsub-js';

export default class ShowLocationSearch extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      allBazeaters : [],
      locationLat : 0,
      locationLong : 0
    }
    this.getLatLong = this.getLatLong.bind(this);
    PubSub.subscribe('latlongitude', this.getLatLong);
  }

  componentDidMount(){
    this.getLatLong
  }

  getBazeaters(){
    var latitude = this.state.locationLat
    var longitude = this.state.locationLong
    this.loadBazeaters(latitude, longitude).then((response) => {
        if(response.data) {
          this.setState({
            allBazeaters: response.data
          });
        }
      }).catch((err) => {
          console.log(err);
      });
  }

  loadBazeaters(latitude, longitude) {
    return axios.get("/api/search/location?longitude=" + longitude + "&latitude=" + latitude , {
    });
  }

  getLatLong(msg, latLong){
    this.setState({
      locationLat : latLong[0],
      locationLong : latLong[1]
    })
    this.getBazeaters()
  }

  render() {
    return (
      <div className="tab-pane" id="location">
        <div className="search_v1">
          <h3 className="search_tabbd_heading text-left pad_lf211">Your search for <span className="italic">'location'</span> returned <span className="italic">{this.state.allBazeaters.length}</span> results</h3>
          <LocationHeadingTab />
          {this.state.allBazeaters.map((locData, index) =>  <LazyLoad key={index}><LocationTabView
            key = {index} locData = {locData} /></LazyLoad>)}
        </div>
      </div>
    );
  }
}

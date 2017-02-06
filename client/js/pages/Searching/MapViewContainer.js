import React from 'react';
import Map from './Map'
var Loader = require('react-loader');
export default class MapViewContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      users_with_coordinates : [],
      current_lat: 0.0,
      current_lng: 0.0,
      loaded: false,
      showInfo:false
    }
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        current_lng: position.coords.longitude,
        current_lat: position.coords.latitude,
        loaded: true
      })
      var self = this
     $.ajax ({
        type: 'GET',
        url: "/api/search/location?longitude="+position.coords.longitude+'&latitude='+position.coords.latitude
     }).done(function(data) {
        self.setState({
          users_with_coordinates: data.users
        })
        }).fail(function() {
        console.log('failed to load');
        });
    },
    (error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.users_with_coordinates.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          };
        }
        return marker;
      }),
    });
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.state.users_with_coordinates.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }

  render() {
    var options = {
      lines: 13,length: 20,width: 10,radius: 30,scale: 1.00,corners: 1,color: '#000',
      opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,
      top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'
    }

    const location = {
      lat: this.state.current_lat,
      lng: this.state.current_lng
    }

    if(!this.state.loaded){
      return(<div><Loader loaded={this.state.loaded} options={options}/></div>)
    }
    return (
      <div style = {{width: 300, height: 565}}>
        <Map center={location} markers = {this.state.users_with_coordinates} onMarkerClick={this.handleMarkerClick}
        onMarkerClose={this.handleMarkerClose} />
      </div>
    )
  }
}

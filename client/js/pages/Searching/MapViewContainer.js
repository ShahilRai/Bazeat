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
      markers: [
        {
          lat:28.5820607,
          lng: 77.3109035,
          showInfo: false
        },
        {
          lat: 28.5640398,
          lng: 77.3342692,
          showInfo: false
        },
        {
          lat: 28.5747441,
          lng: 77.3560263,
          showInfo: false
        }
      ]
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
        url: "/api/search/location?longitude="+position.coords.longitude+'&latitude='+position.coords.latitude,
        data: self.state
     }).done(function(data) {
        self.setState({
          users_with_coordinates: data
        })
        }).fail(function() {
        console.log('failed to load');
        });
    },
    (error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  // Toggle to 'true' to show InfoWindow and re-renders component
  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
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
      markers: this.state.markers.map(marker => {
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
    var self = this
    var options = {
      lines: 13,length: 20,width: 10,radius: 30,scale: 1.00,corners: 1,color: '#000',
      opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,
      top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'
    }

    const location = {
      lat: self.state.current_lat,
      lng: self.state.current_lng
    }

    if(!self.state.loaded){
      return(<div><Loader loaded={self.state.loaded} options={options}/></div>)
    }

    return (  
      <div style = {{width: 300, height: 550}}>
        <Map center={location} markers = {self.state.markers} onMarkerClick={this.handleMarkerClick}
        onMarkerClose={this.handleMarkerClose}/>
      </div>
    )
  }
}

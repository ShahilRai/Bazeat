import React from 'react';
import Map from './Map'
export default class MapViewContainer extends React.Component {

   constructor() {
      super();
      this.state = {
        users_coordinates : []
      }
   }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var self = this
     $.ajax ({
        type: 'GET',
        url: "/api/search/location?longitude='+position.coords.longitude+'&latitude='+position.coords.latitude",
        data: self.state
     }).done(function(data) {
        self.setState({
          users_coordinates: data
        })
        }).fail(function() {
        console.log('failed to load');
        });
    },
    (error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  render() {
    const location = {
      lat: 28.5820607,
      lng: 77.3109035
    }

    const markers = [
      
        {
          lat:28.5820607,
          lng: 77.3109035
        },
        {
          lat: 28.5640398,
          lng: 77.3342692
        },
        {
          lat: 28.5747441,
          lng: 77.3560263
        }
    ]

    return (  
      <div>
        <div style = {{width: 300, height: 550}}>
          <Map center={location} markers = {markers}/>
        </div>
      </div>
    )
  }
}

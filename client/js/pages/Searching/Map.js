import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

export default class Map extends React.Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {
  	var self = this
  	const markers = self.props.markers.map((venue, i) =>{
  		const marker = {
  			position:{
  				lat: venue.lat,
  				lng: venue.lng
  			}
  		}
			return(<Marker name={'Current location'} key={i} {...marker} onClick={() => self.props.onMarkerClick(venue)}>
				{self.props.showInfo && (
          <InfoWindow onCloseClick={() => self.props.onMarkerClose(venue)}>
            <div>hello</div>
          </InfoWindow>
        )}
				</Marker>
			)
  	})

  	const mapContainer = <div style={{height:'100%', width:'450%'}}></div>

    return (  
      <GoogleMapLoader 
      	containerElement = {mapContainer}
      	googleMapElement = {
      		<GoogleMap 
      			defaultZoom = {15} 
      			defaultCenter = {self.props.center} 
      			options = {{streetViewControl: false, mapTypeControl: false}}>
      			{markers}
      		</GoogleMap>
      	}
      />
    )
  }
}
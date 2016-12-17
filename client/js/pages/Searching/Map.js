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
			return(<Marker key={i} {...marker}>
				<InfoWindow>
	          <div>helloo</div>
	      </InfoWindow>
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
import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import UserShortInfo from './UserShortInfo'
export default class Map extends React.Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {
  	const markers = this.props.markers.map((venue, i) =>{
  		const marker = {
  			position:{
  				lng: venue.loc[0],
          lat: venue.loc[1]
  			}
  		}
			return(
        <Marker name={'Current location'} key={i} {...marker} onClick={() => this.props.onMarkerClick(venue)}>
          <InfoWindow onCloseClick={() => this.props.onMarkerClose(venue)}>
            <UserShortInfo index={i} user_info = {venue}/>
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
      			defaultCenter = {this.props.center}
      			options = {{streetViewControl: true, mapTypeControl: true}}>
      			{markers}
      		</GoogleMap>
      	}
      />
    )
  }
}

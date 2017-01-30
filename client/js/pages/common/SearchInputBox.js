import React from 'react';
import { Link } from 'react-router';
import {SearchBox } from 'react-google-maps';
import PubSub from 'pubsub-js';

export default class SearchInputBox extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      disabled : true
    };
    this.handleChange = this.handleChange.bind(this)
    this.onMouseClick = this.onMouseClick.bind(this)
    PubSub.subscribe('selectedTab', this._renderGoogleSearch);
  }

  handleChange(e){
    if(e.target.value=="")
    this.setState({
      disabled : true
    })
  else
    this.setState({
      disabled : false
    })
  }

  onMouseClick(){
    if(this.context.router.location.pathname !== "/search"){
      this.context.router.push('/search');
    }
  }

  _renderGoogleSearch(msg , data){
    var lat_lng;
    var latitude;
    var longitute;
    if(data == 2){
      var input = (document.getElementById('pac-input'));
      var searchBox = new google.maps.places.SearchBox((input));
      google.maps.event.addListener(searchBox, 'places_changed', function () {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
          return;
        }
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
          bounds.extend(place.geometry.location);
          lat_lng = JSON.stringify(bounds)
          lat_lng = lat_lng.toString().split(':')
          latitude = (lat_lng[1].toString().split(',')[0])
          longitute = (lat_lng[2].toString().split(',')[0])
          PubSub.publish( 'latlongitude', [latitude,longitute]);
        }
      });
    }
  }

  render() {
    this._renderGoogleSearch();
    var srchIcon = <input name="" type="submit" className="header_search_icon" disabled={this.state.disabled}/>
    if(this.context.router.location.pathname == "/search"){
      srchIcon = <input name="" type="submit" className="header_search_icon_button" disabled={this.state.disabled} value="Search"/>
    }
    return (
      <div className="col-lg-4 col-md-4 col-sm-5 col-xs-10 ipad_pull_rht header_search_bar" onClick={this.onMouseClick}>
        <form className="form-search" method="get" id="s" action="">
          <input type="text" className="input-medium" id="pac-input" name="search" placeholder="What do you want to eat?" onChange={this.handleChange}/>
          {srchIcon}
        </form>
      </div>
    );
  }
}

import React from 'react';
import { Link } from 'react-router';
import {SearchBox } from 'react-google-maps';
import PubSub from 'pubsub-js';

export default class SearchBox1 extends React.Component {

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
    PubSub.subscribe('searchBoxTrue', this._renderGoogleSearch);
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
    if(data== true){
      var input = (document.getElementById('pac-input'));
      var searchBox = new google.maps.places.SearchBox((input));
      google.maps.event.addListener(searchBox, 'places_changed', function () {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }
        var bounds = new google.maps.LatLngBounds();
        console.log(bounds)
        for (var i = 0, place; place = places[i]; i++) {
            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            bounds.extend(place.geometry.location);
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
      <div className="col-lg-4 header_search_bar" onClick={this.onMouseClick}>
        <form className="form-search" method="get" id="s" action="">
          <input type="text" className="input-medium" id="pac-input" name="search" placeholder="What do you want to eat?" onChange={this.handleChange}/>
          {srchIcon}
        </form>
      </div>
    );
  }
}

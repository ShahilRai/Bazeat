import React from 'react';
import LazyLoad from 'react-lazy-load';
import BazeatersWall from './BazeatersWall';
import PubSub from 'pubsub-js';
import axios from 'axios';

let BazToken;

export default class ShowBazeatersSearch extends React.Component {

   constructor(props, context) {
    super(props, context);
    this.state = {
      allBazeaters : [],
      textToSearch: ''
    }
    this.filteredBazeaters = this.filteredBazeaters.bind(this)
    this.getSearchedText = this.getSearchedText.bind(this)
    BazToken = PubSub.subscribe( 'search-text', this.getSearchedText );
  }

  componentDidMount(){
    this.getSearchedText
    this.loadBazeaters().then((response) => {
      if(response.data) {
        this.setState({
          allBazeaters: response.data.users
        });
      }
    }).catch((err) => {
        console.log(err);
    });
  }

  loadBazeaters() {
    return axios.get("/api/users" , {
    });
  }

  componentWillUnmount(){
    PubSub.unsubscribe( BazToken );
  }

  getSearchedText(msg, text){
    this.setState({
      textToSearch: text
    })
    if(!this.state.textToSearch==''){
      this.filteredBazeaters();
    }
  }

  filteredBazeaters(){
    var pName = this.state.textToSearch;
      this.fetchFilteredBazeaters(pName).then((response) => {
        if(response.data) {
          this.setState({
            allBazeaters: response.data.users
          })
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  fetchFilteredBazeaters(pName) {
    return axios.get("/api/search/users?search=" + pName, {
    });
  }

  render() {
    return (
      <div className="tab-pane" id="bazeaters">
        <div className="container pad_lf151">
          <div className="bazeaters_sec">
            <h3 className="search_tabbd_heading text-left">Your search for <span className="italic">'{this.state.textToSearch? this.state.textToSearch: 'bazeaters'}'</span> returned <span className="italic">{this.state.allBazeaters.length}</span> results</h3>
              {this.state.allBazeaters.map((bazeatersData, index) => <BazeatersWall
                key = {index} bazeatersData = {bazeatersData} uId={bazeatersData.cuid}/>)}
          </div>
        </div>
      </div>
    );
  }
}

import React from 'react';
import LazyLoad from 'react-lazy-load';
import BazeatersWall from './BazeatersWall';
import axios from 'axios';

export default class ShowBazeatersSearch extends React.Component {

   constructor(props, context) {
    super(props, context);
    this.state = {
      allBazeaters : []
    }
  }

  componentDidMount(){
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

  render() {
    return (
      <div className="tab-pane" id="bazeaters">
        <div className="container pad_lf151">
          <div className="bazeaters_sec">
            <h3 className="search_tabbd_heading text-left">Your search for <span className="italic">'bazeaters'</span> returned <span className="italic">{this.state.allBazeaters.length}</span> results</h3>
              {this.state.allBazeaters.map((bazeatersData, index) => <BazeatersWall
                key = {index} bazeatersData = {bazeatersData}/>)}
          </div>
        </div>
      </div>
    );
  }
}

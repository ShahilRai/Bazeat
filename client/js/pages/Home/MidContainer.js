import React, { PropTypes } from 'react';
import ShowImage from './ShowImage';
import axios from 'axios';
import WallImageViewer from './WallImageViewer';


export default class MidContainer extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

   constructor() {
      super();
      this.state = {
        productList : []
      }
   }

   componentDidMount() {
     this.loadAllProducts().then((response) => {
        if(response.data) {
          this.setState({
            productList: response.data.item_arrays
          });
        }
      }).catch((err) => {
          console.log(err);
      });
    }

    loadAllProducts() {
      if(this.context.authenticated == true) {
        return axios.get("/api/products?email="+this.context.user.email, {
        });

      } else {
        return axios.get("/api/products" , {
        });
      }
    }

  render() {
    return (
      <div className="container">
        <div className="mid_container">
          <div className="grid_wall_wrapper">
            {this.state.productList.map((wallImages, index) =><div className="wall-column" key = {index}><WallImageViewer
                key = {index} index={index + 1} wallImages = {wallImages.item} wall_is_like = {wallImages.is_like} /> </div>)}
          </div>
        </div>
      </div>
    );
  }
}

import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import MidContainer from './MidContainer';
import axios from 'axios';

export default class IndexPage extends React.Component {

  constructor(props, context) {
      super(props, context)
        this.state = {
          productList : []
      };
    }

  componentDidMount() {
   this.loadAllProducts().then((response) => {
      if(response.data) {
        this.setState({
          productList: response.data.products
        });
      }
    }).catch((err) => {
        console.log(err);
    });
  }

  loadAllProducts() {
    return axios.get("/api/products" , {
    });
  }

  render() {
    return (
      <div className="full_width">
        <div className="banner_wrapper">
          <img src={require("../../../images/banner.jpg")}  />
        </div>
        <MidContainer productList={this.state.productList} />
      </div>
    );
  }
}

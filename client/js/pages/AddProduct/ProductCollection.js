import React from 'react';
import toastr from 'toastr';
import axios from 'axios';
import ProductList from './ProductList';
import ReactSlider from '../Product/ReactSlider';
let selected_category = [] ;
export default class ProductCollection extends React.Component {

  constructor(props, context) {
    super(props, context)
      this.state = {
        products : []
    };
  }

  componentDidMount() {
    this.setState({
      products: this.props.productInfo ? this.props.productInfo : this.props.cat_data
    });
  }

  removeImage(e) {
    var reply = confirm("Are you sure ?")
    if(reply == true){
      e.preventDefault();
      var array = this.state.products;
      var index = e.target.dataset.index-1;
      var productToDel = array[index].cuid;

      this.deleteProducts(productToDel).then((response) => {
        if(response.statusText == "OK") {
          toastr.success('Your product successfully deleted');
          array.splice(index, 1);
          this.setState({products: array });
        }
      })
      .catch((err) => {
      toastr.error(err);
      console.log(err);
      });
    }
  }

  deleteProducts(productToDel){
    return axios.delete("/api/products/"+productToDel);
  }

  render(){
    var allProducts
    if(this.props.cat_data){
      allProducts = this.props.cat_data.map((product, index) =>
        <ProductList key = {index+1} index={index+1} productData = {product} current_cuid={this.props.current_cuid} user_cuid={this.props.user_cuid} onClick={this.removeImage.bind(this)}/>)
    }else{
      allProducts = this.state.products.map((product, index) =>
      <ProductList key = {index+1} index={index+1} productData = {product} current_cuid={this.props.current_cuid} user_cuid={this.props.user_cuid} onClick={this.removeImage.bind(this)}/>)
    }

    return(
      <div>
        <ReactSlider id="add" />
          {allProducts}
      </div>
    )
  }
}

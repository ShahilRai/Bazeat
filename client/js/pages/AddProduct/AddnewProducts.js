
import React from 'react';
import ProductList from './ProductList';


export default class AddnewProducts extends React.Component {
  constructor(props, context) {
    super(props, context)
      this.state = {
        products : []
    };
  }

  componentDidMount() {
    this.setState({
      products: this.props.productInfo.products
    });
  }

  removeImage(e) {
    e.preventDefault();
    var array = this.state.products;
    var index = e.target.dataset.index;
    var productToDel = array[index].cuid;

    this.deleteProducts(productToDel).then((response) => {
      if(response.statusText == "OK") {
        array.splice(index, 1);
        this.setState({products: array });
      }
    })
    .catch((err) => {
    console.log(err);
    });
  }

  deleteProducts(productToDel){
    return axios.delete("/api/products/"+productToDel);
  }

  render(){
    if(this.state.products){
      var allProducts = this.state.products.map((product, index) =>
        <ProductList key = {index} index={index} productData = {product} onClick={this.removeImage.bind(this)}/>)
    }
    return(
      <div>
        {allProducts}
      </div>
    )
  }
}

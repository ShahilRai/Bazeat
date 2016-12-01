
import React from 'react';
import ProductList from './ProductList';
import ReactSlider from '../Product/ReactSlider';

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
        <div className="wall-column">
          <div className="grid_single_item no_brdr add_item_pduct">
            <div className="add_prod_div">
              <a href="javascript:void(0)" data-toggle="modal" data-target="#add">
                 <img src="images/add_prod.png" />
                  <div className="grid_tile_desc">
                   <h3>Add new <br/> product</h3>
                  </div>
              </a>
            </div>
          </div>
        </div>
        <ReactSlider id="add" />
        {allProducts}
      </div>
    )
  }
}

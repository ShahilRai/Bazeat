import React from 'react';
import Button from './Button';
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

  render(){
    return(
      <div>
      <div className="wall-column">
        <div className="grid_single_item no_brdr add_item_pduct">
          <div className="add_prod_div">
            <a href="javascript:void(0)" data-toggle="modal" data-target="#step_1">
               <img src="images/add_prod.png" />
                <div className="grid_tile_desc">
                 <h3>Add new <br/> product</h3>
                </div>
            </a>
          </div>
        </div>
      </div>
      {this.state.products.map((product, index) =>
       <ProductList key = {index} productData = {product}/>)}
    </div>
    )
  }
}

import React from 'react';
import EditProductBtn from '../Button/EditProductBtn';
import DeleteProductBtn from '../Button/DeleteProductBtn';
import HideProductBtn from '../Button/HideProductBtn';
import DisableProductBtn from '../Button/DisableProductBtn';
import ProductDetails from './ProductDetails';

  export default class ProductList extends React.Component {

    constructor(props, context) {
      super(props, context)
        this.state = {
          Prod_to_edit : {}
      };
      this.EditProdBtnClck = this.EditProdBtnClck.bind(this)
    }

    EditProdBtnClck() {
      this.loadEditProdData().then((response) => {
         if(response.data) {
          this.setState({
            Prod_to_edit: response.data
          });
        }
      })
      .catch((err) => {
      console.log(err);
      });
    }

    loadEditProdData() {
      return axios.post("/api/products/" + this.props.productData.cuid);
    }

    render(){
      return(
        <div className="wall-column">
          <div className="grid_single_item">
            <div className="hover_box">
              <DeleteProductBtn index={this.props.index} onClick={this.props.onClick}/>
              <EditProductBtn handlerForEdit = {this.EditProdBtnClck}/>
              <HideProductBtn />
              <DisableProductBtn />
            </div>
            <a href="#" data-target="#product_desc" data-toggle="modal">
              <img src= {this.props.productData.photo}/>
            </a>
            <div className="grid_tile_desc">
              <h2>Speltbaguetter</h2>
              <span className="price_tag">{this.props.productData.price}</span>
              <p>{this.props.productData.description}</p>
            </div>
          </div>
          <ProductDetails productDetails={this.props.productData}/>
        </div>
    );
  }
}

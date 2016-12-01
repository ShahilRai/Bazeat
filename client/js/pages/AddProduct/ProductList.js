import React from 'react';
import EditProductBtn from '../Button/EditProductBtn';
import DeleteProductBtn from '../Button/DeleteProductBtn';
import HideProductBtn from '../Button/HideProductBtn';
import DisableProductBtn from '../Button/DisableProductBtn';
import ProductDetails from './ProductDetails';
import ReactSlider from '../Product/ReactSlider';


  export default class ProductList extends React.Component {

    constructor(props, context) {
      super(props, context)
        this.state = {
          Prod_to_edit : {}
      };
      this.EditProdBtnClck = this.EditProdBtnClck.bind(this)
    }

    EditProdBtnClck() {
      var prodToEditCuid = this.props.productData.cuid;
      this.loadEditProdData(prodToEditCuid).then((response) => {
         if(response.data) {
          this.setState({
            Prod_to_edit: response.data.product
          });
        }
      })
      .catch((err) => {
      console.log(err);
      });
    }

    loadEditProdData(prodToEditCuid) {
      return axios.get("/api/products/" + prodToEditCuid);
    }

    render(){
      return(
        <div className="wall-column">
          <div className="grid_single_item">
            <div className="hover_box">
              <DeleteProductBtn index={this.props.index} onClick={this.props.onClick}/>
              <EditProductBtn index={this.props.index} handlerForEdit = {this.EditProdBtnClck}/>
              <HideProductBtn />
              <DisableProductBtn />
            </div>
            <a href="#" data-target={"#id1" + this.props.index} data-toggle="modal">
              <img src= {this.props.productData.photo}/>
            </a>
            <div className="grid_tile_desc">
              <h2>{this.props.productData.product_name}</h2>
              <span className="price_tag">{this.props.productData.price}</span>
              <p>{this.props.productData.description}</p>
            </div>
          </div>
          <ProductDetails product_details={this.props.productData} index={this.props.index}/>
          <ReactSlider prod_to_edit={this.state.Prod_to_edit} index={this.props.index}/>
        </div>
    );
  }
}

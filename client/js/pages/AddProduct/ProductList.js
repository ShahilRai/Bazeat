import React from 'react';
import toastr from 'toastr';
import axios from 'axios';
import DeleteProductBtn from '../Button/DeleteProductBtn';
import HideProductBtn from '../Button/HideProductBtn';
import DisableProductBtn from '../Button/DisableProductBtn';
import ProductDetails from './ProductDetails';
import ReactSlider from '../Product/ReactSlider';

export default class ProductList extends React.Component {

  constructor(props, context) {
    super(props, context);
      this.state = {
        _prodToEdit: {},
        _hideShowText: this.props.productData.is_hidden ? "show" : "hide",
        _disableEnableText: this.props.productData.is_disable ? "enable" : "disable"
      };
    this.editProduct = this.editProduct.bind(this)
    this.hideAndShowProduct = this.hideAndShowProduct.bind(this)
    this.disableAndEnableProduct = this.disableAndEnableProduct.bind(this)
  }

  editProduct() {
    this.loadEditProdData(this.props.productData.cuid).then((response) => {
       if(response.data) {
        this.setState({
          _prodToEdit: response.data.product
        });
      }
    }).catch((err) => {
    console.log(err);
    });
  }

  loadEditProdData(prodToEditCuid) {
    return axios.get("/api/product/" + prodToEditCuid);
  }

  hideAndShowProduct() {
    this.hideProdData(this.props.productData.cuid).then((response) => {
      if(response.data.product.ok == 1) {
        if(this.state._hideShowText == "hide"){
          toastr.success('Your product successfully hide');
          this.setState({
            _hideShowText: "show"
          });
        }else{
          toastr.success('Your product successfully shown');
          this.setState({
            _hideShowText: "hide"
          });
        }
      }
    }).catch((err) => {
      toastr.error(err);
      console.log(err);
    });
  }

  hideProdData(prodToHideCuid) {
    if(this.state._hideShowText == "hide"){
      return axios.put("/api/hide_product/" + prodToHideCuid , {
          is_hidden: true
      });
    }else{
      return axios.put("/api/hide_product/" + prodToHideCuid , {
        is_hidden: false
      });
    }
  }

  disableAndEnableProduct() {
    this.disableProdData(this.props.productData.cuid).then((response) => {
       if(response.data) {
        if(this.state._disableEnableText == "disable"){
          toastr.success('Your product successfully disabled');
          this.setState({
            _disableEnableText: "enable"
          })
        }else{
          toastr.success('Your product successfully enabled');
          this.setState({
            _disableEnableText: "disable"
          })
        }
      }
    }).catch((err) => {
      toastr.error(err);
     console.log(err);
    });
  }

  disableProdData(prodToDisableCuid) {
    if(this.state._disableEnableText == "disable"){
      return axios.put("/api/disable_product/" + prodToDisableCuid, {
        is_disable: true
      });
    }else{
      return axios.put("/api/disable_product/" + prodToDisableCuid, {
        is_disable: false
      });
    }
  }

  render(){
    return(
      <div className="wall-column">
        <div className="grid_single_item">
          <div className="hover_box">
            <DeleteProductBtn index={this.props.index} onClick={this.props.onClick}/>
            <HideProductBtn handlerForHide = {this.hideAndShowProduct}  _hideShowText = {this.state._hideShowText} />
            <DisableProductBtn handlerForDisable = {this.disableAndEnableProduct} _disableEnableText = {this.state._disableEnableText}/>
          </div>
          <a href="#" data-target={"#" + this.props.index} data-toggle="modal" onClick={this.editProduct}>
            <img src= {this.props.productData.photo}/>
          </a>
          <div className="grid_tile_desc">
            <h2>{this.props.productData.product_name}</h2>
            <span className="price_tag">kr {this.props.productData.base_price}</span>
            <p>{this.props.productData.description}</p>
          </div>
        </div>
        <ReactSlider prod_to_edit={this.state._prodToEdit} index={this.props.index}/>
      </div>
    );
  }
}

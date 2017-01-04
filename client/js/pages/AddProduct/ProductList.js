import React from 'react';
import axios from 'axios';
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
          Prod_to_edit : {},
          Prod_to_hide : {},
          Prod_to_disable : {},
          Button_text : "hide"
      };
      this.EditProdBtnClck = this.EditProdBtnClck.bind(this)
      this.HideProdBtnClck = this.HideProdBtnClck.bind(this)
      this.DisableProdBtnClck = this.DisableProdBtnClck.bind(this)
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
      return axios.get("/api/product/" + prodToEditCuid);
    }

    HideProdBtnClck() {
      var prodToHideCuid = this.props.productData.cuid;
      this.hideProdData(prodToHideCuid).then((response) => {
        if(response.data) {
          this.setState({
            Prod_to_hide: response.data.product,
          });
              if(this.state.Button_text == "hide"){
                this.setState({
                  Button_text : "show"
                });

              }else{
                this.setState({
                  Button_text : "hide"
                });
              }
        }
      })
      .catch((err) => {
      console.log(err);
      });
    }

    hideProdData(prodToHideCuid) {
      if(this.state.Button_text == "hide")
        return axios.get("api/hide_product/" + prodToHideCuid , {
           params: {
              ishidden : true
           }
        });
      else
        return axios.get("api/show_product/" + prodToHideCuid , {
          params: {
              ishidden : false
           }
        });
    }

     DisableProdBtnClck() {
      var prodToDisableCuid = this.props.productData.cuid;
      this.disableProdData(prodToDisableCuid).then((response) => {
         if(response.data) {
          this.setState({
            Prod_to_disable: response.data.product
          });
        }
      })
      .catch((err) => {
      console.log(err);
      });
    }

    disableProdData(prodToDisableCuid) {
      return axios.get("api/disable_product/" + prodToDisableCuid);
    }

    render(){
      return(
        <div className="wall-column">
          <div className="grid_single_item">
            <div className="hover_box">
              <DeleteProductBtn index={this.props.index} onClick={this.props.onClick}/>
              <HideProductBtn handlerForHide = {this.HideProdBtnClck}  Button_text={this.state.Button_text} />
              <DisableProductBtn handlerForDisable = {this.DisableProdBtnClck}/>
            </div>
            <a href="#" data-target={"#" + this.props.index} data-toggle="modal" onClick={this.EditProdBtnClck}>
              <img src= {this.props.productData.photo}/>
            </a>
            <div className="grid_tile_desc">
              <h2>{this.props.productData.product_name}</h2>
              <span className="price_tag">kr {this.props.productData.price}</span>
              <p>{this.props.productData.description}</p>
            </div>
          </div>
          <ReactSlider prod_to_edit={this.state.Prod_to_edit} index={this.props.index}/>
        </div>
    );
  }
}

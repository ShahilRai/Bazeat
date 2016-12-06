import React from 'react';
import AddProduct from './AddProduct';
import Ingredients from './Ingredients';
import DeliveryMethods from './DeliveryMethods';
import assign from 'object-assign';

var fieldValues = {}

export default class ReactSlider extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      step : 1,
      allergens_list : [],
      product_category_list :[]
    };
    this.nextStep = this.nextStep.bind(this);
    this.saveValues = this.saveValues.bind(this);
    this.submitProduct = this.submitProduct.bind(this);
  }

  componentDidMount() {
    this.loadCategories().then((response) => {
        if(response.data) {
          this.setState({
            allergens_list: response.data.allergens_list,
            product_category_list: response.data.product_category_list
          });
        }
    }).catch((err) => {
        console.log(err);
    });
  }

  loadCategories() {
    return axios.get("/api/details" , {
    });
  }

  nextStep() {
    this.setState({
      step : this.state.step + 1
    })
  }

  saveValues(field_value){
     fieldValues =  assign({}, fieldValues, field_value)
  }

  submitProduct(){
    if(this.props.prod_to_edit){
      var prodToEditCuid = this.props.prod_to_edit.cuid;
      this.updateProductData(prodToEditCuid,fieldValues).then((response) => {
        this.context.router.push('/addProductPage');
          if(response.data) {
            console.log("redirect-to");
          }
      }).catch((err) => {
            console.log(err);
      });
    }
    else
      {
        this.saveProductData(fieldValues).then((response) => {
          this.context.router.push('/addProductPage');
            if(response.data) {
              console.log("redirect-to");
            }
        }).catch((err) => {
            console.log(err);
        });
      }
  }

  saveProductData(fieldValues) {
    return axios.post("/api/products" , {
      fieldValues: fieldValues
    });
  }

  updateProductData(prodToEditCuid,fieldValues) {
    return axios.put("/api/products/" + prodToEditCuid , {
      fieldValues: fieldValues
    });
  }

  showStep() {
      switch (this.state.step) {
        case 1:
          return <AddProduct fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} prod_categ_val = {this.state.product_category_list} prodDetails={this.props.prod_to_edit} />
        case 2:
          return <Ingredients fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} allrgnval ={this.state.allergens_list} prodDetails={this.props.prod_to_edit} />
        case 3:
          return <DeliveryMethods fieldValues={fieldValues} saveValues={this.saveValues} submitProduct={this.submitProduct} prodDetails={this.props.prod_to_edit} />
      }
  }

  render(){
    return (
      <div>
        <div className="modal prod_modal" id={this.props.id? this.props.id: this.props.index? this.props.index:"add"} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              {this.showStep()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

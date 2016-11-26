import React from 'react';
import AddProduct from './AddProduct';
import Ingredients from './Ingredients';
import DeliveryMethods from './DeliveryMethods';
import assign from 'object-assign';

var fieldValues = {}

export default class ReactSlider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      step : 1,
      allergens_list : [],
      product_category_list :[]
    };
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
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

  previousStep() {
    this.setState({
    step : this.state.step - 1
    })
  }

  saveValues(field_value){
     fieldValues =  assign({}, fieldValues, field_value)
  }

  submitProduct(){
    this.loadProductData(fieldValues).then((response) => {
      window.location.reload(true);
        if(response.data) {
          console.log("redirect-to");
        }
    }).catch((err) => {
        console.log(err);
    });
  }

  loadProductData(fieldValues) {
    return axios.post("/api/products" , {
      fieldValues: fieldValues
    });
  }

  showStep() {
    switch (this.state.step) {
      case 1:
        return <AddProduct fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} prod_categ_val = {this.state.product_category_list} />
      case 2:
        return <Ingredients fieldValues={fieldValues} nextStep={this.nextStep} previousStep={this.previousStep} saveValues={this.saveValues} allrgnval ={this.state.allergens_list} />
      case 3:
        return <DeliveryMethods fieldValues={fieldValues} previousStep={this.previousStep} saveValues={this.saveValues} submitProduct={this.submitProduct} />
    }
  }

  render(){
    return (
      <div>
        <div className="modal prod_modal" id="step_1" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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

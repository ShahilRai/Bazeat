import React from 'react';
import AddProduct from './AddProduct';
import Ingredients from './Ingredients';
import DeliveryMethods from './DeliveryMethods';


export default class ReactSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step : 1
    };
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
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

  showStep() {
      switch (this.state.step) {
        case 1:
          return <AddProduct  nextStep={this.nextStep} />
        case 2:
          return <Ingredients nextStep={this.nextStep} previousStep={this.previousStep} />
        case 3:
          return <DeliveryMethods addProduct={this.addProduct} previousStep={this.previousStep} />
      }
    }

  render(){
      
      return (
        <div>
          {this.showStep()}
        </div>
      );
    }

  }
import React from 'react';

export default class ProductStep extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props , context) {
    super(props , context);
    this.state = {
      step: this.props.step,
      checkoutStep: [{'name': "Shopping<br/>bag", "class_Name": "text-left"}, {'name':"Delivery <br/> Method" , "class_Name": "text-center"},{'name':"Delivery <br/> Details" , "class_Name": "text-center"},{'name':"Confirmation" , "class_Name": "text-center"},{'name':"Payment" , "class_Name": "text-right"} ]
    }
  }

  render() {
    return (
      <div className="product_step_col">
        {this.state.checkoutStep.map((checkout, index) =>
          <div className={"steps_circle_col"+checkout.class_Name}>
          <div className="steps_des_col">
            <span className="steps_circle_icon {(activestate == {index}) ? active : ''}">{index+1}</span>
            <span className="step_name_col active">{checkout.name}</span>
          </div>
        </div>
        )}
      </div>
    );
  }
}


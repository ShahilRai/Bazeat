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
      activeclass1:false,
      activeclass2:false,
      activeclass3:false,
      activeclass4:false,
      activeclass5:false
    }
  }

  componentDidMount(){
    if(this.state.step==1){
      this.setState({
        activeclass1: true
      });
    }if(this.state.step==2){
      this.setState({
        activeclass2: true
      });
    }if(this.state.step==3){
      this.setState({
        activeclass3: true
      });
    }if(this.state.step==4){
      this.setState({
        activeclass4: true
      });
    }if(this.state.step==5){
      this.setState({
        activeclass5: true
      });
    }
  }

  render() {
    var ShoppingBag=(this.state.activeclass1?'active':'')
    var deliveryTypes=(this.state.activeclass2?'active':'')
    var productPicUpDate=(this.state.activeclass3?'active':'')
    var orderConfirmation=(this.state.activeclass4?'active':'')
    var payment=(this.state.activeclass5?'active':'')

    return (
      <div className="product_step_col">
        <div className="steps_circle_col text-left">
         <div className="steps_des_col">
           <span className={"steps_circle_icon "+ ShoppingBag}>1</span>
           <span className="step_name_col">Shopping<br/>bag</span>
         </div>
        </div>
        <div className="steps_circle_col  text-center">
          <div className="steps_des_col">
           <span className={"steps_circle_icon "+ deliveryTypes}>2</span>
           <span className="step_name_col">Delivery <br/> Method</span>
          </div>
        </div>
        <div className="steps_circle_col  text-center">
          <div className="steps_des_col">
            <span className={"steps_circle_icon "+ productPicUpDate}>3</span>
            <span className="step_name_col">Delivery <br/> Details</span>
          </div>
        </div>
        <div className="steps_circle_col  text-center">
          <div className="steps_des_col">
            <span className={"steps_circle_icon "+ orderConfirmation}>4</span>
            <span className="step_name_col">Confirmation</span>
          </div>
        </div>
        <div className="steps_circle_col  text-right">
          <div className="steps_des_col">
            <span className={"steps_circle_icon "+ payment}>5</span>
            <span className="step_name_col">Payment</span>
          </div>
        </div>
      </div>
    );
  }
}
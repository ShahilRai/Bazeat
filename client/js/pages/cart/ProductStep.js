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
      activeclass1:'',
      activeclass2:'',
      activeclass3:'',
      activeclass4:'',
      activeclass5:''
    }
  }

  ComponentDidMount(){
    alert("hii")
    if(this.state.step==1){
      this.setState({
       activeclass1: 'active'
      });
    }if(this.state.step==2){
      this.setState({
       activeclass2: 'active'
      });
    }if(this.state.step==3){
      this.setState({
       activeclass3: 'active'
      });
    }if(this.state.step==4){
      this.setState({
       activeclass4: 'active'
      });
    }if(this.state.step==5){
      this.setState({
       activeclass5: 'active'
      });
    }
   } 

  render() {
      console.log(this.state.activeclass1)

    return (
      <div className="product_step_col">
        <div className="steps_circle_col text-left">
          <div className="steps_des_col">
            <span className="steps_circle_icon">1</span>
            <span className="step_name_col active">Shopping<br/>bag</span>
          </div>
        </div>
      
        <div className="steps_circle_col  text-center">
          <div className="steps_des_col">
            <span className="steps_circle_icon {this.state.activeclass2}">2</span>
            <span className="step_name_col">Delivery <br/> Method</span>
          </div>
        </div>
      
        <div className="steps_circle_col  text-center">
          <div className="steps_des_col">
            <span className="steps_circle_icon">3</span>
            <span className="step_name_col">Delivery <br/> Details</span>
          </div>
        </div>

        <div className="steps_circle_col  text-center">
          <div className="steps_des_col">
            <span className="steps_circle_icon">4</span>
            <span className="step_name_col">Confirmation</span>
          </div>
        </div>

        <div className="steps_circle_col  text-right">
          <div className="steps_des_col">
            <span className="steps_circle_icon">5</span>
            <span className="step_name_col">Payment</span>
          </div>
        </div>
      </div>
    );
  }
}


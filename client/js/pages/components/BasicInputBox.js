import React from 'react';

export default class InputField extends React.Component {

  constructor(props, context) {
    super(props);
    this.state = {
      value: this.props.value
    };
    
  }

  render() {
    return(
      <div>
       <label>{this.props.label}</label>
       <br/>
       <input type="text" onChange={this.props.valChange} value= {this.props.val} />
       <br/> 
     </div>
    );
  }      
}  
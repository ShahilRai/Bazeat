import React from 'react';
export default class SelectField extends React.Component{

  constructor(props,context) {
   super(props, context);
   this.state={
    value: this.props.vat?(this.props.value == true ? 'Yes': 'No'):this.props.value
   };
   this.handleChange=this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value});
    if (this.props.onChange){
      this.props.onChange(event);
    }
  }

  render(){
    return(
     <select id={this.props.name} name ={this.props.name} onChange={this.handleChange} value={this.state.value}>
        <option value="Select One">Select One</option>
        <option value={this.props.vat?'Yes':'Male'}>{this.props.vat?'Yes':'Male'}</option>
        <option value={this.props.vat?'No':'FeMale'}>{this.props.vat?'No':'FeMale'}</option>
     </select>
    );
  }
}

import React from 'react';
var SimpleSelect = require("react-selectize");
export default class SelectField extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: this.props.value
    };
    this.handleChange = this.handleChange.bind(this);
  }
    
  handleChange(event) {
    this.setState({ value: event.target.value });
    if (this.props.onChange){
            this.props.onChange(event);
        }
  }

  render() {
    return(
      <div className="col-md-8 col-xs-12">
        <SimpleSelect  placeholder = "Select a fruit"></SimpleSelect>
      </div>  
    );
  }      
}
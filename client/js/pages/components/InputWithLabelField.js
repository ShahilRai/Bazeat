import React from 'react';
import InputField from './InputField';
import LabelField from './LabelField';
export default class InputWithLabelField extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
    return(
      <div className="form-group row">
        <LabelField htmlFor={this.props.htmlFor} label={this.props.label} />
        <InputField name={this.props.name} value = {this.props.value} />
      </div>
    );
  }      
}  
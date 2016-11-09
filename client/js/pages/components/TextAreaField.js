import React from 'react';

export default class TextAreaField extends React.Component {

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
        <textarea className="form-control" id={this.props.name} name={this.props.name}  onChange={this.handleChange} >{this.state.value}</textarea>
      </div>
    );
  }      
}  
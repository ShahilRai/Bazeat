import React from 'react';

export default class TextAreaField extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: this.props.value
    };
    this.handleChange = this.handleChange.bind(this);
  }
    
  handleChange(evt) {
    console.log(evt.target.name +":"+ evt.target.value);
    this.setState({
      value: evt.target.value
    });
  }

  render() {
    return(
      <div className="col-md-8 col-xs-12">
        <textarea className="form-control" id={this.props.name} name={this.props.name} onChange={this.handleChange}>{this.state.value}</textarea>
      </div>
    );
  }      
}  
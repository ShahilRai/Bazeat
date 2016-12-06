import React from 'react';

export default class InputField extends React.Component {

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
        <input type={this.props.type ? this.props.type : "text"} className="form-control" id={this.props.name} name={this.props.name} value={this.state.value} onChange={this.handleChange} />
      </div>
    );
  }
}

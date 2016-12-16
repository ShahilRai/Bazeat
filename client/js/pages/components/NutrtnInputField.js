import React from 'react';

export default class NutrtnInputField extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      ntrtn: this.props.prodDetails
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    this.setState({
      ntrtn: event.target.value
    })
  }

  render() {
    return(
        <input type="text" ref="ntrtn" className="form-control" name={this.props.name} value = {this.state.ntrtn} onChange={this.handleChange} />
    );
  }
}

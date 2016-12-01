import React from 'react';

export default class ProductInputField extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    if (this.props.onChange){
            this.props.onChange(event);
        }
  }

  componentWillMount(){
    this.setState({
      value: this.props.children
    })
  }

  getValue(){
    return this.state.value
  }

  render() {
    return(
      <div className="form-group">
        <label htmlFor="" className="col-form-label">kJ</label>
        <input type="text" className="form-control" name="kj" ref="kj" value={this.state.value} onChange={this.handleChange} />
      </div>
    );
  }
}

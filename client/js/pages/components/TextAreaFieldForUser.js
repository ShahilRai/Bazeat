import React from 'react';

export default class TextAreaFieldForUser extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: this.props.children
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
        <textarea className="form-control"  ref="name" id={this.props.name} name={this.props.name}  onChange={this.handleChange} value={this.state.value}/>
        <p className = "mtop5">if you will deliver the your products to your customers, it would be great to inform them about the particulars. This information will show up under *Delivery details* for Budmat.</p>
      </div>
    );
  }
}
import React from 'react';

export default class CheckBoxField extends React.Component {
   constructor(props, context) {
    super(props, context);
    this.state = {
      checked: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount(){
    this.setState({
      prodDetails: this.props.prodDetails
    })
  }

  handleChange(event) {
    this.setState({
      checked: !this.state.checked
    });
  }

  render() {
    var prdctn ;
    if(this.props.prodDetails){
      prdctn = this.props.prodDetails
    }
    return(
      <div className="checkbox custom_checkbox">
        <input id={this.props.id} type="checkbox" ref="prdctn_col" name={this.props.name} onChange = {this.handleChange} defaultChecked={prdctn} />
          <label htmlFor={this.props.htmlFor}>
            {this.props.label}
          </label>
      </div>
    );
  }
}

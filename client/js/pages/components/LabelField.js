import React from 'react';

export default class LabelField extends React.Component {

  render() {
    return(
        <label htmlFor={this.props.htmlFor} className="col-md-4 col-xs-12 col-form-label">{ this.props.label }</label>
    );
  }      
}  
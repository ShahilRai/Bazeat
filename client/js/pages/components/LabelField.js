import React from 'react';

export default class LabelField extends React.Component {

  render() {
    return(
        <label htmlFor={this.props.htmlFor} className={this.props.className ? this.props.className : ""}>{ this.props.label }</label>
    );
  }      
}  
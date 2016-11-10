import React from 'react';

export default class StormInputField extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }
    
  render() {
    return(
      <div className="col-md-8 col-xs-12">
        <input type={this.props.type ? this.props.type : "text"} className="form-control" id={this.props.name} name={this.props.name} required/>
      </div>
    );
  }      
}  
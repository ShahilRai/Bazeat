import React from 'react';
export default class ProducerLogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render(){
    return(
      <img src={this.props.url} height={this.props.height? this.props.height:''} width={this.props.width? this.props.width:''} className={this.props.p_class? this.props.p_class:''} />
    );
  }
}







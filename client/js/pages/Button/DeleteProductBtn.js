import React from 'react';
export default class DeleteProductBtn extends React.Component {

  render(){
    return(
     <a href="javascript:void(0)" data-index={this.props.index} className="buy_btn del_btn" onClick={this.props.onClick}>Delete</a>
    )
  }
}

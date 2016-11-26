import React from 'react';
export default class DeleteProductBtn extends React.Component {

  render(){
    return(
      <input type="button" className="buy_btn del_btn" value="Delete" data-index={this.props.index} onClick={this.props.onClick}/>
    )
  }
}

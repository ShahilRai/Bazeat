import React from 'react';
export default class EditProductBtn extends React.Component {

  render(){
	return(
		<a href="#" data-toggle="modal" data-target={"#" + this.props.index} className="buy_btn disable_btn" onClick={this.props.handlerForEdit}>Edit</a>
	)
  }
}

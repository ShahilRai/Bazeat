import React from 'react';
export default class EditProductBtn extends React.Component {

  render(){
	 return(
		  <a href="#" data-toggle="modal" data-target={"#" + this.props.index} className="disable_btn hover_icon" onClick={this.props.handlerForEdit}>
		  	<i className="fa fa-pencil-square-o" aria-hidden="true" /><small className="icon_text">Edit</small>
		  </a>
	 )
  }
}

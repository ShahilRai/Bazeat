import React from 'react';

export default class ProductHeading extends React.Component {

	render(){
    var heading = "Add New Product";
    if(this.props.prodDetails){
      heading = "Edit Product"
    }
    return (
    	<div className="modal-header">
				<button type="button" className="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">X</span>
				</button>
				<h3 className="modal-title" id="myModalLabel">{heading}</h3>
			</div>
    )
  }
}


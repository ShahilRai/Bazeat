import React from 'react';
import DocumentTitle from 'react-document-title';

export default class DeliveryMethods extends React.Component {

	PreviousSteps(){
	this.props.previousStep()
}

	render() {
		return (
		<div>
			<a href="#" className="shopping_bag" data-toggle="modal" data-target="#step_3"><img src={require("../../../images/shopping_bag.png")}/></a>
			<div class="modal fade prod_modal" id="step_3" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">X</span>
							</button>
							<h3 className="modal-title" id="myModalLabel">Add new product</h3>
						</div>
						<div className="modal-body delivery_modal_body">
							<div className="prod_steps">
								<div className="step_1 right_border">
									<span className="complt_steps">	
										<span className="step_nos">1</span>
										<span className="step_descrip inactive">Product <br/> details</span>
									</span>
								</div>
								<div className="step_1 right_border">
									<span className="complt_steps">	
										<span className="step_nos">2</span>
										<span className="step_descrip inactive">Nutrition &amp; <br/> allergens</span>
									</span>
								</div>
								<div className="step_1">
									<span className="complt_steps">	
										<span className="step_nos orange_bg">3</span>
										<span className="step_descrip">Delivery <br/> methods</span>
									</span>
								</div>
							</div>
							<form className="prod_form">
								<div className="nutrition_fact">
								    <h5>Delivery methods</h5>
								    <div className="chkbox_col del_chkbox">
										<div className="checkbox custom_checkbox">
											<input id="checkbox3" type="checkbox" />
											<label htmlFor="checkbox3">
												Send 
											</label>
										</div>
									</div>
									<div className="chkbox_col del_chkbox">
										<div className="checkbox custom_checkbox">
											<input id="checkbox4" type="checkbox"/>
											<label htmlFor="checkbox4">
												Pick up 
											</label>
										</div>
									</div>				
								</div>
								<div className="nutrition_fact shipment_sec">
									<div className="form-col">
										<div className="form-group">
											<label htmlFor="" className="col-form-label">Shipment</label>
											<input className="form-control" placeholder="" type="text"/>
											<p>How much will you charge<br/> for your shipment?</p>
										</div>				
									</div>
									<div className="form-col">
										<div className="form-group">
											<label htmlFor="" className="col-form-label text_right">Additional<br/> items</label>
											<input className="form-control" placeholder="" type="text"/>
											<p>How much will you charge<br/> for the packaging?</p>
										</div>
									</div>
								</div>
								<div className="nutrition_fact shipment_sec">
									<div className="form-col pickup_wdth">
										<div className="form-group">
											<label htmlFor="" className="col-form-label">Pick up time</label>
											<input className="form-control" placeholder="" type="text"/>
											<p>Tell your customers when the product can be picked up.<br/> Dont edit if product can be picked up during opening hours</p>
										</div>				
									</div>				
								</div>
							</form>	
						</div>
						<div className="modal-footer">
						    <button type="button" className="btn btn-default nxt_btn" onClick={this.PreviousSteps.bind(this)}>Previous</button>
							<button type="button" className="btn btn-default nxt_btn">Add product</button>
						</div>
					</div>
				</div>
			</div>
		</div>				
	  );
	}
}
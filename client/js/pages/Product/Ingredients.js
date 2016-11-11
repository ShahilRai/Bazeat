import React from 'react';
import DocumentTitle from 'react-document-title';

export default class Ingredients extends React.Component {

	SaveAndContinue(){
	this.props.nextStep()
}

	PreviousSteps(){
	this.props.previousStep()
}

	render() {
		return (
		<div>
			<div class="modal fade prod_modal prod_modal2" id="step_2" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">X</span>
							</button>
							<h3 className="modal-title" id="myModalLabel">Add new product</h3>
						</div>
						<div className="modal-body">
							<div className="prod_steps">
								<div className="step_1 right_border">
									<span className="complt_steps">	
										<span className="step_nos">1</span>
										<span className="step_descrip inactive">Product <br/> details</span>
									</span>
								</div>
								<div className="step_1 right_border">
									<span className="complt_steps">	
										<span className="step_nos orange_bg">2</span>
										<span className="step_descrip">Ingredients &amp; <br/> nutrition</span>
									</span>
								</div>
								<div className="step_1">
									<span className="complt_steps">	
										<span className="step_nos">3</span>
										<span className="step_descrip inactive">Delivery <br/> methods</span>
									</span>
								</div>
							</div>
							<form className="prod_form">
								<div className="nutrition_fact nutrition_fact_top">
									<h5>Ingredients</h5>
									<div className="form-group">
										<label htmlFor="" className="col-form-label ingrdnt_label">Ingredient</label>
										<input type="text" className="form-control" placeholder=""/>
										<button type="button" className="btn btn-default nxt_btn ingrdnt_btn">Add ingredient</button>
										<ul className="ingrdnt_options">
										
										</ul>
									</div>
								</div>
								<div className="nutrition_fact">
									<h5>Production</h5>
									<div className="chkbox_col production_col">
										<div className="checkbox custom_checkbox">
											<input id="checkbox17" type="checkbox"/>
											<label htmlFor="checkbox17">
												Contains bought items 
											</label>
										</div>
										<div className="checkbox custom_checkbox">
											<input id="checkbox18" type="checkbox"/>
											<label htmlFor="checkbox18">
												Contains locally produced items 
											</label>
										</div>
									</div>
								</div>
								<div className="nutrition_fact nutrition_fact_top">
									<h5>Nutrition facts</h5>
									<div className="form-col">
										<div className="form-group">
											<label htmlFor="" className="col-form-label">kJ</label>
											<input type="text" className="form-control" placeholder=""/>
										</div>
										<div className="form-group">
											<label htmlFor="" className="col-form-label">kcal</label>
											<input type="text" className="form-control" placeholder=""/>
										</div>
										<div className="form-group">
											<label htmlFor="" className="col-form-label">Fat</label>
											<input type="text" className="form-control" placeholder=""/>
										</div>
									</div>
									<div className="form-col">
										<div className="form-group">
											<label htmlFor="" className="col-form-label">Carbs</label>
											<input type="text" className="form-control" placeholder=""/>
										</div>
										<div className="form-group">
											<label htmlFor="" className="col-form-label">Fiber</label>
											<input type="text" className="form-control" placeholder=""/>
										</div>
										<div className="form-group">
											<label htmlFor="" className="col-form-label">Protein</label>
											<input type="text" className="form-control" placeholder=""/>
										</div>
									</div>
								</div>
								<div className="nutrition_fact">
									<h5>Allergens</h5>
									<div className="chkbox_col">
										<div className="checkbox custom_checkbox">
											<input id="checkbox2" type="checkbox"/>
											<label htmlFor="checkbox2">
												Celery 
											</label>
										</div>
										<div className="checkbox custom_checkbox">
											<input id="checkbox3" type="checkbox"/>
											<label htmlFor="checkbox3">
												Crustaceans 
											</label>
										</div>
										<div className="checkbox custom_checkbox">
											<input id="checkbox4" type="checkbox"/>
											<label htmlFor="checkbox4">
												Eggs 
											</label>
										</div>
									</div>
									<div className="chkbox_col">
										<div className="checkbox custom_checkbox">
											<input id="checkbox5" type="checkbox"/>
											<label htmlFor="checkbox5">
												Fish 
											</label>
										</div>
										<div className="checkbox custom_checkbox">
											<input id="checkbox6" type="checkbox"/>
											<label htmlFor="checkbox6">
												Gluten 
											</label>
										</div>
										<div className="checkbox custom_checkbox">
											<input id="checkbox7" type="checkbox"/>
											<label htmlFor="checkbox7">
												Lupin 
											</label>
											</div>
										</div>
										<div className="chkbox_col">
											<div className="checkbox custom_checkbox">
												<input id="checkbox8" type="checkbox"/>
												<label htmlFor="checkbox8">
													Milk 
												</label>
											</div>
											<div className="checkbox custom_checkbox">
												<input id="checkbox9" type="checkbox"/>
												<label htmlFor="checkbox9">
													Molluscs 
												</label>
											</div>
											<div className="checkbox custom_checkbox">
												<input id="checkbox10" type="checkbox"/>
												<label htmlFor="checkbox10">
												    Mustard 
												</label>
											</div>
										</div>
										<div className="chkbox_col">
											<div className="checkbox custom_checkbox">
												<input id="checkbox11" type="checkbox"/>
												<label htmlFor="checkbox11">
													Nuts 
												</label>
											</div>
											<div className="checkbox custom_checkbox">
												<input id="checkbox12" type="checkbox"/>
												<label htmlFor="checkbox12">
													Peanuts 
												</label>
											</div>
											<div className="checkbox custom_checkbox">
												<input id="checkbox13" type="checkbox"/>
												<label htmlFor="checkbox13">
													Sesame 
												</label>
											</div>
										</div>
										<div className="chkbox_col">
											<div className="checkbox custom_checkbox">
												<input id="checkbox14" type="checkbox"/>
												<label htmlFor="checkbox14">
													Soy 
												</label>
											</div>
											<div className="checkbox custom_checkbox">
												<input id="checkbox15" type="checkbox"/>
												<label htmlFor="checkbox15">
													Sulphur Dioxide 
												</label>
											</div>
											<div className="checkbox custom_checkbox">
												<input id="checkbox16" type="checkbox"/>
												<label htmlFor="checkbox16">
													None 
												</label>
											</div>
										</div>
									</div>				
							</form>
						</div>
						<div className="modal-footer">
						    <button type="button" className="btn btn-default nxt_btn" onClick={this.PreviousSteps.bind(this)}>Previous</button>
							<button type="button" className="btn btn-default nxt_btn" onClick={this.SaveAndContinue.bind(this)}>Next</button>
						</div>
					</div>
				</div>
			</div>	
		</div>				
	  );
	}
}
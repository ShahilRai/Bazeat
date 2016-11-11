import React from 'react';
import DocumentTitle from 'react-document-title';

export default class AddProduct extends React.Component {

SaveAndContinue(){
	this.props.nextStep()
}

	render() {
		return (
		<div>
			<a className="shopping_bag" href="#"  data-toggle="modal" data-target="#step_1"><img src={require("../../../images/shopping_bag.png")}/></a>
			<div class="modal fade prod_modal" id="step_1" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">						
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
								<div className="step_1 right_border orange_bg">
									<span className="complt_steps">	
										<span className="step_nos orange_bg">1</span>
										<span className="step_descrip">Product <br/> details</span>
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
										<span className="step_nos">3</span>
										<span className="step_descrip inactive">Delivery <br/> methods</span>
									</span>
								</div>
							</div>
							<form className="prod_form">
			 					<div className="lt_prod_sec">
			 						<div className="box__input">
										<input name="file-1[]" id="file-1" className="inputfile inputfile-1" data-multiple-caption="{count} files selected" multiple="" type="file" />
					                    <label htmlFor="file-1" className="input_upload">
					                        <span className="file_text">Select one of the files from your computer <span className="drop_txt">or drag and drop them here</span>
					                        </span>
					                    </label>
									</div>
									<div className="form-group m_top20 m_lt9">
										<div className="form-check">
											<label className="form-check-label control control--radio">
												<input className="form-check-input custom_radio" name="optionsRadios" value="option2" type="radio" />
												Hot food
												<div className="control__indicator"></div>
											</label>
										</div>
										<div className="form-check">
											<label className="form-check-label control control--radio">
												<input className="form-check-input custom_radio" checked="checked" name="optionsRadios" value="option2" type="radio" />
												Cold food
												<div className="control__indicator"></div>
											</label>
										</div>
										<div className="form-group m_lt19">
											<label htmlFor="" className="col-form-label qty_label">Quantity available</label>
											<input type="text" className="form-control qty_input" placeholder="" value="100" />
										</div>
									</div>
			 					</div>
			 					<div className="rt_prod_sec">
									<div className="form-group">
										<input type="text" className="form-control prod_label" placeholder="Product name" />
									</div>
									<div className="form-group nok_form">
										<label htmlFor="" className="col-form-label nok_label">NOK</label>
										<input type="text" className="form-control" placeholder="199" />
									</div>
									<div className="form-group portion_form custom_select">
										<select className="form-control">
											<option>portion</option>
											<option>Default select</option>
											<option>Default select</option>
										</select>
										<span className="select_bg"><small className="select__arrow"></small></span>
									</div>
									<div className="form-group custom_select">
										<select className="form-control">
											<option>Product category</option>
											<option>Default select</option>
											<option>Default select</option>
										</select>
										<span className="select_bg"><small className="select__arrow"></small></span>
									</div>
									<div className="form-group prod_txtarea">
										<textarea>Product description</textarea>
									</div>
								</div>
								<div className="form-group m_lt55 " id="">
									<label htmlFor="" className="col-form-label qty_label">Expiry date</label>
									<div id="datetimepicker1" className="date_section">
										<input type="text" id="example1" className="form-control date_input" />
										<span className="add-on"><i className="fa fa-calendar" aria-hidden="true"></i></span>
									</div>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-default nxt_btn" onClick={this.SaveAndContinue.bind(this)}>Next</button>
						</div>
					</div>
				</div>
			</div> 	
		</div>				
	  );
	}
}
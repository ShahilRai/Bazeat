import React from 'react';
export default class ProductDetails extends React.Component {
	render(){
		return(
			<div className="modal fade prod_modal" id="product_desc" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div className="modal-dialog add_prduct_modal" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close modal_close" data-dismiss="modal" aria-label="Close">
							</button>
							<h3 className="modal-title" id="myModalLabel">Product Name</h3>
							<p className="review_num">{this.props.product_details.product_name}</p>
						</div>
						<div className="modal-body clearfix">
							<div className="add_new_prodct_col">
								<div className="lt_prod_sec">
									<img src={this.props.product_details.photo} alt="Product Image here" className="img-responsive"/>
								</div>
								<div className="rt_prod_sec">
									<div id="priceTage">
										<div className="text-right">
											<h3 id="price" className="mrht20">
												{this.props.product_details.price}<sup>00</sup>
											</h3>
											<p className="mrht20">per portion</p>
											<button type="button" className="btn btn-default nxt_btn">Buy</button>
										</div>
										<p id="product_description" className="mtop15">
											{this.props.product_details.description}
										</p>
									</div>
									<div id="deliverDetails" className="mtop15">
										<button type="button" className="btn btn-default nxt_btn pull-right">open</button>
										<i className="fa fa-clock-o pull-left" aria-hidden="true"></i>
										<p>Mon-Sat: 08.00-15.00</p>
										<i className="fa fa-truck fa-flip-horizontal pull-left" aria-hidden="true"></i>
										<p className="mlft20">
											Can be delivered<br/>
											Can be picked up<br/>
										</p>
										<i className="fa fa-tree" aria-hidden="true"></i>
										<i className="fa fa-home" aria-hidden="true"></i>
									</div>
								</div>
							</div>
						</div>
						<div>
							<div className="modal-footer">
								<h4 className="text-left">Product details</h4>
							</div>
							<div className="padd_30">
								<p className="mtop15"><b>Category:</b> <span className="mlft20">{this.props.product_details.product_category.name}</span> </p>
								<p className="mtop15"><b>Ingredient:</b> {this.props.product_details.ingredients.map((ingredientsName, index) => <span className="mlft20" key={index}> {ingredientsName.name}</span>)}</p>
								<p className="mtop15"><b>Allergens:</b> {this.props.product_details.allergens.map((allergensName, index) =><span className="mlft20" key={index}><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> {allergensName.name}</span>)} </p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

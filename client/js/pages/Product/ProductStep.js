import React from 'react';

export default class ProductStep extends React.Component {

	render(){
    return (
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
		)
	}
}			
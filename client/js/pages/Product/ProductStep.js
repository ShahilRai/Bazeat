import React from 'react';

export default class ProductStep extends React.Component {

	render(){
    return (
			<div className="product_step_col">
      	<div className="steps_circle_col text-left">
        	<div className="steps_des_col">
            <span className="steps_circle_icon active">1</span>
            <span className="step_name_col">Product<br/>Details</span>
          </div>
        </div>
        <div className="steps_circle_col  text-center">
        	<div className="steps_des_col">
          	<span className="steps_circle_icon">2</span>
            <span className="step_name_col">Nutrition &amp; <br/> allergens</span>
          </div>
        </div>
        <div className="steps_circle_col  text-right">
          <div className="steps_des_col">
          	<span className="steps_circle_icon">3</span>
            <span className="step_name_col">Delivery <br/> methods</span>
          </div>
        </div>
			</div>
		)
	}
}			
import React from 'react';
import DocumentTitle from 'react-document-title';
import IngredientsList from './IngredientsList';
import Tags from './Tags';

export default class Ingredients extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	data:{
    		ingredients : []
    	},
      algrnList: this.props.allrgnval,
      chckboxVal:[]
    };
  }

	SaveAndContinue(){
		var ingredientsid = this.state.data.ingredients.map((item) => item._id);
		this.state = {
		data : {
      ingredients : ingredientsid,
      nutrition_fact:{
			  kj : this.refs.kj.value,
				carbs : this.refs.carbs.value,
				kcal : this.refs.kcal.value,
				fiber : this.refs.fiber.value,
				fat : this.refs.fat.value,
				protein : this.refs.protein.value,
			},
		  allergens: this.state.chckboxVal,
		  bought_items: this.refs.bought_items.checked,
		  locally_produced_items: this.refs.locally_produced_items.checked
    }
  }

  this.props.saveValues(this.state.data)
	this.props.nextStep()
}

	PreviousSteps() {
		this.props.previousStep()
	}

  addItem() {
    var newElement = this.refs.ingredients.value;
    var ingredientList = this.state.data.ingredients;
    var ingredient = this.refs.IngredientsList.ingredients(newElement);

    if (ingredientList.length == 0){
      ingredientList.push(ingredient);
    } else {
      var found = false;

      for(var i=0; i < ingredientList.length; i++) {
        if(ingredientList[i].name == newElement) {
          found = true;
        }
      }

      if(found == false){
        ingredientList.push(ingredient);
      }
    }

    var newState = {data:{}};
    newState.data.ingredients = ingredientList;
    this.setState(newState);
  }

  removeTag(e) {
    e.preventDefault();
    var ingredientList = this.state.data.ingredients;
    var ingredientName = e.target.previousSibling.previousSibling.textContent;

    for(var i=0; i < ingredientList.length; i++) {
      if(ingredientList[i].name == ingredientName) {
        ingredientList.splice(i, 1);
      }
    }

    var newState = {data:{}};
    newState.data.ingredients = ingredientList;
    this.setState(newState);
  }

	handleCheckBox(event){
		const chckboxVal=this.state.chckboxVal
		let index
		if (event.target.checked)
			chckboxVal.push(event.target.value)
		else {
      index = chckboxVal.indexOf(event.target.value)
      chckboxVal.splice(index, 1)
    }

		this.setState({
			chckboxVal:chckboxVal
		})

	}

	render() {
		return (
			<div>
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
										<input type="text" className="form-control" name="ingredients" list="ingredientList" ref="ingredients" defaultValue={this.props.fieldValues.ingredients} placeholder=""/>
										<IngredientsList ref="IngredientsList" />
										<button type="button" className="btn btn-default nxt_btn ingrdnt_btn" onClick={this.addItem.bind(this)}>Add ingredient</button>
										<ul className="ingrdnt_options">
										</ul>
                    <Tags allIngredients={this.state.data.ingredients} onClick={this.removeTag.bind(this)}/>
									</div>
								</div>
								<div className="nutrition_fact">
									<h5>Production</h5>
									<div className="chkbox_col production_col">
										<div className="checkbox custom_checkbox">
											<input id="checkbox17" type="checkbox" ref="bought_items" name="bought_items"/>
											<label htmlFor="checkbox17">
												Contains bought items
											</label>
										</div>
										<div className="checkbox custom_checkbox">
											<input id="checkbox18" type="checkbox" ref="locally_produced_items" name="locally_produced_items"/>
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
											<input type="text" className="form-control" name="kj" ref="kj" defaultValue={this.props.fieldValues.kj} placeholder=""/>
										</div>
										<div className="form-group">
											<label htmlFor="" className="col-form-label">kcal</label>
											<input type="text" className="form-control" name="kcal" ref="kcal" defaultValue={this.props.fieldValues.kcal} placeholder=""/>
										</div>
										<div className="form-group">
											<label htmlFor="" className="col-form-label">Fat</label>
											<input type="text" className="form-control" name="fat" ref="fat" defaultValue={this.props.fieldValues.fat} placeholder=""/>
										</div>
									</div>
									<div className="form-col">
										<div className="form-group">
											<label htmlFor="" className="col-form-label">Carbs</label>
											<input type="text" className="form-control" name="carbs" ref="carbs" defaultValue={this.props.fieldValues.carbs} placeholder=""/>
										</div>
										<div className="form-group">
											<label htmlFor="" className="col-form-label">Fiber</label>
											<input type="text" className="form-control" name="fiber" ref="fiber" defaultValue={this.props.fieldValues.fiber} placeholder=""/>
										</div>
										<div className="form-group">
											<label htmlFor="" className="col-form-label">Protein</label>
											<input type="text" className="form-control" name="protein" ref="protein" defaultValue={this.props.fieldValues.protein} placeholder=""/>
										</div>
									</div>
								</div>
								<div className="nutrition_fact">
									<h5>Allergens</h5>
									<div className="chkbox_col">
										<div className="checkbox custom_checkbox">
											{this.state.algrnList.map((allergens_list, index) => {
											return (
													<div>
														<input id={allergens_list._id} type="checkbox" defaultValue={allergens_list._id} ref="allergens" name="allergens" key={ index }  onChange={this.handleCheckBox.bind(this)}/>
														<label htmlFor={allergens_list._id}>
															{allergens_list.name }
														</label>
													</div>
												);
					            })}
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
	  	);
	}
}

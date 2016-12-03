import React from 'react';
import DocumentTitle from 'react-document-title';
import IngredientsList from './IngredientsList';
import ProductHeading from './ProductHeading';
import Tags from './Tags';
import CheckBoxField from '../components/CheckBoxField';
import LabelField from '../components/LabelField';

export default class Ingredients extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	data:{
    		ingredients : []
    	},
      algrnList: this.props.allrgnval,
      chckboxVal:[],
      prodDetails:{}
    };
  }

  componentDidMount() {
      this.setState({
        prodDetails: this.props.prodDetails
      })
  }

	SaveAndContinue(){
		var ingredientsid = this.state.data.ingredients.map((item) => item.id);
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
		  bought_items: this.refs.bought_items.refs.prdctn_col.checked,
		  locally_produced_items: this.refs.locally_produced_items.refs.prdctn_col.checked
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
    this.refs.ingredients.value = "";
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
				<ProductHeading />
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
									<input type="text" className="form-control" name="ingredients" list="ingredientList" ref="ingredients" placeholder=""/>
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
									<CheckBoxField id="checkbox17" ref="bought_items" name="bought_items" htmlFor="checkbox17" label="Contains bought items" prodDetails={this.state.prodDetails.bought_items ? this.state.prodDetails.bought_items : false} />
									<CheckBoxField id="checkbox18" ref="locally_produced_items" name="locally_produced_items" htmlFor="checkbox18" label="Contains locally produced items" prodDetails={this.state.prodDetails.locally_produced_items ? this.state.prodDetails.locally_produced_items : false} />
                </div>
							</div>
							<div className="nutrition_fact nutrition_fact_top">
								<h5>Nutrition facts</h5>
								<div className="form-col">
									<div className="form-group">
										<LabelField htmlFor="" className="col-form-label" label="kJ" />
										<input type="text" className="form-control" name="kj" ref="kj" />
									</div>
									<div className="form-group">
										<LabelField htmlFor="" className="col-form-label"label="kcal" />
										<input type="text" className="form-control" name="kcal" ref="kcal" />
									</div>
									<div className="form-group">
										<LabelField htmlFor="" className="col-form-label" label="Fat" />
										<input type="text" className="form-control" name="fat" ref="fat" />
									</div>
								</div>
								<div className="form-col">
									<div className="form-group">
										<LabelField htmlFor="" className="col-form-label" label="Carbs" />
										<input type="text" className="form-control" name="carbs" ref="carbs" />
									</div>
									<div className="form-group">
										<LabelField htmlFor="" className="col-form-label" label="Fiber" />
										<input type="text" className="form-control" name="fiber" ref="fiber" />
									</div>
									<div className="form-group">
										<LabelField htmlFor="" className="col-form-label" label="Protein" />
										<input type="text" className="form-control" name="protein" ref="protein" />
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
													<input id={allergens_list.id} type="checkbox" defaultValue={allergens_list.id} ref="allergens" name="allergens" key={ index } onChange={this.handleCheckBox.bind(this)}/>
													<LabelField htmlFor={allergens_list.id} label={allergens_list.name } />
												</div>
											);
				            })}
				          </div>
								</div>
							</div>
						</form>
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-default nxt_btn" onClick={this.SaveAndContinue.bind(this)}>Next</button>
				</div>
			</div>
	  );
	}
}

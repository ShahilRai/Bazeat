import React from 'react';
import DocumentTitle from 'react-document-title';
import IngredientsList from './IngredientsList';
import ProductHeading from './ProductHeading';
import Tags from './Tags';
import CheckBoxField from '../components/CheckBoxField';
import LabelField from '../components/LabelField';
import NutrtnInputField from '../components/NutrtnInputField';
import axios from 'axios';
let _PUSHINGREDIENT = [];

export default class Ingredients extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	data:{
    		ingredients : []
    	},
      algrnList: this.props.allrgnval,
      chckboxVal:[],
      prodDetails:{},
      disabled: false
    };
  }

  componentDidMount() {
      this.setState({
        prodDetails: this.props.prodDetails,
      })
  }

   SubmitAfterValidate() {
    if(this.refs.ingredients.value){
      this.addItem()
    }
  }

	SaveAndContinue(){
		var ingredientsid = _PUSHINGREDIENT.map((item) => item.id);
		this.state = {
		data : {
      ingredients : ingredientsid,
      nutrition_fact:{
			  kj : this.refs.kj.refs.ntrtn.value,
				carbs : this.refs.carbs.refs.ntrtn.value,
				kcal : this.refs.kcal.refs.ntrtn.value,
				fiber : this.refs.fiber.refs.ntrtn.value,
				fat : this.refs.fat.refs.ntrtn.value,
				protein : this.refs.protein.refs.ntrtn.value,
			},
		  allergens: this.state.chckboxVal,
		  disabled: false,
		  bought_items: this.refs.bought_items.refs.prdctn_col.checked,
		  locally_produced_items: this.refs.locally_produced_items.refs.prdctn_col.checked
    }
  }
  this.props.saveValues(this.state.data)
	this.props.nextStep()
	this.handleClik()
}

 handleClik() {
    this.setState( {disabled: !this.state.disabled} )
  } 

	PreviousSteps() {
		this.props.previousStep()
	}

  addItem() {
		_PUSHINGREDIENT = this.state.data.ingredients
    var text = this.refs.ingredients.value
    var _exist = false
    this.addIngredients(text).then((response) => {
      if(response.data) {
        if(_PUSHINGREDIENT.length == 0){
          _PUSHINGREDIENT.push(response.data[0])
        }else {
					for(var i=0;i<_PUSHINGREDIENT.length;i++){
		        if(text==_PUSHINGREDIENT[i].name){
							_exist = true
						}
					}if(!_exist){
						_PUSHINGREDIENT.push(response.data[0])
					}
				}
        this.setState({
					data:{
						ingredients : _PUSHINGREDIENT
					}
				})
				this.refs.ingredients.value = "";
      }
    }).catch((err) => {
    console.log(err);
    });
  }

  addIngredients(text) {
		return axios.get("/api/ingredient?search="+text);
  }

  removeTag(e) {
    e.preventDefault();
    var ingredientList = _PUSHINGREDIENT;
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
		var _tags = this.state.data.ingredients
    var self = this
    var alrgn= [];
    var chckd;
    if(this.props.prodDetails){
      var ingr = this.props.prodDetails.ingredients
      self.state.data.ingredients = ingr
      alrgn = this.props.prodDetails.allergens
      self.state.chckboxVal = alrgn
    }
		return (
			<div>
				<ProductHeading prodDetails = {this.props.prodDetails ? this.props.prodDetails : ""} />
				<div className="modal-body">
					<div className="product_step_col">
		      	<div className="steps_circle_col text-left">
		        	<div className="steps_des_col">
		            <span className="steps_circle_icon">1</span>
		            <span className="step_name_col">Product<br/>Details</span>
		          </div>
		        </div>
		        <div className="steps_circle_col  text-center">
		        	<div className="steps_des_col">
		          	<span className="steps_circle_icon active">2</span>
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
					<form className="add_new_prodct_col">
						<div className="nutrition_fact_col">
							<h5>Ingredients</h5>
							<div className="form-group">
								<label htmlFor="" className="col-form-label ingrdnt_label">Ingredient</label>
								<input type="text" className="form-control" name="ingredients" ref="ingredients" placeholder=""/>
								<button type="button" className="btn btn-default nxt_btn ingrdnt_btn" onClick={this.SubmitAfterValidate.bind(this)}>Add ingredient</button>
                <Tags allIngredients={_tags} onClick={this.removeTag.bind(this)}/>
							</div>
						</div>
						<div className="nutrition_fact_col">
							<h5>Production</h5>
							<div className="chkbox_col production_col">
								<CheckBoxField id="checkbox17" ref="bought_items" name="bought_items" htmlFor="checkbox17" label="Contains bought items" prodDetails={this.state.prodDetails ? this.state.prodDetails.bought_items : false} />
								<CheckBoxField id="checkbox18" ref="locally_produced_items" name="locally_produced_items" htmlFor="checkbox18" label="Contains locally produced items" prodDetails={this.state.prodDetails ? this.state.prodDetails.locally_produced_items : false} />
              </div>
						</div>
						<div className="nutrition_fact_col">
							<h5>Nutrition facts</h5>
							<div className="form-col nutri_fact_form_col">
								<div className="form-group">
									<LabelField htmlFor="" className="col-form-label" label="kJ" />
									<NutrtnInputField name="kj" ref="kj" prodDetails={this.props.prodDetails ? this.props.prodDetails.nutrition_fact.kj : ""} />
								</div>
								<div className="form-group">
									<LabelField htmlFor="" className="col-form-label"label="kcal" />
									<NutrtnInputField name="kcal" ref="kcal" prodDetails={this.props.prodDetails ? this.props.prodDetails.nutrition_fact.kcal : ""} />
								</div>
								<div className="form-group">
									<LabelField htmlFor="" className="col-form-label" label="Fat" />
									<NutrtnInputField name="fat" ref="fat" prodDetails={this.props.prodDetails ? this.props.prodDetails.nutrition_fact.fat : ""} />
								</div>
							</div>
							<div className="form-col nutri_fact_form_col">
								<div className="form-group">
									<LabelField htmlFor="" className="col-form-label" label="Carbs" />
									<NutrtnInputField name="carbs" ref="carbs" prodDetails={this.props.prodDetails ? this.props.prodDetails.nutrition_fact.carbs : ""} />
								</div>
								<div className="form-group">
									<LabelField htmlFor="" className="col-form-label" label="Fiber" />
									<NutrtnInputField name="fiber" ref="fiber" prodDetails={this.props.prodDetails ? this.props.prodDetails.nutrition_fact.fiber : ""} />
								</div>
								<div className="form-group">
									<LabelField htmlFor="" className="col-form-label" label="Protein" />
									<NutrtnInputField name="protein" ref="protein" prodDetails={this.props.prodDetails ? this.props.prodDetails.nutrition_fact.protein : ""} />
								</div>
							</div>
						</div>
						<div className="nutrition_fact_col">
							<h5>Allergens</h5>
							<div className="chkbox_col production_col allergen_col">
								<div >
									{this.state.algrnList.map((allergens_list, index) => {
                    {alrgn.map((alrgn_id, index) => {
                      if (allergens_list.id == alrgn_id)
                        chckd=alrgn_id
                      })}
									return (
											<div className="checkbox prod_checkbox">
												<input id={allergens_list.id} type="checkbox" defaultChecked={allergens_list.id == chckd} defaultValue={allergens_list.id} ref="allergens" name="allergens" key={ index } onChange={this.handleCheckBox.bind(this)}/>
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
					<button type="button" disabled = {(this.state.disabled)? "disabled" : ""} className="btn btn-default nxt_btn" onClick={this.SaveAndContinue.bind(this)}>Next</button>
				</div>
			</div>
	  );
	}
}

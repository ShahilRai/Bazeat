import React from 'react';

export default class IngredientsList extends React.Component {

	constructor(props) {
    super(props);
    this.state = { data: [] };
    this.getIngredients = this.getIngredients.bind(this);
    this.ingredients = this.ingredients.bind(this);
  }

	componentDidMount() {
		$.ajax({
      url: "http://localhost:3000/api/ingredients",
      dataType: 'json',
      success: (data) => {
        this.setState({data: data});
      }
    });
	}

	getIngredients() {
		return this.state.data.map((ingredient) => {
  		return <option key={ingredient._id} id={ingredient._id}>{ingredient.name}</option>;
 		});
	}

	ingredients(name) {
		return this.state.data.filter(function ( obj ) {
		    return obj.name === name;
		})[0];
	}

	render() {
		console.log(this.ingredients("Eggs"))
		return(
			<datalist id="ingredientList">{this.getIngredients()}</datalist>
		)
	}
}
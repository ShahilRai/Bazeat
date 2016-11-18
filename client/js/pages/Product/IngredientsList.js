import React from 'react';

export default class IngredientsList extends React.Component {

	constructor(props) {
    super(props);
    this.state = { data: [] };
    this.getIngredients = this.getIngredients.bind(this);
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
		console.log(this.state.data)
		return this.state.data.map((ingredient) => {
      		return <option key={ingredient._id}>{ingredient.name}</option>;
     		});
	}

	render() {
		return(
			<datalist id="ingredientList">{this.getIngredients()}</datalist>
			)
	}
}
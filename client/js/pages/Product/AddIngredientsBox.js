import React from 'react';
import ReactTags from 'react-tag-autocomplete';

export default class AddIngredientsBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients_list :[],
      suggestions: [
        { id: 3, name: "Bananas" },
        { id: 4, name: "Mangos" },
        { id: 5, name: "Lemons" },
        { id: 6, name: "Apricots" }
      ]
    };
  }

  componentDidMount() {
    this.loadCategories().then((response) => {
        if(response.data) {
          this.setState({
            ingredients_list: response.data
          });
        }
    }).catch((err) => {
        console.log(err);
    });
  }

  loadCategories() {
    return axios.get("api/ingredients" , {
    });
  }

  render(){
      return (
        <div className="nutrition_fact nutrition_fact_top">
                  <h5>Ingredients</h5>
                  <div className="form-group">
                    <label htmlFor="" className="col-form-label ingrdnt_label">Ingredient</label>
                    <ReactTags className="form-control" name="ingredients" ref="ingredients"
                      suggestions={this.state.suggestions} 
                      placeholder="" />
                    <button type="button" className="btn btn-default nxt_btn ingrdnt_btn">Add ingredient</button>
                    <ul className="ingrdnt_options">
                    </ul>
                  </div>
        </div>
      );
    }

  }
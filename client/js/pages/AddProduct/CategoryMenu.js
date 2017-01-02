import React from 'react';
import axios from 'axios';

export default class CategoryMenu extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      product_category_list :[]
    };
  }

  componentDidMount() {
    this.loadCategories().then((response) => {
        if(response.data) {
          this.setState({
            product_category_list: response.data.product_category_list
          });
        }
    }).catch((err) => {
        console.log(err);
    });
  }

  loadCategories() {
    return axios.get("/api/details" , {
    });
  }

  setCategoryId(id){
    this.props.categoryMenuClick(id)
  }

  setAllCategoryId(all_cat){
    this.props.allCategoryMenuClick(all_cat)
  }

  render(){
    var self = this
    return(
      <div className="category_menu">
        <ul>
          <li className="active"><a href="javascript:void(0)" onClick={self.setAllCategoryId.bind(self,"all_cat":"1234")}>All categories</a></li>
          {
            this.state.product_category_list.map((product_category_list, index) => {
                return <li key={index} className="active"><a href="javascript:void(0)"
                  onClick={self.setCategoryId.bind(self, product_category_list.id)}>{product_category_list.name}</a></li>
           })
          }
        </ul>
      </div>
    )
  }
}

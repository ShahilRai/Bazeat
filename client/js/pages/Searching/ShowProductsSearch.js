import React from 'react';
import LazyLoad from 'react-lazy-load';
import WallImageViewer from '../Home/WallImageViewer';
import Filters from './Filters';
import AppliedFilters from './AppliedFilters';
import axios from 'axios';

export default class ShowProductsSearch extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      allProductsData : [],
      searchCategory : [],
      categoryIds:[],
      categoryNames:[],
      start: 0,
      end: 4000
    }
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.priceRangeChange = this.priceRangeChange.bind(this);
  }

  componentDidMount(){
    this.handleProductsSrch();
    this.displayCategoryList();
    if(!this.props.pName==''){
      this.filteredProducts();
    }
  }

  handleProductsSrch(){
    this.loadProductsSearch().then((response) => {
      if(response.data) {
        this.setState({
          allProductsData: response.data.products
        });
      }
    }).catch((err) => {
        console.log(err);
    });
  }


  loadProductsSearch() {
    return axios.get("/api/products" , {
    });
  }

  displayCategoryList(){
    this.loadCategories().then((response) => {
      if(response.data) {
        this.setState({
          searchCategory: response.data.product_category_list
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

  filteredProducts(){
    var cIds = this.state.categoryIds;
    var minRnge = this.state.start;
    var maxRnge = this.state.end;

    if(!this.props.pName==''){
      var pName = this.props.pName;
      this.fetchFilteredProducts(pName,minRnge,maxRnge,cIds).then((response) => {
        if(response.data) {
          this.setState({
            allProductsData: response.data
          })
        }
      }).catch((err) => {
        console.log(err);
      });
    }
    else{
      this.fetchProducts(minRnge,maxRnge,cIds).then((response) => {
        if(response.data) {
          this.setState({
            allProductsData: response.data
          })
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  fetchFilteredProducts(pName,minRnge,maxRnge,cIds) {
    return axios.get("/api/search/products?"+ "search=" + pName+ "&start_price="+ minRnge +"&end_price=" + maxRnge, {
      params: {
        category_id: cIds
      }
    });
  }

  fetchProducts(minRnge,maxRnge,cIds) {
    return axios.get("/api/search/products?"+"start_price="+ minRnge +"&end_price=" + maxRnge, {
      params: {
        category_id: cIds
      }
    });
  }

  handleCheckBoxChange(event){
    const chckdValues=this.state.categoryIds
    const chckdNames=this.state.categoryNames
    let index
    if (event.target.checked)
      chckdValues.push(event.target.value),
      chckdNames.push(event.target.name)
    else {
      index = chckdValues.indexOf(event.target.value)
      chckdValues.splice(index, 1),
      chckdNames.splice(index, 1)
    }

    this.setState({
      categoryIds : chckdValues,
      categoryNames : chckdNames
      }, function () {
        this.filteredProducts();
      }
    )
  }

  priceRangeChange(value){
    this.setState({
      start: value.from,
      end : value.to
    })
    this.filteredProducts();
  }

  render() {
    var varNotify = this.props.pName ? this.props.pName : 'products';
    return (
      <div className="tab-content clearfix">
        <div className="tab-pane active" id="productss">
          <div className="prod_tab_section">
            <Filters value={this.state.value} priceRangeChange={this.priceRangeChange} searchCategory={this.state.searchCategory} handleChange={this.handleChange} handleCheckBoxChange={this.handleCheckBoxChange}/>
            <AppliedFilters categoryName={this.state.categoryNames}/>
            <div className="prod_result1">
              <div className="container pad_lf120">
                <h3 className="search_tabbd_heading text-left">Your search for <span className="italic">'{varNotify}'</span> returned <span className="italic">{this.state.allProductsData.length}</span> results</h3>
                <div className="grid_wall_wrapper">
                  {this.state.allProductsData.map((prodlist, index) => {
                    return (
                      <LazyLoad key={index}>
                        <WallImageViewer prodlist={prodlist} index={index+1}/>
                      </LazyLoad>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

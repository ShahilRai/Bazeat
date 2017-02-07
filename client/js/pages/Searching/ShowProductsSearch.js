import React from 'react';
import LazyLoad from 'react-lazy-load';
import WallImageViewer from '../Home/WallImageViewer';
import Filters from './Filters';
import AppliedFilters from './AppliedFilters';
import PubSub from 'pubsub-js';
import axios from 'axios';

let token;

export default class ShowProductsSearch extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      allProductsData : [],
      searchCategory : [],
      categoryIds:[],
      categoryNames:[],
      start: 0,
      end: 4000,
      textToSearch: ''
    }
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.priceRangeChange = this.priceRangeChange.bind(this);
    this.handlecategoryFilter = this.handlecategoryFilter.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.handleProductsSrch = this.handleProductsSrch.bind(this);
    this.getSearchedText = this.getSearchedText.bind(this)
    token = PubSub.subscribe( 'search-text', this.getSearchedText );
  }

  componentDidMount(){
    this.getSearchedText
    this.handleProductsSrch();
    this.displayCategoryList();
  }

  componentWillUnmount(){
    PubSub.unsubscribe( token );
  }

  getSearchedText(msg, text){
    this.setState({
      textToSearch: text
    })
    if(!this.state.textToSearch==''){
      this.filteredProducts();
    }
  }

  handleProductsSrch(){
    this.loadProductsSearch().then((response) => {
      if(response.data) {
        this.setState({
          allProductsData: response.data.item_arrays
        });
      }
    }).catch((err) => {
        console.log(err);
    });
  }

  loadProductsSearch() {
    if(this.context.authenticated == true) {
      return axios.get("/api/products?email="+this.context.user.email, {
      });
    } else {
      return axios.get("/api/products" , {
      });
    }
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
    let is_email = (this.context.authenticated == true)? '&email='+this.context.user.email : '';
    if(!this.state.textToSearch==''){
      var pName = this.state.textToSearch;
      this.fetchFilteredProducts(pName,minRnge,maxRnge,cIds,is_email).then((response) => {
        if(response.data) {
          this.setState({
            allProductsData: response.data.item_arrays
          })
        }
      }).catch((err) => {
        console.log(err);
      });
    }
    else{
      this.fetchProducts(minRnge,maxRnge,cIds,is_email).then((response) => {
        if(response.data) {
          this.setState({
            allProductsData: response.data.item_arrays
          })
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  fetchFilteredProducts(pName,minRnge,maxRnge,cIds, email) {
    return axios.get("/api/search/products?"+ "search=" + pName+ "&start_price="+ minRnge +"&end_price=" + maxRnge + email, {
      params: {
        category_id: cIds
      }
    });
  }

  fetchProducts(minRnge,maxRnge,cIds, email) {
    return axios.get("/api/search/products?"+"start_price="+ minRnge +"&end_price=" + maxRnge + email, {
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

  handlecategoryFilter(event){
    var rmvCategory = event.target.className
    const newCategory = this.state.categoryIds
    {this.state.categoryIds.map((cId, index) =>{
      if(cId == rmvCategory){
        this.state.categoryIds.splice(index, 1)
        this.state.categoryNames.splice(index, 1)
        $('.mutliSelect').find('#' + cId).prop('checked', false);
      }
    }
    )}
    this.filteredProducts();
  }

  priceRangeChange(value){
    this.setState({
      start: value.from,
      end : value.to
    })
    this.filteredProducts();
  }

  clearFilters(){
    this.setState({
      categoryNames:[]
    })
    $('.mutliSelect').find('ul li input').prop('checked', false);
    this.handleProductsSrch()
  }

  render() {
    var varNotify = this.state.textToSearch ? this.state.textToSearch : 'products';
    return (
      <div className="tab-content clearfix">
        <div className="tab-pane active" id="productss">
          <div className="prod_tab_section">
            <Filters value={this.state.value} priceRangeChange={this.priceRangeChange} searchCategory={this.state.searchCategory} handleChange={this.handleChange} handleCheckBoxChange={this.handleCheckBoxChange}/>
            <AppliedFilters categoryName={this.state.categoryNames} handlecategoryFilter={this.handlecategoryFilter} categoryIds={this.state.categoryIds} clearFilters={this.clearFilters}/>
            <div className="prod_result1">
              <div className="container pad_lf120">
              <div className="col-xs-12">
                <h3 className="search_tabbd_heading text-left">Your search for <span className="italic">'{varNotify}'</span> returned <span className="italic">{this.state.allProductsData.length}</span> results</h3>
                </div>
                <div className="grid_wall_wrapper">
                  {this.state.allProductsData.map((prodlist, index) => {
                    return (
                        <div className="wall-column" key={index} index={index+1}><WallImageViewer prodlist={prodlist.item} wall_is_like = {prodlist.is_like} index={index+1}/></div>
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

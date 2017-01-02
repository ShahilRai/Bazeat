import React from 'react';
import { render } from 'react-dom';
import ShowProductsSearch from './ShowProductsSearch';
import ShowBazeatersSearch from './ShowBazeatersSearch';
import ShowLocationSearch from './ShowLocationSearch';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';

export default class DisplaySearch extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      allProductsData : [],
      allBazeaters : [],
      searchCategory : [],
      categoryId:'',
      value : { start: 500, end: 2500 }
    }
    this.handleChange = this.handleChange.bind(this);
    this.priceRangeChange = this.priceRangeChange.bind(this);
  }

  componentDidMount(){
    this.handleProductsSrch();
    this.handleBztersSrch();
    this.displayCategoryList();
    if(this.props.location.query.search){
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

  handleBztersSrch(){
    this.loadBazeaters().then((response) => {
      if(response.data) {
        this.setState({
          allBazeaters: response.data.users
        });
      }
    }).catch((err) => {
        console.log(err);
    });
  }

  loadBazeaters() {
    return axios.get("/api/users" , {
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
    var pName = this.props.location.query.search;
    var cId = this.state.categoryId;
    var minRnge = this.state.value.start;
    var maxRnge = this.state.value.end;
    this.fetchFilteredProducts(pName,minRnge,maxRnge,cId).then((response) => {
      if(response.data) {
        this.setState({
          allProductsData: response.data
        })
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  fetchFilteredProducts(pName,minRnge,maxRnge,cId) {
    return axios.get("/api/search/products?"+ "search=" + pName+ "&start_price="+ minRnge +"&end_price=" + maxRnge +"&category_id="+ cId, {
    });
  }

  handleChange(e){
    this.setState({
      categoryId: e.target.value}, function () {
        /*this.categoryBasedSearch();*/
        this.filteredProducts();
      }
    )
  }

  priceRangeChange(value){
    this.setState({ value: value })
    this.filteredProducts();
  }

  render() {
    /*Tabs.setUseDefaultStyles(false);*/
    return (
      <div className="pdt30">
        <Tabs selectedIndex={0}>
          <TabList className>
            <Tab>Products</Tab>
            <Tab>Bazeaters</Tab>
            <Tab>Location</Tab>
          </TabList>
          <TabPanel>
            <ShowProductsSearch allProductsData ={this.state.allProductsData} notify={this.props.location.query.search} value={this.state.value} priceRangeChange={this.priceRangeChange}
            searchCategory={this.state.searchCategory} handleChange={this.handleChange}/>
          </TabPanel>
          <TabPanel>
            <ShowBazeatersSearch allBazeaters ={this.state.allBazeaters} />
          </TabPanel>
          <TabPanel>
            <ShowLocationSearch allBazeaters ={this.state.allBazeaters} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

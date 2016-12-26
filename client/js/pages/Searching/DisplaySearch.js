import React from 'react';
import { render } from 'react-dom';
import ShowProductsSearch from './ShowProductsSearch';
import ShowBazeatersSearch from './ShowBazeatersSearch';
import CategoryDropDown from './CategoryDropDown';
/*import ProductRangeSlider from './ProductRangeSlider';*/
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';

export default class DisplaySearch extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      allProductsData : [],
      allBazeaters : [],
      searchCategory : [],
      categoryId:''
    }
    this.handleChange = this.handleChange.bind(this)
    /*this.priceRangeChange = this.priceRangeChange.bind(this)*/
  }

  componentDidMount(){
    this.handleProductsSrch();
    this.handleBztersSrch();
    this.displayCategoryList();
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

  categoryBasedSearch(){
    var cId = this.state.categoryId;
    this.fetchCatgryBasedData(cId).then((response) => {
      if(response.data) {
        this.setState({
          allProductsData: response.data
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  fetchCatgryBasedData(cId) {
    return axios.get("/api/search/products?category_id="+ cId , {
    });
  }

  priceFilterChanged(minPrice,maxPrice){
    this.fetchPriceBasedData(minPrice,maxPrice).then((response) => {
      if(response.data) {
        console.log(response.data)
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  fetchPriceBasedData(minPrice,maxPrice) {
    return axios.get("/api/search/products?start_price="+ minPrice +"&end_price=" + maxPrice, {
    });
  }

  handleChange(e){
    this.setState({
      categoryId: e.target.value}, function () {
        this.categoryBasedSearch();
      }
    )
  }

  /*priceRangeChange(e){
    var minRnge = e.min;
    var maxRnge = e.max;
    console.log('max: ', maxRnge);
    console.log('min: ', minRnge);
    this.priceFilterChanged(minRnge,maxRnge);
  }*/

  render() {
    /*Tabs.setUseDefaultStyles(false);*/
    return (
      <div className="full_width ptop0">
        <Tabs selectedIndex={0}>
            <TabList className="nav nav-pills">
              <Tab>Products</Tab>
              <Tab>Bazeaters</Tab>
              <Tab>Location</Tab>
            </TabList>
          <TabPanel>
            <CategoryDropDown searchCategory={this.state.searchCategory} handleChange={this.handleChange}/>
            <ShowProductsSearch allProductsData ={this.state.allProductsData} />
          </TabPanel>
          <TabPanel>
            <ShowBazeatersSearch allBazeaters ={this.state.allBazeaters} />
          </TabPanel>
          <TabPanel>
            <ShowBazeatersSearch allBazeaters ={this.state.allBazeaters} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

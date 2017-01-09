import { Link } from 'react-router';
import axios from 'axios';
import React, { PropTypes } from 'react';
import Banner from './Banner';
import CategoryMenu from './CategoryMenu';
import ProductCollection from './ProductCollection';
import ReviewsAndLikes from './ReviewsAndLikes';
import UserLogo from './UserLogo';
import UserPersonalInfo from './UserPersonalInfo';
import AddNewProductLogo from './AddNewProductLogo';

export default class UserHomePage extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
   }

  constructor(props, context) {
    super(props, context);
    this.state = {
      user : {},
      _userInfo: {},
      data_loaded : false,
      cat_loaded : false
    };
    this.selectCategoryData = this.selectCategoryData.bind(this);
    this.showAllCategory = this.showAllCategory.bind(this);
  }

  componentDidMount() {
    var userEmail = this.context.user.email;
    this.loadUserProductsData(userEmail).then((response) => {
      if(response.data.producer) {
        this.setState({
          user: response.data.producer,
          data_loaded: true
        });
      }
      }).catch((err) => {
        console.log(err);
    });
    this.loadUserInformation(userEmail).then((response) =>{
      if(response.data){
        this.setState({
          _userInfo: response.data.user
        })
      }
    })
  }

  loadUserProductsData(emailAddress) {
    return axios.get("/api/user_products?email="+emailAddress);
  }

  loadUserInformation(emailAddress){
   return axios.get("/api/user?email="+emailAddress);
  }

  showAllCategory(category_id){
    var userEmail = this.context.user.email;
    this.loadUserProductsData(userEmail).then((response) => {
      if(response.data.producer) {
        this.setState({
          user: response.data.producer,
          cat_loaded: false,
          data_loaded: true
        });
      }
    })
    .catch((err) => {
    console.log(err);
    });
  }

  selectCategoryData(category_id){
   var email = this.context.user.email;
   var cuid = this.props.params.userId;
    this.loadCategoryData(category_id, email ).then((response) => {
      if(response.data.products) {
        this.setState({
          user: response.data.products,
          cat_loaded: true,
          data_loaded: false
        });
      }
    })
    .catch((err) => {
    console.log(err);
    });
  }

  loadCategoryData(category_id, email) {
    return axios.get("/api/products/category?category_id="+category_id+"&email="+ email);
  }

  render(){
    var img;
    var uData;
    if(this.state._userInfo.photo){
      img = this.state._userInfo.photo
    }else{
      img ="/images/review_logo.png"
    }

    if (this.state.data_loaded && !this.state.cat_loaded) {
      uData = <ProductCollection productInfo = {this.state.user.products}/>
    }
    if(this.state.cat_loaded && !this.state.data_loaded){
      uData = <ProductCollection cat_data = {this.state.user}/>
  }

    return(
      <div className="page_wrapper">
        <Banner name={this.state._userInfo.bgphoto}/>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <div className="product_detail_lft prduct_small_icon">
                <UserLogo url = {img} p_class="prduct_thumb_lft_img" />
              </div>
              <UserPersonalInfo userInfo = {this.state._userInfo} />
            </div>
            <div className="col-lg-8 col-md-8 col-sm-9 col-xs-12 prht43">
              <div className="prduct_detail_rht">
                <ReviewsAndLikes userInfo = {this.state._userInfo} />
                <CategoryMenu categoryMenuClick = {this.selectCategoryData} allCategoryMenuClick = {this.showAllCategory}/>
                <div className="grid_wall_wrapper prod_producer_grid products_section">
                  <AddNewProductLogo />
                </div>
                {uData}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

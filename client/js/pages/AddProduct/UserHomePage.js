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
let userInformation = {
   full_name : "",
   email : "",
   photo : ""
};
export default class UserHomePage extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
   }

  constructor(props, context) {
    super(props, context);
    this.state = {
      user : {},
      userInformation : {
        photo : '',
        full_name : '',
        email : ''
      },
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
          userInformation : {
            photo : response.data.producer.photo,
            full_name : response.data.producer.full_name,
            email : response.data.producer.email
          },
          data_loaded: true
        });
      }
    })
    .catch((err) => {
    console.log(err);
    });
  }

  loadUserProductsData(emailAddress) {
    return axios.get("/api/user_products/"+emailAddress);
  }

  showAllCategory(category_id){
    var userEmail = this.context.user.email;
    this.loadUserProductsData(userEmail).then((response) => {
      if(response.data.producer) {
        this.setState({
          user: response.data.producer,
          userInformation : {
            photo : response.data.producer.photo,
            full_name : response.data.producer.full_name,
            email : response.data.producer.email
          },
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
    this.loadCategoryData(category_id).then((response) => {
      if(response.data.products) {
        this.setState({
          user: response.data.products,
          userInformation : {
            full_name : userInformation.full_name,
            email : userInformation.email,
            photo : userInformation.photo
          },
          cat_loaded: true,
          data_loaded: false

        });
      }
    })
    .catch((err) => {
    console.log(err);
    });
  }

  loadCategoryData(category_id) {
    return axios.get("/api/products/category/"+category_id);
  }

  render(){
    userInformation = {
      full_name : this.state.userInformation.full_name,
      email : this.state.userInformation.email,
      photo : this.state.userInformation.photo
    };
    var img;
    var uData;
    if(this.state.user.photo){
      img = this.state.user.photo
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
        <Banner name="review_banner.jpg"/>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <div className="product_detail_lft prduct_small_icon">
                <UserLogo url = {img} p_class="prduct_thumb_lft_img" />
                <UserPersonalInfo userInfo = {this.state.user} />
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-9 col-xs-12 prht43">
              <div className="prduct_detail_rht">
                <ReviewsAndLikes userInfo = {this.state.userInformation} />
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

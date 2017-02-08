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
import AllProducerReviews from '../MessageAndReviews/AllProducerReviews';
import { IndexRoute, Route, browserHistory } from 'react-router';

export default class UserHomePage extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
   }

  constructor(props, context) {
    super(props, context);
    this.state = {
      user : {},
      route: props.route.path,
      _userInfo: {},
      data_loaded : false,
      cat_loaded : false,
      all_reviews_count : '',
      offset : 0,
      current_cuid: ''
    };
    this.selectCategoryData = this.selectCategoryData.bind(this);
    this.showAllCategory = this.showAllCategory.bind(this);

  }

  componentDidMount() {
    var cuid = this.props.params.userId;

    this.loadUserProductsData(cuid).then((response) => {
      if(response.data.producer) {
        this.setState({
          user: response.data.producer,
          data_loaded: true
        });
      }
      }).catch((err) => {
        console.log(err);
    });

    this.loadUserInformation(cuid).then((response) =>{
      if(response.data){
        this.setState({
          _userInfo: response.data.user
        })
      }
    })

   this.getAllProducerReviewsCount(cuid, this.state.offset, 5).then((response) => {
      if(response.data) {
        this.setState({
          all_reviews_count : response.data.total_count,
        });
      }
    }).catch((err) => {
        console.log(err);
    });

    this.loadCurrentUser(this.context.user.email).then((response) => {
      if(response.data.user) {
        this.setState({
          current_cuid: response.data.user.cuid
        });
      }
    }).catch((err) => {
        console.log(err);
    });

  }

  getAllProducerReviewsCount(cuid, off_set, per_page){
    return axios.get("/api/review?cuid="+cuid+"&off_set="+(off_set)+"&per_page="+per_page)
  }

  loadUserProductsData(cuid) {
    return axios.get("/api/user_products?cuid="+cuid);
  }

  loadUserInformation(cuid){
   return axios.get("/api/user?cuid="+cuid);
  }

  loadCurrentUser(email) {
    return axios.get("/api/user?email="+email);
  }

  showAllCategory(category_id){
    var cuid = this.props.params.userId;
    this.loadUserProductsData(cuid).then((response) => {
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
   var cuid = this.props.params.userId;
    this.loadCategoryData(category_id, cuid ).then((response) => {
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

  loadCategoryData(category_id, cuid) {
    return axios.get("/api/products/category?category_id="+category_id+"&cuid="+ cuid);
  }

  _reviewStatus(){
    this.setState({
      route: '/user-reviews'
    })
   }



  render(){
    var img;
    var uData;
    var _logo;
    if(this.state._userInfo.photo){
      img = this.state._userInfo.photo
    }else{
      img ="/images/review_logo.png"
    }

    if(this.state.route == '/user-reviews'){
        var _allReviews=<AllProducerReviews />
    } else if(this.state.route == '/user/:userId'){
        var _category = <CategoryMenu categoryMenuClick = {this.selectCategoryData} allCategoryMenuClick = {this.showAllCategory}/>
        if(this.state.current_cuid == this.props.params.userId) {
          _logo = <AddNewProductLogo />
        }
        if (this.state.data_loaded && !this.state.cat_loaded) {
          uData = <ProductCollection productInfo = {this.state.user.products} current_cuid={this.state.current_cuid} user_cuid={this.props.params.userId}/>
        }
        if(this.state.cat_loaded && !this.state.data_loaded){
          uData = <ProductCollection cat_data = {this.state.user}/>
        }
      }

    return(
      <div className="page_wrapper full_width">
        <Banner name={this.state._userInfo.bgphoto} current_cuid={this.state.current_cuid} user_cuid={this.props.params.userId}/>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <div className="product_detail_lft prduct_small_icon">
                <UserLogo url = {img} p_class="prduct_thumb_lft_img" />
              </div>
              <UserPersonalInfo userInfo = {this.state._userInfo} prodInfo={this.state._userInfo.producer_info}/>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-9 col-xs-12 prht43">
              <div className="prduct_detail_rht">
                <ReviewsAndLikes userInfo = {this.state._userInfo} onClick={this._reviewStatus.bind(this)} all_reviews_count={this.state.all_reviews_count}/>
                {_category}
                {_allReviews}
                <div className="grid_wall_wrapper prod_producer_grid products_section">
                  {_logo}
                  {uData}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

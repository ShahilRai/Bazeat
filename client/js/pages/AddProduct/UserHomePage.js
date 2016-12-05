import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import Banner from './Banner';
import CategoryMenu from './CategoryMenu';
import AddnewProducts from './AddnewProducts';
import ReviewsAndLikes from './ReviewsAndLikes';
import UserLogo from './UserLogo';
import UserPersonalInfo from './UserPersonalInfo';
export default class UserHomePage extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
   }

  constructor(props, context) {
    super(props, context);
    this.state = {
      user : {},
      data_loaded: false
    };
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
    })
    .catch((err) => {
    console.log(err);
    });
  }

  loadUserProductsData(emailAddress) {
    return axios.get("/api/user_products/"+emailAddress);
  }

  render(){
    var img;
    if(this.state.user.photo){
      img = this.state.user.photo
    }else{
      img ="images/review_logo.png"
    }

    if (!this.state.data_loaded) {
      return <div></div>
    }

    return(
      <div className="page_wrapper">
        <Banner name="review_banner.jpg"/>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <div className="product_detail_lft">
                <UserLogo url = {img} p_class="prduct_thumb_lft_img" />
                <UserPersonalInfo userInfo = {this.state.user} />
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-9 col-xs-12 prht43">
              <div className="prduct_detail_rht">
                <ReviewsAndLikes userInfo = {this.state.user}/>
                <CategoryMenu />
                <div className="grid_wall_wrapper prod_producer_grid products_section">
                  <AddnewProducts productInfo = {this.state.user}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

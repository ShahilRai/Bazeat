import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import WriteReview from './WriteReview';
import ReviewAboutUser from './ReviewAboutUser';
import ReviewsWrittenByUser from './ReviewsWrittenByUser';
var moment = require('moment');

export default class ReviewPage extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
        users_data : [],
        user_id :'',
        index : '',
        review_index: '',
        current_user_data : [],
        current_user_review  : [],
        review_id : [],
        reviewedBy :'',
        write_index :'',
        review_user : '',
        is_replied : false,
        write_review_user : '',
        write_review_name :''
    }
    this.getUserId = this.getUserId.bind(this);
    this.getReviewId = this.getReviewId.bind(this);
    this.getWriteReviewId = this.getWriteReviewId.bind(this);
  }

  componentDidMount() {
    this.loadUserReviwData(this.context.user.email).then((response) => {
      if(response.data) {
        this.setState({
          users_data : response.data.users
        });
      }
    }).catch((err) => {
        console.log(err);
    });

    this.loadCurrentUserData(this.context.user.email).then((response) => {
      if(response.data) {
        this.setState({
          current_user_data : response.data.user.id
        });
      }
    }).catch((err) => {
        console.log(err);
    });

    this.loadCurrentUserReview(this.context.user.email).then((response) => {
      if(response.data) {
        this.setState({
          current_user_review : response.data.fullReviews
        });
      }
    }).catch((err) => {
        console.log(err);
      });
  }

  loadUserReviwData(email) {
    return axios.get("/api/users?email="+email)
  }

  loadCurrentUserData(email) {
    return axios.get("/api/user?email="+email)
  }

  loadCurrentUserReview(email) {
    return axios.get("/api/reviews?email="+email)
  }

  getUserId(e, i) {
    this.setState({
      user_id : this.state.users_data[i].id,
      index : i+1
    })
  }

  getReviewId(e, index) {
    this.state.current_user_review[index].map((current_review, r_index)=>{
      this.setState({
        review_id : current_review.id,
        reviewedBy : current_review.reviewed_by.full_name,
        review_user : current_review.review,
        is_replied : current_review.is_replied,
        review_index : r_index
      })
    })
  }

   getWriteReviewId(e, index) {
    this.state.current_user_review[index].map((current_review, r_index)=>{
      this.setState({
        write_review_user : current_review.review,
        write_review_name : current_review.reviewed_for.full_name,
        write_index : r_index
      })
    })
   }

  _renderleftMenus(){
    return(
      <ul className="edit_sidbar_list">
        <li><Link to="/profile">Edit Profile</Link></li>
        <li><Link to="javascript:void(0)">Verification</Link></li>
        <li className="active"><Link to="/reviews">Reviews</Link></li>
        <li><Link to="/add-account">Bank Account</Link></li>
        <li><Link to="/message">Messages</Link></li>
      </ul>
    )
  }

  render() {
    var _allCurrentReview = this.state.current_user_review ? this.state.current_user_review : []
    var _allCurrentReviewResult = _allCurrentReview.map((current_review, index)=>{
    return current_review.map((item, i)=>{
      if(item.reviewed_for.id==this.state.current_user_data){
        return(
          <div className="user_reveiw_list f2f2f2_bg">
            <span className="rvw_user_img"><img src={item.reviewed_by.photo} height="50" width="50"/> </span>
            <span className="rvw_username">{item.reviewed_by.full_name}<br/>
              <span className="star_rating">
                <ul>
                  <li><a href="#"><img src="images/star_rating.png" /></a></li>
                  <li><a href="#"><img src="images/star_rating.png" /></a></li>
                  <li><a href="#"><img src="images/star_rating.png" /></a></li>
                  <li><a href="#"><img src="images/star_rating.png" /></a></li>
                  <li><a href="#"><img src="images/star_rating.png" /></a></li>
                </ul>
              </span>
            </span>
            <span className="rvw_description">{item.review}</span>
            <button type="submit" className="btn read_btn" data-toggle="modal" data-target={"#user_review" +this.state.review_index}  onClick={(e) => this.getReviewId(e, index)}>Read</button>
          </div>
        )}
      })
    })

    var _allWriteReview = this.state.users_data.map((review, i)=>{
      if(this.context.user.email==review.email?'':review){
        return(
          <div className="user_reveiw_list">
            <span className="rvw_user_img"><img src={review.photo} className="profile_image" /></span>
            <span className="rvw_username">{review.full_name}<br/>
              <span className="prod_review_date">{moment(review.date_joined).format('DD-MM-YYYY')}</span>
            </span>
            <span className="rvw_description">Write a review to share your thoughts and provide helpful feedback to Producer Name. Please bare in mind that reviews are public.</span>
            <button type="submit" className="btn read_btn write_rvw_btn" data-target={"#write_review" +this.state.index} data-toggle="modal" onClick={(e) => this.getUserId(e, i)} >Write a review</button>
          </div>
        )}
      })

    var _allCurrentWriteReview = this.state.current_user_review ? this.state.current_user_review : []
    var _allCurrentWriteReviewResult = _allCurrentWriteReview.map((current_write_review, index)=>{
    return current_write_review.map((item, i)=>{
      if(item.reviewed_by.id==this.state.current_user_data){
        return(
          <div className="user_reveiw_list">
            <span className="rvw_user_img"><img src={item.reviewed_for.photo} className="profile_image"/></span>
            <span className="rvw_username">{item.reviewed_for.full_name}<br/>
              <span className="star_rating">
                <ul>
                  <li><a href="#"><img src="images/star_rating.png" /></a></li>
                  <li><a href="#"><img src="images/star_rating.png"/></a></li>
                  <li><a href="#"><img src="images/star_rating.png"/></a></li>
                  <li><a href="#"><img src="images/star_rating.png"/></a></li>
                  <li><a href="#"><img src="images/star_rating.png"/></a></li>
                </ul>
              </span>
            </span>
            <span className="rvw_description">{item.review}</span>
            <button type="submit" className="btn read_btn" data-toggle="modal" data-target={"#producer_review" +this.state.write_index} onClick={(e) => this.getWriteReviewId(e, index)} >Read</button>
          </div>
        )}
      })
    })
    return (
      <div className="container padd_87">
        <div className="full_width">
          <div className="row">
            <div className="col-lg-3 col-md-2 col-sm-2 col-xs-12 purchase_order_left_sidebar order_purchse_lt_wdth edit_profile_sidebar">
              {this._renderleftMenus()}
            </div>
            <div className="col-lg-9 col-md-9 col-sm-10 col-xs-12 edit_profile_rht_sidebar review_all">
              <div className="user_review_section mtop0">
                  <h3>Reviews to write<span className="show_all"><a href="#">Show all</a></span></h3>
                    {_allWriteReview}
                </div>
                <div className="user_review_section">
                  <h3>Reviews about you (2 new)<span className="show_all"><a href="#">Show all</a></span></h3>
                  {_allCurrentReviewResult}
                </div>
                <div className="user_review_section">
                  <h3>Reviews written by you<span className="show_all"><a href="#">Show all</a></span></h3>
                  {_allCurrentWriteReviewResult}
                </div>
                <WriteReview user_id={this.state.user_id} index={this.state.index} />
                <ReviewAboutUser reviewedBy={this.state.reviewedBy} review_index={this.state.review_index} review_id={this.state.review_id} review_user={this.state.review_user} is_replied={this.state.is_replied}/>
                <ReviewsWrittenByUser write_index={this.state.write_index} write_review_user={this.state.write_review_user} write_review_name={this.state.write_review_name}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

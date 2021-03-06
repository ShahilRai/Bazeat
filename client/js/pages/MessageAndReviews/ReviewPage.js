import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import WriteReview from './WriteReview';
import ReviewAboutUser from './ReviewAboutUser';
import ReviewsWrittenByUser from './ReviewsWrittenByUser';
import Rating from 'react-simple-rating';
import moment from 'moment';
var changeCase = require('change-case')

let _allCurrentReviewResult;
let allCurrentReviewResult;
let _allCurrentWriteReviewResult;
let allCurrentWriteReviewResult;
let showReview;
let userId;
let cuUserId;
let writeUserId;
let allWriteReview
let _allWriteReview

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
        write_review_name :'',
        rating_count : '',
        given_rating_count : '',
        count : [],
        write_count : [],
        new_count : ''
    }
    this.getUserId = this.getUserId.bind(this);
    this.getWriteReviewId = this.getWriteReviewId.bind(this);
    this.getReviewId = this.getReviewId.bind(this);
  }

  componentDidMount() {
    this.loadCurrentUserReview(this.context.user.email).then((response) => {
      if(response.data) {
        this.setState({
          current_user_review : response.data.reviews
        });
      }
    }).catch((err) => {
      console.log(err);
    });

    this.loadUserReviwData(this.context.user.email).then((response) => {
      if(response.data) {
        this.setState({
          users_data : response.data.purchaseorders
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

    this.getAllUserReviewsCount(this.context.user.email,this.state.offset,5).then((response) => {
      if(response.data) {
        this.setState({
          new_count : response.data.total_count,
        });
      }
    }).catch((err) => {
        console.log(err);
    });
  }

  loadUserReviwData(email) {
    return axios.get("/api/reviewusers?email="+email)
  }

  loadCurrentUserData(email) {
    return axios.get("/api/user?email="+email)
  }

  loadCurrentUserReview(email) {
    return axios.get("/api/reviews?email="+email)
  }

  getAllUserReviewsCount(email, off_set, per_page){
    return axios.get("/api/review?email="+email+"&off_set="+(off_set)+"&per_page="+per_page)
  }

  _renderleftMenus(){
    return(
      <ul className="edit_sidbar_list">
        <li><Link to="/profile">Edit Profile</Link></li>
        <li><Link to="javascript:void(0)">Verification</Link></li>
        <li className="active"><Link to="/reviews">Reviews</Link></li>
        <li><Link to="/add-account">Bank Account</Link></li>
        <li><Link to="/messages">Messages</Link></li>
      </ul>
    )
  }

  getUserId(e, i) {
    this.setState({
      producer_id : this.state.users_data[i]._producer.id,
      purchase_order_id : this.state.users_data[i].id,
      index : i
    })
  }

  getWriteReviewId(e, index) {
    this.setState({
      write_index : index
    })
    let current_review = this.state.current_user_review[index]
      this.setState({
        write_review_user : current_review._review.review,
        write_review_name : current_review._review.reviewed_for.full_name,
        given_rating_count : current_review._review.rating
      })
  }

  getReviewId(e, index) {
    this.setState({
      review_index : index
    })
    let current_review = this.state.current_user_review[index]
      this.setState({
        review_id : current_review._review.id,
        reviewedBy : current_review._review.reviewed_by.full_name,
        review_user : current_review._review.review,
        is_replied : current_review._review.is_commented,
        rating_count : current_review._review.rating
    })

     this.ReadCurrentUserReview(current_review._review.id).then((response) => {
      if(response.data) {

      }
    }).catch((err) => {
      console.log(err);
    });
  }

  ReadCurrentUserReview(review_id) {
    return axios.put("/api/update_review?review_id="+review_id)
  }

  updateupdateReviews(newReviews) {
    this.loadCurrentUserReview(this.context.user.email).then((response) => {
      if(response.data) {
        this.setState({
          current_user_review : response.data.reviews
        });
      }
    }).catch((err) => {
        console.log(err);
      });
  }

  updateProducerReviews(updatedData){
    this.loadUserReviwData(this.context.user.email).then((response) => {
      if(response.data) {
        this.setState({
          users_data : response.data.purchaseorders
        });
      }
    }).catch((err) => {
        console.log(err);
    });
  }

  commentedData(newComment){
    this.setState({
      current_user_review :newComment.reviews
    })
  }

  render() {
      _allWriteReview = this.state.users_data.map((review, i)=>{
       userId = review.cuid
       var src_producer = review._producer.photo
       if(src_producer == undefined){
        src_producer = require('../../../images/producer_logo.png')
       }
      return(
        <div className="user_reveiw_list">
          <span className="rvw_user_img"><img src={src_producer} className="profile_image" /></span>
          <span className="rvw_username"><Link to={"/user/"+userId} className = "rfont_colr">{changeCase.titleCase(review._producer.full_name)}</Link><br/>
            <span className="prod_review_date">{moment(review.date_joined).format('DD-MM-YYYY')}</span>
          </span>
          <span className="rvw_description">Write a review to share your thoughts and provide helpful feedback to Producer Name. Please bare in mind that reviews are public.</span>
          <button type="submit" className="btn read_btn write_rvw_btn" data-target={"#write_review" +this.state.index} data-toggle="modal" onClick={(e) => this.getUserId(e, i)} >Write a review</button>
        </div>
      )
    })

    var _allCurrentWriteReview = this.state.current_user_review ? this.state.current_user_review : []
    _allCurrentWriteReviewResult = _allCurrentWriteReview.map((item, index)=>{
        if(item._review.reviewed_by.id==this.state.current_user_data){
          this.state.write_count.push(item);
          writeUserId = item._review.reviewed_for.cuid
          var src_currntUser = item._review.reviewed_for.photo
          if(src_currntUser == undefined){
            src_currntUser = require('../../../images/producer_logo.png')
          }
          return(
            <div className="user_reveiw_list">
              <span className="rvw_user_img"><img src={src_currntUser} className="profile_image"/></span>
              <span className="rvw_username"><Link to={"/user/"+writeUserId} className = "rfont_colr">{changeCase.titleCase(item._review.reviewed_for.full_name)}</Link><br/>
                 <Rating  displayOnly={true} rating={item._review.rating} maxRating={5}  ratingSymbol={"\u2605"} />
              </span>
              <span className="rvw_description">{item._review.review}</span>
              <button type="submit" className="btn read_btn" data-toggle="modal" data-target={"#producer_review" +this.state.write_index} onClick={(e) => this.getWriteReviewId(e, index)} >Read</button>
            </div>
          )
        }
    })

    var _allCurrentReview = this.state.current_user_review ? this.state.current_user_review : []
    _allCurrentReviewResult = _allCurrentReview.map((item, index)=>{
        if(item._review.reviewed_for.id==this.state.current_user_data){
          this.state.count.push(item);
          cuUserId =item._review.reviewed_by.cuid
          var src_written = item._review.reviewed_by.photo
          if(src_written == undefined){
            src_written = require('../../../images/producer_logo.png')
          }
          return(
            <div className="user_reveiw_list f2f2f2_bg">
              <span className="rvw_user_img"><img src={src_written} height="50" width="50"/> </span>
              <span className="rvw_username"><Link to={"/user/"+cuUserId} className = "rfont_colr">{changeCase.titleCase(item._review.reviewed_by.full_name)}</Link><br/>
                <Rating  displayOnly={true} rating={item._review.rating} maxRating={5}  ratingSymbol={"\u2605"} />
              </span>
              <span className="rvw_description">{item._review.review}</span>
              <button type="submit" className="btn read_btn" data-toggle="modal" data-target={"#user_review" +this.state.review_index}  onClick={(e) => this.getReviewId(e, index)}>Read</button>
            </div>
          )
        }
    })

    if(this.state.count.length>0){
      allCurrentReviewResult = _allCurrentReviewResult
    } else {
      allCurrentReviewResult = <h3> <center> no reviews about you to show </center></h3>
    }

    if(this.state.write_count.length>0){
      allCurrentWriteReviewResult = _allCurrentWriteReviewResult
    } else {
      allCurrentWriteReviewResult = <h3> <center> no reviews written by you  </center></h3>
    }

    if(this.state.users_data.length>0){
      allWriteReview = _allWriteReview
    } else {
      allWriteReview = <h3> <center> no producer to write  </center></h3>
    }

    return (
      <div className="container padd_87">
        <div className="full_width">
          <div className="row">
            <div className="col-lg-3 col-md-2 col-sm-2 col-xs-12 purchase_order_left_sidebar order_purchse_lt_wdth edit_profile_sidebar">
              {this._renderleftMenus()}
            </div>
            <div className="col-lg-9 col-md-9 col-sm-10 col-xs-12 edit_profile_rht_sidebar review_all">
              <div className="user_review_section mtop0">
                  <h3>Reviews to write<span className="show_all"><span>Show all</span></span></h3>
                    {allWriteReview}
                </div>
                <div className="user_review_section">
                  <h3>Reviews about you ({this.state.new_count})<span className="show_all"><span>Show all</span></span></h3>
                    {allCurrentReviewResult}
                </div>
                <div className="user_review_section">
                  <h3>Reviews written by you<span className="show_all"><span>Show all</span></span></h3>
                  {allCurrentWriteReviewResult}
                </div>
                <ReviewAboutUser reviewedBy={this.state.reviewedBy} review_index={this.state.review_index} review_id={this.state.review_id} review_user={this.state.review_user} is_replied={this.state.is_replied} updatedComment={this.commentedData.bind(this)} rating_count={this.state.rating_count} />
               <WriteReview user_id={this.state.user_id} index={this.state.index} updateReviews={this.updateupdateReviews.bind(this)} updateWrittenReviews={this.updateProducerReviews.bind(this)} producer_id={this.state.producer_id} purchase_order_id={this.state.purchase_order_id}/>
               <ReviewsWrittenByUser write_index={this.state.write_index} write_review_user={this.state.write_review_user} write_review_name={this.state.write_review_name} given_rating_count={this.state.given_rating_count}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

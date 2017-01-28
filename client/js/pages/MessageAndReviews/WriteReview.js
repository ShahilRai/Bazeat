import React from 'react';
import toastr from 'toastr';
import axios from 'axios';
import Rating from './Rating';
export default class WriteReview extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props, context) {
      super(props, context);
        this.state = {
          reviewUserData : [],
          rating : '',
          value : ''
        }
        this.getRating=this.getRating.bind(this);
  }

  WriteAReview(){
    this.WriteReviewData(this.context.user.email, this.refs.review.value,this.state.rating).then((response) => {
        toastr.success('Your review successfully submitted');
        this.props.updateReviews(response.data)
        if(response.data) {
          this.setState({
            reviewUserData : response.data,
            value : ''
          });
        }
    }).catch((err) => {
        toastr.error('Sorry, your review not submitted');
        console.log(err);
    });
  }

  WriteReviewData(email,review_body,rating){
    return axios.post("api/reviews?reviewed_for="+this.props.user_id ,{
      email: email,
      review_body: review_body,
      rating : rating
    })
  }

  getRating(data){
    console.log("data")
    console.log(data)
    this.setState({
      rating : data
    })
  }

  textAreaValue(event){
      this.setState({ value: event.target.value });
    }

  render(){
    console.log("child rating")
    console.log(this.state.rating)
    return(
      <div className="modal fade prod_modal review_modal" id={"write_review" + this.props.index}  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog user_review_modal" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close modal_close" data-dismiss="modal" aria-label="Close">
              </button>
              <h3 className="modal-title mbot15" id="myModalLabel">Write a review</h3>
            </div>
          <div className="modal-body">
            <form className="">
              <div className="user_rvw_left">
                <div className="form-group">
                  <label className="user_rvw_label">Your review</label>
                  <div className="rvw_by_user">
                      <textarea ref="review" className=""  onChange={this.textAreaValue.bind(this)} value={this.state.value} ></textarea>
                  </div>
                </div>
                <div className="form-group">
                  <label className="user_rvw_label">Your rating</label>
                <div className="rvw_by_user">
                  <span className="star_rating mtop0">
                   <Rating get_rating={this.getRating} />
                  </span>
                </div>
              </div>
            </div>
            <div className="user_rvw_right">
              <div className="cmmnt_guideline">
              <h4>Review guidelines</h4>
              <p>Lorem ipsum et dolor sit amet et dolor sit amet et et dolor sit amet dolor sit amet...</p>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default nxt_btn orange_bg" onClick={this.WriteAReview.bind(this)} data-dismiss="modal"><i class="glyphicon glyphicon-remove"></i>Submit review</button>
        </div>
      </div>
    </div>
  </div>
    )
  }
}

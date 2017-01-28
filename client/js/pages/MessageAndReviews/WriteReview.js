import React from 'react';
import toastr from 'toastr';
import axios from 'axios';
import Rating from 'react-simple-rating';
let data;
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
          value : '',
          currentRating : 0,
          count : 0
        }

  }

  handleClick(rating) {
    this.setState({
      currentRating: rating
    });
  }

  WriteAReview(){
    this.WriteReviewData(this.context.user.email, this.refs.review.value,this.state.currentRating).then((response) => {
        toastr.success('Your review successfully submitted');
        this.props.updateReviews(response.data)
        if(response.data) {
          this.setState({
            reviewUserData : response.data,
            value : '',
            currentRating : 0,
            count : 1
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


  textAreaValue(event){
      this.setState({ value: event.target.value });
    }


  render(){
    console.log("this.state.count")
    console.log(this.state.count)
    if(this.state.count>0){
      data = <Rating rating={0} displayOnly={false} maxRating={5} onSubmit={this.handleClick.bind(this)} ratingSymbol={"\u2764"} />
    }else{
      data = <Rating  displayOnly={false} maxRating={5} onSubmit={this.handleClick.bind(this)} ratingSymbol={"\u2764"} />
    }
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
                  {data}
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

import React from 'react';
import axios from 'axios';
import toastr from 'toastr';
import Rating from 'react-simple-rating';

export default class ReviewAboutUser extends React.Component {

static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props, context) {
      super(props, context);
        this.state = {
          commentUserData : [],
          value :'',
          is_commented : true,
          cuRating : ''
        }
  }


  updatedCommentData(){
    this.loadCurrentUserReview(this.context.user.email).then((response) => {
      if(response.data) {
        this.props.updatedComment(response.data)
      }
  }).catch((err) => {
      console.log(err);
    });
  }


  loadCurrentUserReview(email) {
    return axios.get("/api/reviews?email="+email)
  }

  WriteAComment(){
    this.WriteCommentData(this.context.user.email, this.refs.comment_review.value,this.props.review_id,this.state.is_commented).then((response) => {
        if(response.data) {
          this.updatedCommentData();
          toastr.success('Your comment successfully submitted');
          this.setState({
            commentUserData : response.data,
            value : ''
          });
        }
    }).catch((err) => {
       toastr.error('Sorry, your comment not submitted');
        console.log(err);
    });
  }

  WriteCommentData(email, comment_body, review_id,is_commented){
    return axios.put("api/send_reply",{
      email : email,
      comment_body : comment_body,
      review_id : review_id,
      is_commented : is_commented
    })
  }

  textAreaValue(event){
      this.setState({ value: event.target.value });
  }


  render(){
    var submitComment
    var areaField
     if(this.props.is_replied){
       submitComment = <button type="button" className="btn btn-default nxt_btn orange_bg" onClick={this.WriteAComment.bind(this)} disabled>Submit comment</button>
       areaField = <textarea ref="comment_review" className=""  onChange={this.textAreaValue.bind(this)} value={this.state.value} disabled></textarea>
     }else{
       submitComment = <button type="button" className="btn btn-default nxt_btn orange_bg" onClick={this.WriteAComment.bind(this)} data-dismiss="modal" >Submit comment</button>
        areaField = <textarea ref="comment_review" className=""  onChange={this.textAreaValue.bind(this)} value={this.state.value} ></textarea>
      }
    return(
      <div className="modal fade prod_modal review_modal" id={"user_review" +this.props.review_index} tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog user_review_modal" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close modal_close" data-dismiss="modal" aria-label="Close">
              </button>
              <h3 className="modal-title mbot15" id="myModalLabel">User review</h3>
            </div>
            <div className="modal-body">
              <form className="">
                <div className="user_rvw_left">
                  <div className="form-group">
                    <label className="user_rvw_label">Review by<span>{this.props.reviewedBy}</span></label>
                    <div className="rvw_by_user">
                      <span className="user_rvw_txt">{this.props.review_user}</span>
                         <Rating  displayOnly={true} maxRating={5}  ratingSymbol={"\u2605"} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="user_rvw_label">Comment</label>
                    <div className="rvw_by_user">
                      {areaField}
                    </div>
                  </div>
                </div>
                <div className="user_rvw_right">
                  <div className="cmmnt_guideline">
                    <h4>Comment guidelines</h4>
                    <p>Lorem ipsum et dolor sit amet et dolor sit amet et et dolor sit amet dolor sit amet...</p>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              {submitComment}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

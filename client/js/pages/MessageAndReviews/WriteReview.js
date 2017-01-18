import React from 'react';
import TextAreaField from '../components/TextAreaField';
import axios from 'axios';
export default class WriteReview extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props, context) {
      super(props, context);
        this.state = {
          reviewUserData : []
        }
  }

  WriteAReview(){
    this.WriteReviewData(this.context.user.email, this.refs.review.state.value).then((response) => {
      console.log("response.data")
       console.log(response.data)
        if(response.data) {
          this.setState({
            reviewUserData : response.data
          });
        }
    }).catch((err) => {
        console.log(err);
    });
  }

  WriteReviewData(email,review_body){
    return axios.post("api/new/review/"+this.props.user_id ,{
      email: email,
      review_body: review_body
    })
  }

  render(){
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
                     <TextAreaField name="desc" ref="review" ></TextAreaField>
                  </div>
                </div>
                <div className="form-group">
                  <label className="user_rvw_label">Your rating</label>
                <div className="rvw_by_user">
                  <span className="star_rating mtop0">
                    <ul>
                      <li><a href="#"><img src="images/star_rating.png"/></a></li>
                      <li><a href="#"><img src="images/star_rating.png"/></a></li>
                      <li><a href="#"><img src="images/star_rating.png"/></a></li>
                      <li><a href="#"><img src="images/star_rating.png"/></a></li>
                      <li><a href="#"><img src="images/star_rating.png"/></a></li>
                    </ul>
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

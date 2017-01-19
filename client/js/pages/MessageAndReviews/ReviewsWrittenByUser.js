import React from 'react';
export default class ReviewsWrittenByUser extends React.Component {
  render(){
    return(
        <div className="modal fade prod_modal review_modal" id={"producer_review" +this.props.write_index} tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog user_review_modal wdth_448" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close modal_close" data-dismiss="modal" aria-label="Close">
                </button>
                <h3 className="modal-title mbot15" id="myModalLabel">Review</h3>
              </div>
              <div className="modal-body">
                <form className="">
                  <div className="producer_rvw_content">
                    <div className="form-group">
                      <label className="user_rvw_label">You wrote</label>
                      <div className="rvw_by_user">
                        <h4>{this.props.write_review_name}</h4>
                        <span className="user_rvw_txt">{this.props.write_review_user}</span>
                          <span className="star_rating mlft_zero">
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
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default nxt_btn orange_bg">Close</button>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

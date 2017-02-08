import React from 'react';
import ReactShare from './ReactShare';

export default class ShareProduct extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
      this.state = {
      }
  }

  render(){
    return(
      <div className="modal fade share_modal" id={"share_prod" +this.props.shareIndex} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog user_review_modal" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close modal_close" data-dismiss="modal" aria-label="Close">
              </button>
            </div>
            <div className="modal-body">
              <span className="chkd_icon"><img src={this.props.wall_photo} className="profile_image"/></span>  
              <span className="chkd_description">
              <p>You have successfully added a new product! It should now show up in the producer profile.</p>
              <p>To reach out to your customers,you are only one step away.</p>
              </span> 
            </div>
            <div className="modal-footer">
              <ReactShare wall_images={this.props.wall_images}/>
              <button type="button" className="btn btn-default nxt_btn">OK</button>
            </div>
          </div>
        </div>
      </div>   
  )
}
}

import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
export default class AllProducerReviews extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      expanded: false,
      all_producer_reviews : [],
      offset: 0,
      total_pages_count: 0
    }
    this.getMoreTextDiv = this.getMoreTextDiv.bind(this);
  }

  expandedText() {
    this.setState({
      expanded: true
    });
  }

  getMoreTextDiv() {
    if (this.state.expanded) {
      return <div>  </div>;
    } else {
      return null;
    }
  }

  handlePageClick(data){
    let selected = data.selected;
    let offset = Math.ceil(selected);
    this.setState({
      offset: offset
    });
  }

  componentDidMount(){
    this.getAllProducerReviews(this.context.user.email).then((response) => {
      if(response.data) {
        this.setState({
          all_producer_reviews : response.data.fullReviews,
          total_pages_count: Math.ceil(response.data.total_work_periods_count / 5)
        });
      }
    }).catch((err) => {
        console.log(err);
    });
  }

  getAllProducerReviews(email){
    return axios.get("/api/reviews?email="+email,{
        page: this.state.offset + 1,
        per_page: 5
    });
  }

  render() {
    var expandedDiv = this.getMoreTextDiv();
    var _allProducerReview = this.state.all_producer_reviews ? this.state.all_producer_reviews : []
    var _allProducerReviewResult = _allProducerReview.map((producer_review, index)=>{
      return producer_review.map((item, i)=>{
        if(item.comment){
          var _comment= <div className="rvw_replies">
                          <span className="rvw_user_img"><img src={item.reviewed_for.photo} height="20" width="20"/></span>
                          <span className="">
                            <h5>Answer from {item.reviewed_for.full_name}:</h5>
                            <p>{item.comment.comment}</p>
                          </span>
                        </div>
        }
        return(
          <div className="review_display1">
            <span className="rvw_user_img"><img src={item.reviewed_by.photo} height="50" width="50"/></span>
            <span className="rvw_user_description">
              <h4>{item.reviewed_by.full_name}</h4>
              <p>{item.review}</p>
              <a href="javascript:void(0)" onClick={this.expandedText.bind(this)} className="more_msgs">{this.state.expanded ? ' ' : '+MORE'}</a>
              { expandedDiv }
              {_comment}
            </span>
          </div>
        )
      })
    })
    var expandedDiv = this.getMoreTextDiv();
    return (
      <div className="review_display_inner">
        <h3 className="plft20">Reviews</h3>
          {_allProducerReviewResult}
        <ReactPaginate previousLabel={"previous"} nextLabel={"next"} breakLabel={<a href="">...</a>}
            breakClassName={"break-me"} pageCount={this.state.total_pages_count} marginPagesDisplayed={2}
            pageRangeDisplayed={5} onPageChange={this.handlePageClick} containerClassName={"pagination"}
            subContainerClassName={"pages pagination"} activeClassName={"active"} />
      </div>
    )
  }
 }

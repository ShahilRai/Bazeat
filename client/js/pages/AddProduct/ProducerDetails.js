import React from 'react';
import CategoryMenu from './CategoryMenu';
import AddnewProducts from './AddnewProducts';
import StarRating from './StarRating';
import ProducerLogo from './ProducerLogo';
import ProducerDescription from './ProducerDescription';

export default class ProducerDetails extends React.Component {

  render(){

    var img;
    if(this.props.userInfo.photo){
      img = this.props.userInfo.photo
    }else{
      img ="images/review_logo.png"
    }

    return(
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <div className="product_detail_lft">
              <ProducerLogo url={img} p_class="prduct_thumb_lft_img" />
            </div>
               <ProducerDescription userInfo={this.props.userInfo} />
          </div>
          <div className="col-lg-8 col-md-8 col-sm-9 col-xs-12 prht43">
            <div className="prduct_detail_rht">
              <StarRating userInfo={this.props.userInfo}/>
              <CategoryMenu />
              <div className="grid_wall_wrapper prod_producer_grid products_section">
                <AddnewProducts productInfo={this.props.userInfo}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

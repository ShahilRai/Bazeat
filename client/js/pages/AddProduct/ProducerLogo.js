import React from 'react';
import CategoryMenu from './CategoryMenu';
import AddnewProducts from './AddnewProducts';

export default class ProducerLogo extends React.Component {
  render(){
   return(
   <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
          <div className="product_detail_lft">
            <img src="images/review_logo.png" className="prduct_thumb_lft_img" />
              <ul className="prod_lft_details">
               <li className="pin_intrest"><a href="#">Kvanndal, Norge</a></li>
               <li className="mail_adrrs"><a href="#">www.bakerhans.no</a></li>
               <li className="review_date"><a href="#">Man-Lør: 08-15</a></li>
               <li className="review_cal"><a href="#">Became a Bazeater<br/>12.11.2016</a></li>
              </ul>
    <div className="product_left_dsc">
      <h4>Presentation </h4>
      <p>Baker Hans drives av Hans Anderse og Hans Bengtsen. Vi flyttet fra Nederland til Norge i november 2004. På Alm Gard lager vi iskrem av egen mjølk og frukt. Vi dyrker bringebær som brukes i iskremen. Molte og blåbær plukker vi opp på fjellet. Vi har 10 bikuber på garden og har egen honning. Vi har hatt økologisk drift siden august 2007. Det finnes all slags gard-sprodukter på garden, bl.a. yoghurt, stor-fekjøtt, melk, syltetøy, saft og ost. Produk-ter kan kjøpes på garden for de som over-natter her.
      </p>
    </div>
           </div>
        </div>
      <div className="col-lg-8 col-md-8 col-sm-9 col-xs-12 prht43">
         <div className="prduct_detail_rht">
           <div className="revw_top">
             <h3>Baker Hans<span className="revw_icon"><img src="images/revw_icon.png"/></span></h3>
               <span className="star_rating">
                <ul>
                   <li><a href="#"><img src="images/star_rating.png" /></a></li>
                   <li><a href="#"><img src="images/star_rating.png" /></a></li>
                   <li><a href="#"><img src="images/star_rating.png" /></a></li>
                   <li><a href="#"><img src="images/star_rating.png" /></a></li>
                   <li><a href="#"><img src="images/star_rating.png" /></a></li>
                </ul>
      <span className="review_num">613 reviews</span>
        </span>
      <span className="star_rating">
        <ul>
        <li><a href="#"><img src="images/like.png" /></a></li>
        </ul>
         <span className="review_num">2.3K likes</span>
           </span>
        </div>
               <CategoryMenu />
                <div className="grid_wall_wrapper prod_producer_grid products_section">
                     <AddnewProducts />
                 </div>
       </div>
      </div>
    </div>
   </div>
                    )
                  }
                }







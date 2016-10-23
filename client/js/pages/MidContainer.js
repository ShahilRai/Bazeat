import React from 'react';
import ShowImage from './ShowImage';
import WallImageViewer from './WallImageViewer';

export default class MidContainer extends React.Component {

   constructor() {
      super();
      this.state = {
        home_category_images: [{'name':'category_img_2.png', 'content':"Når høsten kommer"},{'name':'category_img_1.png', 'content':"Tradisjoner og jul"},{'name':'category_img_3.png', 'content':"Tradisjonell drift så lenge folk kan hugse"}],
        wall_grid_images: [{'name':'grid_img_1.png', 'product_price':"Spelt baguettes á la Hauge, Belgium", 'product_details':'Tradisjonelle franske baguetter laget med spelt og i vedovn, lorem ipsum et bla bla dolor sin joule bla...'},{'name':'grid_img_2.png','product_price':'Spelt baguettes á la Hauge, Belgium', 'product_details':"Tradisjonelle franske baguetter laget med spelt og i vedovn, lorem ipsum et bla bla dolor sin joule bla..."},{'name':'grid_img_3.png', 'product_price':'Spelt baguettes á la Hauge, Belgium', 'product_details':'Tradisjonelle franske baguetter laget med spelt og i vedovn, lorem ipsum et bla bla dolor sin joule bla...'},{'name':'grid_img_4.png', 'product_price':"Spelt baguettes á la Hauge, Belgium", 'product_details':'Tradisjonelle franske baguetter laget med spelt og i vedovn, lorem ipsum et bla bla dolor sin joule bla...'},{'name':'grid_img_5.png', 'product_price':"Spelt baguettes á la Hauge, Belgium", 'product_details':'Tradisjonelle franske baguetter laget med spelt og i vedovn, lorem ipsum et bla bla dolor sin joule bla...'},{'name':'grid_img_6.png', 'product_price':"Spelt baguettes á la Hauge, Belgium", 'product_details':'Tradisjonelle franske baguetter laget med spelt og i vedovn, lorem ipsum et bla bla dolor sin joule bla...'},{'name':'grid_img_7.png', 'product_price':"Spelt baguettes á la Hauge, Belgium", 'product_details':'Tradisjonelle franske baguetter laget med spelt og i vedovn, lorem ipsum et bla bla dolor sin joule bla...'},{'name':'grid_img_8.png', 'product_price':"Spelt baguettes á la Hauge, Belgium", 'product_details':'Tradisjonelle franske baguetter laget med spelt og i vedovn, lorem ipsum et bla bla dolor sin joule bla...'}]
      }
   }

  render() {
    return (
      <div className="container">
        <div className="mid_container">
          <div className="home_top_category">
            <ul>
              {this.state.home_category_images.map((image, index) => <ShowImage 
                key = {index} imageData = {image}/>)}
            </ul>
          </div>
          <div className="grid_wall_wrapper">
            {this.state.wall_grid_images.map((wallImages, index) => <WallImageViewer 
                key = {index} wallImages = {wallImages}/>)}
          </div>
        </div>   
      </div>           
    );
  }
}


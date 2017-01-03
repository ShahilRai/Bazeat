import React from 'react';
import ShowImage from './ShowImage';
import WallImageViewer from './WallImageViewer';


export default class MidContainer extends React.Component {

   constructor() {
      super();
      this.state = {
        home_category_images: [{'name':'category_img_2.png', 'content':"Når høsten kommer"},{'name':'category_img_1.png', 'content':"Tradisjoner og jul"},{'name':'category_img_3.png', 'content':"Tradisjonell drift så lenge folk kan hugse"}]
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
            {this.props.productList.map((wallImages, index) => <WallImageViewer
                key = {index} index={index + 1} wallImages = {wallImages}/>)}
          </div>
        </div>
      </div>
    );
  }
}


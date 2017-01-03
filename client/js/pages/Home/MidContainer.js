import React from 'react';
import ShowImage from './ShowImage';
import WallImageViewer from './WallImageViewer';


export default class MidContainer extends React.Component {

   constructor() {
      super();
      this.state = {
      }
   }

  render() {
    return (
      <div className="container">
        <div className="mid_container">
          <div className="grid_wall_wrapper">
            {this.props.productList.map((wallImages, index) => <WallImageViewer
                key = {index} index={index + 1} wallImages = {wallImages}/>)}
          </div>
        </div>
      </div>
    );
  }
}


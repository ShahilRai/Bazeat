import React from 'react';

export default class ShowImage extends React.Component {

  render() {
    return (
      <li className="wdt50">
        <img src={require("../../../images/" + this.props.imageData.name)}/>
        <p>{this.props.imageData.content}</p>
      </li>
    );
  }
}

import React from 'react';

export default class Tags extends React.Component {

  render(){
    return(
      <ul className="ingrdnt_options">
        {this.props.allIngredients.map((item, i) => {
            return (<li><a href="#"><span key={i} className="ingrdnt_name">{item.name}</span><button className="close_ingrdnt" onClick={this.props.onClick}>X</button></a></li>);
        })}
      </ul>
    )
  }
}

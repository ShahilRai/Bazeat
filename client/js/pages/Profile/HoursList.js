import React from 'react';

export default class HoursList extends React.Component {

  render(){
    return(
      <div className="ingrdnt_options">
        {this.props.allIngredients.map((item, i) => {
             return <span key={i} className="ingrdnt_name">{item.name}</span>;
        })}
      </div>
    )
  }
}

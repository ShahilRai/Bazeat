import React from 'react';

export default class Tags extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
    return(
      <div className="ingrdnt_options">
        {this.props.allIngredients.map((item, i) => {
             return <span key={i} className="ingrdnt_name">{item.name}<button className="close_ingrdnt" onClick={this.props.onClick}>X</button></span>;
        })}
      </div>
    )
  }
}

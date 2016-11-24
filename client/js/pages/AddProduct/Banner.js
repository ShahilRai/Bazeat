import React from 'react';
export default class Banner extends React.Component {
  render(){
    return(
      <div className="banner_wrapper">
          <img src={require("../../../images/"+this.props.name)} />
        </div>
    )
  }
}

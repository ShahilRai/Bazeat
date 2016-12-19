import React from 'react';

export default class NearMeIcon extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
    }
  }

  RedirectToMap(){
   this.context.router.push('/search');
  }
  
  render() {
    return (
      <div>
      <button onClick={this.RedirectToMap.bind(this)}>near-me</button>
      </div>
    );
  }
}

import React from 'react';
import { Link } from 'react-router';

export default class SearchBox extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      disabled : true
    };
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  onMouseEnter(){
    this.setState({
      disabled : false
    })
  }

  onMouseLeave(){
    this.setState({
      disabled : true
    })
  }

  render() {
    return (
      <div className="col-lg-4 header_search_bar">
        <form className="form-search" method="get" id="s" action="/">
          <input type="text" className="input-medium" name="s" placeholder="What do you want to eat?" disabled={this.state.disabled} onMouseEnter={this.onMouseEnter}  onMouseLeave={this.onMouseLeave}/>
          <input name="" type="submit" className="header_search_icon"/>
        </form>
      </div>
    );
  }
}

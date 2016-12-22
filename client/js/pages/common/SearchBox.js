import React from 'react';
import { Link } from 'react-router';

export default class SearchBox extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      disabled : true
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    if(e.target.value=="")
    this.setState({
      disabled : true
    })
  else
     this.setState({
      disabled : false
    })
  }

  render() {
    return (
      <div className="col-lg-4 header_search_bar" onClick={this.onMouseClick}>
        <form className="form-search" method="get" id="s" action="/">
          <input type="text" className="input-medium" name="s" placeholder="What do you want to eat?" onChange={this.handleChange}/>
          <input name="" type="submit" className="header_search_icon" disabled={this.state.disabled}/>
        </form>
      </div>
    );
  }
}

import React from 'react';
import { Link } from 'react-router';

export default class SearchBox extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      disabled : true,
      showButton : false
    };
    this.handleChange = this.handleChange.bind(this)
    this.onMouseClick = this.onMouseClick.bind(this)
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

  onMouseClick(){
    this.setState({
      showButton : true
    })
    if(!this.context.router.location.query.search){
      this.context.router.push('/displaySrch');
    }
  }

  render() {
    var srchIcon = <input name="" type="submit" className="header_search_icon" disabled={this.state.disabled}/>
    if(this.state.showButton || this.context.router.location.query.search){
      srchIcon = <input name="" type="submit" className="header_search_icon_button" disabled={this.state.disabled} value="Search"/>
    }
    return (
      <div className="col-lg-4 header_search_bar" onClick={this.onMouseClick}>
        <form className="form-search" method="get" id="s" action="/displaySrch">
          <input type="text" className="input-medium" name="search" placeholder="What do you want to eat?" onChange={this.handleChange}/>
          {srchIcon}
        </form>
      </div>
    );
  }
}

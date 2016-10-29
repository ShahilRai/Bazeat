import React from 'react';
import { Link } from 'react-router';

export default class SearchBox extends React.Component {
  render() {
    return (
      <div className="col-lg-4 header_search_bar">
        <form className="form-search" method="get" id="s" action="/">
          <input type="text" className="input-medium" name="s" placeholder="What do you want to eat?" value=""/>
          <input name="" type="submit" className="header_search_icon"/>
        </form>
      </div>
    );
  }
}

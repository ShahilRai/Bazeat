import React from 'react';

export default class SearchNotification extends React.Component {

  render() {
    return (
      <h3 className="search_tabbd_heading text-left">Your search for <span className="italic">{this.props.name}</span> returned <span className="italic">{this.props.length}</span> results</h3>
    );
  }
}

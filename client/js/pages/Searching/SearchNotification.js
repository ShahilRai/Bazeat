import React from 'react';

export default class SearchNotification extends React.Component {

  render() {
    return (
      <h3 className="search_tabbd_heading text-left">Your search for <span className="italic">'XXX'</span> returned <span className="italic">YY</span> results</h3>
    );
  }
}

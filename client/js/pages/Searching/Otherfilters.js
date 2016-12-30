import React from 'react';

export default class Otherfilters extends React.Component {

  render() {
    return (
      <div className="other_category">
        <h3>Other</h3>
        <div className="checkbox prod_checkbox">
          <input id="checkbox34" type="checkbox"/>
          <label htmlFor="checkbox34">
            On demand
          </label>
        </div>
        <div className="checkbox prod_checkbox">
          <input id="checkbox35" type="checkbox"/>
          <label htmlFor="checkbox35">
            Open now
          </label>
        </div>
      </div>
    );
  }
}

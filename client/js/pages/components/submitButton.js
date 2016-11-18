import React from 'react';

export default class submitButton extends React.Component {

  render() {
    return(
      <div key="update-button" className="profile_gry_bot_bar">
        <button type="submit" className="btn pull-right">
        Save details
        </button>
      </div>
    );
  }      
}  
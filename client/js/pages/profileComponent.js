import React, { PropTypes } from 'react';
import ProfilePageHeader from './Header/ProfilePageHeader';

export default class profileComponent extends React.Component {
  render() {
    return (
    	<div>
        <ProfilePageHeader />
        { this.props.children }
      </div>
    );
  }
}

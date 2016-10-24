import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

import Header from './Header';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { LoginLink, LogoutLink, NotAuthenticated, Authenticated } from 'react-stormpath';

export default class MasterPage extends React.Component {
  render() {
    return (
      <DocumentTitle title='BAZEAT'>
        <div className='MasterPage'>
          <Header />
          
          { this.props.children }
           
          <NotAuthenticated>
              <LoginModal />
              <RegisterModal />
          </NotAuthenticated>
        </div>
      </DocumentTitle>
    );
  }
}
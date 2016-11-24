import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

import Header from './Header/Header';
import AdminLoginModal from './Admin/AdminLoginModal';
import AdminRegisterModal from './Admin/AdminRegisterModal';
import { LoginLink, LogoutLink, NotAuthenticated, Authenticated } from 'react-stormpath';

export default class MasterPage1 extends React.Component {
  render() {
    return (
      <DocumentTitle title='BAZEAT'>
        <div className='page_wrapper'>
          <Header />

          { this.props.children }
           
          <NotAuthenticated>
              
          
              <AdminLoginModal pathname={this.props.location.pathname}/>
              <AdminRegisterModal />
          </NotAuthenticated>
        </div>
      </DocumentTitle>
    );
  }
}

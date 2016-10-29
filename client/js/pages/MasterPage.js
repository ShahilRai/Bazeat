import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

import Header from './Header/Header';
import LoginModal from './Authenticate/LoginModal';
import RegisterModal from './Authenticate/RegisterModal';
import ForgotPasswordModal from './Authenticate/ForgotPasswordModal';
import ProducerRegisterModal from './Authenticate/ProducerRegisterModal';
import { LoginLink, LogoutLink, NotAuthenticated, Authenticated } from 'react-stormpath';

export default class MasterPage extends React.Component {
  render() {
    return (
      <DocumentTitle title='BAZEAT'>
        <div className='page_wrapper'>
          <Header />

          { this.props.children }

          <NotAuthenticated>
              <LoginModal />
              <RegisterModal />
              <ForgotPasswordModal />
              <ProducerRegisterModal />
          </NotAuthenticated>
        </div>
      </DocumentTitle>
    );
  }
}

import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

import Header from './Header/Header';
import LoginModal from './Authenticate/LoginModal';
import AddProduct from './Product/AddProduct';
import Ingredients from './Product/Ingredients'
import DeliveryMethods from './Product/DeliveryMethods'
import ReactSlider from './Product/ReactSlider'
import UserRegisterModal from './Authenticate/UserRegisterModal';
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
            <LoginModal pathname={this.props.location.pathname}/>
            <UserRegisterModal />
            <ForgotPasswordModal />
            <ProducerRegisterModal />
          </NotAuthenticated>
          <Authenticated>
            <ReactSlider />
          </Authenticated>
        </div>
      </DocumentTitle>
    );
  }
}

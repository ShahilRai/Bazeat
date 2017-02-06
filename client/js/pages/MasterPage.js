import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

import Header from './Header/Header';
import Footer from './Header/Footer';
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

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
  };

  render() {
    let website_pages;
    console.log("this.context.router.location.pathname")
    console.log(this.context.router.location.pathname)
    if((this.context.router.location.pathname=='/about') || (this.context.router.location.pathname=='/privacy') || (this.context.router.location.pathname=='/terms')){
      website_pages = <div className='about_container'>
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
        <Footer />
      </div>
    }
    else{
      website_pages = <div className='full_container'>
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
        <Footer />
      </div>
    }
    return (
      <DocumentTitle title='BAZEAT'>
        {website_pages}
      </DocumentTitle>
    );
  }
}

import React from 'react';
import { IndexRoute, Route, browserHistory } from 'react-router';
import ReactStormpath, { Router, HomeRoute, LoginRoute, AuthenticatedRoute } from 'react-stormpath';
import ChangePasswordPage from '../Authenticate/ChangePasswordPage';
import ForgotPasswordModal from '../Authenticate/ForgotPasswordModal';
import LoginModal from '../Authenticate/LoginModal';
import ResetPasswordPage from '../Authenticate/ResetPasswordPage';
import VerifyEmailPage from '../Authenticate/VerifyEmailPage';
import IndexPage from '../Home/IndexPage';
import MasterPage from '../MasterPage';
import profileComponent from '../profileComponent';
import ReactSlider from '../Product/ReactSlider';
import UserHomePage from '../AddProduct/UserHomePage';
import UserSettingPage from '../UserSetting/UserSettingPage';
import MapViewContainer from '../Searching/MapViewContainer';
import DisplaySearch from '../Searching/DisplaySearch';
import HelpPage from '../SiteStaticPages/HelpPage';
import AboutPage from '../SiteStaticPages/AboutPage';
import TermsPage from '../SiteStaticPages/TermsPage';
import PrivacyPage from '../SiteStaticPages/PrivacyPage';
import FaqPage from '../SiteStaticPages/FaqPage';
import AdminLoginModal from '../admin/AdminLoginModal';
import AdminRegisterModal from '../admin/AdminRegisterModal';
import AdminPanel from '../admin/AdminPanel';
import CheckoutContainer from '../cart/CheckoutContainer';
import ProfilePage from '../Profile/ProfilePage';
import AddAccount from '../Profile/AddAccount';
import ProducerPasswordUpdate from '../UserSetting/ProducerPasswordUpdate';
import Notification from '../UserSetting/Notification';
import PurchaseOrders from '../OrderManagement/PurchaseOrders';
import PackageSlip from '../OrderManagement/PackageSlip';
import ReceivedOrder from '../OrderManagement/ReceivedOrder';
import Mail from '../OrderManagement/Mail';
import CreateNewPackage from '../OrderManagement/CreateNewPackage';
import AllMessages from '../MessageAndReviews/AllMessages.js';
import ReviewPage from '../MessageAndReviews/ReviewPage.js';
import OrderMgmntPackages from '../OrderManagement/OrderMgmntPackages.js';
export default class ProjectRouter extends React.Component {
  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
  };

  loadScript(scriptName, callback) {
    var _arr  = {};
    if (!_arr[scriptName]) {
      _arr[scriptName] = true;
      var body   = document.getElementsByTagName('body')[0];
      var script   = document.createElement('script');
      script.type  = 'text/javascript';
      script.src   = scriptName;
      script.onload = callback;
      // fire the loading
      body.appendChild(script);
    } else if (callback) {
      callback();
    }
  }

  loadJquery() {
    var self=this;
    self.loadScript('/javascript/jquery-1.11.1.js', function() {
      self.loadScript('/javascript/bootstrap.min.js', function() {
        self.loadScript('/javascript/jaliswall.js', function() {
          $('.grid_wall_wrapper').jaliswall({item:'.grid_single_item'});
        });
      });
    });
  }

  render(){
    return(
      <Router history={browserHistory} onUpdate={() => this.loadJquery()}>
        <HomeRoute path='/' component={MasterPage}>
          <IndexRoute component={IndexPage} />
          <Route path='/login' component={IndexPage} />
          <Route path='/register' component={IndexPage} />
          <Route path='/verify' component={VerifyEmailPage} />
          <Route path='/password-reset' component={ChangePasswordPage} />
          <Route path='/change' component={ChangePasswordPage} />
          <Route path='/forgot' component={ForgotPasswordModal} />
          <Route path='/addProductForm' component={ReactSlider} />
          <Route path='/help' component={HelpPage} />
          <Route path='/about' component={AboutPage} />
          <Route path='/terms' component={TermsPage} />
          <Route path='/privacy' component={PrivacyPage} />
          <Route path='/faq' component={FaqPage} />
          <Route path='/map-search' component={MapViewContainer} />
          <Route path='/search' component={DisplaySearch} />
          <AuthenticatedRoute>
            <Route path="/user/:userId" component={UserHomePage} />
            <Route path='/user-reviews' component={UserHomePage} />
            <Route path='/checkout' component={CheckoutContainer} />
            <HomeRoute path='/' component={profileComponent}>
              <Route path='/profile' component={ProfilePage} />
              <Route path='/setting' component={ProducerPasswordUpdate} />
              <Route path='/messages' component={AllMessages} />
              <Route path='/messages/:conversation_id' component={AllMessages} />
              <Route path='/orders' component={PurchaseOrders} />
              <Route path='/orders/:orderId' component={ReceivedOrder} />
              <Route path='/orders/:orderId/new-package' component={CreateNewPackage} />
              <Route path='/packages' component={OrderMgmntPackages} />
              <Route path='/reviews' component={ReviewPage} />
              <Route path='/notification' component={Notification} />
              <Route path='/add-account' component={AddAccount} />
              <Route path='/orders/:id/e-mail' component={Mail} />
            </HomeRoute>
          </AuthenticatedRoute>
        </HomeRoute>
        <Route path='/orders/:orderId/package/:packageId' component={PackageSlip} />
        <Route path='/admin-login' component={AdminLoginModal} />
        <Route path='/admin-register' component={AdminRegisterModal} />
        <Route path='/admin-dashboard' component={AdminPanel} />
      </Router>
    );
  }
}

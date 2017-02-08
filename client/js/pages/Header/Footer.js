import React from 'react';
import { Link } from 'react-router';
import Logo from './Logo';
export default class Footer extends React.Component {
  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
  };

  constructor(props, context){
    super(props);
    this.state={
    };
  }

  render() {
    return (
      <footer id="footer">
        <div className="container pad_25">
          <div className="footer_container">
            <div className="row">
              <div className="col-lg-3 col-md-2 col-sm-12 col-xs-12 footer_logo">
                <Link to="/" onlyActiveOnIndex={true}><img src={require('../../../images/logo.png')}  alt="BAZEAT"/></Link>
              </div>
              <div className="col-lg-7 col-md-10 col-sm-12 col-xs-12">
                <ul className="footer_menu">
                  <li><Link to="/about">About us</Link></li>
                  <li><Link to="/privacy">Privacy</Link></li>
                  <li><Link to="/terms">Terms</Link></li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
              <p className="footer_copy">&copy; 2017 Creeact AS</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

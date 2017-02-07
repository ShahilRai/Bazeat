import React from 'react';
import MidContainer from './MidContainer';
import { NotAuthenticated, Authenticated } from 'react-stormpath';

export default class IndexPage extends React.Component {

  render() {
    return (
      <div className="full_width">
        <div className="banner_wrapper">
          <img src={require("../../../images/banner.jpg")}  />
        </div>
        <Authenticated>
          <MidContainer />
        </Authenticated>
        <NotAuthenticated>
          <MidContainer />
        </NotAuthenticated>
      </div>
    );
  }
}

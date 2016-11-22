import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import Banner from './Banner';
import ProducerLogo from './ProducerLogo';
export default class ProducerPage extends React.Component {
  render(){
  return(
          <div className="page_wrapper">
            <Banner name="review_banner.jpg"/>
            <ProducerLogo />
          </div>
        )
      }
    }

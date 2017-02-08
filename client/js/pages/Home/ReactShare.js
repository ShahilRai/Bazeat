import React from 'react';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

import exampleImage from 'react-share';
const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');

export default class ReactShare extends React.Component {

	static contextTypes = {
    	authenticated: React.PropTypes.bool,
    	user: React.PropTypes.object
  	};

	constructor(props, context) {
    	super(props, context);
      		this.state = {

      		}
   	}

   	render() {
   		const shareUrl = 'http://github.com';
    	const title = 'Bazeat';

   		return(
   			<div >
		        <div>
		          <FacebookShareButton
		            url={shareUrl}
		            title={title}
		            picture={`${String(window.location)}/${exampleImage}`}
		            className="Demo__some-network__share-button">
		            <FacebookIcon
		              size={32}
		              round />
		          </FacebookShareButton>

		          <FacebookShareCount
		            url={shareUrl}
		            className="Demo__some-network__share-count">
		            {count => count}
		          </FacebookShareCount>
        		</div>
        	</div>
   		)
   	}
}

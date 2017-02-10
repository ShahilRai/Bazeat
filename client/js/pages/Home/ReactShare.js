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
   		return(
   			<div >
		        <div>
		          <FacebookShareButton
		            url={shareUrl}
		            title={this.props.wall_images.product_name}
		            picture={this.props.wall_images.photo}
                description={this.props.wall_images.description}
		            className="Demo__some-network__share-button">
                <button type="button" className="btn btn-default fb_btn" data-dismiss="modal">Share on facebook</button>
		          </FacebookShareButton>
        		</div>
        	</div>
   		)
   	}
}

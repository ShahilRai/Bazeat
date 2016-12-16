import React from 'react';
export default class HideProductBtn extends React.Component {

  render(){
    return(
			<a href="javascript:void(0)" className="hover_icon"><img src="images/hide_icon.png"/>
				<small className="icon_text">Hide</small>
			</a>
    )
  }
}


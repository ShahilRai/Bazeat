import React from 'react';
export default class HideProductBtn extends React.Component {

  render(){
    return(
			<a href="javascript:void(0)" className="hover_icon" onClick={this.props.handlerForHide}><img src="images/hide_icon.png"/>
				<small className="icon_text">{this.props.Button_text}</small>
			</a>
    )
  }
}


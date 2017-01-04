import React from 'react';
export default class DisableProductBtn extends React.Component {

  render(){
    return(
      <a href="javascript:void(0)" className="hover_icon" onClick={this.props.handlerForDisable}><img src="/images/disable_icon.png"/>
				<small className="icon_text">Disable</small>
			</a>
    )
  }
}

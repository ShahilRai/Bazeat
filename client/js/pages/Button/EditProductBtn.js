import React from 'react';
export default class EditProductBtn extends React.Component {

  render(){
    return(
       <input type="button" data-toggle="modal" data-target="#step_1" className="buy_btn del_btn" value="Edit" onClick={this.props.handlerForEdit}/>
    )
  }
}

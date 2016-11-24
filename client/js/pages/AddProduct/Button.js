 import React from 'react';
export default class Button extends React.Component {
  render(){
    return(
        <div className="hover_box">
          <a href="#" className="buy_btn del_btn">Delete</a>
          <a href="#" className="buy_btn del_btn">Edit</a>
          <a href="#" className="buy_btn hide_btn">Hide</a>
          <a href="#" className="buy_btn disable_btn">Disable</a>
        </div>
    )
  }
}

import React from 'react';
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

export default class Notification extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
      this.state = {
    };
  }

  render() {
    return (
      <div className="modal-dialog">
        comming soon.....
      </div>
    );
  }
}

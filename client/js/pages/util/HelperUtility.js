import React from 'react';
class HelperUtility extends React.Component {

  constructor() {
    super();
    this.state = {
    }
  }

  static function showAlert(called){
  	alert("called from : " + called)
  }
}
export {showAlert as showAlert}

import React from 'react';

export default class RadioButton extends React.Component {

  render() {
    var foodtyp ;
    if(this.props.prodDetails){
      foodtyp = this.props.prodDetails
    }
    return(
      <div className="form-check">
        <label className="form-check-label control control--radio">
          <input className="form-check-input custom_radio checkBox" name="food_type" data-foodstate={this.props.foodstate} type="radio" onChange={this.props.onChange} defaultChecked={foodtyp}/>
          {this.props.label}
          <div className="control__indicator"></div>
        </label>
      </div>
    );
  }
}

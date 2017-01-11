import React from 'react';

export default class SelectBox extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: this.props.value
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      value: evt.target.value
    });
  }

  render() {
    return(
      <div className="col-md-8 col-xs-12">
        <select ref="slectfromtime" className="form-control gender_selct" name={this.props.name} value={this.state.value} onChange = {this.handleChange}>
          {
            this.props.selectlist.map(function(item, i) {
              return (
                <option key={i} value={item.name}>{item.name}</option>
              )
            })
          }
        </select>
      </div>
    );
  }
}

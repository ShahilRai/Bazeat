var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');
require('react-datepicker/dist/react-datepicker.css');

export default class CustomDatePicker extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return(
      <div className="col-md-8 col-xs-12">
        <DatePicker selected={this.state.startDate} onChange={this.handleChange} name="date"/>
      </div>
    );
  }
}
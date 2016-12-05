import React from 'react';
import DatePicker from 'react-simple-datepicker';
import 'react-simple-datepicker/dist/index.css';
export default class DateComponent extends React.Component{
	constructor(props) {
      super(props);
      this.state={
      	date: this.props.value
        //value:
      };
}
handleChange(event) {
    this.setState({ date: event.target.value });
    ///if (this.props.onChange){
           // this.props.onChange(event);
        //}
  }
render(){
    	return(
        	<div>
        		<DatePicker date={this.state.date} name={this.props.name} value={this.state.value} onChange={this.handleChange}/>
        	</div>
      	);

    }
}

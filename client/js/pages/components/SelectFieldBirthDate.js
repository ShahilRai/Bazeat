import React from 'react';
let date_arr = [];
export default class SelectFieldBirthDate extends React.Component{

  constructor(props,context) {
   super(props, context);
   this.state={
    value: this.props.value
   };
   this.handleChange=this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value});
    if (this.props.onChange){
      this.props.onChange(event);
    }
  }

  render(){
    var i=1;

    for(i=1; i<=31;i++)
    {
      date_arr.push(i);
    }
    return(
      <select name ={this.props.name} onChange={this.handleChange} value={this.state.value}>
        <option value="dd" name="birth_date" selected={this.state.value}>dd</option>
        {
          date_arr.map((result, i) =>{
            return(
            <option key={i} value={result}>{result}</option>

            )
          })
        }
      </select>
    );
  }
}


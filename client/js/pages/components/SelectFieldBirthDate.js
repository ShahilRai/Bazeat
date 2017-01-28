import React from 'react';
let date_arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
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
    /*var i=1;

    for(i=1; i<=31;i++)
    {
      date_arr.push(i);
    }*/
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


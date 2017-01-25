import React from 'react';
let month_arr = [1,2,3,4,5,6,7,8,9,10,11,12];
export default class SelectFieldBirthMonth extends React.Component{

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
    for(i=1; i<=12;i++)
    {
      month_arr.push(i);
    }*/
    return(
      <select name ={this.props.name} onChange={this.handleChange} value={this.state.value}>
        <option value="mm" name="birth_date" selected={this.state.value}>mm</option>
        {
          month_arr.map((result, i) =>{
            return(
            <option key={i} value={result}>{result}</option>

            )
          })
        }
      </select>
    );
  }
}



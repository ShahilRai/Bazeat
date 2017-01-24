import React from 'react';
let year_arr = [];
export default class SelectFieldBirthYear extends React.Component{

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
    var i=1950;

    for(i=1950; i<=2015;i++)
    {
      year_arr.push(i);
    }
    return(
        <select name ={this.props.name} onChange={this.handleChange} value={this.state.value}>
        <option value="yyyy" name="birth_date" selected={this.state.value}>yyyy</option>
        {
          year_arr.map((result, i) =>{
            return(
            <option key={i} value={result}>{result}</option>
            )
          })
        }
      </select>
    );
  }
}



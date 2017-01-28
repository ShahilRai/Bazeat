import React from 'react';
let year_arr = [1950,1951,1952,1953,1954,1955,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017];
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
    /*var i=1950;

    for(i=1950; i<=2015;i++)
    {
      year_arr.push(i);
    }*/
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



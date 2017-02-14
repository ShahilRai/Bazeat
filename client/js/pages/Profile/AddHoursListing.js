import React from 'react';
let day=[];
export default class AddHoursListing extends React.Component {

constructor(props, context) {
    super(props, context);
    this.state = {
    }
    this.createListing = this.createListing.bind(this);
    this.dayFormat =this.dayFormat.bind(this);
  }

  dayFormat(days){
    day=[];
    var dayLen = days.length
    for(var i=0;i<dayLen;i++){
      if(i<dayLen-1)
        day[i] = days[i]+",";
      else
        day[i] = days[i];
    }
    return(day)
  }

  createListing(item, i){
    return (<span className="add_time"><li className="addHours" data-index={i} key={i}>{item.day.length==7?"Sunday - Saturday":this.dayFormat(item.day)}  {item.start_time} - {item.end_time}<span className="delete_time" onClick={() =>{this.props.timeDelete(item.id)}}>X</span></li> </span>)
  }

  render(){
    var listHours = this.props.entries.map(this.createListing)
    return(
     <ul className="theList">
      {listHours}
     </ul>
    )
  }
}

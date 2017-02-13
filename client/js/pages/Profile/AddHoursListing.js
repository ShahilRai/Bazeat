import React from 'react';
export default class AddHoursListing extends React.Component {

constructor(props, context) {
    super(props, context);
    this.state = {
    }
    this.createListing = this.createListing.bind(this)
  }

  createListing(item, i){
    return (<span className="add_time"><li className="addHours" data-index={i} key={i}>{item.day.length==7?"Sunday - Saturday":item.day}  {item.start_time} - {item.end_time}<span className="delete_time" onClick={() =>{this.props.timeDelete(item.id)}}>X</span></li> </span>)
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

import React from 'react';
export default class AddHoursListing extends React.Component {

  createListing(item, i){
    return (<li className="addHours" key={i}>{item.day} - {item.start_time} - {item.end_time}</li>)
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

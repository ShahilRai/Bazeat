import React from 'react';
export default class AddHoursListing extends React.Component {

  createListing(item){
    return (<li className="addHours" key={item.key}>{item.selectDays} - {item.hoursFrom} - {item.hoursTo}</li>)
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

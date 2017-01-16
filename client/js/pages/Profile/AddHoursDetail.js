import React from 'react';
import axios from 'axios';
import AddHoursListing from './AddHoursListing';
import SelectBox from '../components/SelectBox';

export default class AddHoursDetail extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      daysValue: "",
      selectDays: [],
      items: [],
      days: [{value:'Sunday','name':'Sun', 'id':0},{value:'Monday','name':'Mon', 'id':1},{value:'Tuesday','name':'Tues', 'id':2},{value:'Wednesday','name':'Wed', 'id':3},{value:'Thrusday','name':'Thru', 'id':4},{value:'Friday','name':'Fri', 'id':5},{value:'Saturday','name':'Sat', 'id':6}],
      options: [{ value: null, name: 'Select' },{ value: '00.00', name: '00.00' },{ value: '01.00', name: '01.00' },{ value: '02.00', name: '02.00' },{ value: '03.00', name: '03.00' },{ value: '04.00', name: '04.00' },{ value: '05.00', name: '05.00' },{ value: '06.00', name: '06.00' },{ value: '07.00', name: '07.00' },{ value: '08.00', name: '08.00' },{ value: '09.00', name: '09.00' },{ value: 10.00, name: '10.00' },{ value: '11.00', name: '11.00' },{ value: '12.00', name: '12.00' },{ value: '13.00', name: '13.00' },{ value: '14.00', name: '14.00' },{ value: '15.00', name: '15.00' },{ value: '16.00', name: '17.00' },{ value: '18.00', name: '18.00' },{ value: '19.00', name: '19.00' },{ value: '20.00', name: '21.00'},{ value: '22.00', name: '22.00' },{ value: '23.00', name: '23.00' }]
    };
    this._deleteTitmeSlot = this._deleteTitmeSlot.bind(this)
  }

  displayAddHoursForm(){
    document.getElementById("addHours").style.display = "block";
  }

  addHours(e){
    var all_days_selected = document.getElementById("allDays").checked
    if(!all_days_selected){
      if(this.refs.from_time.refs.slectfromtime.value == "Select" || this.refs.to_time.refs.slectfromtime.value == "Select" || this.state.selectDays.length == 0){
        return alert("Please select the day and time" );
      }
    }

    if(all_days_selected){
     if(this.refs.from_time.refs.slectfromtime.value == "Select" || this.refs.to_time.refs.slectfromtime.value == "Select"){
        return alert("Please select the day and time" );
      }
      this.state.selectDays = [];
      this.state.selectDays.push(this.state.days[0].value)
      this.state.selectDays.push(this.state.days[6].value)
    }

    var hoursArray = this.state.items
    hoursArray.push({
      start_time: this.refs.from_time.refs.slectfromtime.value,
      end_time: this.refs.to_time.refs.slectfromtime.value,
      day: this.state.selectDays
    });

    this.saveTimeSlot(this.props.email, hoursArray).then((response) => {
      if(response.data) {
        this.state.items = [];
        this.setState({
          items: response.data
        });
      }
      }).catch((err) => {
        console.log(err);
    });
    this.state.selectDays = [];
    e.preventDefault();
  }

  cancelHours(){
    document.getElementById("addHours").style.display = "none";
  }

  isDayExist(arr, day){
    var exist = false
    for(var i=0;i<=arr.length ;i++){
      if(arr[i] == day){
        exist = true
      }
    }
    return exist
  }

  handleDayClick(index){
    var self = this;
    var daysArray =  this.state.selectDays
    if(!self.isDayExist(this.state.selectDays,this.state.days[index].value)){
      daysArray.push(this.state.days[index].value);
     }
    this.setState({
      selectDays: daysArray
    })
  }

  removeHours(index) {
    return axios.delete("/api/remove_time",{
      params:{
        timeslot_id: index,
      }
    });
  }

  _deleteTitmeSlot(_timeSlotId){
    console.log("_timeSlotId")
    console.log(_timeSlotId)
    this.removeHours(_timeSlotId).then((response) => {
      console.log(response)
      console.log(response.data)
      if(response.data) {
        this.setState({
          items: response.data
        });
      }
      }).catch((err) => {
        console.log(err);
    });
  }

  saveTimeSlot(_userEmail , _timeSlotsArray){
    return axios.post("/api/add_time" ,{
      email: _userEmail,
      timeslots: _timeSlotsArray
    })
  }

  render(){
    return(
      <div className="col-md-8 col-xs-12">
        <a href="javascript:void(0)" className="add_hrs_btn" onClick={this.displayAddHoursForm.bind(this)}>+ Add hours</a>
        <span className="visting_hr_time_col" id="addHours">
          <span className="visting_hr_inner_col" >
            <span className="pull-left">
              <label>From</label>
              <SelectBox ref="from_time" selectlist={this.state.options} name="fromTime" />
            </span>
            <span className="pull-right">
              <label>to</label>
              <SelectBox ref="to_time" selectlist={this.state.options} name="toTime" />
            </span>
            <ul className="attnding_days">
              {this.state.days.map((days,index) =>
                <li key = {index} onClick={this.handleDayClick.bind(this,index)} ><a id="week_day" href="javascript:void(0)">{days.name}</a></li>
                )}
            </ul>
          </span>
          <AddHoursListing entries={this.state.items} timeDelete={this._deleteTitmeSlot}/>
          <span className="visting_hr_fotter">
            <div>
              <input type="checkbox" id="allDays" value="allDays"/>
              <label htmlFor="checkbox2">Apply to all days</label>
            </div>
            <span className="app_btns">
              <a href="javascript:void(0)" className="add_btn" onClick={this.addHours.bind(this)}>Add</a>
              <a href="javascript:void(0)" onClick={this.cancelHours.bind(this)} className="cncl_btn" >Cancel</a>
            </span>
          </span>
        </span>
      </div>
    )
  }
}

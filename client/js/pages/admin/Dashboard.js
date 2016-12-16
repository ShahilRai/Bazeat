import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

export default class Dashboard extends React.Component {
  constructor(props){
    super(props);
      this.state={
        response_description : {},
        page_type: '',
        editor_data: ''
      };
    this.handleChange=this.handleChange.bind(this);
    this.submitStaticContent=this.submitStaticContent.bind(this);
  }
  handleChange(e){
    var selected_page_type = e.target.value
    this.loadStaticData(selected_page_type).then((response) => {
      if(response.data) {
        this.setState({
          response_description : response.data,
          page_type: selected_page_type,
        });
      }
    }).catch((err) => {
        console.log(err);
    });
  }

   //Call of API for static pages load.
  loadStaticData(type) {
    return axios.get("/admin/pages/"+ type)
  }
  submitStaticContent(e){
    var p_type = this.state.page_type ? this.state.page_type : ''
    var p_data  = this.refs.desc_text.value
    this.updateStaticContent(p_type, p_data).then((response) => {
    if(response.data) {
      console.log("response data: ")
      console.log(response.data)
    }
    }).catch((err) => {
          console.log(err);
    });
  }

//Call of API for page description update
  updateStaticContent(page_type, p_data){
    return axios.put("/admin/pages/"+page_type, {
        description: p_data
    });
  }

  render(){
    return(
      <div>
        <Card style={{ margin: '2em' }}>
          <select onChange={this.handleChange}>
            <option value="" selected>Secte one</option>
            <option value="About">About</option>
            <option value="FAQ">FAQ</option>
            <option value="Help">Help</option>
            <option value="Privacy">Privacy</option>
            <option value="Terms">Terms</option>
          </select>
          <CardHeader title="Welcome to the administration" />
           <CardText>
             <div>{ this.state.response_description.page? this.state.response_description.page.date_added  : " "}</div>
             <div>{ this.state.response_description.page? this.state.response_description.page.description : ""}</div>
           </CardText>
        </Card>
        <input type="text" ref="desc_text" className="form-control" placeholder="Enter your text"  name="edit"/>
        <button type="submit" value="Add Description" onClick={this.submitStaticContent}>Add Description</button>
      </div>
    );
  }
}


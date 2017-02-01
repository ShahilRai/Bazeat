import React from 'react';
import axios from 'axios';
export default class AboutPage extends React.Component {

  constructor(props){
    super(props);
    this.state={
      static_content : {}
    }
  }

  componentDidMount(){
    this.loadStaticData().then((response) => {
      if(response.data) {
        this.setState({
          static_content: response.data
        });
      }
    }).catch((err) => {
        console.log(err);
    });
  }

//load the description for static page
  loadStaticData() {
    return axios.get("/admin/pages/About")
  }

  render(){
    if(!this.state.static_content){
      return(<div>loading...........</div>);
    }
    return(
      <div>
        <div className = "abt_section" dangerouslySetInnerHTML={{__html: this.state.static_content.page ? this.state.static_content.page.description : 'Comming Soon...'}}></div>
      </div>
    );
  }
}

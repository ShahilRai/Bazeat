import React from 'react';
import axios from 'axios';

export default class HelpPage extends React.Component {
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
    return axios.get("/admin/pages/Help")
  }

  render(){
      if(this.state.static_content){
        return(
          <div>
            <div style= { {padding:' 200px '} } dangerouslySetInnerHTML={{__html: this.state.static_content.page ? this.state.static_content.page.description : ''}}>
            </div>
          </div>
      );
     }else{
      return(
          <div>
            <div>loading...........</div>
          </div>
      );
    }
  }
}

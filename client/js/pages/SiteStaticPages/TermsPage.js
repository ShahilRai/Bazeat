import React from 'react';
import axios from 'axios';
export default class TermsPage extends React.Component {

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

  loadStaticData() {
    return axios.get("/admin/pages/Terms")
  }

//load the description for static page
  render(){
    if(!this.state.static_content){
      return(<div>loading...........</div>);
    }
    return(
      <div className="page_wrapper">
        <div className="outer_abt f2f2f2_bg">
          <div className="container">
            <div className="static_container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 about_us terms_section">
                  <h3>Betingelser for bruk</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
                  molestie magna eu cursus viverra. Morbi ultricies sollicitudin ante, vitae ornare tellus maximus in. Cras viverra, ante et pretium scelerisque, tellus augue lacinia mi, in euismod turpis lacus quis
                  magna. Fusce a arcu et purus commodo interdum. Donec ultricies massa ut magna feugiat, et volutpat sapien porttitor. Suspendisse massa ut magna feugiat, et volutpat sapien porttitor. Suspendisse massa ut magna feugiat, et volutpat sapien porttitor. Suspendisse

                  </p>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inner_about">
                  <h4 className="priv_subheading">Headline</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
                  molestie magna eu cursus viverra. Morbi ultricies sollicitudin ante, vitae ornare tellus maximus in. Cras viverra, ante et pretium scelerisque, tellus augue lacinia mi, in euismod turpis lacus quis
                  magna. Fusce a arcu et purus commodo interdum. Donec ultricies massa ut magna feugiat, et volutpat sapien porttitor. Suspendisse massa ut magna feugiat, et volutpat sapien porttitor. Suspendisse massa ut magna feugiat, et volutpat sapien porttitor. Suspendisse

                  </p>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inner_about">
                  <h4 className="priv_subheading">Headline</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
                  molestie magna eu cursus viverra. Morbi ultricies sollicitudin ante, vitae ornare tellus maximus in. Cras viverra, ante et pretium scelerisque, tellus augue lacinia mi, in euismod turpis lacus quis
                  magna. Fusce a arcu et purus commodo interdum. Donec ultricies massa ut magna feugiat, et volutpat sapien porttitor. Suspendisse massa ut magna feugiat, et volutpat sapien porttitor. Suspendisse massa ut magna feugiat, et volutpat sapien porttitor. Suspendisse

                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

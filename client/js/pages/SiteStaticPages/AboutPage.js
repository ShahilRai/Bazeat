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
        <div className="banner_wrapper">
          <img src={require('../../../images/about_banner.jpg')}/>
          <div className="abt_caption">
            <p>Alle skal ha mulighet å spise mat laget av hender</p>
          </div>
        </div>
        <div className="outer_abt f2f2f2_bg">
          <div className="container ">
            <div className="static_container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 about_us">
                  <h3>Om Bazeat</h3>
                  <p>Bazeat er en omsetningsplattform for mat fra småskala produsenter.Våres ambisjoner er:</p>
                  <ul>
                    <li>Være en digital basar hvor produsenter og konsumenter kan  møtes til handel på kundes premisser</li>
                    <li>Gjøre det enkelt for produsenter å fremby sine produkter</li>
                    <li>Gjøre det enkelt for konsumenter å ta det gode matvalget i en travel hverdag</li>
                    <li>Bygge tillit mellom produsenter og kunder </li>
                    <li>Gjenspeile verdier knyttet til mat som er skapt i hender</li>
                    <li>Utvikle nye løsninger for distribusjon av mat- og drikkevarer fra  produsent til konsument som er rask og rimelig</li>
                    <li>Tilrettelegge for økonomiske transaksjoner mellom kunder og  produsent som er enkel og velfungerende, samt gir myndigheter   det nødvendige innsyn</li>
                  </ul>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inner_about">
                  <h4>Visjon og verdier</h4>
                  <p>Bazeats visjon er at alle skal kunne kjøpe og spise mat laget av små produsenter. Visjonen støttes av verdiene modig, nyskapende, tillitt, trygghet, ekthet.</p>
                  <p>Bazeats forretningsidé er å gjøre det enkelt for små produsenter å selge produkter direkte til forbruker og enkelt for forbrukeren å kjøpe  mat direkte fra småprodusent.</p>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inner_about">
                  <h4>Strategi</h4>
                  <p>Bazeats strategi er å være en global omsetningsplatform for mat fra små produsenter ved å være det foretrukkede bindeleddet mellomprodusent og konsument. Bazeat skal ha produsent og konsument isentrum.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

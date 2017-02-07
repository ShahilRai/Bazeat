import React from 'react';
import toastr from 'toastr';
import axios from 'axios';

let modal;
export default class AddNewProductLogo extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      modal :'',
      target : ''
    };
  }

  addYourProduct() {
    this.addProductAfterValidate(this.context.user.email).then((response) => {
    if(response.data.status == false  && response.data.msg=="Update your profile first") {
      this.setState({
        modal : "",
        target : ""
      })
      toastr.error(response.data.msg)
      this.context.router.push('/profile');
    }else if(response.data.status== false && response.data.msg=="Add your account first"){
      toastr.error(response.data.msg)
      this.context.router.push('/add-account');
      this.setState({
        modal : "",
        target : ""
      })
    }else if(response.data.status== true && response.data.msg=="You are ready to go"){
      this.setState({
        modal : "modal",
        target : "#add"
      })
    }
  }).catch((err) => {
      console.log(err);
  });
 }

  addProductAfterValidate(email) {
    return axios.get("/api/check_user?email="+email)
  }

  render(){
   return(
      <div className="wall-column">
        <div className="grid_single_item no_brdr add_item_pduct">
          <div className="add_prod_div">
           <a href="javaScript:void(0)" data-toggle={this.state.modal} data-target={this.state.target} onClick={this.addYourProduct.bind(this)} >
             <img src="/images/add_prod.png" />
              <div className="grid_tile_desc">
               <h3 >Add new <br/> product</h3>
              </div>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

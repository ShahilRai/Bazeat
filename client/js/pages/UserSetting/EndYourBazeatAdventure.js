import React from 'react';
import axios from 'axios';
import {RadioGroup, Radio} from 'react-radio-group';
export default class EndYourBazeatAdventure extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedValue: '',
      selectValue: ''
    };
    this.endYourBazeatAdventureBtnClck = this.endYourBazeatAdventureBtnClck.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  endYourBazeatAdventureBtnClck() {
    this.endYourBazeatAdventure(this.context.user.email).then((response) => {
       if(response.data) {
        this.setState({
        });
      }
    })
    .catch((err) => {
    console.log(err);
    });
  }

  endYourBazeatAdventure(email) {
    return axios.delete("/api/users/",{
      email: email
    });
  }

  handleChange(value) {
    this.setState({
      selectedValue: value,
    });
  }
  handlerChange(value) {
    this.setState({
      selectValue: value,
    });
  }
  cancel(){
    document.getElementById("cancel_account").style.display = "none";
  }

  render() {
    return (
      <div className="col-lg-9 col-md-8 col-sm-10 col-xs-12 edit_profile_rht_sidebar">
        <div className="edit_prfile_detail_form">
          <h3>End your Bazeat adventure</h3>
          <form className="" action="javascript:void(0)" onSubmit={this.endYourBazeatAdventureBtnClck}>
            <div id="cancel_account" className="canel_accoutn_col">
              <p className="leavn_txt">Do you want to cancel your account? We will miss you! </p>
              <button type="submit" className="btn pull-right redish_btn" onClick={this.cancel}>Cancel Account</button>
            </div>
            <div className="end_form ptop15">
              <p className="form_ques form_quesmbot">Why do you want to leave us?</p>
              <RadioGroup name="platform" selectedValue={this.state.selectedValue} onChange={this.handleChange}>
                <div>
                  <label for="platform1"><Radio id="platform1" name="platform" value="We don't find the platform useful" />We don't find the platform useful</label>
                </div>
                <div>
                  <label for="platform2"><Radio id="platform2" name="platform" value="We don't know how to use the the platform" />We don't know how to use the the platform</label>
                </div>
                <div>
                  <label for="platform3"><Radio id="platform3" name="platform" value="I'ts not what we expected" />I'ts not what we expected</label>
                </div>
                <div>
                  <label for="platform4"><Radio id="platform4" name="platform" value="Other" />Other</label>
                </div>
              </RadioGroup>
              <div className="form-group ending_description">
                <label for="input" className="col-form-label">Please share your thougts!</label>
                <textarea></textarea>
              </div>
              <p className="phn_cntct">Phone contact is often easier. Can we contact you more details?</p>
              <RadioGroup name="c_detail" selectValue={this.state.selectValue} onChange={this.handlerChange}>
                <div>
                  <label for="detail1"><Radio id="detail1" name="c_detail" value="Yes, please" />Yes, please</label>
                </div>
                <div >
                  <label for="detail2"><Radio id="detail2" name="c_detail" value="No, thank you" />No, thank you</label>
                </div>
              </RadioGroup>
            </div>
            <div className="profile_gry_bot_bar">
              <button type="submit" className="btn pull-right mrht20">Cancle account</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}





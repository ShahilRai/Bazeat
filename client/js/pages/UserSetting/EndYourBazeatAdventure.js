import React from 'react';
import toastr from 'toastr';
import axios from 'axios';
import TextAreaField from '../components/TextAreaField';
import {RadioGroup, Radio} from 'react-radio-group';
export default class EndYourBazeatAdventure extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedValue: "",
      selectValue: '',
      user_description: ''
    };
    this.endYourBazeatAdventureBtnClck = this.endYourBazeatAdventureBtnClck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlerChange = this.handlerChange.bind(this);
  }

  endYourBazeatAdventureBtnClck() {
    this.endYourBazeatAdventure(this.context.user.email).then((response) => {
      toastr.success('Your account successfully deleted');
      if(response.data) {
        this.context.router.push('/');
        this.setState({
        });
      }
    }).catch((err) => {
     toastr.error('Sorry, your account not deleted');
    console.log(err);
    });
  }

  endYourBazeatAdventure(email) {
    return axios.delete("/api/users/",{
      params:{
        email: email,
        reason: this.state.selectedValue,
        confirmation: this.state.selectValue,
        description: this.refs.value.refs.name.value
      }
    });
  }

  handleChange(value) {
    this.setState({
      selectedValue: value
    });
  }

  handlerChange(value) {
    this.setState({
      selectValue: value
    });
  }

  cancel(){
    document.getElementById("cancel_account").style.display = "none";
    document.getElementById("leave_account").style.display = "block";
    document.getElementById("footer_cancel").style.display = "block";
  }

  render() {
    return (
      <div className="col-lg-9 col-md-8 col-sm-10 col-xs-12 edit_profile_rht_sidebar">
        <div className="edit_prfile_detail_form">
          <h3>End your Bazeat adventure</h3>
          <div id="cancel_account" className="canel_accoutn_col">
              <p className="leavn_txt">Do you want to cancel your account? We will miss you! </p>
              <button type="submit" className="btn pull-right redish_btn" onClick={this.cancel}>Cancel Account</button>
          </div>
          <form>
            <div id="leave_account" className="end_form ptop15">
              <p className="form_ques form_quesmbot">Why do you want to leave us?</p>
              <RadioGroup name="reason" selectedValue={this.state.selectedValue} onChange={this.handleChange}>
                <div>
                  <label htmlFor="platform1"><Radio id="platform1" name="selectedValue" value="We don't find the platform useful" />We don't find the platform useful</label>
                </div>
                <div>
                  <label htmlFor="platform2"><Radio id="platform2" name="selectedValue" value="We don't know how to use the the platform" />We don't know how to use the the platform</label>
                </div>
                <div>
                  <label htmlFor="platform3"><Radio id="platform3" name="selectedValue" value="I'ts not what we expected" />I'ts not what we expected</label>
                </div>
                <div>
                  <label htmlFor="platform4"><Radio id="platform4" name="selectedValue" value="Other" />Other</label>
                </div>
              </RadioGroup>
              <div className="form-group ending_description">
                <label for="input" className="col-form-label">Please share your thougts!</label>
                <TextAreaField name="thoughts" ref="value">{}</TextAreaField>
              </div>
              <p className="phn_cntct">Phone contact is often easier. Can we contact you more details?</p>
              <RadioGroup name="confirmation" selectValue={this.state.selectValue} onChange={this.handlerChange}>
                <div>
                  <label htmlFor="detail1"><Radio id="detail1" name="selectValue" value="Yes, please" />Yes, please</label>
                </div>
                <div>
                  <label htmlFor="detail2"><Radio id="detail2" name="selectValue" value="No, thank you" />No, thank you</label>
                </div>
              </RadioGroup>
            </div>
            <div id="footer_cancel" className="profile_gry_bot_bar">
              <input type="button" value="Cancel account" onClick={this.endYourBazeatAdventureBtnClck} className="btn pull-right mrht20" disabled={!this.state.selectValue && !this.state.selectValue && !this.state.selectValue}/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}





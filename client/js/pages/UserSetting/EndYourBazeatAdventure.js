import React from 'react';
import axios from 'axios';
export default class EndYourBazeatAdventure extends React.Component {

    constructor(props, context) {
    super(props, context);
    this.state = {
    };
    this.EndYourBazeatAdventureBtnClck = this.EndYourBazeatAdventureBtnClck.bind(this)
  }

    EndYourBazeatAdventureBtnClck(e) {

        alert(e.target.text)
      this.EndYourBazeatAdventure().then((response) => {
         if(response.data) {
          this.setState({
          });
        }
      })
      .catch((err) => {
      console.log(err);
      });
    }

    EndYourBazeatAdventure() {
      return axios.get("api/disable_product/");
    }

    render() {
	    return (
        <div className="col-lg-9 col-md-8 col-sm-10 col-xs-12 edit_profile_rht_sidebar">
          <div className="edit_prfile_detail_form">
              <h3>End your Bazeat adventure</h3>
              <form className="" action="javascript:void(0)">
                <div className="canel_accoutn_col">
                    <p className="leavn_txt">Do you want to cancel your account? We will miss you! </p>
                    <button type="submit" className="btn pull-right redish_btn">Cancel Account</button>
                </div>
                <div className="end_form ptop15">
                    <p className="form_ques form_quesmbot">Why do you want to leave us?</p>
                    <div className="custom_radio_edit">
                        <input id="platform" type="radio" name="platform" value="platform"/>
                        <label for="platform">We don't find the platform useful</label>
                    </div>
                    <div className="custom_radio_edit">
                        <input id="platform1" type="radio" name="platform" value="platform1"/>
                        <label for="platform1">We don't know how to use the the platform</label>
                    </div>
                    <div className="custom_radio_edit">
                        <input id="platform2" type="radio" name="platform" value="platform2"/>
                        <label for="platform2">I'ts not what we expected</label>
                    </div>
                    <div className="custom_radio_edit">
                        <input id="platform3" type="radio" name="platform" value="platform3"/>
                        <label for="platform3">Other</label>
                    </div>
                    <div className="form-group ending_description">
                        <label for="input" className="col-form-label">Please share your thougts!</label>
                        <textarea></textarea>
                    </div>
                    <p className="phn_cntct">Phone contact is often easier. Can we contact you more details?</p>
                    <div className="custom_radio_edit max_140">
                        <input id="detail1" type="radio" name="c_detail" value="detail1"/>
                        <label for="detail1">Yes, please</label>
                    </div>
                        <div className="custom_radio_edit max_140">
                        <input  type="radio" name="c_detail"id="detail2"/>
                        <label for="detail2">No, thank you</label>
                    </div>
                </div>
                <div className="profile_gry_bot_bar">
                    <button type="submit" className="btn pull-right green_btn" onClick={this.EndYourBazeatAdventureBtnClck}>Remain on Bazeat</button>
                    <button type="submit" className="btn pull-right mrht20" onClick={this.EndYourBazeatAdventureBtnClck}>Cancle account</button>
                </div>
              </form>
          </div>
        </div>
	    );
    }
}





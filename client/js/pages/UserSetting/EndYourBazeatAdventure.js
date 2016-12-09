import React from 'react';

export default class EndYourBazeatAdventure extends React.Component {

    render() {
	    return (
        <div className="edit_prfile_detail_form">
            <h3>End your Bazeat adventure</h3>
            <form className="">
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
                      <input id="detail2" type="radio" name="c_detail" value="detail2"/>
                      <label for="detail2">No, thank you</label>
                  </div>
              </div>

              <div className="profile_gry_bot_bar">
                  <button type="submit" className="btn pull-right green_btn">Remain on Bazeat</button>
                  <button type="submit" className="btn pull-right mrht20">Cancle account</button>
              </div>

            </form>
        </div>
	    );
    }
}





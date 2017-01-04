import React from 'react';
import ProductStep from './ProductStep';

export default class ProductPickupDate extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor() {
      super();
      this.state = {
      }
      this.pickupdate = this.pickupdate.bind(this);
      this.destination = this.destination.bind(this);
      this.deliverToPerson = this.deliverToPerson.bind(this);
  }
  pickupdate(){
    return(
      <div>
      <div className="full_width ptop0">
        <div className="chkout_pg chkoutstep3">
          <h3>Pickup date</h3>
          <h4>When can we expect to see you?</h4>
          <ProductStep step={this.props.step}/>
          <div className="pick_update">
            <div className="pickup_row1">
              <span className="pickup_day">Monday - December 11</span>
              <span className="chkout_pickup_time">10:00 - 17:00</span>
            </div>
            <div className="pickup_row1">
              <span className="pickup_day green_txt">Tuesday - December 12</span>
              <span className="chkout_pickup_time green_txt">10:00 - 17:00</span>
            </div>
            <div className="pickup_row1">
              <span className="pickup_day">Wednesday - December 13</span>
              <span className="chkout_pickup_time">10:00 - 17:00</span>
            </div>
            <div className="pickup_row1">
              <span className="pickup_day">Thursday - December 14</span>
              <span className="chkout_pickup_time">10:00 - 17:00</span>
            </div>
            <div className="pickup_row1">
              <span className="pickup_day">Friday - December 15</span>
              <span className="chkout_pickup_time">10:00 - 17:00</span>
            </div>
            <div className="pickup_row1">
              <span className="pickup_day">Saturday - December 16</span>
              <span className="chkout_pickup_time">10:00 - 17:00</span>
            </div>
            <div className="chkout_step1btns">
            <button type="button" className="btn btn-default more_days_btn">Show more days</button>
            <button type="button" className="btn btn-default continue_btn" onClick={this.props.nextStep}>Continue</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }

  destination(){
    return(
      <div className="full_width ptop0">
          <div className="chkout_pg chkoutstep3_2">
            <h3>Destination</h3>
            <h4>Where do you want your products delivered?</h4>
            <div className="product_step_col">
              <div className="steps_circle_col text-left">
                <div className="steps_des_col">
                  <span className="steps_circle_icon">1</span>
                  <span className="step_name_col">Shopping<br/>bag</span>
                </div>
              </div>
              <div className="steps_circle_col  text-center">
                <div className="steps_des_col">
                  <span className="steps_circle_icon">2</span>
                  <span className="step_name_col">Delivery <br/> Method</span>
                </div>
              </div>
              <div className="steps_circle_col  text-center">
                <div className="steps_des_col">
                  <span className="steps_circle_icon active">3</span>
                  <span className="step_name_col active">Delivery <br/> Details</span>
                </div>
              </div>
              <div className="steps_circle_col  text-center">
                <div className="steps_des_col">
                  <span className="steps_circle_icon">4</span>
                  <span className="step_name_col">Confirmation</span>
                </div>
              </div>
              <div className="steps_circle_col  text-right">
                <div className="steps_des_col">
                  <span className="steps_circle_icon">5</span>
                  <span className="step_name_col">Payment</span>
                </div>
              </div>
            </div>
            <h5>We will ship the the goods to ADDRESS.</h5>
            <div className="del_addr_heading"><h6>Please deliver at this address instead</h6></div>
              <div className="del_det_form">
                <div className="edit_prfile_detail_form">
                  <h3>Details</h3>
                  <form className="ptop30">
                    <div className="passwrd_form">
                      <div className="form-group row">
                        <label for="example-search-input" className="col-md-5 col-xs-12 col-form-label">E-mail*</label>
                        <div className="col-md-7 col-xs-12">
                          <input className="form-control" value="" type="search" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="example-search-input" className="col-md-5 col-xs-12 col-form-label">First name*</label>
                        <div className="col-md-7 col-xs-12">
                          <input className="form-control" value="" type="search"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="example-url-input" className="col-md-5 col-xs-12 col-form-label">C/O</label>
                        <div className="col-md-7 col-xs-12">
                          <input className="form-control" value="" type="email"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="example-search-input" className="col-md-5 col-xs-12 col-form-label">Post code*</label>
                        <div className="col-md-7 col-xs-12">
                          <input className="form-control" value="" type="search"/>
                        </div>
                      </div>
                    </div>
                    <div className="passwrd_form">
                      <div className="form-group row">
                        <label for="example-search-input" className="col-md-5 col-xs-12 col-form-label">Phone number*</label>
                        <div className="col-md-7 col-xs-12">
                          <input className="form-control" value="" type="search"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="example-url-input" className="col-md-5 col-xs-12 col-form-label">Address*</label>
                        <div className="col-md-7 col-xs-12">
                        <input className="form-control" value="" type="email"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="example-search-input" className="col-md-5 col-xs-12 col-form-label">City*</label>
                        <div className="col-md-7 col-xs-12">
                          <input className="form-control" value="" type="search"/>
                        </div>
                      </div>
                    </div>
                    <p className="mandatory_txt">* Mandatory fields</p>
                    <div className="profile_gry_bot_bar chkout_step1btns">
                      <button type="submit" className="btn btn-default continue_btn">Continue</button>
                    </div>
                  </form>
                </div>
            </div>
          </div>
        </div>
      );
      }

  deliverToPerson(){
    return(
      <div className="full_width ptop0">
          <div className="chkout_pg">
            <h3>A couple of words from XXXX</h3>
            <h4>We would like you to know that...</h4>
            <div className="product_step_col">
              <div className="steps_circle_col text-left">
                <div className="steps_des_col">
                  <span className="steps_circle_icon">1</span>
                  <span className="step_name_col">Shopping<br/>bag</span>
                </div>
              </div>
            <div className="steps_circle_col  text-center">
              <div className="steps_des_col">
                <span className="steps_circle_icon">2</span>
                <span className="step_name_col">Delivery <br/> Method</span>
              </div>
            </div>
            <div className="steps_circle_col  text-center">
              <div className="steps_des_col">
                <span className="steps_circle_icon active">3</span>
                <span className="step_name_col active">Delivery <br/> Details</span>
              </div>
            </div>
            <div className="steps_circle_col  text-center">
              <div className="steps_des_col">
                <span className="steps_circle_icon">4</span>
                <span className="step_name_col">Confirmation</span>
              </div>
            </div>
            <div className="steps_circle_col  text-right">
              <div className="steps_des_col">
                <span className="steps_circle_icon">5</span>
                <span className="step_name_col">Payment</span>
              </div>
            </div>
          </div>
          <h5>We will ship the the goods to ADDRESS.</h5>
            <div className="del_addr_heading"><h6>Please deliver at this address instead</h6></div>
              <p>
              Når du skal betale varene du har lagt i handlekurven, kommer det opp et punkt som heter "Ønsker lever ing uke" under Leveringsmetode. Ved å velge en uke her, kan vi planlegge din levering. Vi gjør vårt beste
              for å levere den uken du har ønsket deg, men gjør oppmerksom på at det kan bli endringer pga. forhold
              hos oss, kjøttskjæreren og/eller transportselskapet. Når det nærmer seg uka du ønsket å få levert varene
              tar vi kontakt pr telefon, sms eller epost for å varsle om at varene er på vei, og undersøke om det passer
              for deg å ta imot varene. Vanligvis sender vi ut en felles sms dagen før levering, der vi ber om tilbakemeld
              ing i tilfelle du IKKE kan ta imot varene den aktuelle dagen.
              </p>
              <p>
              Hel/halv gris kjører vi vanligvis hjem til deg med kjøle/frysebil. Kasser leverer vi fortrinnsvis selv eller med
              inneid hjelp fra et lokalt transportselskap, her har vi også kjøle/frysetransport.
              </p>
              <button type="button" className="btn btn-default continue_btn">Continue</button>
            </div>
          </div>
    );
  }

  render() {
    return (
      <div>
        {this.pickupdate()}
      </div>
    );
  }
}


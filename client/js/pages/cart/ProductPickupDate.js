import React from 'react';
import CheckoutStep from './CheckoutStep';

export default class ProductPickupDate extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props) {
    super(props);
      this.state = {
        method:this.props.method,
        day_month_date_time: [{'day': "Sunday", 'month': "January", "time": '10:00 - 17.00'},{'day': "Monday", "month": "Feburary", "time": '10:00 - 17.00'},{'day': "Tuesday", "month": "March", "time": '10:00 - 17.00'},{'day': "Wednesday", "month": "April", "time": '10:00 - 17.00'},{'day': "Thursday", "month": "May", "time": '10:00 - 17.00'},{'day': "Friday", "month": "June", "time": '10:00 - 17.00'},{'day': "Saturday", "month": "July", "time": '10:00 - 17.00'},{'day': "Sunday", "month": "Augest", "time": '10:00 - 17.00'},{'day': "Monday", "month": "September", "time": '10:00 - 17.00'},{'day': "Tuesday", "month": "Octuber", "time": '10:00 - 17.00'},{'day': "Wednesday", "month": "November", "time": '10:00 - 17.00'},{'day': "Thursday", "month": "December", "time": '10:00 - 17.00'},{'day': "Friday", "month": "January", "time": '10:00 - 17.00'},{'day': "Saturday", "month": "Feburary", "time": '10:00 - 17.00'},{'day': "Sunday", "month": "March", "time": '10:00 - 17.00'},{'day': "Monday", "month": "April", "time": '10:00 - 17.00'},{'day': "Tuesday", "month": "May", "time": '10:00 - 17.00'},{'day': "Wednesday", "month": "June", "time": '10:00 - 17.00'},{'day': "Thursday", "month": "July","time": '10:00 - 17.00'},{'day': "Friday", "month": "Augest", "time": '10:00 - 17.00'},{'day': "Saturday", "month": "September", "time": '10:00 - 17.00'},{'day': "Sunday", "month": "Octuber", "time": '10:00 - 17.00'}],
        displayed_day: 5,
        day_month_date: [{'day': "", 'month': "", 'date': ''},{'day': "", 'month': "", 'date': ''},{'day': "", 'month': "", 'date': ''},{'day': "", 'month': "", 'date': ''},{'day': "", 'month': "", 'date': ''},{'day': "", 'month': "", 'date': ''},{'day': "", 'month': "", 'date': ''},{'day': "", 'month': "", 'date': ''},{'day': "", 'month': "", 'date': ''},{'day': "", 'month': "", 'date': ''},{'day': "", 'month': "", 'date': ''},{'day': "", 'month': "", 'date': ''},{'day': "", 'month': "", 'date': ''},{'day': "", 'month': "", 'date': ''},{'day': "", 'month': "", 'date': ''},{'day': "", 'month': "", 'date': ''},{'day': "", 'month': "", 'date': ''},{'day': "", 'month': "", 'date': ''},{'day': "", 'month': "", 'date': ''},{'day': "", 'month': "", 'date': ''}],
      }
      this.pickupdate = this.pickupdate.bind(this);
      this.destination = this.destination.bind(this);
      this.deliverToPerson = this.deliverToPerson.bind(this);
      this.deliveryDetails = this.deliveryDetails.bind(this);
      this.displayForm = this.displayForm.bind(this);
  }

  componentDidMount(){
    var date = new Date();
    var day = date.getDay();
    var month = date.getMonth();
    var dayOfMonth = date.getDate();
    for(i=0;i<this.state.displayed_day;i++){
      this.day_month_date[i].day=this.day_month_date_time[day+i].day;
      this.day_month_date[i].month=this.day_month_date_time[month].month;
      this.day_month_date[i].date=dayOfMonth;
    }
  }

  displayForm(){
    document.getElementById("checkout_form").style.display = "block";
  }

  pickupdate(){
    return(
      <div className="full_width ptop0">
        <div className="chkout_pg chkoutstep3">
          <h3>Pickup date</h3>
          <h4>When can we expect to see you?</h4>
          <CheckoutStep step={this.props.step}/>
          <div className="pick_update">
            {this.state.day_month_date.map((checkout, index) =>
              <div className="pickup_row1">
                <span className="pickup_day {({index}==2||4||6||8||10||12) ? green_txt : ''}">{checkout.day} - {checkout.month}</span>
                <span className="chkout_pickup_time {({index}==2||4||6||8||10||12) ? green_txt : ''}">{checkout.date}</span>
              </div>
            )}
            <div className="chkout_step1btns">
            <button type="button" className="btn btn-default more_days_btn">Show more days</button>
            <button type="button" className="btn btn-default continue_btn" onClick={this.props.nextStep}>Continue</button>
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
          <CheckoutStep step={this.props.step}/>
          <h5>We will ship the the goods to ADDRESS.</h5>
          <div className="del_addr_heading"><a href="javascript:void(0)" onClick={() =>{this.displayForm()}}><h6>Please deliver at this address instead</h6></a></div>
            <div  className="del_det_form">
              <div id="checkout_form" className="edit_prfile_detail_form">
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
                  {this.deliveryDetails()}
                </form>
                  <div className="profile_gry_bot_bar chkout_step1btns">
                    <button type="submit" className="btn btn-default continue_btn" onClick={this.props.nextStep}>Continue</button>
                  </div>
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
            <CheckoutStep step={this.props.step}/>
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
              <button type="button" className="btn btn-default continue_btn" onClick={this.props.nextStep}>Continue</button>
            </div>
          </div>
    );
  }

  selected(){
    if(this.state.method == 'hentemat'){
      return(
      this.pickupdate()
      )
    }
    if(this.state.method == 'car'){
      return(
      this.deliverToPerson()
      )
    }
    if(this.state.method == 'Sendemat'){
      return(
      this.destination()
      )
    }
  }

  deliveryDetails(){
    return(
      <div className="delivery_details">
        <div className="del_det_head">
          <span className="del_alter">Delivery alternative</span>
          <span className="del_info">Info</span>
          <span className="del_date">Delivery date</span>
          <span className="del_price">Price</span>
        </div>
        <div className="del_info_row grey_bg">
          <span className="custom_radio_edit del_alter hot_food">
            <input id="detail6" type="radio" name="c_detail" value="detail1"/>
            <label for="detail6">Hjem p&aring; kvelden, 17-21</label>
          </span>
          <span className="del_info">
            <p className="pbot0">
              Pakken leveres hjem til deg, sj&aring;f&oslash;ren<br/>ringer 30-60 min. f&oslash;r ankomst
            </p>
          </span>
          <span className="del_date text-center">
            <p className="pbot0">
              2016-12-12
            </p>
          </span>
          <span className="del_price text-center">
            <p className="pbot0">
              134,00
            </p>
          </span>
        </div>
        <div className="del_info_row">
          <span className="custom_radio_edit del_alter hot_food">
            <input id="detail7" type="radio" name="c_detail" value="detail1"/>
            <label for="detail7">P&aring; posten, 08-16</label>
          </span>
          <span className="del_info">
            <p className="pbot0">
              Majorstuen postkontor. &Aring;pningstider Man - Fre: 0800-1800, L&oslash;r: 1000-1500
            </p>
          </span>
          <span className="del_date text-center">
            <p className="pbot0">
              2016-12-12
            </p>
          </span>
          <span className="del_price text-center">
            <p className="pbot0">
              134,00
            </p>
          </span>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.selected()}
      </div>
    );
  }
}


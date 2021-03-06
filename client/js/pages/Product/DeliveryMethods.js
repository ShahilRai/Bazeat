import React from 'react';
import DocumentTitle from 'react-document-title';
import ProductHeading from './ProductHeading';
import ProductStep from './ProductStep';
import LabelField from '../components/LabelField';
import CheckBoxField from '../components/CheckBoxField';
import moment from 'moment';
export default class DeliveryMethods extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      prodDetails: {},
      pickup_time:'',
      disabled: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange=this.handleDateChange.bind(this)
    this.formatDate = this.formatDate.bind(this)
  }

	SaveAndContinue(){
		this.state = {
			data : {
        send : this.refs.send.refs.prdctn_col.checked,
        pickup : this.refs.pickup.refs.prdctn_col.checked,
	      shipment : this.refs.shipment.value,
	      additional_items : this.refs.additional_items.value,
	      pickup_time : this.refs.pickup_time.value,
	      disabled: false
		}
		}
		this.props.saveValues(this.state.data)
		this.handleClik()
 	}

  componentDidMount() {
      this.setState({
        prodDetails: this.props.prodDetails
      })
  }

  handleChange(e){
    this.setState({
      prodDetails : {
      [e.target.name] :  e.target.value
      }
    })
  }

  formatDate(date) {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  handleDateChange(e){
    if(this.formatDate(new Date()) <= e.target.value){
	    this.setState({
	      [e.target.name] : e.target.value,
	      prodDetails : {
	      [e.target.name] : e.target.value
	      }
	    });
	  }else{
      alert("Please enter a valid date")
	  }
  }

   handleClik() {
    this.setState( {disabled: !this.state.disabled})
  } 

	render() {
    var btnType = <button type="submit"  disabled = {(this.state.disabled)? "disabled" : ""} className="btn btn-default nxt_btn" onClick={this.SaveAndContinue.bind(this)} >Add product</button>
    if(this.props.prodDetails){
      var btnType = <button type="submit"  disabled = {(this.state.disabled)? "disabled" : ""} className="btn btn-default nxt_btn" onClick={this.SaveAndContinue.bind(this)} >Update product</button>
    }
		return (
		<div>
			<ProductHeading prodDetails={this.props.prodDetails ? this.props.prodDetails : ""} />
			<div className="modal-body pad_btm0">
				<div className="product_step_col">
						<div className="steps_circle_col text-left">
							<div className="steps_des_col">
								<span className="steps_circle_icon">1</span>
								<span className="step_name_col">Product <br/> details</span>
							</div>
						</div>
						<div className="steps_circle_col  text-center">
							<div className="steps_des_col">
								<span className="steps_circle_icon">2</span>
								<span className="step_name_col">Ingredients &amp; <br/> nutrition</span>
							</div>
						</div>
						<div className="steps_circle_col  text-right">
							<div className="steps_des_col">
								<span className="steps_circle_icon active">3</span>
								<span className="step_name_col">Delivery <br/> methods</span>
							</div>
						</div>
					</div>
				<form className="add_new_prodct_col" onSubmit ={this.props.submitProduct}>
					<div className="nutrition_fact_col del_method_row">
						<h5>Delivery methods</h5>
					  <div className="chkbox_col production_col del_method_col">
							<CheckBoxField id="checkbox3" name="send" ref="send" htmlFor="checkbox3" label="Send" prodDetails={this.state.prodDetails ? this.state.prodDetails.send : false}/>
							<CheckBoxField id="checkbox4" name="pickup" ref="pickup" htmlFor="checkbox4" label="Pick up" prodDetails={this.state.prodDetails ? this.state.prodDetails.pickup : false}/>
						</div>
					</div>
					<div  className="nutrition_fact_col del_method_row">
						<div className="form-col col-md-6 mob_padd_0">
							<div className="form-group">
								<LabelField htmlFor="" className="col-form-label shipment_label" label="Shipment"  />
								<input className="form-control" name="shipment" ref="shipment" value={this.state.prodDetails? this.state.prodDetails.shipment : ""} onChange={this.handleChange} placeholder="" type="text"/>
								<p  className="shipment_text">How much will you charge<br/> for your shipment?</p>
							</div>
						</div>
						<div className="form-col col-md-6 mob_padd_0">
							<div className="form-group">
								<label htmlFor=""  className="col-form-label shipment_label text_right">Additional<br/> items</label>
								<input className="form-control" name="additional_items" ref="additional_items" placeholder="" value={this.state.prodDetails? this.state.prodDetails.additional_items : ""} onChange={this.handleChange} type="text"/>
								<p className="shipment_text">How much will you charge<br/> for the packaging?</p>
							</div>
						</div>
					</div>
					<div  className="nutrition_fact_col del_method_row mbot0">
						<div className="form-col pickup_wdth">
							<div className="form-group col-md-12 mob_padd_0">
								<LabelField htmlFor="" className="col-form-label shipment_label" label="Pick up time"  />
								<div id="datetimepicker1" className="pickup_time">
								<input className="form-control" name="pickup_time" ref="pickup_time" placeholder="" value={this.state.pickup_time? moment(this.state.pickup_time, 'YYYY-MM-DD').format('YYYY-MM-DD'): moment(this.state.prodDetails.pickup_time , 'YYYY-MM-DD').format('YYYY-MM-DD')?moment(this.state.prodDetails.pickup_time , 'YYYY-MM-DD').format('YYYY-MM-DD'):moment('YYYY-MM-DD').format('YYYY-MM-DD')} onChange={this.handleDateChange} type="date"/>
								<span className="add-on"><i aria-hidden="true"></i></span>
                </div>
								<p className = "shipment_text">Tell your customers when the product can be picked up.<br/> Dont edit if product can be picked up during opening hours</p>
							</div>
						</div>
					</div>
					<div className="modal-footer delivery_modal_footer">
          {btnType}
					</div>
				</form>
			</div>
		</div>
	  );
	}
}

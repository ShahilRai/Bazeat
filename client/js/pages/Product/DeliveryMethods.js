import React from 'react';
import DocumentTitle from 'react-document-title';
import ProductHeading from './ProductHeading';
import ProductStep from './ProductStep';
import LabelField from '../components/LabelField';
import CheckBoxField from '../components/CheckBoxField';

export default class DeliveryMethods extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      prodDetails: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

	SaveAndContinue(){
		this.state = {
			data : {
        send : this.refs.send.refs.prdctn_col.checked,
        pickup : this.refs.pickup.refs.prdctn_col.checked,
	      shipment : this.refs.shipment.value,
	      additional_items : this.refs.additional_items.value,
	      pickup_time : this.refs.pickup_time.value
			}
		}
		this.props.saveValues(this.state.data)
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

	render() {
    var btnType = <button type="submit" className="btn btn-default nxt_btn" onClick={this.SaveAndContinue.bind(this)} >Add product</button>
    if(this.props.prodDetails){
      var btnType = <button type="submit" className="btn btn-default nxt_btn" onClick={this.SaveAndContinue.bind(this)} >Update product</button>
    }
		return (
		<div>
			<ProductHeading prodDetails={this.props.prodDetails ? this.props.prodDetails : ""} />
			<div className="modal-body delivery_modal_body">
				<div className="prod_steps">
						<div className="step_1 right_border">
							<span className="complt_steps">
								<span className="step_nos">1</span>
								<span className="step_descrip inactive">Product <br/> details</span>
							</span>
						</div>
						<div className="step_1 right_border">
							<span className="complt_steps">
								<span className="step_nos">2</span>
								<span className="step_descrip">Ingredients &amp; <br/> nutrition</span>
							</span>
						</div>
						<div className="step_1">
							<span className="complt_steps">
								<span className="step_nos orange_bg">3</span>
								<span className="step_descrip inactive">Delivery <br/> methods</span>
							</span>
						</div>
					</div>
				<form className="prod_form" onSubmit ={this.props.submitProduct}>
					<div className="nutrition_fact">
						<h5>Delivery methods</h5>
					  <div className="chkbox_col del_chkbox">
							<CheckBoxField id="checkbox3" name="send" ref="send" htmlFor="checkbox3" label="Send" prodDetails={this.state.prodDetails ? this.state.prodDetails.send : false}/>
						</div>
						<div className="chkbox_col del_chkbox">
							<CheckBoxField id="checkbox4" name="pickup" ref="pickup" htmlFor="checkbox4" label="Pick up" prodDetails={this.state.prodDetails ? this.state.prodDetails.pickup : false}/>
						</div>
					</div>
					<div className="nutrition_fact shipment_sec">
						<div className="form-col">
							<div className="form-group">
								<LabelField htmlFor="" className="col-form-label" label="Shipment" />
								<input className="form-control" name="shipment" ref="shipment" value={this.state.prodDetails? this.state.prodDetails.shipment : ""} onChange={this.handleChange} placeholder="" type="text"/>
								<p>How much will you charge<br/> for your shipment?</p>
							</div>
						</div>
						<div className="form-col">
							<div className="form-group">
								<label htmlFor="" className="col-form-label text_right">Additional<br/> items</label>
								<input className="form-control" name="additional_items" ref="additional_items" placeholder="" value={this.state.prodDetails? this.state.prodDetails.additional_items : ""} onChange={this.handleChange} type="text"/>
								<p>How much will you charge<br/> for the packaging?</p>
							</div>
						</div>
					</div>
					<div className="nutrition_fact shipment_sec">
						<div className="form-col pickup_wdth">
							<div className="form-group">
								<LabelField htmlFor="" className="col-form-label" label="Pick up time" />
								<input className="form-control" name="pickup_time" ref="pickup_time" placeholder="" value={this.state.prodDetails? this.state.prodDetails.pickup_time : ""} onChange={this.handleChange} type="text"/>
								<p>Tell your customers when the product can be picked up.<br/> Dont edit if product can be picked up during opening hours</p>
							</div>
						</div>
					</div>
					<div className="modal-footer">
          {btnType}
					</div>
				</form>
			</div>
		</div>
	  );
	}
}

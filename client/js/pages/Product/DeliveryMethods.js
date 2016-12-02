import React from 'react';
import DocumentTitle from 'react-document-title';
import ProductHeading from './ProductHeading';
import ProductStep from './ProductStep';
import LabelField from '../components/LabelField';

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
        send : this.refs.send.checked,
        pickup : this.refs.pickup.checked,
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
		return (
		<div>
			<ProductHeading />
			<div className="modal-body delivery_modal_body">
				<ProductStep />
				<form className="prod_form" onSubmit ={this.props.submitProduct}>
					<div className="nutrition_fact">
						<h5>Delivery methods</h5>
					  <div className="chkbox_col del_chkbox">
							<div className="checkbox custom_checkbox">
								<input id="checkbox3" type="checkbox" name="send" ref="send"/>
								<LabelField htmlFor="checkbox3" label="Send" />
							</div>
						</div>
						<div className="chkbox_col del_chkbox">
							<div className="checkbox custom_checkbox">
								<input id="checkbox4" type="checkbox" name="pickup" ref="pickup"/>
								<LabelField htmlFor="checkbox4" label="Pick up" />
							</div>
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
						<button type="submit" className="btn btn-default nxt_btn" onClick={this.SaveAndContinue.bind(this)} >Add product</button>
					</div>
				</form>
			</div>
		</div>
	  );
	}
}

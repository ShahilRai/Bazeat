import React from 'react';
import DocumentTitle from 'react-document-title';
import Dropzone from 'react-dropzone';
import UploadProductImage from '../AddProduct/UploadProductImage';
import ProductHeading from './ProductHeading';
import ProductStep from './ProductStep';
import LabelField from '../components/LabelField';
import RadioButton from '../components/RadioButton';

export default class AddProduct extends React.Component {

	static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      prodDetails : {},
      food_type : "",
      photo: null,
      price: "",
      portion : "",
      foodType: ""

	  };
    this.handleChange = this.handleChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.isValidate= this.isValidate.bind(this);
	}

  componentWillReceiveProps(nextProps) {
    this.setState({
      prodDetails: nextProps.prodDetails
    })
  }
  isValidate(){
    var valid = true;
    var numbers = /^[0-9]+$/;
    if(this.refs.product_name.value){
      $("#product_name").removeClass("error")
    }
    else{
      $("#product_name").addClass("error")
      valid = false
    }
    if(this.refs.description.value){
      $("#description").removeClass("error")
    }
    else{
      $("#description").addClass("error")
      valid = false
    }
    if(this.refs.price.value && this.refs.price.value.match(numbers)){
      $("#price").removeClass("error")
      this.setState({
      price:""
      })
    }
    else if(!this.refs.price.value){
      $("#price").addClass("error")
      valid = false
      this.setState({
      portion:""
      })
    }
    else{
      $("#price").addClass("error")
      valid = false
      this.setState({
      price:(<p> Please enter numbers </p>)
      })
    }
    if(this.refs.portion.value && this.refs.portion.value.match(numbers)){
      $("#portion").removeClass("error")
      this.setState({
      portion:""
      })
    }
    else if(!this.refs.portion.value){
      $("#portion").addClass("error")
      valid = false
      this.setState({
      portion:""
      })
    }
    else{
      $("#portion").addClass("error")
      valid = false
      this.setState({
      portion:(<p> Please enter numbers </p>)
      })
    }
    if ($(".checkBox:checked").length > 0) {
      this.setState({
      foodType:""
    })
    }
    else{
      valid = false
       this.setState({
      foodType:(<p> select atleast one food type</p>)
    })
    }
    return valid;
  }

  SaveAndContinue(){
    var self = this
    this.state = {
      data : {
        product_name: this.refs.product_name.value,
        description: this.refs.description.value,
        quantity: this.refs.quantity.value,
        price: this.refs.price.value,
        portion: this.refs.portion.value,
        product_category: this.refs.product_category.value,
        expiry_date: this.refs.expiry_date.value,
        food_type: this.state.food_type,
        photo: this.state.photo,
        email: this.context.user.email
      }
    }
    if(self.isValidate()){
      this.props.nextStep()
      this.props.saveValues(this.state.data)
    }
  }

	handleChange(e){
    this.setState({
      prodDetails : {
			[e.target.name] :  e.target.value
    }
    })
	}

  handleRadioChange(e){
    if(e.target.dataset.foodstate == "hotFood"){
      this.setState({
        food_type :  "Hot"
      });
    }else if(e.target.dataset.foodstate == "coldFood"){
      this.setState({
        food_type :  "Cold"
      })
    }
  }

  onPicUpdate(e){
    this.setState({
     photo: e
    })
  }

	render() {
		return (
			<div>
				<ProductHeading />
				<div className="modal-body">
					<ProductStep />
					<form className="prod_form" method="post">
	 					<div className="lt_prod_sec">
							<UploadProductImage ref="product_image" onPicUpdate={this.onPicUpdate.bind(this)}/>
							<div className="form-group m_top20 m_lt9">
								<RadioButton foodstate="hotFood" label="Hot food" prodDetails={this.state.prodDetails ? (this.state.prodDetails.food_type == "Hot" ? true : false) : false} onChange={this.handleRadioChange} />
                <RadioButton foodstate="coldFood" label="Cold food" prodDetails={this.state.prodDetails ? (this.state.prodDetails.food_type == "Cold" ? true : false) : false} onChange={this.handleRadioChange} />
                {this.state.foodType}
								<div className="form-group m_lt19">
									<label htmlFor="" className="col-form-label qty_label">Quantity available</label>
									<input type="text" className="form-control qty_input" id="quantity" name="quantity" ref="quantity" onChange={this.handleChange} placeholder="" value={this.state.prodDetails ? this.state.prodDetails.quantity : this.refs.quantity.value} />
								</div>
							</div>
	 					</div>
	 					<div className="rt_prod_sec">
							<div className="form-group">
								<input type="text" className="form-control prod_label" ref="product_name" id="product_name" name="product_name" value={this.state.prodDetails ? this.state.prodDetails.product_name : this.refs.product_name.value} onChange={this.handleChange} placeholder="Product name"/>
							</div>
							<div className="form-group nok_form">
								<LabelField htmlFor="" className="col-form-label nok_label" label="NOK" />
								<input type="text" ref="price" id="price" name="price" className="form-control" onChange={this.handleChange} placeholder="" value={this.state.prodDetails ? this.state.prodDetails.price : this.refs.price.value}/>
                 {this.state.price}
							</div>
							<div className="form-group portion_form custom_select">
                <input type="text" className="form-control" ref="portion" id="portion" name="portion" onChange={this.handleChange} value={this.state.prodDetails ? this.state.prodDetails.portion : this.refs.portion.value} />
                {this.state.portion}
              </div>
							<div className="form-group custom_select">
								<select className="form-control" name="product_category" ref="product_category" id="product_category" name="product_category" onChange={this.handleChange}>
									{
										this.props.prod_categ_val.map((product_category_list, index) => {
										return <option key={ index } id={product_category_list.id} value={product_category_list.id} >{product_category_list.name}</option>
									})}
								</select>
								<span className="select_bg"><small className="select__arrow"></small></span>
							</div>
							<div className="form-group prod_txtarea">
								<textarea ref="description" id="description" name="description" onChange={this.handleChange} placeholder="Product description" value={this.state.prodDetails ? this.state.prodDetails.description : this.refs.description.value}></textarea>
							</div>
						</div>
						<div className="form-group m_lt55 " id="">
							<label htmlFor="" className="col-form-label qty_label">Expiry date</label>
							<div id="datetimepicker1" className="date_section">
								<input type="text" id="example1" id="expiry_date" name="expiry_date" className="form-control date_input" ref="expiry_date" value={this.state.prodDetails ? this.state.prodDetails.expiry_date : this.refs.expiry_date.value} onChange={this.handleChange}/>
								<span className="add-on"><i className="fa fa-calendar" aria-hidden="true"></i></span>
							</div>
						</div>
					</form>
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-default nxt_btn" onClick={this.SaveAndContinue.bind(this)}>Next</button>
				</div>
			</div>
		);
	}
}

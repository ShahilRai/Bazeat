import React from 'react';
import DocumentTitle from 'react-document-title';
import Dropzone from 'react-dropzone';
import UploadProductImage from '../AddProduct/UploadProductImage';
import ProductHeading from './ProductHeading';
import ProductStep from './ProductStep';
import LabelField from '../components/LabelField';
import RadioButton from '../components/RadioButton';
import moment from 'moment';

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
      foodType: "",
      Product_name: "",
      description: "",
      isPhoto: ""

	  };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
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
    var reWhiteSpace = new RegExp(/^\s+$/)

    if(this.state.photo){
      this.setState({
          isphoto: ""
      })
    }
    else if (this.props.prodDetails){
      this.setState({
          isphoto: ""
      })
    }
    else{
      this.setState({
      isphoto: (<p>Please upload image</p>)
      })
      valid = false
    }
    if(this.refs.product_name.value && !reWhiteSpace.test(this.refs.product_name.value)){
     this.setState({
      product_name:""
      })
    }
    else if(!this.refs.product_name.value){
      this.setState({
      product_name:(<p>Please fill the field</p>)
      })
      valid = false
    }
    else if((reWhiteSpace.test(this.refs.product_name.value))){
      this.setState({
      product_name:(<p>Please Select the field without Spaces</p>)
      })
      valid = false
    }
    if(this.refs.description.value && !reWhiteSpace.test(this.refs.description.value)){
      this.setState({
      description:""
      })
    }
    else if (!this.refs.description.value){
      this.setState({
      description:(<p>Please fill the field</p>)
      })
      valid = false
    }
    else if((reWhiteSpace.test(this.refs.description.value))){
      this.setState({
      description:(<p>Please Select the field without Spaces</p>)
      })
      valid = false
    }
    if(this.refs.price.value && this.refs.price.value.match(numbers)){
      this.setState({
      price:""
      })
    }
    else if(!this.refs.price.value){
      valid = false
      this.setState({
      price:(<p>Please fill the field</p>)
      })
    }
    else{
      valid = false
      this.setState({
      price:""
      })
    }
    if(this.refs.portion.value && this.refs.portion.value.match(numbers)){
      this.setState({
      portion:""
      })
    }
    else if(!this.refs.portion.value){
      valid = false
      this.setState({
      portion:(<p>Please fill the field</p>)
      })
    }
    else{
      valid = false
      this.setState({
      portion:""
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
    if(self.isValidate()){
    this.state = {
      data : {
        product_name: this.refs.product_name.value,
        description: this.refs.description.value,
        quantity: this.refs.quantity.value,
        price: this.refs.price.value,
        portion: this.refs.portion.value,
        product_category: this.refs.product_category.value,
        expiry_date: this.refs.expiry_date.value,
        food_type: this.state.food_type ? this.state.food_type : (this.props.prodDetails ? this.props.prodDetails.food_type : ""),
        photo: this.state.photo ? this.state.photo : (this.props.prodDetails ? this.props.prodDetails.photo : ""),
        email: this.context.user.email
      }
    }
      this.props.nextStep()
      this.props.saveValues(this.state.data)
    }
  }

	handleChange(e){
    if(!(e.target.name == "expiry_date")){
      this.setState({
        prodDetails : {
			    [e.target.name]:  e.target.value
        }
      })
    }
  }

  handleDateChange(e){
    this.setState({
      prodDetails: {
        [e.target.name]:  e.target.value
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
    var categ = [];
    var chckd = false
    if(this.props.prodDetails){
      categ = this.props.prodDetails.product_category
    }
		return (
			<div>
				<ProductHeading prodDetails = {this.props.prodDetails ? this.props.prodDetails : ""} />
				<div className="modal-body">
					<ProductStep />
					<form className="add_new_prodct_col" method="post">
	 					<div className="lt_prod_sec">
							<UploadProductImage ref="product_image" onPicUpdate={this.onPicUpdate.bind(this)} prodDetails={this.props.prodDetails ? this.props.prodDetails.photo : ""} />
              {this.state.isphoto}
							<div className="hotfood_cold_col">
								<RadioButton foodstate="hotFood" label="Hot food" prodDetails={this.state.prodDetails ? (this.state.prodDetails.food_type == "Hot" ? true : false) : false} onChange={this.handleRadioChange} />
                <RadioButton foodstate="coldFood" label="Cold food" prodDetails={this.state.prodDetails ? (this.state.prodDetails.food_type == "Cold" ? true : false) : false} onChange={this.handleRadioChange} />
                {this.state.foodType}
								<div className="form-group m_lt19 mtop7">
									<label htmlFor="" className="col-form-label qty_label">Quantity available</label>
									<input type="number" className="form-control qty_input" id="quantity" name="quantity" ref="quantity" onChange={this.handleChange} value={this.state.prodDetails ? this.state.prodDetails.quantity : this.refs.quantity.value} placeholder="quantity"/>
								</div>
							</div>
	 					</div>
	 					<div className="rt_prod_sec">
							<div className="form-group">
								<input type="text" className="form-control prod_label" ref="product_name" id="product_name" name="product_name" value={this.state.prodDetails ? this.state.prodDetails.product_name : this.refs.product_name.value} onChange={this.handleChange} placeholder="Product name"/>
                {this.state.product_name}
							</div>
							<div className="form-group nok_form">
								<LabelField htmlFor="" className="col-form-label nok_label" label="NOK" />
								<input type="number" ref="price" id="price" name="price" className="form-control plft48" onChange={this.handleChange} value={this.state.prodDetails ? this.state.prodDetails.price : this.refs.price.value} placeholder="price"/>
                {this.state.price}
							</div>
							<div className="form-group nok_form mlft4">
                <input type="number" className="form-control" ref="portion" id="portion" name="portion" onChange={this.handleChange} value={this.state.prodDetails ? this.state.prodDetails.portion : this.refs.portion.value} placeholder="portion"/>
                {this.state.portion}
              </div>
							<div className="form-group custom_select">
								<select className="form-control" name="product_category" ref="product_category" id="product_category" onChange={this.handleChange}>
									{
										this.props.prod_categ_val.map((product_category_list, index) => {
                      chckd = (categ == product_category_list.id)
                      return <option key={ index } id={product_category_list.id} value={product_category_list.id} selected={this.props.prodDetails ? chckd : ""} >{product_category_list.name}</option>
									})}
								</select>
								<span className="select_bg"><small className="select__arrow"></small></span>
							</div>
							<div className="form-group prod_txtarea">
								<textarea ref="description" id="description" name="description" onChange={this.handleChange} placeholder="Product description" value={this.state.prodDetails ? this.state.prodDetails.description : this.refs.description.value}></textarea>
                {this.state.description}
							</div>
						</div>
						<div className="form-group expiry_date_col " id="">
							<label htmlFor="" className="col-form-label qty_label">Expiry date</label>
							<div id="datetimepicker1" className="date_section">
								<input type="date" id="expiry_date" name="expiry_date" className="form-control date_input" ref="expiry_date" value={this.state.prodDetails? moment(this.state.prodDetails.expiry_date,'YYYY-MM-DD').format('YYYY-MM-DD'):this.refs.expiry_date.value} onChange={this.handleDateChange}/>
								<span className="add-on"><i aria-hidden="true"></i></span>
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

import React from 'react';
import DocumentTitle from 'react-document-title';
import Dropzone from 'react-dropzone';

export default class AddProduct extends React.Component {

	static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  componentDidMount() {
    var userEmail = this.context.user.email
    this.loadUserData(userEmail).then((response) => {
        if(response.data.user) {
          this.setState({
            user: response.data.user
          });
        }
    }).catch((err) => {
        console.log(err);
    });
  }

  loadUserData(emailAddress) {
    return axios.get("/api/edit" , {
      params: {
        email: emailAddress
      }
    });
  }

	constructor(props, context) {
	    super(props, context);
	    this.state = {
	    	prod_cate_List: this.props.prod_categ_val,
				image:null
		  };
	    this.handleChange = this.handleChange.bind(this);
	}

	SaveAndContinue(){
		this.state = {
			 data : {
		        product_name: this.refs.product_name.value,
		        description: this.refs.description.value,
		        quantity: this.refs.quantity.value,
		        price: this.refs.price.value,
		        portion: this.refs.portion.value,
		      	product_category: this.refs.product_category.value,
		        expiry_date: this.refs.expiry_date.value,
		        food_type: this.refs.food_type.checked,
		        image: this.state.image,
		        email: this.state.user.email
	    	}
		}
	    this.props.saveValues(this.state.data)
		this.props.nextStep()
	}

	onDrop(files) {
	    var image = files[0];
	    this.setState({
	        image: image
	    });
	    console.log(image)
	}

	handleChange(e){
    this.setState({
			data:{
				[e.target.name] :  e.target.value
      }
    })
	}

	render() {
		return (
			<div>

							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">X</span>
								</button>
								<h3 className="modal-title" id="myModalLabel">Add new product</h3>
							</div>
							<div className="modal-body">
								<div className="prod_steps">
									<div className="step_1 right_border orange_bg">
										<span className="complt_steps">
											<span className="step_nos orange_bg">1</span>
											<span className="step_descrip">Product <br/> details</span>
										</span>
									</div>
									<div className="step_1 right_border">
										<span className="complt_steps">
											<span className="step_nos">2</span>
											<span className="step_descrip inactive">Nutrition &amp; <br/> allergens</span>
										</span>
									</div>
									<div className="step_1">
										<span className="complt_steps">
											<span className="step_nos">3</span>
											<span className="step_descrip inactive">Delivery <br/> methods</span>
										</span>
									</div>
								</div>
								<form className="prod_form" enctype="multipart/form-data" method="post">
				 					<div className="lt_prod_sec">
				 						<div className="box__input">
											<Dropzone type="file" name="image" ref="image" accept=".jpg,.jpeg,.png,.gif" onDrop={this.onDrop.bind(this)}>
							          <label className="input_upload">
							            <span className="file_text">Select one of the files from your computer <br/><span className="drop_txt">or drag and drop them here</span></span>
                        </label>
							        </Dropzone>
										</div>
										<div className="form-group m_top20 m_lt9">
											<div className="form-check">
												<label className="form-check-label control control--radio">
													<input className="form-check-input custom_radio" name="food_type" ref= 'food_type' type="radio" onChange={this.handleChange} />
													Hot food
													<div className="control__indicator"></div>
												</label>
											</div>
											<div className="form-check">
												<label className="form-check-label control control--radio">
													<input className="form-check-input custom_radio" name="food_type" ref= 'food_type' type="radio" onChange={this.handleChange} />
													Cold food
													<div className="control__indicator"></div>
												</label>
											</div>
											<div className="form-group m_lt19">
												<label htmlFor="" className="col-form-label qty_label">Quantity available</label>
												<input type="text" className="form-control qty_input" id="quantity" name="quantity" ref="quantity" defaultValue={this.props.fieldValues.quantity} onChange={this.handleChange} placeholder="" />
											</div>
										</div>
				 					</div>
				 					<div className="rt_prod_sec">
										<div className="form-group">
											<input type="text" className="form-control prod_label" ref="product_name" id="product_name" name="product_name" defaultValue={this.props.fieldValues.product_name} onChange={this.handleChange} placeholder="Product name" />
										</div>
										<div className="form-group nok_form">
											<label htmlFor="" className="col-form-label nok_label">NOK</label>
											<input type="text" ref="price" id="price" name="price" defaultValue={this.props.fieldValues.price} className="form-control" onChange={this.handleChange} placeholder="" />
										</div>
										<div className="form-group portion_form custom_select">
											<select className="form-control" ref="portion" id="portion" name="portion" defaultValue={this.props.fieldValues.portion} onChange={this.handleChange} >
												<option>portion</option>
												<option>Default select</option>
												<option>Default select</option>
											</select>
											<span className="select_bg"><small className="select__arrow"></small></span>
										</div>
										<div className="form-group custom_select">
											<select className="form-control" name="product_category" ref="product_category" id="product_category" name="product_category" defaultValue={this.props.fieldValues.product_category} onChange={this.handleChange}>
												{
													this.props.prod_categ_val.map((product_category_list, index) => {
													return <option key={ index } id={product_category_list._id} value={product_category_list._id}>{product_category_list.name}</option>
												})}
											</select>
											<span className="select_bg"><small className="select__arrow"></small></span>
										</div>
										<div className="form-group prod_txtarea">
											<textarea ref="description" id="description" name="description" defaultValue={this.props.fieldValues.description} onChange={this.handleChange} placeholder="Product description"></textarea>
										</div>
									</div>
									<div className="form-group m_lt55 " id="">
										<label htmlFor="" className="col-form-label qty_label">Expiry date</label>
										<div id="datetimepicker1" className="date_section">
											<input type="text" id="example1" id="expiry_date" name="expiry_date" className="form-control date_input" ref="expiry_date" defaultValue={this.props.fieldValues.expiry_date} onChange={this.handleChange}/>
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

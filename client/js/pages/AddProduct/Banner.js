import React from 'react';
import request from 'superagent';
export default class Banner extends React.Component {
  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };
  
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: this.props.name
    };
    this._handleImageChange = this._handleImageChange.bind(this);
  }

  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    const formData = new FormData();
    formData.append('file_upload', file);
    formData.append('email', this.context.user.email);
    request.post('/api/bg_profile_image')
    .send(formData)
    .end((err, res) => {
      if (err) {
        return alert('uploading failed!');
      }
      const uploadedImagePath = JSON.parse(res.text);
      this.setState({
        uploadedImages: uploadedImagePath.bgimage_url      
      });
      console.log(this.state.uploadedImages)
    });   
  }
  render(){
    let $imagePreview = null;
    var url;
    if(this.state.uploadedImages) {
      url = this.state.uploadedImages;
    }
    if (url) {
      $imagePreview = (<img src={url} />);
    }
    else if(this.props.name){
      $imagePreview = (<img src={this.props.name}/>);
    }
    else{
       $imagePreview = ( <img src={require("../../../images/review_banner.jpg")} />)
    }       
    return(
      <div className="banner_wrapper" >
        {$imagePreview}
        <label className="img_upload_label" >
        <input type="file" onChange={this._handleImageChange} />
        <i className="fa fa-camera" aria-hidden="true"></i>
        Add a photo</label>
        </div>
    )
  }
}

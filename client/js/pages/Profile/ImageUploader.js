import React from 'react';
import Loader from 'react-loaders'
import Loading from 'react-loading';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import UserLogo from '../AddProduct/UserLogo';
export default class ImageUploader extends React.Component {

  static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      uploadedImages: null,
      user: this.props.user,
      profileImage: this.props.image
    }
  }

  onDrop(files) {
    var file = files[0];
    this.setState({
      file: file,
      profileImage:this.state.uploadedImages
    });
    const formData = new FormData();
    formData.append('image', file);
    formData.append('email', this.context.user.email);
    request.post('/api/profile_image')
    .send(formData)
    .end((err, res) => {
      if (err) {
        return alert('uploading failed!');
      }
      const uploadedImagePath = JSON.parse(res.text);
      this.setState({
        uploadedImages: uploadedImagePath.image_url
      });
    });
  }

  render() {
    let $imagePreview = null;
    let loader_image = <Loading type='balls' color='#e3e3e3' />
    if(this.state.uploadedImages) {
      var url = this.state.uploadedImages;
    }
    if(url)
    {
      $imagePreview = (<UserLogo url={url} height="101" width="101" />);
    }
    else if(this.props.image){
      $imagePreview = (<UserLogo url={this.state.profileImage} height="101" width="101" />);
    }
    else {
      $imagePreview = (<UserLogo url={require('../../../images/producer_logo.png')} />);
    }
    return (
      <div className="edt_prf_inner_detail">
        <div className="form-group row">
          <label htmlFor="file-1" className="col-md-4 col-xs-12 col-form-label mtop40">Profile Picture</label>
          <div className="col-md-8 col-xs-12 mbot30">
            {$imagePreview}
            <div className="select_files">
              <Dropzone className="box__input" type="file" accept=".jpg,.jpeg,.png,.gif" onDrop={this.onDrop.bind(this)}>
                <label className="input_upload">
                <span className="file_text">Select one of the files from your computer <br/><span className="drop_txt">or drag and drop them here</span></span></label>
              </Dropzone>
            </div>
          </div>
        </div>
      </div>
    );
  }
}





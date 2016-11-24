import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
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
      image1: this.props.image
    }
  }

  onDrop(files) {
    var file = files[0];
    this.setState({
      file: file,
      image1:this.state.uploadedImages
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

    if(this.state.uploadedImages) {
      var url = this.state.uploadedImages;
    }

    if(url)
    {
      $imagePreview = (<img src={url} height="101" width="101" />);
    }
    else if(this.props.image){
      $imagePreview = (<img src={this.state.image1} height="101" width="101"/>);
    }
    else {
      $imagePreview = (<img src={require('../../../images/producer_logo.png')} />);
    }
    return (
      <div>
        <div>
          <label htmlFor="file-1" className="col-md-4 col-xs-12 col-form-label"><br/>{$imagePreview}</label>
          <div className="col-md-8 col-xs-12">
            <div>
              <Dropzone type="file" accept=".jpg,.jpeg,.png,.gif" onDrop={this.onDrop.bind(this)}>
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





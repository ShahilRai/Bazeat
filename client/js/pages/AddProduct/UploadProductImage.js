import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import Loading from 'react-loading';
let picselected='select';

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
      picselected : 'select'
    }
  }

  onDrop(files) {
    this.setState({
      picselected : 'notselect'
    })
    var file = files[0];
    const formData = new FormData();
    formData.append('image', file);
    request.post('/api/product_image')
    .send(formData)
    .end((err, res) => {
      if (err) {
        return alert('uploading failed!');
      }
      const uploadedImagePath = JSON.parse(res.text);
      picselected = 'select'
      this.setState({
        uploadedImages: uploadedImagePath.image_url,
         file: file,
         picselected : 'select'
      });
      this.props.onPicUpdate(this.state.uploadedImages)
    });
  }

  render() {
    var savedImage;
      if(this.props.prodDetails){
        savedImage = <img src={this.props.prodDetails} height="200" width="200" />;
          return (
            <div className="">
              {savedImage}
            </div>
          );
      }
    var imagePreview = null;
    if(this.state.picselected=='select'){
      if(this.state.uploadedImages) {
        imagePreview = <img src={this.state.uploadedImages} height="200" width="200" />;
      } else {
        imagePreview = (<Dropzone className="add_prod_box__input" type="file" name="image" accept=".jpg,.jpeg,.png,.gif,.tif,.bitmap" onDrop={this.onDrop.bind(this)}>
          <label className="input_upload">
            <span className="file_text">Select one of the files from your computer <br/><span className="drop_txt">or drag and drop them here</span></span>
          </label>
        </Dropzone>)
      }
    }
    else if(this.state.picselected == 'notselect'){
      imagePreview=<Loading type='spokes' color='#ff0000'/>
    }

    return (
      <div className="">
        {imagePreview}
      </div>
    );
  }
}





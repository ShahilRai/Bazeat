import React from 'react';
import request from 'superagent';
import _ from 'lodash';
export default class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null,
      uploadedImages: []
    }
  }
  render() {
    return <div>
      <h1>Upload Images</h1>
      <div>
        {this.state.uploadedImages.map(i => <img src={i} />)}
      </div>

      <form onSubmit={this._onSubmit.bind(this)} encType="multipart/form-data" >
        <input type="file" ref="file" name="image" accept=".jpg,.jpeg,.png,.gif"
          onChange={(e) => this._handleImageChange(e)} />
        <input type='submit' value='Upload!' />
      </form>
    </div>;
  }

  _handleImageChange(event) {
    const file = event.target.files[0];
    console.log(file);
    this.setState({
      selectedImage: file
    });
  }

  _onSubmit(event) {
     // var fd = new FormData();
     // fd.append('file', this.refs.file.getDOMNode().files[0]);


    const formData = new FormData();
    formData.append('image', this.state.selectedImage);
    // var data = {data: {'file': this.state.selectedImage},
    //         file: this.state.selectedImage,
    //         fileName: "image"};
    var image = this.state.selectedImage;
    console.log("image")
    // console.log(image)
    console.log("formData")
    // console.log(formData)
    request.post('/api/profiles')
      .send(formData)
      .end((err, res) => {

        if (err) {
          console.log("checking error---", err);
          return alert('uploading failed!');
      }
        const uploadedImagePath = res.text;
        this.setState({
          uploadedImages: _.concat(this.state.uploadedImages, uploadedImagePath)
        });
      })
      event.preventDefault();
  }
}

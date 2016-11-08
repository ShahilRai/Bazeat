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
      
      <form onSubmit={this._onSubmit.bind(this)}>
        <input type="file" name="image" accept=".jpg,.jpeg,.png,.gif" 
          onChange={(e) => this._handleImageChange(e)} />
        <input type='submit' value='Upload!' />
      </form>
    </div>;
  }

  _handleImageChange(event) {
    const file = event.target.files[0];
    this.setState({
      selectedImage: file
    });
  }

  _onSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', this.state.selectedImage);

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
  }
}
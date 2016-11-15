import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
export default class ImageUploader extends React.Component{
    static contextTypes = {
    authenticated: React.PropTypes.bool,
    user: React.PropTypes.object
  };
 constructor(props) {
    super(props);
    this.state = {
      file:null,
      uploadedImages:null,
      user: this.props.user
    }
  }
  render() {
    if(this.state.uploadedImages){
      var url = this.state.uploadedImages;

    }
    let $imagePreview=null;
    if(url)
    {
      $imagePreview = (<img src={url} height="101" width="101" />);
    }
    else{
      $imagePreview = (<img src={require('../../../images/producer_logo.png')} />);
    }
    console.log(url)
 return (
  
    
      <div className="form-group row">
          
         <label htmlFor="file-1" className="col-md-4 col-xs-12 col-form-label">Company logo<br/>{$imagePreview}</label>
            

            <div className="col-md-8 col-xs-12">
              <div className="box__input">

               <Dropzone type="file" accept=".jpg,.jpeg,.png,.gif" onDrop={this.onDrop.bind(this)}>
                
               
                    
                    <label className="input_upload">
                      <span className="file_text">Select one of the files from your computer <br/><span className="drop_txt">or drag and drop them here</span></span></label>
                  
                 </Dropzone>

                 </div>

              </div>
        </div>
      );
      }

      onDrop(files) {
    
    // event.preventDefault();
       
      console.log('Received files: ', files[0]);
      var file = files[0];
       this.setState({
        file: file
      });
    console.log(this.state.file)
    console.log("file")
    console.log(file)
    const formData = new FormData();
    formData.append('image', file);
    formData.append('email', this.context.user.email);
    
    console.log("formData")
    console.log(formData)
   
    request.post('/api/profile_image')
      .send(formData)
      .end((err, res) => {

        if (err) {
          console.log("checking error---", err);
          return alert('uploading failed!');
      }
        const uploadedImagePath = JSON.parse(res.text);
        //console.log(uploadedImagePath.image_url);
        this.setState({
          uploadedImages: uploadedImagePath.image_url
        });
      })
    }
}





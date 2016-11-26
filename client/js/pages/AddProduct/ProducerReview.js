import React from 'react';

export default class ProducerReview extends React.Component {
	constructor() {
    super();
    this.state = {
      images: [{'name':'user_img.png','user_name':"Kristian",'date':" 21. nov",'content':"Fantastisk surdeigsbørd. Har blitt det must når vi spiser. Ungene elsker det også..."},{'name':'user_img2.png','user_name':"Eva",'date': "21. nov",'content':"Fantastisk surdeigsbørd. Har blitt det must når vi spiser. Ungene elsker det også..."},{'name':'user_img3.png','user_name':"Tina",'date':" 21. nov",'content':"Fantastisk surdeigsbørd. Har blitt det must når vi spiser. Ungene elsker det også..."}],
    }
   }

  render() {
    return (
      <div className="user_review_section">
        <h3>User reviews (2 new)<span className="show_all"><a href="#">Show all</a></span></h3>
             {this.state.images.map((image, index)=>
            	<div className="user_reveiw_list">
	             	<span className="rvw_user_img"><img src={require("../../../images/" + image.name)}/></span>
	             	<span className="rvw_username">{image.user_name}<br/>{name.date}</span>
	             	<span className="rvw_description">{image.content}</span>
	             	<button type="submit" className="btn read_btn">Read</button>
            	</div>                                            
             )}
      </div>
    );
  }
}



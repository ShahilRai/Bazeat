import React from 'react';
import axios from 'axios';

	export default class UserList extends React.Component {
		static contextTypes = {
    		authenticated: React.PropTypes.bool,
    		user: React.PropTypes.object
  			};

  		constructor(props) {
    		super(props);
    		this.state = {
    		};
  		}

  		getUserList() {
			return this.props.users.map((user,index) => {
     		return <option key={index} id={user.id}>{user.full_name}</option>;
 		});
	}

	UserList(name) {
		return this.props.users.filter(function ( obj ) {
		    return obj.full_name === name;
		})[0];
	}
    
  	render(){
    	console.log("hii"+JSON.stringify(this.props.users))
    	return(
    		<datalist id="userList">{this.getUserList.bind(this)} </datalist>
    	)
	}
}
import React from 'react';
import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';
import { UserList } from './users';

export default class AdminPanel extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    console.log(UserList)
    return(
      <Admin restClient={jsonServerRestClient('http://localhost:3000/api/admin/users/allusers')} >
        <Resource name="allusers" list={UserList} />
      </Admin>
    );
  }
}

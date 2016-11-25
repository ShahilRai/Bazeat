import React from 'react';
import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';
import { UserList } from './Users';

export default class AdminPanel extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <Admin title="Admin Dashboard" restClient={jsonServerRestClient('http://localhost:3000/api/admin/users')} >
        <Resource name="allusers" list={UserList} />
      </Admin>
    );
  }
}

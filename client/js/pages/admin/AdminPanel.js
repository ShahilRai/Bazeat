import React from 'react';
import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';
import { UserList, UserCreate, UserEdit } from './Users';
import { ProductList, ProductEdit } from './ProductList';
import { convertRESTRequestToHTTP, convertHTTPResponseToREST, apiUrl } from './simple';
import { Delete } from 'admin-on-rest/lib/mui';
import UserIcon from 'material-ui/svg-icons/social/group';
export default class AdminPanel extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Admin title="Admin Dashboard" restClient={jsonServerRestClient("http://localhost:3000")} >
      <Resource name="allusers" list={UserList} edit={UserEdit} create={UserCreate} remove={Delete} icon={UserIcon} />
      <Resource name="allproducts" list={ProductList} edit={UserEdit} remove={Delete} icon={UserIcon} />
      </Admin>
    );
  }
}

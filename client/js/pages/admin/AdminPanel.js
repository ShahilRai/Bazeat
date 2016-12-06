import React from 'react';
import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';
import { UserList, UserCreate, UserEdit } from './Users';
import { ProductList, ProductEdit, ProductCreate } from './ProductList';
import { Delete } from 'admin-on-rest/lib/mui';
import UserIcon from 'material-ui/svg-icons/social/group';
import ProductIcon from 'material-ui/svg-icons/action/book';
export default class AdminPanel extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Admin title="Admin Dashboard" restClient={jsonServerRestClient("/admin")} >
      <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} remove={Delete} icon={UserIcon} />
      <Resource name="products" list={ProductList} edit={ProductEdit} create={ProductCreate} remove={Delete} icon={ProductIcon} />
      </Admin>
    );
  }
}

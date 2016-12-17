import React from 'react';
import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';
import Dashboard from './Dashboard';
import { UserList, UserCreate, UserEdit } from './Users';
import { ProductList, ProductEdit, ProductCreate } from './ProductList';
import { Delete } from 'admin-on-rest/lib/mui';
import UserIcon from 'material-ui/svg-icons/social/group';
import ProductIcon from 'material-ui/svg-icons/action/book';

export default class AdminPanel extends React.Component{

static contextTypes = {
    router: React.PropTypes.object.isRequired
}

constructor(props, context) {
  super(props, context);
  this.state = {
    logout: false,
  };
}

submit(e){
  e.preventDefault()
  var self = this
  $.ajax({
    type: 'GET',
    url: '/admin/logouts',
    data: self.state
    }).done(function(data) {
      self.setState({
        logout : true
      })
      self.context.router.push('/admin-login');
    }).fail(function() {
      console.log('failed to logout');
  });
}

  render(){
    return(
      <div>
      <button onClick={this.submit.bind(this)} style={{"marginLeft": "1200px" }}>Logout</button>
        <Admin title="Admin Dashboard" dashboard={Dashboard} restClient={jsonServerRestClient("/admin")} >
         <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} remove={Delete} icon={UserIcon} />
         <Resource name="products" list={ProductList} edit={ProductEdit} create={ProductCreate} remove={Delete} icon={ProductIcon} />
        </Admin>
      </div>
    );
  }
}

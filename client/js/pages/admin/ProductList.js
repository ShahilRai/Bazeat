import React from 'react';
import { List, Datagrid, EmailField, Edit, EditButton,DeleteButton, TextField } from 'admin-on-rest/lib/mui';

export const ProductList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField label="id" source="_id" />
      <TextField source="product_name" />
      <TextField source="quantity" />
      <TextField source="price" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
export const ProductEdit = (props) => (
  <Edit {...props} >
    <TextInput source="product_name" />
    <TextInput source="quantity" />
    <TextInput source="price" />
  </Edit>
);



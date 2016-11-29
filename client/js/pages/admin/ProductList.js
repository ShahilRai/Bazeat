import React from 'react';
import { List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton,DeleteButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, TextInput } from 'admin-on-rest/lib/mui';

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
    <TextInput label="product_Name" source="product_name" />
    <TextInput source="quantity" />
    <TextInput source="price" />
  </Edit>
);

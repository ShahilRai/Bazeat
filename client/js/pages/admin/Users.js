import React from 'react';
import { List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton,DeleteButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, TextInput } from 'admin-on-rest/lib/mui';


export const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField label="id" source="_id" />
      <TextField source="full_name" />
      <TextField source="address" />
      <TextField source="email" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
export const UserEdit = (props) => (
  <Edit {...props} >
    <TextInput source="full_name" />
    <TextInput source="address" />
    <TextInput source="email" />
  </Edit>
);

export const UserCreate = (props) => (
  <Create {...props}>
    <TextInput label="id" source="_id" />
    <TextInput source="full_name" />
    <TextInput source="address" />
    <TextInput source="email" />
  </Create>
);

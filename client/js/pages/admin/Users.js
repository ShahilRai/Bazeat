import React from 'react';
import { List, Edit, Create, Datagrid, ReferenceField,DateField, TextField, EmailField,  EditButton,DeleteButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, TextInput } from 'admin-on-rest/lib/mui';


export const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField label="id" source="id" />
      <TextField source="full_name" />
      <TextField source="address" />
      <EmailField source="email" />
      <TextField source="phone" />
      <DateField label="Joining Date"source="date_joined" style={{ fontStyle: 'italic' }} />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
export const UserEdit = (props) => (
  <Edit {...props} >
    <DisabledInput label="id" source="id" />
    <TextInput source="full_name" />
    <TextInput source="address" />
    <TextInput source="email" />
    <TextInput source="phone" />
  </Edit>
);

export const UserCreate = (props) => (
  <Create {...props}>
    <TextInput source="full_name" />
    <TextInput source="address" />
    <TextInput source="email" />
  </Create>
);

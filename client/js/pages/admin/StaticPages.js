import React from 'react';
import { List, Edit, Create, Datagrid, ReferenceField,DateField, TextField, EmailField, EditButton,DeleteButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, TextInput, RichTextInput } from 'admin-on-rest/lib/mui';

export const PageList = (props) => (
  <List {...props} >
    <Datagrid>
      <TextField label="PageName" source="type" style={{ "color":"red" }} />
      <TextField source="description" />
      <EditButton />
    </Datagrid>
  </List>
);
export const PageEdit = (props) => (
  <Edit {...props} >
    <DisabledInput label="type" source="type" />
    <RichTextInput source="description" />
  </Edit>
);

import React from 'react';
import { List, Datagrid, EmailField, TextField } from 'admin-on-rest/lib/mui';

export const UserList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField label="id" source="_id" />
            <TextField source="full_name" />
            <TextField source="address" />
            <TextField source="email" />
        </Datagrid>
    </List>
);

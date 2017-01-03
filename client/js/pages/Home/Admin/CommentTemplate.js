import React from 'react';
import { List, Filter, Edit, Create, Datagrid, DateField, ReferenceField, TextField, EditButton, DisabledInput, DateInput, LongTextInput, SelectInput, ReferenceInput, TextInput } from 'admin-on-rest/lib/mui';
export CommentIcon from 'material-ui/svg-icons/communication/chat-bubble';
const CommentFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Post" source="post_id" reference="posts" allowEmpty>
            <SelectInput optionText="title" />
        </ReferenceInput>
    </Filter>
);

export const CommentList = (props) => (
    <List title="All comments" {...props} filter={CommentFilter}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="Email" type="email" style={{ display: 'inline-block', maxWidth: '20em', overflow: 'hidden', textOverflow: 'ellipsis' }}/>
            <TextField source="Name" />
            <DateField source="BirthDate" style={{ fontStyle: 'italic' }} />
            <TextField source="UserType" />
            <EditButton />
        </Datagrid>
    </List>
);

export const CommentEdit = (props) => (
    <Edit {...props}>
        <DisabledInput source="id" />
        <ReferenceInput label="Post" source="post_id" reference="posts">
            <SelectInput optionText="title" />
        </ReferenceInput>
        <TextInput label="Author name" source="author.name" />
        <DateInput label="date" source="created_at" />
        <LongTextInput source="body" />
    </Edit>
);

export const CommentCreate = (props) => (
    <Create {...props}>
        <ReferenceInput label="Post" source="post_id" reference="posts" allowEmpty>
            <SelectInput optionText="title" />
        </ReferenceInput>
        <DateInput label="date" source="created_at" />
        <LongTextInput source="body" />
    </Create>
);

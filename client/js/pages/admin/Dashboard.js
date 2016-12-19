import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import axios from 'axios';

export default class Dashboard extends React.Component {
  render(){
    return(
      <div>
        <Card style={{ margin: '2em' }}>
          <CardHeader title="Welcome to the administration" />
           <CardText>
           </CardText>
        </Card>
      </div>
    );
  }
}


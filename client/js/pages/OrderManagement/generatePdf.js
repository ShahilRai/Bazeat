import React from 'react';
import PDF from 'react-pdf';
import { Link } from 'react-router';
import PurchaseOrders from './PurchaseOrders';

export default class generatePdf extends React.Component {



  render(){
    return(
      return <PDF file="PurchaseOrders.js" page="1" scale="1.0" onDocumentComplete={this._onDocumentComplete} onPageComplete={this._onPageComplete} />
    )
  }
}

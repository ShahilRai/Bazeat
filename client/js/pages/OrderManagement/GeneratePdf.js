import React from 'react';
import PurchaseOrderSlip from './PurchaseOrderSlip';

export default class GeneratePdf extends React.Component {

  componentDidMount(){
    var pdf = new jsPDF('p', 'pt', 'letter');
    var source = $('#HTMLtoPDF')[0];
    var specialElementHandlers = {
      '#bypassme': function(element, renderer) {
        return true
      }
    };

    var margins = {
      top: 50,
      left: 60,
      width: 1000
    };

    pdf.fromHTML (
      source
      , margins.left
      , margins.top
      , {
          'width': margins.width
          , 'elementHandlers': specialElementHandlers
        },
      function (dispose) {
        pdf.output('dataurlnewwindow');
      }
    )
  }

  render() {
    return (
      <div>
        <div id="HTMLtoPDF">
          <PurchaseOrderSlip orderId={this.props.params.orderId}/>
        </div>
      </div>
    );
  }
}


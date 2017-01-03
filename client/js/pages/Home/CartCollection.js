import React from 'react';
import CartProductList from './CartProductList';
export default class CartCollection extends React.Component{
  constructor() {
      super();
      this.state = {
        productsCollection : [
  {
    id: 1,
    name: 'Ohrensessel Josslyn',
    price: 499.99,
    currency: 'EUR',
    image: 'images/01.jpg',
    url: 'http://www.home24.de/m-rteens/mit-hocker-917965'
  },
  {
    id: 2,
    name: 'Sessel Sofie',
    price: 249.99,
    currency: 'EUR',
    image: 'images/02.jpg',
    url: 'http://www.home24.de/m-rteens/sessel-sofie-samtvelour-gruen-913483'
  },
  {
    id: 4,
    name: 'Schlafsessel Rovigo',
    price: 239.99,
    currency: 'EUR',
    image: 'images/04.jpg',
    url: 'http://www.home24.de/m-rteens/schlafsessel-rovigo-kunstleder-weiss-911671'
  }
  ]
      }
}

    render() {
        return (
          <div>
            <CartProductList cartData={this.state.productsCollection} />
          </div>
        );
    }
}

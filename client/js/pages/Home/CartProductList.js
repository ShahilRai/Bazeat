import React from 'react';
import CartProduct from './CartProduct';
export default class CartProductList extends React.Component{

    render() {
        var products = this.props.cartData.map(product=> {
            return (
              <li key={product.id}>
              <CartProduct data={product} />
              </li>
            )
        });

        return (
          <ul className="clearfix">
            {products}
          </ul>
        );
    }
}

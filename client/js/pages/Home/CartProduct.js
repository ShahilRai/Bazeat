import React from 'react';
import pubSub from 'pubsub-js';
import cookie from 'react-cookie';
export default class CartProduct extends React.Component{

    constructor() {
      super();
      this.state = {
        added : false
      }
    }
    componentWillMount() {
    this.state =  {
      id: cookie.load('id')
    };
    }

    /*onLogin(id) {
    this.setState({ id });
    cookie.save('id', id, { path: '/' });
    }*/

    addToCart(e, id) {
      this.setState({ id });
      cookie.save('id', this.props.data.id, { path: '/' });
      console.log("data iddd"+this.props.data)
      console.log("CartProduct")
      console.log(JSON.stringify(this.props.data))

      if(!this.state.id) {
        // add
        //PubSub.publish('cart.added', this.props.data);
        PubSub.publish('cart.addedId', this.state.data);
      }

      this.setState({
        //added: !this.state.added
          id : !this.state.id
      });

    }

    render() {
        // assign to props
        const data = this.props.data;
        console.log("...........data")
        console.log(data)
        return (
          <div className="thumbnail">
            <img src={data.image} alt="product image" />
            <div className="caption clearfix">
              <h3><a href={data.url}>{data.name}</a></h3>
              <div className="product__price">{data.price} {data.currency}</div>
              <div className="product__button-wrap">
                <button className= "btn btn-danger" onClick={this.addToCart.bind(this)}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        );
    }
}

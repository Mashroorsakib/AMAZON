import React from 'react';
import Product from '../Product/Product';

const Cart = (props) => {
    const cart=props.cart
    //const total=cart.reduce((total,pd)=>total+pd.price * Product.quantity,0)
    //console.log(cart)
    let total=0
    for(let i=0; i<cart.length;i++){
        const product=cart[i]
        total=total+product.price *( product.quantity || 1)
    }
    return (
        <div>
            <h4>Order Summary</h4>
            <p> Total Item : {cart.length}</p>
            <p>Total price : {total}</p>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;
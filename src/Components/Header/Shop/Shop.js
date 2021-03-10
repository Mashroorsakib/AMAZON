import React, { createRef, useEffect, useState } from 'react';
import fakeData from '../../../fakeData'
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
import './Shop.css';
const Shop = () => {
    const first10=fakeData.slice(0,10);
    const[products,setProducts]=useState(first10);
    const[cart,setCart]=useState([]);

    useEffect(()=>{
        const savedcart=getDatabaseCart();
       const prdctkey=Object.keys(savedcart)
       const previouscart=prdctkey.map(existingkey=>{
           const product=fakeData.find(pd=> pd.key===existingkey)
           product.quantity=savedcart[existingkey];
           return product;
       })
       setCart(previouscart)
       //console.log(previouscart)
    },[])

    const handleAddproduct=(product)=>{
       const tobeaddedkey=product.key;
       const sameproduct=cart.find(pd=> pd.key === tobeaddedkey)
       let count=1;
       let newcart;
       
       if(sameproduct){
           count=sameproduct.quantity+1;
           sameproduct.quantity=count;
           const others=cart.filter(pd=> pd.key !== tobeaddedkey)
           newcart=[...others,sameproduct]
           
       }
       else{
           product.quantity=1;
           newcart=[...cart,product]
       }
       setCart(newcart)
   
       addToDatabaseCart(product.key,count);
    }
 
    
    return (
        <div className="shop-container">
           <div className=" product-container"> 
                {
                    products.map(pd=>
                        
                        <Product key={pd.key} showaddtocart={true} name={pd} handleprdct={handleAddproduct}></Product>)
                }
            
           </div>
           <div className="cart-container">
            <Cart
            cart={cart}>
                 <Link to={"/review"}> <button className="btn-danger">review your order</button></Link>
            </Cart>
           </div>
        </div>
    );
};

export default Shop;
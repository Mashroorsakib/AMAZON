import React, { useEffect, useState,Link } from 'react';
import fakeData from '../../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../../utilities/databaseManager';
import Reviewitem from '../../Reviewitem/Reviewitem';
import Cart from '../Cart/Cart';
import image from "../../../images/giphy.gif"
import "./review.css"
import { useHistory } from 'react-router';

const Review = () => {
    const[cart,setCart]=useState([]);
    const [orderplaced,setorder]=useState(false)
   const history=useHistory()
     const handleproceedcheckout= ()=>{
             history.push('/shipment')
     }  

    useEffect(()=>{
      const savedcart= getDatabaseCart()
    //  console.log(savedcart)
      const prdctkey=Object.keys(savedcart)
      //console.log("Product key",prdctkey)
      const cartproducts=prdctkey.map(key=>{
          const product=fakeData.find(pd=> pd.key ===key);
          product.quantity=savedcart[key];
          return product;
      });
      //console.log(counts)
      setCart(cartproducts)
    },[])
    const removeitem=(productkey)=>{
        const newcart=cart.filter(pd=> pd.key !== productkey)
        setCart(newcart)
        removeFromDatabaseCart(productkey)
    }
    let thankyou;
    if(orderplaced){
        thankyou= <img src={image} alt="/"></img>
    }
    return (
     
        <div className="first">
           <div className="second">
            { 
                cart.map(pd=><Reviewitem removeitem={removeitem} key={pd.key} product={pd}></Reviewitem>)
            }
           </div>
           {
               thankyou
           }
              <div>
                 <Cart page="review" cart={cart}>
                  <button onClick={handleproceedcheckout} className="btn-danger">Proceed Checkout</button>
                 </Cart>
              </div>
        
          
        </div>
    );
};

export default Review;
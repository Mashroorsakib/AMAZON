import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css'

const Product = (props) => {
    const { img, name, seller, price, stock,key } = props.name
    console.log(props)
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-information">
                < h2 className="Product-name"><Link to={"/product/"+key}>{name}</Link></h2>
                <br />
                <p><small>BY: {seller}</small></p>
                <br />
                <p>Price:{price}</p>
                <br />
                <p><small>only {stock} left in stock</small></p>
              { props.showaddtocart &&
               <button className="btn bg-danger" onClick={()=>props.handleprdct(props.name)}>Add to Cart</button>}
            </div>
        </div>
    );
};

export default Product;
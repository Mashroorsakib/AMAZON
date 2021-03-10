import React from 'react';

const Reviewitem = (props) => {
    console.log(props);
    const {name,quantity,key,price}=props.product
    return (
        <div>
            <h1>{name}</h1>
            <p>Quantity {quantity}</p>
            <p><small>${price}</small></p>
            <br/>
            <button onClick={()=>{props.removeitem(key)}} className="btn btn-danger">Remove</button>
          
        </div>
    );
};

export default Reviewitem;
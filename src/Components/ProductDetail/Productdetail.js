import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Header/Product/Product';

const Productdetail = () => {
    const {productkey}=useParams()
    const product = fakeData.find(pd=> pd.key=== productkey)
    console.log(product)
    return (
        <div>
            <h1>detail comming soon {productkey}</h1>
            <Product showaddtocart={false} name={product}></Product>
        </div>
    );
};

export default Productdetail;
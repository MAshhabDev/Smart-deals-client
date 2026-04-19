import React, { use } from 'react';
import Product from '../Product/Product';

const LatestProducts = ({ latestProductsPromise }) => {

    const products = use(latestProductsPromise);
    console.log(products)
    return (
        <div>
            <h1 className='text-3xl text-center'> Recent Products</h1>

            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    products.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>

        </div>
    );
};

export default LatestProducts;
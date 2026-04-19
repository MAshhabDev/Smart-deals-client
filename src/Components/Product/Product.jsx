import React from 'react';
import { Link } from 'react-router';

const Product = ({ product }) => {

    const { _id, price_min, price_max, title, image, } = product;

    console.log(product);
    console.log(product._id);
    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure className='p-4 w-[300px] h-[200px]'>
                    <img className="w-full h-full object-cover"
                        src={image}
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p>Price: {price_min} - {price_max}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/productDetails/${_id}`} className="btn btn-primary w-full">View Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
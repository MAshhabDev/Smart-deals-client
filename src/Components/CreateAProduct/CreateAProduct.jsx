import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

const CreateAProduct = () => {

    const handleSubmit = (e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const image = e.target.image.value;
        const min_price = e.target.min_price.value;
        const max_price = e.target.max_price.value;

        const newProduct = { title, image, min_price, max_price }

        axios.post('http://localhost:5000/products', newProduct)
            .then(data => {
                console.log(data.data)
                if (data.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Product has been Created",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    return (
        <div className='lg:w-1/2  mx-auto'>
            <form onSubmit={handleSubmit}>

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Title</label>
                            <input type="text" name='title' className="input" placeholder="Title" />
                            <label className="label">Image URL</label>
                            <input type="text" name='image' className="input" placeholder="Image" />

                            <label className="label">Min Price</label>
                            <input type="text" name='min_price' className="input" placeholder="Min Price" />
                            <label className="label">Max Price</label>
                            <input type="text" name='max_price' className="input" placeholder="Max Price" />
                            <button className="btn btn-neutral mt-4">Add A Product</button>
                        </fieldset>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateAProduct;
import React, { use, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';

const ProductDetails = () => {

    const { user } = use(AuthContext)

    const [bids, setBids] = useState([]);

    const { _id: productId } = useLoaderData();
    const bidRef = useRef();

    // useEffect(() => {
    //     fetch(`http://localhost:5000/products/bids/${productId}`,{
    //         headers:{
    //             authorization:`Bearer ${user.accessToken}`
    //         }
    //     })
    //         .then(res => res.json()
    //             .then(data => {
    //                 console.log(data)
    //                 setBids(data);
    //             }))
    // }, [productId,user ])
    useEffect(() => {
        axios.get(`http://localhost:5000/products/bids/${productId}`)
            .then(data => {
                console.log(data);
                setBids(data.data)
            })
            .then(res => res.json()
                .then(data => {
                    console.log(data)
                    setBids(data);
                }))
    }, [productId, user])

    const handleBid = () => {
        bidRef.current.showModal();
    }

    const handleBidSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;

        console.log(name, email, bid)

        const newBid = {
            product: productId,
            buyer_name: name,
            buyer_email: email,
            bid_price: bid,
            status: 'pending'

        }

        fetch("http://localhost:5000/bids", {
            method: 'POST',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(newBid)

        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    bidRef.current.close();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Bid has been Placed",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    newBid.id = data.insertedId;
                    const newBids = [...bids, newBid]
                    newBids.sort((a, b) => b.bid_price - a.bid_price);
                    setBids(newBids)


                }
            })

    }
    return (
        <div>
            <div>

            </div>
            <div>
                <button onClick={handleBid} className="btn btn-primary">Bid Submit</button>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <dialog ref={bidRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Give the best offer!</h3>
                        <p className="py-4">Offer Something Seller Cannot Resist</p>
                        <form onSubmit={handleBidSubmit}>

                            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                                <div className="card-body">
                                    <fieldset className="fieldset">
                                        <label className="label">Name</label>
                                        <input type="text" name='name' className="input" placeholder="Name" defaultValue={user?.displayName} />
                                        <label className="label">Email</label>
                                        <input type="email" name='email' className="input" placeholder="Name" defaultValue={user?.email} />

                                        <label className="label">Bid Amount</label>
                                        <input type="text" name='bid' className="input" placeholder="Bid" />
                                        <button className="btn btn-neutral mt-4">Submit your Bid</button>
                                    </fieldset>
                                </div>
                            </div>
                        </form>

                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
            <div>
                <h3 className='text-3xl'>Bids For this Product: <span>{bids.length}</span></h3>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>


                            <th>Si No</th>
                            <th>Buyer Name</th>
                            <th>Buyer Email</th>
                            <th>Bids Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {/* row 1 */}
                    {
                        bids.map((bid, index) => <tr>
                            <td>
                                {index + 1}
                            </td>

                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{bid.buyer_name}</div>
                                        <div className="text-sm opacity-50">United States</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {bid.buyer_email}
                            </td>
                            <td>{bid.bid_price}</td>
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr>
                        )
                    }

                </table>
            </div>
        </div>
    );
};

export default ProductDetails;
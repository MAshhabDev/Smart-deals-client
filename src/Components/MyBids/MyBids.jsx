import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyBids = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext);
    const [bids, setBids] = useState([]);

    useEffect(() => {
        axiosSecure.get(`bids?email=${user.email}`)
            .then(data => {
                console.log(data.data)
                setBids(data.data)
            })
    }, [user, axiosSecure])

    // useEffect(() => {
    //     if (user?.email) {
    //         fetch(`http://localhost:5000/bids?email=${user.email}`, {
    //             headers: {
    //                 authorization: `Bearer ${localStorage.getItem('token')}`
    //             }
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log(data);
    //                 setBids(data);
    //             })
    //             .catch(error => console.log(error));
    //     }
    // }, [user]);

    const handelDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/bids/${_id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your bid has been deleted.",
                                icon: "success"
                            });

                            const remaining = bids.filter(bid => bid._id !== _id);
                            setBids(remaining);
                        }
                    });
            }
        });
    };

    return (
        <div>
            <h3>My Bids: {bids.length}</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Si No</th>
                            <th>Buyer Info</th>
                            <th>Buyer Email</th>
                            <th>Bids Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bids.map((bid, index) => (
                            <tr key={bid._id}>
                                <td>{index + 1}</td>
                                <td>{bid.buyer_name}</td>
                                <td>{bid.buyer_email}</td>
                                <td>{bid.bid_price}</td>
                                <td>{bid.status}</td>
                                <td>
                                    <button onClick={() => handelDelete(bid._id)} className="btn btn-sm btn-error">
                                        Remove Bid
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBids;
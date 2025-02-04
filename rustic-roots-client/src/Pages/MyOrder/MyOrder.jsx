import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import moment from 'moment'; 
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';

const MyOrder = () => {
    const { user } = useAuth();
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true); 
    const defaultFoodImage = '/images/default-image.jpg'; 

    
    const formatDate = (date) => {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a'); 
    };

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.email) return; 

            try {
                const response = await fetch(`https://rustic-roots-server.vercel.app/food-order?email=${user.email}`);
                if (!response.ok) throw new Error('Failed to fetch orders');
                const data = await response.json();

               
                const filteredOrders = data.filter(order => order.applicant_email === user.email);
                setFoods(filteredOrders);
            } catch (error) {
                toast.error('Failed to fetch orders');
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchOrders();
    }, [user?.email]);

    const handleDelete = (orderId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://rustic-roots-server.vercel.app/food-order/${orderId}`, {
                    method: 'DELETE',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.message === 'Order deleted successfully') {
                            setFoods(foods.filter((food) => food._id !== orderId));
                            Swal.fire('Deleted!', 'Your order has been deleted.', 'success');
                        } else {
                            Swal.fire('Error!', 'There was an issue deleting the order.', 'error');
                        }
                    })
                    .catch((error) => {
                        Swal.fire('Error!', 'There was an issue deleting the order.', 'error');
                        console.error('Error deleting order:', error);
                    });
            }
        });
    };

    
    const formatPrice = (price) => {
        const numericPrice = Number(price); 
        return !isNaN(numericPrice) ? numericPrice.toFixed(2) : '0.00';
    };
    

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">My Orders: {foods.length}</h2>
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : foods.length === 0 ? (
                <div className="text-center text-lg font-semibold text-gray-600">
                    You have no orders yet.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full table-striped">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-2 text-left">Food Name</th>
                                <th className="p-2 text-left">Price</th>
                                <th className="p-2 text-left">Quantity</th>
                                <th className="p-2 text-left">Total Price</th>
                                <th className="p-2 text-left">Order Date</th>
                                <th className="p-2 text-left">Food Owner</th>
                                <th className="p-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foods.map((food) => (
                                <tr key={food._id} className="border-b">
                                    <td className="p-2">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask h-12 w-12">
                                                    <img
                                                        src={food.foodImage || defaultFoodImage} // Fallback image
                                                        alt={food.foodName || 'Food image'}
                                                        className="h-12 w-12 object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{food.foodName}</div>
                                                <div className="text-sm opacity-50">{food.foodOwner}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-2">${formatPrice(food.price)}</td>
                                    <td className="p-2">{food.quantity}</td>
                                    <td className="p-2">${formatPrice(food.totalPrice)}</td>
                                    <td className="p-2">{formatDate(food.buyingDate)}</td>
                                    <td className="p-2">{food.applicant_email}</td>
                                    <td className="p-2">
                                        <button
                                            className="btn btn-ghost rounded-full"
                                            onClick={() => handleDelete(food._id)}
                                        >
                                            <FaTrashAlt size={26} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyOrder;

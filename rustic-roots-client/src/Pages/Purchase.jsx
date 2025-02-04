import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../Providers/ThemeProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../hooks/useAuth';
import moment from 'moment';

const Purchase = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [foodDetails, setFoodDetails] = useState({ foodName: '', price: 0, description: '', quantity: 0, foodImage: '', purchaseCount: 0, buyingDate: '' });
    const [quantity, setQuantity] = useState(1); 
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [error, setError] = useState(null);
    const { theme } = useContext(ThemeContext);

    
    useEffect(() => {
        const fetchFoodDetails = async () => {
            setFetchLoading(true);
            try {
                const response = await fetch(`https://rustic-roots-server.vercel.app/foods/${id}`);
                if (!response.ok) {
                    throw new Error('Food details not found');
                }
                const data = await response.json();
                console.log(data); 
                setFoodDetails(data);  
            } catch (error) {
                setError(error.message);
                toast.error('Failed to fetch food details!');
            } finally {
                setFetchLoading(false);
            }
        };
        fetchFoodDetails();
    }, [id]);

    
    const totalPrice = useMemo(() => {
        return foodDetails.price * quantity;
    }, [foodDetails.price, quantity]);

   
    const handleQuantityChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value, 10)); 
        setQuantity(value);
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const foodName = form.foodName.value;
        const price = parseFloat(form.price.value);
        const quantity = parseInt(form.quantity.value, 10);
    
        if (quantity > foodDetails.quantity) {
            toast.error('Not enough stock available');
            return;
        }
    
        const foodImage = foodDetails.foodImage;
        const buyingDate = moment().toISOString();
        const totalPrice = price * quantity;
    
        const foodOrder = {
            food_id: id,
            applicant_email: user?.email || 'anonymous',
            foodName,
            price,
            quantity,
            totalPrice,
            buyingDate,
            foodImage,
        };
    
        setLoading(true);
    
        try {
            const orderResponse = await fetch('https://rustic-roots-server.vercel.app/food-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(foodOrder),
            });
    
            if (!orderResponse.ok) {
                const errorText = await orderResponse.text();
                console.error('Order Submission Failed:', errorText); // Log detailed error
                throw new Error('Failed to place the order');
            }
    
            const orderData = await orderResponse.json();
            console.log('Order successfully placed:', orderData);
    
            // Redirect to MyOrder page after successful order placement
            navigate('/myOrders'); // Change '/my-orders' to your actual MyOrder route
    
        } catch (error) {
            console.error('Error during purchase submission:', error);
            toast.error('An error occurred while placing the order.');
        }
    };
    
    
    

    return (
        <div className={`min-h-screen flex justify-center items-center ${theme === 'light' ? 'bg-green-50' : 'bg-gray-800'}`}>
            <div className={`card w-full max-w-xl ${theme === 'light' ? 'bg-white' : 'bg-gray-900'} shadow-xl p-6`}>
                <h2 className={`text-3xl font-bold text-center mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Food Purchase</h2>
                {fetchLoading ? (
                    <div>Loading food details...</div>
                ) : error ? (
                    <div className="text-red-500">Error: {error}</div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                       
                        <div className="form-control">
                            <label className="label">
                                <span className={`label-text ${theme === 'light' ? 'text-black' : 'text-white'}`}>Food Name</span>
                            </label>
                            <input
                                type="text"
                                name="foodName"
                                defaultValue={foodDetails.foodName}
                                className={`input input-bordered input-primary w-full text-base-content ${theme === 'light' ? '' : 'bg-gray-700 text-white'}`}
                                readOnly
                            />
                        </div>

                       
                        <div className="form-control">
                            <label className="label">
                                <span className={`label-text ${theme === 'light' ? 'text-black' : 'text-white'}`}>Price</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={foodDetails.price}
                                className={`input input-bordered input-primary w-full text-base-content ${theme === 'light' ? '' : 'bg-gray-700 text-white'}`}
                                readOnly
                            />
                        </div>

                     
                        <div className="form-control">
                            <label className={`label ${theme === 'light' ? 'text-black' : 'text-white'}`} >
                                <span className="label-text">Quantity</span>
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                                className={`input input-bordered input-primary w-full text-base-content ${theme === 'light' ? '' : 'bg-gray-700 text-white'}`}
                                placeholder="Enter quantity"
                            />
                        </div>

                    
                        <div className="form-control">
                            <label className={`label ${theme === 'light' ? 'text-black' : 'text-white'}`} >
                                <span className="label-text">Total Price</span>
                            </label>
                            <input
                                type="text"
                                name="totalPrice"
                                value={`$${totalPrice.toFixed(2)}`}
                                className={`input input-bordered input-primary w-full text-base-content ${theme === 'light' ? '' : 'bg-gray-700 text-white'}`}
                                readOnly
                            />
                        </div>

                   
                        {foodDetails.foodImage && (
                            <div className="form-control">
                                <label className={`label ${theme === 'light' ? 'text-black' : 'text-white'}`} >
                                    <span className="label-text">Food Image</span>
                                </label>
                                <img src={foodDetails.foodImage} alt={foodDetails.foodName} className="w-full rounded-md" />
                            </div>
                        )}

                      
                        {foodDetails.buyingDate && (
                            <div className="form-control">
                                <label className={`label ${theme === 'light' ? 'text-black' : 'text-white'}`} >
                                    <span className="label-text">Buying Date</span>
                                </label>
                                <input
                                    type="text"
                                    value={moment(foodDetails.buyingDate).format('MMMM Do YYYY, h:mm:ss a')}
                                    className={`input input-bordered input-primary w-full text-base-content ${theme === 'light' ? '' : 'bg-gray-700 text-white'}`}
                                    readOnly
                                />
                            </div>
                        )}

                      
                        <div className="form-control my-8">
                            <button
                                type="submit"
                                className={`btn btn-success w-full ${theme === 'light' ? '' : 'bg-green-600'}`}
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Order'}
                            </button>
                        </div>
                    </form>
                )}
            </div>

            <ToastContainer />
        </div>
    );
};

export default Purchase;

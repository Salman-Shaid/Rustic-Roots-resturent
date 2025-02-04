import React, { useContext, useState } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';  
import { ThemeContext } from '../Providers/ThemeProvider';
import { toast } from 'react-toastify';  

const FoodDetails = () => {
    const { _id, foodName, foodImage, foodCategory, price, foodOrigin, description, quantity, purchaseCount } = useLoaderData();
    
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate(); 
    
    const [currentPurchaseCount, setCurrentPurchaseCount] = useState(purchaseCount || 0);
    

    const textColor = theme === 'dark' ? 'text-white' : 'text-black';
    const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-green-50';
    const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
    
  
    const handlePurchase = async () => {
        if (quantity === 0) {
            
            toast.error('Sorry, this food item is out of stock.');
            return;
        }

        try {
            
            setCurrentPurchaseCount(currentPurchaseCount + 1);
            toast.success('Welcome to Purchase Page');

            
            navigate(`/purchase/${_id}`);  
        } catch (error) {
            toast.error('Something went wrong!');
        }
    };

    return (
        <div className={`hero ${bgColor} min-h-screen`}>
            <div className={`hero-content flex-col lg:flex-row space-x-8 p-12 border rounded-xl ${borderColor}`}>
                <div className="w-full lg:w-1/2">
                    <img src={foodImage} alt={foodName} className="rounded-lg shadow-2xl w-full object-cover" />
                </div>

                <div className="w-full lg:w-1/2">
                    <h1 className={`text-4xl font-bold ${textColor} mb-4`}>Name : {foodName}</h1>

                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                        <span className='font-semibold'>Description :</span> {description}
                    </p>

                    <div className="space-y-3 mb-6">
                        <p className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            <strong>Category : </strong> {foodCategory}
                        </p>
                        <p className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            <strong>Price : </strong> $ {price}
                        </p>
                        <p className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            <strong>Origin : </strong> {foodOrigin}
                        </p>
                        <p className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            <strong>Quantity Available : </strong> {quantity}
                        </p>
                        <p className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            <strong>purchase Count : </strong> {purchaseCount}
                        </p>
                        
                    </div>

                    <button
                        onClick={handlePurchase}
                        className="btn btn-success text-white px-6 py-3 mt-4"
                        disabled={quantity === 0} // Disable button if quantity is 0
                    >
                        Purchase
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodDetails;

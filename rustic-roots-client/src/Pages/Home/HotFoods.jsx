import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HotFoodCard from './HotFoodCard';
import imageBackground2 from '../../assets/banner/Orange and Black Simple Food Banner.jpg';

const HotFoods = () => {
    const [foods, setFoods] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('https://rustic-roots-server.vercel.app/top-selling-foods')
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setFoods(data);
            })
            .catch((error) => {
                console.error('Error fetching top-selling foods:', error);
                setError('Failed to load top-selling foods. Please try again later.');
            });
    }, []);

    return (
        <div className="container mx-auto my-20 px-4 border rounded-xl">
            <div>
                <div className="relative mb-10 h-60 flex items-center justify-center text-white mt-5 "
                    style={{
                        backgroundImage: `url(${imageBackground2})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    <h1 className="hover:text-red-500 relative text-7xl font-bold ">Our Top Selling Foods</h1>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {error ? (
                    <p className="text-center text-lg text-red-500">{error}</p>
                ) : foods.length === 0 ? (
                    <p className="text-center text-lg text-gray-500">No top-selling foods available.</p>
                ) : (
                    foods.map((food) => (
                        <HotFoodCard key={food._id} food={food} />
                    ))
                )}
            </div>
            <div className="mt-6 mb-10 text-center">
                <Link to="/allFoods">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-8 rounded-full transition duration-300">
                        See All
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default HotFoods;

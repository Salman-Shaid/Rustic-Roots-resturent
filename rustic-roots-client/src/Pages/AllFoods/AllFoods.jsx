import React, { useEffect, useState } from 'react';
import HotFoodCard from '../Home/HotFoodCard';
import imageBackground2 from '../../assets/banner/Black and Orange Restaurant  & Fast Food Facebook Cover.jpg';

const AllFoods = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); 

    
    const fetchFoods = async (query = '') => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://rustic-roots-server.vercel.app/foods?name=${query}`);
            if (!response.ok) {
                throw new Error('Failed to fetch foods');
            }
            const data = await response.json();
            console.log(data); 
            setFoods(data);  
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

   
    useEffect(() => {
        document.title = 'All Foods - Rustic Roots';
        fetchFoods(searchQuery); 
    }, [searchQuery]); 

    return (
        <div>
           
            <div>
                <div
                    className="relative mb-10 h-60 flex items-center justify-center text-white"
                    style={{
                        backgroundImage: `url(${imageBackground2})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    <h1 className="hover:text-green-500 relative text-7xl font-bold bottom-10">
                        Explore a variety of dishes
                    </h1>
                    <div className="text-2xl absolute flex items-center mx-auto bottom-10">
                        <a
                            href="/"
                            className="hover:text-green-500 font-semibold text-white transition px-4 py-2 rounded"
                        >
                            Home
                        </a>
                        <span className="mx-2">||</span>
                        <a
                            href="/gallery"
                            className="font-semibold text-white hover:text-gray-200 transition px-4 py-2 rounded"
                        >
                            Food Gallery
                        </a>
                    </div>
                </div>
            </div>

           
            <div className="text-center mb-10 text-white">
                <input
                    type="text"
                    placeholder="Search for a dish..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="px-4 py-2 border border-gray-300 rounded-md"
                />
            </div>

            
            <div className="container mx-auto my-20">
                {loading ? (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
                        <p className="text-xl mt-4">Loading foods...</p>
                    </div>
                ) : error ? (
                    <div className="text-center">
                        <p className="text-xl text-red-500">{error}</p>
                    </div>
                ) : foods.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {foods.map((food) => (
                            <HotFoodCard key={food._id} food={food} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-xl">No foods available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default AllFoods;

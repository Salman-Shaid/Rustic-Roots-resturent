import React, { useState } from 'react';
import reviewAnimation from '../../assets/animation/Animation - 1735143955504.json';
import Lottie from 'react-lottie';
const CustomerReviews = () => {
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([
        {
            id: 1,
            name: 'John Doe',
            review: 'The grilled salmon was absolutely amazing! The flavor was perfect, and the portion size was just right.',
        },
        {
            id: 2,
            name: 'Sarah Lee',
            review: 'I had the Pasta Primavera, and it was delicious! The sauce was creamy, and the vegetables were perfectly cooked.',
        },
        {
            id: 3,
            name: 'Michael Smith',
            review: 'The Margherita Pizza was out of this world! It was fresh, cheesy, and the crust was perfectly crispy.',
        }
    ]);

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && review) {
            setReviews([
                ...reviews,
                {
                    id: reviews.length + 1,
                    name: name,
                    review: review,
                },
            ]);
            setName('');
            setReview('');
        } else {
            alert('Please fill in both fields');
        }
    };
    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: reviewAnimation, 
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className='container mx-auto'>
            <div>
            <h2 className="text-5xl font-bold mb-6 text-center">Our Customer Reviews</h2>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 items-center'>
                <div className="">
                    <Lottie options={lottieOptions} height={500} width={400} />
                </div>
                <div className="container mx-auto my-20 px-4">
                    
                    <div className="space-y-6">
                        
                        {reviews.map((reviewItem) => (
                            <div key={reviewItem.id} className="bg-white p-6 shadow-lg rounded-lg">
                                <p className="text-lg text-gray-600">"{reviewItem.review}"</p>
                                <div className="flex text-center items-center mt-4">
                                    <div>
                                    <img src="https://i.ibb.co.com/k6PpRzN/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg" alt={reviewItem.name} className="w-10 h-10 rounded-full mr-4" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-center">{reviewItem.name}</p>
                                        <p className="text-sm text-gray-500">Verified Customer</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    
                    <div className="mt-10 bg-white p-6 shadow-lg rounded-lg text-white">
                        <h3 className="text-xl font-semibold mb-4">Add Your Review</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-600">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="review" className="block text-sm font-medium text-gray-600">Your Review</label>
                                <textarea
                                    id="review"
                                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                                    rows="4"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    placeholder="Write your review"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full transition duration-300"
                            >
                                Submit Review
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerReviews;

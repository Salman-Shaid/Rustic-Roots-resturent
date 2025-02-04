import React from 'react';
import imageFaq from '../../assets/Faq/FAQ.json';
import Lottie from 'react-lottie';

const FAQ = () => {
    
    const options = {
        loop: true, 
        autoplay: true, 
        animationData: imageFaq, 
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice', 
        },
    };

    return (
        <div className="container mx-auto p-4">
            <div className='grid md:grid-cols-2 lg:grid-cols-3 items-center gap-4'>
                <div className='md:col-span-1 lg:col-span-2'>
                    <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>

                    <div className="collapse collapse-arrow border border-base-300 rounded-box mb-2">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title text-xl font-medium">
                            What is Rustic Roots?
                        </div>
                        <div className="collapse-content">
                            <p>
                                Rustic Roots is an online food ordering platform where you can discover new and delicious
                                food items, explore food galleries, and place orders with ease.
                            </p>
                        </div>
                    </div>

                    <div className="collapse collapse-arrow border border-base-300 rounded-box mb-2">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title text-xl font-medium">
                            How can I place an order?
                        </div>
                        <div className="collapse-content">
                            <p>
                                To place an order, simply browse the food items, select your favorite dish, and add it to your
                                cart. Once you're ready, proceed to checkout and complete the payment.
                            </p>
                        </div>
                    </div>

                    <div className="collapse collapse-arrow border border-base-300 rounded-box mb-2">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title text-xl font-medium">
                            Can I customize my order?
                        </div>
                        <div className="collapse-content">
                            <p>
                                Yes, you can customize your order in many ways! You can add special instructions for food preparation
                                or select specific toppings, ingredients, or sizes depending on the dish.
                            </p>
                        </div>
                    </div>
                </div>

                
                <div className="flex justify-center items-center mt-8">
                    <Lottie options={options} height={400} width={400} />
                </div>
            </div>
        </div>
    );
};

export default FAQ;

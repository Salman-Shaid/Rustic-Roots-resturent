import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedDishes = () => {
   
    const floatingAnimation = {
        animate: {
            y: [0, -10, 0], 
            transition: {
                duration: 2,  
                repeat: Infinity,
                ease: "easeInOut", 
            }
        }
    };

    return (
        <div className="container mx-auto my-20 px-4">
            <motion.h2 
                className="text-2xl font-bold mb-6 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Featured Dishes
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               
                <motion.div 
                    className="bg-white shadow-lg overflow-hidden"
                    {...floatingAnimation}
                >
                    <img src="https://i.ibb.co/MSSZH3v/combisteam-queen-bakedsalmonwithvegetables.jpg" alt="Dish 1" className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h3 className="text-xl font-semibold">Grilled Salmon</h3>
                        <p className="text-gray-500 mt-2">A perfectly grilled salmon fillet with a side of vegetables.</p>
                    </div>
                    <NavLink to='/allFoods'>
                        <button className='btn btn-success rounded-t-none btn-sm w-full text-white'>View More...</button>
                    </NavLink>
                </motion.div>
               
                <motion.div 
                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                    {...floatingAnimation}
                >
                    <img src="https://i.ibb.co/y8ZS6Cw/Pasta-Primavera-bowl.webp" alt="Dish 2" className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h3 className="text-xl font-semibold">Pasta Primavera</h3>
                        <p className="text-gray-500 mt-2">A colorful pasta dish with fresh vegetables and a creamy sauce.</p>
                    </div>
                    <NavLink to='/allFoods'>
                        <button className='btn btn-success rounded-t-none btn-sm w-full text-white'>View More...</button>
                    </NavLink>
                </motion.div>
                
                <motion.div 
                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                    {...floatingAnimation}
                >
                    <img src="https://i.ibb.co/999qMVx/mozzarella-pizza-margherita-FT-RECIPE0621-11fa41ceb1a5465d9036a23da87dd3d4.webp" alt="Dish 3" className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h3 className="text-xl font-semibold">Margherita Pizza</h3>
                        <p className="text-gray-500 mt-2">Classic pizza topped with fresh mozzarella, tomatoes, and basil.</p>
                    </div>
                    <NavLink to='/allFoods'>
                        <button className='btn btn-success rounded-t-none btn-sm w-full text-white'>View More...</button>
                    </NavLink>
                </motion.div>
            </div>
        </div>
    );
};

export default FeaturedDishes;

import React, { useContext } from 'react';
import Banner from '../../Components/Banner';
import { ThemeContext } from '../../Providers/ThemeProvider'; 
import HotFoods from './HotFoods';
import FeaturedDishes from './FeaturedDishes';
import CustomerReviews from './CustomerReviews';
import FAQ from './FAQ';

const Home = () => {
    const { theme, toggleTheme } = useContext(ThemeContext); 

    return (
        <div className={`min-h-screen ${theme === "dark" ? "bg-gray-800 text-white" : "bg-green-50 text-gray-900"}`}>
            <header>
                <Banner />
            </header>

            <main>
            <div className="divider"></div>
                <section>
                    <HotFoods></HotFoods>
                </section>

                <div className="divider"></div>

                <section>
                    <FeaturedDishes></FeaturedDishes>
                </section>
                <div className="divider"></div>

                <section className='grid '>
                    <div>
                        <CustomerReviews></CustomerReviews>
                    </div> 
                </section>
                <div className="divider"></div>
                <section>
                    <FAQ></FAQ>
                </section>
                        
                    
                    

                

                
            </main>
        </div>
    );
};

export default Home;

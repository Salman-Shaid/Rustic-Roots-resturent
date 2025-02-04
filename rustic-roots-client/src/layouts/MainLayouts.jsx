import { Outlet } from "react-router-dom";

import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { ThemeContext } from '../Providers/ThemeProvider';
import { useContext } from "react";

const MainLayouts = () => {
    const { theme } = useContext(ThemeContext);


    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-green-50 text-gray-900'}`}>
            <Navbar></Navbar>

            <main className="min-h-screen">
                <Outlet></Outlet>
            </main>

            <Footer></Footer>
        </div>
    );
};

export default MainLayouts;
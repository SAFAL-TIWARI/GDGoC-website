import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col font-body transition-colors duration-300 relative">
            {/* Background Layer (Solid Color) */}
            <div className="fixed inset-0 bg-white dark:bg-slate-950 -z-20 transition-colors duration-300"></div>

            <Navbar />
            <main className="flex-grow pt-20">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;

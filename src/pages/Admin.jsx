import React from 'react';
import { FaLock } from 'react-icons/fa';

const Admin = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transform transition-all hover:scale-[1.01]">

                <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-google-blue/10 dark:bg-google-blue/20 text-google-blue mb-4">
                        <FaLock className="text-2xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Login</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Access the dashboard to manage events and content.</p>
                </div>

                <div className="p-8">
                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Username</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-all" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
                            <input type="password" className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-all" />
                        </div>

                        <button type="submit" className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:opacity-90 transition-opacity">
                            Login
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="#" className="text-sm text-google-blue hover:underline">Forgot Password?</a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Admin;

import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { eventsData } from '../data/eventsData';

const EventDetails = () => {
    const { id } = useParams();
    const event = eventsData.find((e) => e.id === id);

    if (!event) {
        return <Navigate to="/events" replace />;
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 pt-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Back Button */}
                <Link
                    to="/events"
                    className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-google-blue dark:hover:text-google-blue mb-8 transition-colors"
                >
                    <FaArrowLeft /> Back to Events
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800"
                >
                    {/* Hero Image */}
                    <div className="relative h-64 md:h-96 w-full overflow-hidden group">
                        <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-google-blue/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                                {event.type}
                            </span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                                {event.title}
                            </h1>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-10">
                        <div className="flex flex-col md:flex-row gap-8 md:gap-12">

                            {/* Main Info */}
                            <div className="flex-grow space-y-6">
                                <div className="space-y-4">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        About this event
                                    </h2>
                                    <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                                        {event.description}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Info */}
                            <div className="w-full md:w-80 flex-shrink-0 space-y-6">
                                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-6">

                                    {/* Date */}
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 text-google-red">
                                            <FaCalendarAlt size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-1">Date & Time</h3>
                                            <p className="text-slate-900 dark:text-white font-medium">{event.date}</p>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 text-google-green">
                                            <FaMapMarkerAlt size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-1">Location</h3>
                                            <p className="text-slate-900 dark:text-white font-medium">{event.location}</p>
                                        </div>
                                    </div>

                                    <hr className="border-slate-200 dark:border-slate-700" />

                                    {/* Registration Button */}
                                    <a
                                        href={event.originalUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full py-3.5 px-6 text-center text-white bg-google-blue hover:bg-blue-600 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                                    >
                                        View Original Page <FaExternalLinkAlt size={14} />
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default EventDetails;

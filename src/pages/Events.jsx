import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaChevronDown, FaArrowRight } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { eventsData } from '../data/eventsData';

const EventCard = ({ id, title, date, location, description, imageUrl, type, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50, y: 50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`relative md:w-[calc(50%-2rem)] mb-12 md:mb-24 ${isEven ? 'md:ml-auto md:pl-8 pl-8' : 'md:mr-auto md:pr-8 pl-8'}`}
        >
            {/* Timeline Connector Dot & Date */}
            <div className={`absolute top-8 w-4 h-4 rounded-full bg-white border-4 border-google-blue z-10 shadow-[0_0_15px_rgba(66,133,244,0.5)] 
                -left-[41px]
                ${isEven ? 'md:-left-[calc(2rem+9px)]' : 'md:left-auto md:-right-[calc(2rem+9px)]'}`}>

                {/* Date Text (Desktop: Opposite Side, Mobile: Right of dot) */}
                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-max text-sm font-bold text-slate-500 dark:text-slate-400
                    ${isEven ? 'right-[calc(100%+1.5rem)]' : 'left-[calc(100%+1.5rem)]'}`}>
                    {date.split(',')[0]}
                </div>
            </div>

            {/* Mobile Date (Always visible on mobile, hidden on desktop) */}
            <div className="md:hidden absolute -top-8 left-0 text-sm font-bold text-google-blue mb-2">
                {date.split(',')[0]}
            </div>

            {/* Card Content */}
            <Link to={`/events/${id}`} className="block group">
                <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700/50 shadow-lg hover:shadow-2xl hover:shadow-google-blue/10 transition-all duration-300 transform group-hover:-translate-y-2">

                    {/* Image Area */}
                    <div className="relative h-56 overflow-hidden">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                        {/* Type Badge */}
                        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                            {type}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 md:p-8 relative">
                        {/* Decorative Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-google-blue/5 rounded-full blur-3xl -z-10 transition-all group-hover:bg-google-blue/10" />

                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                            <FaMapMarkerAlt className="text-google-red" />
                            <span className="truncate max-w-[200px]">{location}</span>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-google-blue transition-colors">
                            {title}
                        </h3>

                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 line-clamp-2 leading-relaxed">
                            {description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
                            {/* Removed Date from bottom since it's now on timeline */}
                            <span className="text-xs font-medium text-slate-400">
                                {date.split(',').slice(1).join(',')}
                            </span>

                            <span className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-google-blue group-hover:bg-google-blue group-hover:text-white transition-all duration-300">
                                <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

const Events = () => {
    const [filterYear, setFilterYear] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const { hash } = useLocation(); // Get the hash from the URL
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const years = ['All', '2026', '2025', '2024'];

    const filteredEvents = eventsData.filter(event => {
        const matchesYear = filterYear === 'All' || event.year === filterYear;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase());

        // Meeting Filter Logic
        let matchesType = true;
        if (hash === '#meetings') {
            const meetingTypes = ['Session', 'Info Session', 'Kick-off'];
            matchesType = meetingTypes.includes(event.type);
        }

        return matchesYear && matchesSearch && matchesType;
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-google-blue to-google-green transform origin-left z-50"
                style={{ scaleX }}
            />

            {/* Header / Hero */}
            <div className="relative pt-32 pb-20 bg-white dark:bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-5" />
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-google-blue/10 to-transparent blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-google-blue/10 text-google-blue text-sm font-bold uppercase tracking-wider mb-4">
                            GDG On Campus
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                            Past & Upcoming <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue to-google-green">Events</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            A timeline of our journey. Workshops, hackathons, and tech talks that define our community.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Filter Section */}
            <div className="sticky top-20 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-y border-slate-200 dark:border-slate-800 py-4 transition-all pb-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search */}
                    <div className="relative w-full max-w-md">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Find an event..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-100 dark:bg-slate-800/50 border-none rounded-full py-3 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-google-blue transition-all"
                        />
                    </div>

                    {/* Filter */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            <span>Year: {filterYear === 'All' ? 'All Time' : filterYear}</span>
                            <FaChevronDown className={`text-sm transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden py-2 animate-in fade-in zoom-in duration-200">
                                {years.map((y) => (
                                    <button
                                        key={y}
                                        onClick={() => {
                                            setFilterYear(y);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${filterYear === y ? 'text-google-blue font-bold' : 'text-slate-600 dark:text-slate-300'}`}
                                    >
                                        {y === 'All' ? 'All Time' : y}
                                    </button>
                                ))}
                            </div>
                        )}
                        {isDropdownOpen && <div className="fixed inset-0 z-[-1]" onClick={() => setIsDropdownOpen(false)} />}
                    </div>
                </div>
            </div>

            {/* Timeline Events */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
                {/* Central Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-google-blue via-google-purple to-google-red opacity-30" />

                <div className="relative pl-8 md:pl-0">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event, index) => (
                            <EventCard key={event.id} {...event} index={index} />
                        ))
                    ) : (
                        <div className="text-center py-32">
                            <h3 className="text-2xl font-bold text-slate-400">No events found in this timeline.</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Events;

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaChevronDown, FaTimes, FaChevronLeft, FaChevronRight, FaImage, FaImages } from 'react-icons/fa';

// Mock Data for Gallery - using similar structure but with multiple images per event
const galleryEvents = [
   
    {
        id: 1,
        title: 'Hackathon 2023',
        type: 'Hackathon',
        year: '2023',
        coverImage: null,
        images: [
            '/assets/placeholder6.jpg',
            '/assets/placeholder7.jpg',
            '/assets/placeholder8.jpg',
            '/assets/placeholder9.jpg'
        ]
    },
    {
        id: 2,
        title: 'Flutter Festival',
        type: 'Mobile Dev',
        year: '2025',
        coverImage: null,
        images: [
            '/assets/placeholder10.jpg'
        ]
    },
    {
        id: 3,
        title: 'Study Jam 2024',
        type: 'Cloud Computing',
        year: '2024',
        coverImage: null,
        images: [
            '/assets/placeholder11.jpg',
            '/assets/placeholder12.jpg'
        ]
    }
];

const GalleryCard = ({ event, onClick }) => (
    <motion.div
        layoutId={`card-${event.id}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -5, scale: 1.02 }}
        onClick={() => onClick(event)}
        className="group relative h-64 md:h-80 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300"
    >
        {/* Background Layer (Image or Gradient) */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 transition-transform duration-700 group-hover:scale-110">
            {/* If we had actual images, we'd put an <img> tag here with object-cover */}
            <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-700">
                <FaImages className="text-6xl opacity-20" />
            </div>
        </div>

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="inline-block px-3 py-1 mb-3 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-wider text-white/90">
                    {event.type}
                </div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-1">
                    {event.title}
                </h3>
                <p className="text-white/70 text-sm font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    View Gallery &rarr;
                </p>
            </div>

            {/* Top Right Year Icon */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-bold">{event.year}</span>
            </div>
        </div>
    </motion.div>
);

const GalleryModal = ({ event, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Provide default placeholders if no images exist
    const images = event.images && event.images.length > 0 ? event.images : Array(5).fill(null);

    const handleNext = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const handlePrev = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrev, onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
        >
            {/* Header / Controls */}
            <div className="absolute top-0 inset-x-0 p-4 md:p-8 flex justify-between items-start z-20">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{event.title}</h2>
                    <p className="text-white/60">{event.type} • {currentIndex + 1} / {images.length}</p>
                </div>
                <button
                    onClick={onClose}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                    <FaTimes size={24} />
                </button>
            </div>

            {/* Main Carousel */}
            <div className="flex-1 flex items-center justify-center relative w-full h-full overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        initial={{ x: direction > 0 ? 1000 : -1000, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: direction > 0 ? -1000 : 1000, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = offset.x;

                            if (swipe < -50) {
                                handleNext();
                            } else if (swipe > 50) {
                                handlePrev();
                            }
                        }}
                        className="absolute w-full h-full md:w-3/4 md:h-3/4 flex items-center justify-center p-4 cursor-grab active:cursor-grabbing"
                    >
                        <div className="relative w-full h-full bg-slate-800 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
                            {/* Image Placeholder logic since we don't have real URLs yet */}
                            <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex flex-col items-center justify-center text-slate-500">
                                <FaImage className="text-6xl mb-4 opacity-50" />
                                <span className="text-lg">Image {currentIndex + 1}</span>
                                <span className="text-sm opacity-50 mt-2">Placeholder for {event.title}</span>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons (Desktop) */}
                <button
                    className="absolute left-4 md:left-8 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hidden md:block"
                    onClick={handlePrev}
                >
                    <FaChevronLeft size={24} />
                </button>
                <button
                    className="absolute right-4 md:right-8 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hidden md:block"
                    onClick={handleNext}
                >
                    <FaChevronRight size={24} />
                </button>
            </div>

            {/* Thumbnails / Footer (Touch Controls Hint) */}
            <div className="p-8 text-center text-white/30 text-sm hidden md:block">
                Use arrow keys to navigate
            </div>
            <div className="p-4 flex justify-between md:hidden">
                <button className="px-6 py-3 rounded-xl bg-white/10 text-white font-medium" onClick={handlePrev}>Previous</button>
                <button className="px-6 py-3 rounded-xl bg-white/10 text-white font-medium" onClick={handleNext}>Next</button>
            </div>
        </motion.div>
    );
};

const Gallery = () => {
    const [filterYear, setFilterYear] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const years = ['All', '2025', '2024', '2023'];

    const filteredEvents = galleryEvents.filter(event => {
        const matchesYear = filterYear === 'All' || event.year === filterYear;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.type.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesYear && matchesSearch;
    });

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <div className="bg-slate-50 dark:bg-slate-900/50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Event <span className="text-google-red">Gallery</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Relive the moments. A visual journey through our workshops, hackathons, and celebrations.
                    </p>
                </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-12">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 items-center justify-between">

                    {/* Search Input */}
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by event name or type..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-google-blue sm:text-sm transition-all"
                        />
                    </div>

                    {/* Year Dropdown */}
                    <div className="w-full md:w-auto relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full md:w-48 pl-4 pr-4 py-2.5 text-base border border-slate-200 dark:border-slate-700 hover:border-google-blue dark:hover:border-google-blue rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-between transition-all shadow-sm"
                        >
                            <span className="font-medium">{filterYear === 'All' ? 'All Years' : filterYear}</span>
                            <FaChevronDown className={`text-slate-400 text-sm transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute z-50 top-full right-0 mt-2 w-full md:w-48 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden"
                                >
                                    {years.map((y) => (
                                        <button
                                            key={y}
                                            onClick={() => {
                                                setFilterYear(y);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${filterYear === y
                                                ? 'bg-google-blue/10 text-google-blue font-medium'
                                                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                                                }`}
                                        >
                                            {y === 'All' ? 'All Years' : y}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Backdrop to close on click outside */}
                        {isDropdownOpen && (
                            <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsDropdownOpen(false)} />
                        )}
                    </div>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.map((event) => (
                            <GalleryCard
                                key={event.id}
                                event={event}
                                onClick={setSelectedEvent}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-slate-500 dark:text-slate-400">
                        <p className="text-xl">No gallery albums found matching your criteria.</p>
                    </div>
                )}
            </div>

            {/* Lightbox / Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <GalleryModal
                        event={selectedEvent}
                        onClose={() => setSelectedEvent(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;

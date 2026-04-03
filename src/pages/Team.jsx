import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaCode, FaCamera, FaCalendarAlt, FaBullhorn, FaTimes, FaGraduationCap, FaLayerGroup, FaExternalLinkAlt } from 'react-icons/fa';

// --- Components ---

const ProfileModal = ({ member, onClose }) => {
    if (!member) return null;

    const themeColor = member.themeColor || '#4285F4'; // Default to Google Blue

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-xl w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col relative"
            >
                {/* Header Banner */}
                <div
                    className="h-28 md:h-28 w-full relative overflow-hidden"
                    style={{ backgroundColor: themeColor }}
                >
                    {/* Abstract decorative circles */}
                    <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 rounded-full bg-white/10 blur-xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 rounded-full bg-black/5 blur-lg"></div>

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-white/90 hover:text-white bg-black/20 hover:bg-black/30 rounded-full transition-all backdrop-blur-md"
                    >
                        <FaTimes size={18} />
                    </button>
                </div>

                {/* Profile Section */}
                <div className="px-8 pb-8 -mt-20">
                    <div className="flex justify-between items-end mb-6">
                        {/* Profile Image */}
                        <div className="relative">
                            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden shadow-lg">
                                {/* Profile Image or Initials */}
                                {member.image ? (
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-5xl md:text-6xl font-bold text-slate-400">
                                        {member.name.charAt(0)}
                                    </span>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-white dark:bg-slate-800 p-1.5 rounded-full shadow-sm border border-slate-100 dark:border-slate-700 text-google-blue">
                                <FaCode size={14} style={{ color: themeColor }} />
                            </div>
                        </div>

                        {/* Quick Actions (Socials) */}
                        <div className="flex gap-2 mb-0 pl-5">
                            <a href="#" className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-110 transition-transform hover:bg-[#0077b5] hover:text-white">
                                <FaLinkedin size={18} />
                            </a>
                            <a href="#" className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-110 transition-transform hover:bg-pink-600 hover:text-white">
                                <FaInstagram size={18} />
                            </a>
                            <a href="#" className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-110 transition-transform hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-black">
                                <FaGithub size={18} />
                            </a>
                        </div>
                    </div>

                    {/* content */}
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                {member.team || 'Core Team'}
                            </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1">
                            {member.name}
                        </h2>
                        <p className="text-base font-medium" style={{ color: themeColor }}>
                            {member.role}
                        </p>

                        <div className="my-6 h-px w-full bg-slate-100 dark:bg-slate-800"></div>

                        {/* Bio & Details */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <FaBullhorn size={10} /> Bio
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {member.bio}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <FaLayerGroup size={10} /> Expertise
                                    </h3>
                                    <div className="flex  gap-2">
                                        {member.tags.map((tag, i) => (
                                            <span key={i} className="text-xs px-2 py-1 bg-slate-50 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-center">
                            <button className="text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2">
                                View Full Profile <FaExternalLinkAlt size={10} />
                            </button>
                        </div>

                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ProfileCard = ({ member, onClick, color = '#4285F4' }) => {
    return (
        <motion.div
            layoutId={`card-${member.name}`}
            whileHover={{ y: -8 }}
            onClick={onClick}
            className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden cursor-pointer border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300"
        >
            {/* Top colored accent bar */}
            <div className="h-1 w-full" style={{ backgroundColor: color }} />

            <div className="p-6 md:p-8 flex flex-col items-center text-center">
                <div className="w-28 h-28 mb-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center overflow-hidden border-4 border-white dark:border-slate-900 shadow-md group-hover:scale-105 transition-transform duration-300">
                        {member.image ? (
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-4xl font-bold text-slate-400">
                                {member.name.charAt(0)}
                            </span>
                        )}
                    </div>
                    {/* Badge/Icon overlay */}
                    <div className="absolute bottom-0 right-0 bg-white dark:bg-slate-800 p-2 rounded-full shadow-sm border border-slate-100 dark:border-slate-700 text-google-blue">
                        <FaCode size={14} />
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-google-blue transition-colors">
                    {member.name}
                </h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wider text-[10px]">
                    {member.role}
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {member.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 rounded-md bg-slate-50 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700">
                            {tag}
                        </span>
                    ))}
                    {member.tags.length > 2 && (
                        <span className="px-2 py-1 rounded-md bg-slate-50 dark:bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-100 dark:border-slate-700">
                            +{member.tags.length - 2}
                        </span>
                    )}
                </div>

                <div className="w-full pt-4 border-t border-slate-50 dark:border-slate-800 flex justify-center">
                    <span className="text-xs font-semibold text-google-blue flex items-center gap-1">
                        View Profile <FaExternalLinkAlt size={10} />
                    </span>
                </div>
            </div>
        </motion.div>
    );
};


const ToggleButton = ({ icon: Icon, color, isActive, onClick, label }) => (
    <button
        onClick={onClick}
        className={`relative flex flex-col items-center justify-center transition-all duration-300 group`}
    >
        <div
            className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white shadow-md transition-all duration-300 
                ${isActive
                    ? 'scale-110 ring-4 ring-offset-2 ring-offset-white dark:ring-offset-slate-950 shadow-lg'
                    : 'hover:scale-105 opacity-80 hover:opacity-100 hover:shadow-lg'
                }`}
            style={{
                backgroundColor: color,
                boxShadow: isActive ? `0 10px 25px -5px ${color}60` : undefined
            }}
        >
            <Icon className="text-xl md:text-2xl" />
        </div>
        <span className={`absolute -bottom-8 text-xs font-bold transition-all duration-300 ${isActive ? 'opacity-100 translate-y-0 text-slate-900 dark:text-white' : 'opacity-0 -translate-y-2 text-slate-500'}`}>
            {label}
        </span>
    </button>
);

// --- Main Page Component ---

const Team = () => {
    const [activeTeam, setActiveTeam] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);

    // Verified Asset Paths:
    // Sanidhya: sanidhya.jpeg
    // Pankaj: pankaj.jpeg
    // Anuj: anuj.jpeg
    // Manraj: manraj.jpeg
    // Suprabhat: suprabhat.jpeg
    // Kalp: kalp.jpeg & kalp.jpg (using jpeg as preference)
    // Roshni: roshni.jpeg
    // Kazim: kazim.jpeg
    // Ritika: ritika.jpeg
    // Arpit: arpit.jpg
    // Danish: danish.jpeg
    // Deepti: deepti.jpeg
    // Rudransh: rudransh.jpeg
    // Akash: akash.jpeg
    // Taufiq: taufiq.jpeg
    // Deepak: Deepak.jpg
    // Hardik: Hardik.jpg
    // Aryaman: Aryaman.jpg
    // Nikhil: nikhil.jpeg
    // Kaustubh: kaustubh.jpeg
    // Safal: safal.jpeg

    // Notes:
    // Dakshesh -> Initial
    // Abhishek -> Initial
    // Vinayak -> Initial
    // Adarsh -> Initial
    // Saiyed -> Initial
    // Shreya -> Initial
    // Harshwardhan -> Initial
    // Devanshu -> Initial
    // Utkarsh -> Initial
    // Mairaz -> Initial
    // Shrishti -> Initial
    // Suryansh -> Initial
    // Dewanshi -> Initial
    // Ronak -> Initial
    // Nakul -> Initial
    // Anushka -> Initial
    // Megha -> Initial

    const leads = [
        {
            name: 'Sanidhya Sahu',
            role: 'Organiser',
            bio: 'Leading the GDG chapter with a vision to empower developers and foster innovation through community collaboration.',
            image: '../assets/core team/profile/sanidhya.jpeg',
            tags: ['Leadership', 'Management', 'Public Speaking'],
            team: 'Lead'
        },
        {
            name: 'Pankaj Yadav',
            role: 'Co-organiser',
            bio: 'Driving strategic initiatives and ensuring smooth execution of chapter operations to maximize impact.',
            image: '../assets/core team/profile/pankaj.jpeg',
            tags: ['Strategy', 'Operations', 'Community'],
            team: 'Lead'
        },
        {
            name: 'Anuj Jain',
            role: 'Technical Lead',
            bio: 'Overseeing technical projects and guiding the team to build robust, scalable solutions using cutting-edge technologies.',
            image: '../assets/core team/profile/anuj.jpeg',
            tags: ['Full Stack', 'Cloud', 'Architecture'],
            team: 'Lead'
        },
        {
            name: 'Manraj Gupta',
            role: 'Executive Lead',
            bio: 'Coordinating between teams to ensure alignment with chapter goals and efficient resource utilization.',
            image: '../assets/core team/profile/manraj.jpeg',
            tags: ['Leadership', 'Execution', 'Planning'],
            team: 'Lead'
        },
    ];

    const teams = {
        technical: {
            title: 'Technical Team',
            color: '#EA4335', // Google Red
            members: [
                {
                    name: 'Kalp Soni',
                    role: 'ML Head',
                    bio: 'Passionate about Machine Learning and AI, leading the team to explore new frontiers in intelligent systems.',
                    image: '../assets/core team/profile/kalp.jpeg',
                    tags: ['Python', 'TensorFlow', 'AI'],
                    team: 'Technical'
                },
                {
                    name: 'Nikhil Kushwaha',
                    role: 'IOT head',
                    bio: 'Bridging the physical and digital worlds through innovative IoT solutions and hardware hacking.',
                    image: '../assets/core team/profile/nikhil.jpeg',
                    tags: ['IoT', 'Arduino', 'Sensors'],
                    team: 'Technical'
                },
                {
                    name: 'Kaustubh Awasthi',
                    role: 'Cloud Head',
                    bio: 'Architecting cloud-native solutions and promoting scalable infrastructure practices within the community.',
                    image: '../assets/core team/profile/kaustubh.jpeg',
                    tags: ['AWS', 'GCP', 'DevOps'],
                    team: 'Technical'
                },
                {
                    name: 'Shreya Mangal',
                    role: 'Technical Lead',
                    bio: 'Focused on creating seamless web experiences and mentoring junior developers in best practices.',
                    image: null,
                    tags: ['Web Dev', 'Frontend', 'React'],
                    team: 'Technical'
                },
                {
                    name: 'Harshwardhan Soni',
                    role: 'Technical Lead',
                    bio: 'Enthusiastic about backend systems and database optimization for high-performance applications.',
                    image: null,
                    tags: ['Backend', 'Node.js', 'SQL'],
                    team: 'Technical'
                },
                {
                    name: 'Devanshu Vishwakarma',
                    role: 'Technical Lead',
                    bio: 'Developing cross-platform mobile applications and exploring new frameworks for efficient development.',
                    image: null,
                    tags: ['Mobile Dev', 'Flutter', 'UI/UX'],
                    team: 'Technical'
                },
                {
                    name: 'Utkarsh Vishwakarma',
                    role: 'Technical Lead',
                    bio: 'Specializing in algorithmic problem solving and competitive programming to tackle complex challenges.',
                    image: null,
                    tags: ['Algorithms', 'C++', 'Data Structures'],
                    team: 'Technical'
                },
                {
                    name: 'Deepak Kumar Gupta',
                    role: 'Technical Lead',
                    bio: 'Dedicated to software engineering principles and building reliable, maintainable codebases.',
                    image: '../assets/core team/profile/Deepak.jpg',
                    tags: ['Software Eng', 'Java', 'Systems'],
                    team: 'Technical'
                },
                {
                    name: 'Nakul Chourey',
                    role: 'Technical Team',
                    bio: 'Exploring various tech stacks and contributing to open source projects to learn and grow.',
                    image: null,
                    tags: ['Development', 'Open Source', 'Git'],
                    team: 'Technical'
                },
                {
                    name: 'Anushka Rai',
                    role: 'Technical Team',
                    bio: 'Passionate about coding and eager to apply technical skills to solve real-world problems.',
                    image: null,
                    tags: ['Coding', 'Problem Solving', 'Tech'],
                    team: 'Technical'
                },
            ]
        },
        media: {
            title: 'Media Team',
            color: '#4285F4', // Google Blue
            members: [
                {
                    name: 'Roshni Rajani',
                    role: 'Design Head',
                    bio: 'Crafting visual stories and ensuring a consistent, appealing brand identity for the chapter.',
                    image: '../assets/core team/profile/roshni.jpeg',
                    tags: ['UI/UX', 'Figma', 'Branding'],
                    team: 'Media'
                },
                {
                    name: 'Kazim Sheikh',
                    role: 'Social Media Head',
                    bio: 'Engaging our community through creative content strategies and active social media presence.',
                    image: '../assets/core team/profile/kazim.jpeg',
                    tags: ['Social Media', 'Marketing', 'Content'],
                    team: 'Media'
                },
                {
                    name: 'Ritika Jain',
                    role: 'Content & Engagement Head',
                    bio: 'Curating compelling content and fostering meaningful interactions to keep the community vibrant.',
                    image: '../assets/core team/profile/ritika.jpeg',
                    tags: ['Content Writing', 'Engagement', 'Storytelling'],
                    team: 'Media'
                },
                {
                    name: 'Safal Tiwari',
                    role: 'Media Lead',
                    bio: 'Capturing moments and creating high-quality visual assets to document our journey.',
                    image: '../assets/core team/profile/safal.jpeg',
                    tags: ['Photography', 'Editing', 'Media'],
                    team: 'Media'
                },
                {
                    name: 'Taufiq Lohar',
                    role: 'Media Lead',
                    bio: 'Specializing in video production and visual storytelling to highlight chapter achievements.',
                    image: '../assets/core team/profile/taufiq.jpeg',
                    tags: ['Videography', 'Premiere Pro', 'Creativity'],
                    team: 'Media'
                },
                {
                    name: 'Saiyed Rehan Ali',
                    role: 'Media Lead',
                    bio: 'Bringing creativity to life through graphic design and multimedia content creation.',
                    image: null,
                    tags: ['Graphic Design', 'Visual Arts', 'Media'],
                    team: 'Media'
                },
                {
                    name: 'Ronak Kushwah',
                    role: 'Social Media Team',
                    bio: 'Assisting in managing social channels and analyzing metrics to improve outreach.',
                    image: null,
                    tags: ['Analytics', 'Socials', 'Growth'],
                    team: 'Media'
                },
            ]
        },
        events: {
            title: 'Events Team',
            color: '#34A853', // Google Green
            members: [
                {
                    name: 'Vinayak Mawat',
                    role: 'Event Lead',
                    bio: 'Orchestrating events from conception to execution, ensuring memorable experiences for attendees.',
                    image: null,
                    tags: ['Event Management', 'Planning', 'Coordination'],
                    team: 'Events'
                },
                {
                    name: 'Aryaman Sahu',
                    role: 'Event Lead',
                    bio: 'Managing onsite logistics and ensuring everything runs smoothly during chapter activities.',
                    image: '../assets/core team/profile/Aryaman.jpg',
                    tags: ['Logistics', 'Operations', 'Teamwork'],
                    team: 'Events'
                },
                {
                    name: 'Abhishek yadav',
                    role: 'Event Head',
                    bio: 'Leading the events verticals to ensure quality and consistency in all our community gatherings.',
                    image: null,
                    tags: ['Leadership', 'Event Strategy', 'Public Relations'],
                    team: 'Events'
                },
                {
                    name: 'Mairaz Khan',
                    role: 'Event Lead',
                    bio: 'Passionate about creating engaging event environments and fostering networking opportunities.',
                    image: null,
                    tags: ['Networking', 'Hospitality', 'Events'],
                    team: 'Events'
                },

                {
                    name: 'Dewanshi Pardhi',
                    role: 'Event Team',
                    bio: 'Supporting event operations and helping to create a welcoming atmosphere for all members.',
                    image: null,
                    tags: ['Support', 'Organization', 'Volunteering'],
                    team: 'Events'
                },
            ]
        },
        management: {
            title: 'Management Team',
            color: '#FBBC04', // Google Yellow
            members: [
                {
                    name: 'Suprabhat Upadhyay',
                    role: 'Co-executive head',
                    bio: 'Assisting in executive decisions and streamlining operational workflows for better efficiency.',
                    image: '../assets/core team/profile/suprabhat.jpeg',
                    tags: ['Management', 'Operations', 'Leadership'],
                    team: 'Management'
                },
                {
                    name: 'Arpit bansal',
                    role: 'Logistics Head',
                    bio: 'Ensuring all resources and materials are available and properly managed for every event.',
                    image: '../assets/core team/profile/arpit.jpg',
                    tags: ['Logistics', 'Supply Chain', 'Resource Mgmt'],
                    team: 'Management'
                },
                {
                    name: 'Danish Khan',
                    role: 'Finance & Sponsorship Head',
                    bio: 'Managing chapter finances and building partnerships to sustain and grow our community initiatives.',
                    image: '../assets/core team/profile/danish.jpeg',
                    tags: ['Finance', 'Sponsorship', 'Partnerships'],
                    team: 'Management'
                },
                {
                    name: 'Dakshesh Jat',
                    role: 'Management Head',
                    bio: 'Overseeing general management tasks and ensuring team cohesion and productivity.',
                    image: null,
                    tags: ['Administration', 'Team Building', 'Management'],
                    team: 'Management'
                },
                {
                    name: 'Deepti Rai',
                    role: 'Public Relations Head',
                    bio: 'Managing external communications and building a positive public image for the chapter.',
                    image: '../assets/core team/profile/deepti.jpeg',
                    tags: ['PR', 'Communication', 'Media Relations'],
                    team: 'Management'
                },
                {
                    name: 'Rudransh Rai',
                    role: 'Community Outreach Head',
                    bio: 'Connecting with the broader community and expanding our reach to new members and groups.',
                    image: '../assets/core team/profile/rudransh.jpeg',
                    tags: ['Outreach', 'Community Building', 'Networking'],
                    team: 'Management'
                },
                {
                    name: 'Akash Tripathi',
                    role: 'Google Ambassador',
                    bio: 'Representing GDG on campus and promoting Google technologies to students and peers.',
                    image: '../assets/core team/profile/akash.jpeg',
                    tags: ['Ambassadorship', 'Promotion', 'Google Tech'],
                    team: 'Management'
                },
                {
                    name: 'Adarsh Soni',
                    role: 'Management Lead',
                    bio: 'Leading management initiatives to improve organizational structure and team workflow.',
                    image: null,
                    tags: ['Leadership', 'Organization', 'Planning'],
                    team: 'Management'
                },
                {
                    name: 'Hardik Kumar Sinha',
                    role: 'PR & Sponsor',
                    bio: 'Working on securing sponsorships and maintaining good relationships with our partners.',
                    image: '../assets/core team/profile/Hardik.jpg',
                    tags: ['Sponsorship', 'PR', 'Negotiation'],
                    team: 'Management'
                },
                {
                    name: 'Shrishti Tiwari',
                    role: 'Management Team',
                    bio: 'Contributing to administrative tasks and ensuring the smooth running of daily operations.',
                    image: null,
                    tags: ['Administration', 'Support', 'Management'],
                    team: 'Management'
                },
                {
                    name: 'Suryansh Gupta',
                    role: 'Management Team',
                    bio: 'Helping to coordinate team activities and maintain organized records for the chapter.',
                    image: null,
                    tags: ['Coordination', 'Records', 'Organization'],
                    team: 'Management'
                },
                {
                    name: 'Megha Singh',
                    role: 'PR & Sponsor',
                    bio: 'Assisting with public relations efforts and sponsorship drives to support chapter events.',
                    image: null,
                    tags: ['PR', 'Sponsorship', 'Communication'],
                    team: 'Management'
                },
            ]
        }
    };

    return (
        <div className="min-h-screen pb-10 bg-white dark:bg-slate-950 transition-colors duration-500">
            {/* Header */}
            <div className="relative bg-slate-50 dark:bg-slate-900/50 py-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <span className="inline-block py-1 px-3 rounded-full bg-google-blue/10 text-google-blue text-xs font-bold tracking-widest uppercase mb-4">
                        Community
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                        Meet The <span className="text-google-blue">GDG</span> Crew
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        The talented individuals working behind the scenes to bring you the best events, workshops, and community experiences.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-20">

                {/* Leads Section */}
                <div className='flex flex-col items-center'>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent to-slate-200 dark:to-slate-800"></div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center uppercase tracking-wide">Chapter Leads</h2>
                        <div className="h-px w-12 md:w-24 bg-gradient-to-l from-transparent to-slate-200 dark:to-slate-800"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                        {leads.map((member, i) => (
                            <ProfileCard
                                key={i}
                                member={member}
                                onClick={() => setSelectedMember({ ...member, themeColor: '#57caff' })}
                                color="#57caff"
                            />
                        ))}
                    </div>
                </div>

                {/* Team Toggles & Grid */}
                <div className="flex flex-col items-center space-y-12">
                    {/* Toggles */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                        <ToggleButton
                            icon={FaCode}
                            color="#EA4335"
                            isActive={activeTeam === 'technical'}
                            onClick={() => setActiveTeam(activeTeam === 'technical' ? null : 'technical')}
                            label="Technical"
                        />
                        <ToggleButton
                            icon={FaCamera}
                            color="#4285F4"
                            isActive={activeTeam === 'media'}
                            onClick={() => setActiveTeam(activeTeam === 'media' ? null : 'media')}
                            label="Media"
                        />
                        <ToggleButton
                            icon={FaCalendarAlt}
                            color="#34A853"
                            isActive={activeTeam === 'events'}
                            onClick={() => setActiveTeam(activeTeam === 'events' ? null : 'events')}
                            label="Events"
                        />
                        <ToggleButton
                            icon={FaBullhorn}
                            color="#FBBC04"
                            isActive={activeTeam === 'management'}
                            onClick={() => setActiveTeam(activeTeam === 'management' ? null : 'management')}
                            label="Management"
                        />
                    </div>

                    {/* Active Team Grid */}
                    <AnimatePresence mode="wait">
                        {activeTeam ? (
                            <motion.div
                                key={activeTeam}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="w-full"
                            >
                                <div className="text-center mb-10">
                                    <h2
                                        className="text-3xl md:text-4xl font-bold mb-2"
                                        style={{ color: teams[activeTeam].color }}
                                    >
                                        {teams[activeTeam].title}
                                    </h2>
                                    <p className="text-slate-500 dark:text-slate-400">Powering the community forward</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {teams[activeTeam].members.map((member, i) => (
                                        <ProfileCard
                                            key={i}
                                            member={{ ...member, team: teams[activeTeam].title }}
                                            onClick={() => setSelectedMember({
                                                ...member,
                                                team: teams[activeTeam].title,
                                                themeColor: teams[activeTeam].color
                                            })}
                                            color={teams[activeTeam].color}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center text-slate-400 py-10"
                            >
                                <p className="text-lg">Select a team above to view members</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Global Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <ProfileModal
                        member={selectedMember}
                        onClose={() => setSelectedMember(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Team;


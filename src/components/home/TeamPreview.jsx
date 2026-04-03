import React from 'react';
import { FaArrowRight, FaWhatsapp } from 'react-icons/fa';

const TeamCard = ({ title, description, image }) => (
    <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-800 transition-all duration-300 group flex flex-col h-full p-4">
        <div className="h-48 overflow-hidden relative rounded-2xl">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed flex-grow">
                {description}
            </p>
        </div>
    </div>
);

const CTACard = () => (
    <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-800 transition-all duration-300 group flex flex-col h-full p-4">
        <div className="h-48 overflow-hidden relative rounded-2xl">
            <img
                src="/assets/core team/group_image3.jpeg"
                alt="Community"
                className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Join Our whatsapp community and be the part of it!!</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed flex-grow">
                The Nexus of Next, Where Minds Merge to Redefine Tomorrow. be the part of it!!
            </p>
            <a
                href="https://chat.whatsapp.com/HY4x1jtPfbh6EDh1JPFWda"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-green-600 hover:text-green-700 transition-colors mt-auto"
            >
                Join Now <FaArrowRight className="ml-1 text-xs group-hover:translate-x-1 transition-transform" />
            </a>
        </div>
    </div>
);

const TeamPreview = () => {
    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Meet The <span className="text-google-blue">Team</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        The passionate individuals who make everything possible. From coding to event management, our diverse team works together to deliver the best experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <TeamCard
                        title="Technical Team"
                        description="Architects of digital innovation, crafting robust solutions and pioneering future technologies to build a smarter world."
                        image="/assets/core team/technical_team.jpeg"
                    />
                    <TeamCard
                        title="Social Media Team"
                        description="The digital storytellers, amplifying our voice and connecting with the community through engaging and creative content."
                        image="/assets/core team/social_team.jpeg"
                    />
                    <TeamCard
                        title="Events Team"
                        description="The masterminds behind the curtain, orchestrating seamless experiences that bring people together and spark inspiration."
                        image="/assets/core team/events_team.jpeg"
                    />
                    <TeamCard
                        title="Marketing & Finance"
                        description="The strategic engines, driving growth and ensuring sustainable success through smart resource management and outreach."
                        image="/assets/core team/management_team.jpeg"
                    />
                    <div className="lg:col-span-2">
                        <CTACard />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamPreview;

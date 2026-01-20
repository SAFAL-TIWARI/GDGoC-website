// Main Application JavaScript

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Load and display data
    loadMembers();
    loadEvents();
    loadProjects();
    loadMeetings();
    loadTasks();
    updateStats();

    // Search and filter functionality
    setupSearch();
    setupFilters();
});

// Load Members
function loadMembers(searchTerm = '') {
    const members = DataManager.getMembers();
    const membersGrid = document.getElementById('membersGrid');
    
    if (!membersGrid) return;
    
    const filteredMembers = searchTerm 
        ? members.filter(m => 
            m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.role.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : members;

    if (filteredMembers.length === 0) {
        membersGrid.innerHTML = '<p class="text-center">No members found. Add members from the admin panel.</p>';
        return;
    }

    membersGrid.innerHTML = filteredMembers.map(member => {
        const initials = member.name.split(' ').map(n => n[0]).join('').toUpperCase();
        const skills = member.skills ? member.skills.split(',').map(s => s.trim()) : [];
        
        return `
            <div class="member-card">
                <div class="member-avatar">${initials}</div>
                <h3>${member.name}</h3>
                <p class="member-role">${member.role}</p>
                ${member.email ? `<p class="member-info"><i class="fas fa-envelope"></i> ${member.email}</p>` : ''}
                ${member.phone ? `<p class="member-info"><i class="fas fa-phone"></i> ${member.phone}</p>` : ''}
                ${member.branch ? `<p class="member-info"><i class="fas fa-graduation-cap"></i> ${member.branch}</p>` : ''}
                ${member.year ? `<p class="member-info"><i class="fas fa-calendar"></i> ${member.year}</p>` : ''}
                ${skills.length > 0 ? `
                    <div class="member-skills">
                        ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Load Events
function loadEvents(filter = 'all') {
    const events = DataManager.getEvents();
    const eventsGrid = document.getElementById('eventsGrid');
    
    if (!eventsGrid) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let filteredEvents = events;
    if (filter === 'upcoming') {
        filteredEvents = events.filter(e => new Date(e.date) >= today);
    } else if (filter === 'past') {
        filteredEvents = events.filter(e => new Date(e.date) < today);
    }

    // Sort by date (newest first)
    filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filteredEvents.length === 0) {
        eventsGrid.innerHTML = '<p class="text-center">No events found. Add events from the admin panel.</p>';
        return;
    }

    eventsGrid.innerHTML = filteredEvents.map(event => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const isPast = eventDate < today;

        return `
            <div class="event-card ${isPast ? 'past-event' : ''}">
                <div class="event-header">
                    <p class="event-date">${formattedDate}</p>
                    <h3>${event.name}</h3>
                    <span class="event-category">${event.category || 'Event'}</span>
                </div>
                <div class="event-body">
                    ${event.time ? `<p class="event-time"><i class="fas fa-clock"></i> ${event.time}</p>` : ''}
                    ${event.location ? `<p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>` : ''}
                    <p class="event-description">${event.description}</p>
                    ${event.link ? `<a href="${event.link}" target="_blank" class="event-link">Register Now <i class="fas fa-external-link-alt"></i></a>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Load Projects
function loadProjects() {
    const projects = DataManager.getProjects();
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (!projectsGrid) return;

    if (projects.length === 0) {
        projectsGrid.innerHTML = '<p class="text-center">No projects found. Add projects from the admin panel.</p>';
        return;
    }

    projectsGrid.innerHTML = projects.map(project => {
        const tech = project.technologies ? project.technologies.split(',').map(t => t.trim()) : [];
        const team = project.team ? project.team.split(',').map(t => t.trim()) : [];
        const statusClass = project.status ? project.status.toLowerCase().replace(' ', '-') : 'planning';

        return `
            <div class="project-card">
                <div class="project-header">
                    <h3>${project.name}</h3>
                    <span class="project-status ${statusClass}">${project.status || 'Planning'}</span>
                </div>
                <p class="project-description">${project.description}</p>
                ${tech.length > 0 ? `
                    <div class="project-tech">
                        ${tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                ` : ''}
                ${team.length > 0 ? `
                    <p class="project-team"><strong>Team:</strong> ${team.join(', ')}</p>
                ` : ''}
                ${project.github ? `
                    <div class="project-links">
                        <a href="${project.github}" target="_blank" class="project-link">
                            <i class="fab fa-github"></i> View on GitHub
                        </a>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Load Meetings
function loadMeetings() {
    const meetings = DataManager.getMeetings();
    const meetingsContainer = document.getElementById('meetingsContainer');
    
    if (!meetingsContainer) return;

    // Sort by date (newest first)
    meetings.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (meetings.length === 0) {
        meetingsContainer.innerHTML = '<p class="text-center">No meetings scheduled. Add meetings from the admin panel.</p>';
        return;
    }

    meetingsContainer.innerHTML = meetings.map(meeting => {
        const meetingDate = new Date(meeting.date);
        const formattedDate = meetingDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        return `
            <div class="meeting-card">
                <div class="meeting-header">
                    <h3>${meeting.title}</h3>
                    <div class="meeting-datetime">
                        <i class="fas fa-calendar"></i>
                        ${formattedDate} ${meeting.time ? `at ${meeting.time}` : ''}
                    </div>
                </div>
                ${meeting.agenda ? `
                    <div class="meeting-agenda">
                        <h4>Agenda:</h4>
                        <p>${meeting.agenda}</p>
                    </div>
                ` : ''}
                ${meeting.report ? `
                    <div class="meeting-report">
                        <h4>Meeting Report:</h4>
                        <p>${meeting.report}</p>
                    </div>
                ` : ''}
                ${meeting.attendance && meeting.attendance.length > 0 ? `
                    <div class="attendance-section">
                        <strong>Attendance (${meeting.attendance.length}):</strong>
                        <div class="attendance-list">
                            ${meeting.attendance.map(name => `<span class="attendance-chip">${name}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Load Tasks
function loadTasks(filter = 'all') {
    const tasks = DataManager.getTasks();
    const tasksContainer = document.getElementById('tasksContainer');
    
    if (!tasksContainer) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let filteredTasks = tasks;
    if (filter !== 'all') {
        if (filter === 'overdue') {
            filteredTasks = tasks.filter(t => 
                new Date(t.dueDate) < today && t.status !== 'completed'
            );
        } else {
            filteredTasks = tasks.filter(t => t.status === filter);
        }
    }

    // Sort by due date
    filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    if (filteredTasks.length === 0) {
        tasksContainer.innerHTML = '<p class="text-center">No tasks found.</p>';
        return;
    }

    tasksContainer.innerHTML = filteredTasks.map(task => {
        const dueDate = new Date(task.dueDate);
        const formattedDate = dueDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        const isOverdue = dueDate < today && task.status !== 'completed';
        const statusClass = isOverdue ? 'overdue' : task.status;
        const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

        return `
            <div class="task-card ${statusClass}">
                <div class="task-header">
                    <h3>${task.title}</h3>
                    <div class="task-badges">
                        <span class="task-status ${task.status}">${task.status.replace('-', ' ').toUpperCase()}</span>
                        <span class="task-priority ${task.priority.toLowerCase()}">${task.priority}</span>
                    </div>
                </div>
                ${task.description ? `<p>${task.description}</p>` : ''}
                <div class="task-info">
                    <span><i class="fas fa-user"></i> ${task.assignedTo}</span>
                    <span><i class="fas fa-calendar"></i> Due: ${formattedDate}</span>
                </div>
                ${isOverdue ? `
                    <div class="task-reminder">
                        <i class="fas fa-exclamation-triangle"></i> This task is overdue!
                    </div>
                ` : daysUntilDue <= 3 && task.status !== 'completed' ? `
                    <div class="task-reminder">
                        <i class="fas fa-bell"></i> Due in ${daysUntilDue} day${daysUntilDue !== 1 ? 's' : ''}!
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Update Statistics
function updateStats() {
    const members = DataManager.getMembers();
    const events = DataManager.getEvents();
    const projects = DataManager.getProjects();

    const memberCount = document.getElementById('memberCount');
    const eventCount = document.getElementById('eventCount');
    const projectCount = document.getElementById('projectCount');

    if (memberCount) memberCount.textContent = members.length;
    if (eventCount) eventCount.textContent = events.length;
    if (projectCount) projectCount.textContent = projects.length;
}

// Setup Search
function setupSearch() {
    const memberSearch = document.getElementById('memberSearch');
    if (memberSearch) {
        memberSearch.addEventListener('input', (e) => {
            loadMembers(e.target.value);
        });
    }
}

// Setup Filters
function setupFilters() {
    const eventFilter = document.getElementById('eventFilter');
    if (eventFilter) {
        eventFilter.addEventListener('change', (e) => {
            loadEvents(e.target.value);
        });
    }

    const taskFilter = document.getElementById('taskFilter');
    if (taskFilter) {
        taskFilter.addEventListener('change', (e) => {
            loadTasks(e.target.value);
        });
    }
}

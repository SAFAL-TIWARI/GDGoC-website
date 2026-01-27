// Admin Panel JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });

    // Form submissions
    setupMemberForm();
    setupEventForm();
    setupProjectForm();
    setupMeetingForm();
    setupTaskForm();

    // Load lists
    loadMembersList();
    loadEventsList();
    loadProjectsList();
    loadMeetingsList();
    loadTasksList();

    // Import file handler
    const importFile = document.getElementById('importFile');
    if (importFile) {
        importFile.addEventListener('change', handleImport);
    }
});

// Member Form
function setupMemberForm() {
    const form = document.getElementById('memberForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const memberData = {
            name: document.getElementById('memberName').value,
            role: document.getElementById('memberRole').value,
            email: document.getElementById('memberEmail').value,
            phone: document.getElementById('memberPhone').value,
            branch: document.getElementById('memberBranch').value,
            year: document.getElementById('memberYear').value,
            skills: document.getElementById('memberSkills').value
        };

        const memberId = document.getElementById('memberId').value;
        if (memberId) {
            DataManager.updateMember(memberId, memberData);
        } else {
            DataManager.addMember(memberData);
        }

        resetMemberForm();
        loadMembersList();
        alert('Member saved successfully!');
    });
}

function resetMemberForm() {
    document.getElementById('memberForm').reset();
    document.getElementById('memberId').value = '';
}

function loadMembersList() {
    const members = DataManager.getMembers();
    const membersList = document.getElementById('membersList');
    
    if (!membersList) return;

    if (members.length === 0) {
        membersList.innerHTML = '<p class="text-center">No members added yet.</p>';
        return;
    }

    membersList.innerHTML = members.map(member => `
        <div class="admin-item">
            <div class="admin-item-content">
                <h4>${member.name}</h4>
                <p><strong>Role:</strong> ${member.role}</p>
                <p><strong>Email:</strong> ${member.email || 'N/A'}</p>
                <p><strong>Branch:</strong> ${member.branch || 'N/A'} | <strong>Year:</strong> ${member.year || 'N/A'}</p>
            </div>
            <div class="admin-item-actions">
                <button class="btn-edit" onclick="editMember('${member.id}')">Edit</button>
                <button class="btn-delete" onclick="deleteMember('${member.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function editMember(id) {
    const members = DataManager.getMembers();
    const member = members.find(m => m.id === id);
    
    if (member) {
        document.getElementById('memberId').value = member.id;
        document.getElementById('memberName').value = member.name;
        document.getElementById('memberRole').value = member.role;
        document.getElementById('memberEmail').value = member.email || '';
        document.getElementById('memberPhone').value = member.phone || '';
        document.getElementById('memberBranch').value = member.branch || '';
        document.getElementById('memberYear').value = member.year || '';
        document.getElementById('memberSkills').value = member.skills || '';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function deleteMember(id) {
    if (confirm('Are you sure you want to delete this member?')) {
        DataManager.deleteMember(id);
        loadMembersList();
    }
}

// Event Form
function setupEventForm() {
    const form = document.getElementById('eventForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const eventData = {
            name: document.getElementById('eventName').value,
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            location: document.getElementById('eventLocation').value,
            description: document.getElementById('eventDescription').value,
            category: document.getElementById('eventCategory').value,
            link: document.getElementById('eventLink').value
        };

        const eventId = document.getElementById('eventId').value;
        if (eventId) {
            DataManager.updateEvent(eventId, eventData);
        } else {
            DataManager.addEvent(eventData);
        }

        resetEventForm();
        loadEventsList();
        alert('Event saved successfully!');
    });
}

function resetEventForm() {
    document.getElementById('eventForm').reset();
    document.getElementById('eventId').value = '';
}

function loadEventsList() {
    const events = DataManager.getEvents();
    const eventsList = document.getElementById('eventsList');
    
    if (!eventsList) return;

    if (events.length === 0) {
        eventsList.innerHTML = '<p class="text-center">No events added yet.</p>';
        return;
    }

    eventsList.innerHTML = events.map(event => `
        <div class="admin-item">
            <div class="admin-item-content">
                <h4>${event.name}</h4>
                <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> ${event.location || 'N/A'}</p>
                <p>${event.description}</p>
            </div>
            <div class="admin-item-actions">
                <button class="btn-edit" onclick="editEvent('${event.id}')">Edit</button>
                <button class="btn-delete" onclick="deleteEvent('${event.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function editEvent(id) {
    const events = DataManager.getEvents();
    const event = events.find(e => e.id === id);
    
    if (event) {
        document.getElementById('eventId').value = event.id;
        document.getElementById('eventName').value = event.name;
        document.getElementById('eventDate').value = event.date;
        document.getElementById('eventTime').value = event.time || '';
        document.getElementById('eventLocation').value = event.location || '';
        document.getElementById('eventDescription').value = event.description;
        document.getElementById('eventCategory').value = event.category || 'Workshop';
        document.getElementById('eventLink').value = event.link || '';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function deleteEvent(id) {
    if (confirm('Are you sure you want to delete this event?')) {
        DataManager.deleteEvent(id);
        loadEventsList();
    }
}

// Project Form
function setupProjectForm() {
    const form = document.getElementById('projectForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const projectData = {
            name: document.getElementById('projectName').value,
            status: document.getElementById('projectStatus').value,
            description: document.getElementById('projectDescription').value,
            technologies: document.getElementById('projectTech').value,
            github: document.getElementById('projectGithub').value,
            team: document.getElementById('projectTeam').value
        };

        const projectId = document.getElementById('projectId').value;
        if (projectId) {
            DataManager.updateProject(projectId, projectData);
        } else {
            DataManager.addProject(projectData);
        }

        resetProjectForm();
        loadProjectsList();
        alert('Project saved successfully!');
    });
}

function resetProjectForm() {
    document.getElementById('projectForm').reset();
    document.getElementById('projectId').value = '';
}

function loadProjectsList() {
    const projects = DataManager.getProjects();
    const projectsList = document.getElementById('projectsList');
    
    if (!projectsList) return;

    if (projects.length === 0) {
        projectsList.innerHTML = '<p class="text-center">No projects added yet.</p>';
        return;
    }

    projectsList.innerHTML = projects.map(project => `
        <div class="admin-item">
            <div class="admin-item-content">
                <h4>${project.name}</h4>
                <p><strong>Status:</strong> ${project.status}</p>
                <p>${project.description}</p>
                ${project.team ? `<p><strong>Team:</strong> ${project.team}</p>` : ''}
            </div>
            <div class="admin-item-actions">
                <button class="btn-edit" onclick="editProject('${project.id}')">Edit</button>
                <button class="btn-delete" onclick="deleteProject('${project.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function editProject(id) {
    const projects = DataManager.getProjects();
    const project = projects.find(p => p.id === id);
    
    if (project) {
        document.getElementById('projectId').value = project.id;
        document.getElementById('projectName').value = project.name;
        document.getElementById('projectStatus').value = project.status || 'Planning';
        document.getElementById('projectDescription').value = project.description;
        document.getElementById('projectTech').value = project.technologies || '';
        document.getElementById('projectGithub').value = project.github || '';
        document.getElementById('projectTeam').value = project.team || '';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        DataManager.deleteProject(id);
        loadProjectsList();
    }
}

// Meeting Form
function setupMeetingForm() {
    const form = document.getElementById('meetingForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const meetingData = {
            title: document.getElementById('meetingTitle').value,
            date: document.getElementById('meetingDate').value,
            time: document.getElementById('meetingTime').value,
            duration: document.getElementById('meetingDuration').value,
            agenda: document.getElementById('meetingAgenda').value,
            report: document.getElementById('meetingReport').value,
            attendance: []
        };

        const meetingId = document.getElementById('meetingId').value;
        if (meetingId) {
            DataManager.updateMeeting(meetingId, meetingData);
        } else {
            DataManager.addMeeting(meetingData);
        }

        resetMeetingForm();
        loadMeetingsList();
        alert('Meeting saved successfully!');
    });
}

function resetMeetingForm() {
    document.getElementById('meetingForm').reset();
    document.getElementById('meetingId').value = '';
}

function loadMeetingsList() {
    const meetings = DataManager.getMeetings();
    const meetingsList = document.getElementById('meetingsList');
    
    if (!meetingsList) return;

    if (meetings.length === 0) {
        meetingsList.innerHTML = '<p class="text-center">No meetings added yet.</p>';
        return;
    }

    meetingsList.innerHTML = meetings.map(meeting => `
        <div class="admin-item">
            <div class="admin-item-content">
                <h4>${meeting.title}</h4>
                <p><strong>Date:</strong> ${new Date(meeting.date).toLocaleDateString()} ${meeting.time ? `at ${meeting.time}` : ''}</p>
                ${meeting.agenda ? `<p><strong>Agenda:</strong> ${meeting.agenda}</p>` : ''}
                ${meeting.report ? `<p><strong>Report:</strong> ${meeting.report}</p>` : ''}
            </div>
            <div class="admin-item-actions">
                <button class="btn-edit" onclick="editMeeting('${meeting.id}')">Edit</button>
                <button class="btn-delete" onclick="deleteMeeting('${meeting.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function editMeeting(id) {
    const meetings = DataManager.getMeetings();
    const meeting = meetings.find(m => m.id === id);
    
    if (meeting) {
        document.getElementById('meetingId').value = meeting.id;
        document.getElementById('meetingTitle').value = meeting.title;
        document.getElementById('meetingDate').value = meeting.date;
        document.getElementById('meetingTime').value = meeting.time || '';
        document.getElementById('meetingDuration').value = meeting.duration || 60;
        document.getElementById('meetingAgenda').value = meeting.agenda || '';
        document.getElementById('meetingReport').value = meeting.report || '';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function deleteMeeting(id) {
    if (confirm('Are you sure you want to delete this meeting?')) {
        DataManager.deleteMeeting(id);
        loadMeetingsList();
    }
}

// Task Form
function setupTaskForm() {
    const form = document.getElementById('taskForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskData = {
            title: document.getElementById('taskTitle').value,
            priority: document.getElementById('taskPriority').value,
            description: document.getElementById('taskDescription').value,
            assignedTo: document.getElementById('taskAssignedTo').value,
            dueDate: document.getElementById('taskDueDate').value,
            status: document.getElementById('taskStatus').value
        };

        const taskId = document.getElementById('taskId').value;
        if (taskId) {
            DataManager.updateTask(taskId, taskData);
        } else {
            DataManager.addTask(taskData);
        }

        resetTaskForm();
        loadTasksList();
        alert('Task saved successfully!');
    });
}

function resetTaskForm() {
    document.getElementById('taskForm').reset();
    document.getElementById('taskId').value = '';
}

function loadTasksList() {
    const tasks = DataManager.getTasks();
    const tasksList = document.getElementById('tasksList');
    
    if (!tasksList) return;

    if (tasks.length === 0) {
        tasksList.innerHTML = '<p class="text-center">No tasks added yet.</p>';
        return;
    }

    tasksList.innerHTML = tasks.map(task => `
        <div class="admin-item">
            <div class="admin-item-content">
                <h4>${task.title}</h4>
                <p><strong>Assigned To:</strong> ${task.assignedTo}</p>
                <p><strong>Due Date:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> ${task.status} | <strong>Priority:</strong> ${task.priority}</p>
                ${task.description ? `<p>${task.description}</p>` : ''}
            </div>
            <div class="admin-item-actions">
                <button class="btn-edit" onclick="editTask('${task.id}')">Edit</button>
                <button class="btn-delete" onclick="deleteTask('${task.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function editTask(id) {
    const tasks = DataManager.getTasks();
    const task = tasks.find(t => t.id === id);
    
    if (task) {
        document.getElementById('taskId').value = task.id;
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskPriority').value = task.priority || 'Medium';
        document.getElementById('taskDescription').value = task.description || '';
        document.getElementById('taskAssignedTo').value = task.assignedTo;
        document.getElementById('taskDueDate').value = task.dueDate;
        document.getElementById('taskStatus').value = task.status || 'pending';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        DataManager.deleteTask(id);
        loadTasksList();
    }
}

// Data Management Functions
function exportData() {
    const data = DataManager.exportData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gdgoc-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function handleImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (confirm('This will replace all existing data. Are you sure?')) {
                DataManager.importData(data);
                alert('Data imported successfully!');
                location.reload();
            }
        } catch (error) {
            alert('Error importing data. Please check the file format.');
        }
    };
    reader.readAsText(file);
}

function clearAllData() {
    if (confirm('Are you sure you want to delete all data? This action cannot be undone!')) {
        if (confirm('Last confirmation: This will permanently delete all members, events, projects, meetings, and tasks!')) {
            DataManager.clearAllData();
            alert('All data has been cleared.');
            location.reload();
        }
    }
}

// Data Management Module
// This module handles all data storage and retrieval using localStorage

const DataManager = {
    // Generate unique ID
    generateId() {
        return Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);
    },

    // Initialize data structure if it doesn't exist
    init() {
        if (!localStorage.getItem('gdgoc_data')) {
            const initialData = {
                members: [],
                events: [],
                projects: [],
                meetings: [],
                tasks: []
            };
            localStorage.setItem('gdgoc_data', JSON.stringify(initialData));
        }
    },

    // Get all data
    getData() {
        this.init();
        return JSON.parse(localStorage.getItem('gdgoc_data'));
    },

    // Save all data
    saveData(data) {
        localStorage.setItem('gdgoc_data', JSON.stringify(data));
    },

    // Members
    getMembers() {
        return this.getData().members || [];
    },

    addMember(member) {
        const data = this.getData();
        member.id = this.generateId();
        data.members.push(member);
        this.saveData(data);
        return member;
    },

    updateMember(id, updatedMember) {
        const data = this.getData();
        const index = data.members.findIndex(m => m.id === id);
        if (index !== -1) {
            data.members[index] = { ...data.members[index], ...updatedMember, id };
            this.saveData(data);
            return data.members[index];
        }
        return null;
    },

    deleteMember(id) {
        const data = this.getData();
        data.members = data.members.filter(m => m.id !== id);
        this.saveData(data);
    },

    // Events
    getEvents() {
        return this.getData().events || [];
    },

    addEvent(event) {
        const data = this.getData();
        event.id = this.generateId();
        data.events.push(event);
        this.saveData(data);
        return event;
    },

    updateEvent(id, updatedEvent) {
        const data = this.getData();
        const index = data.events.findIndex(e => e.id === id);
        if (index !== -1) {
            data.events[index] = { ...data.events[index], ...updatedEvent, id };
            this.saveData(data);
            return data.events[index];
        }
        return null;
    },

    deleteEvent(id) {
        const data = this.getData();
        data.events = data.events.filter(e => e.id !== id);
        this.saveData(data);
    },

    // Projects
    getProjects() {
        return this.getData().projects || [];
    },

    addProject(project) {
        const data = this.getData();
        project.id = this.generateId();
        data.projects.push(project);
        this.saveData(data);
        return project;
    },

    updateProject(id, updatedProject) {
        const data = this.getData();
        const index = data.projects.findIndex(p => p.id === id);
        if (index !== -1) {
            data.projects[index] = { ...data.projects[index], ...updatedProject, id };
            this.saveData(data);
            return data.projects[index];
        }
        return null;
    },

    deleteProject(id) {
        const data = this.getData();
        data.projects = data.projects.filter(p => p.id !== id);
        this.saveData(data);
    },

    // Meetings
    getMeetings() {
        return this.getData().meetings || [];
    },

    addMeeting(meeting) {
        const data = this.getData();
        meeting.id = this.generateId();
        if (!meeting.attendance) {
            meeting.attendance = [];
        }
        data.meetings.push(meeting);
        this.saveData(data);
        return meeting;
    },

    updateMeeting(id, updatedMeeting) {
        const data = this.getData();
        const index = data.meetings.findIndex(m => m.id === id);
        if (index !== -1) {
            data.meetings[index] = { ...data.meetings[index], ...updatedMeeting, id };
            this.saveData(data);
            return data.meetings[index];
        }
        return null;
    },

    deleteMeeting(id) {
        const data = this.getData();
        data.meetings = data.meetings.filter(m => m.id !== id);
        this.saveData(data);
    },

    // Tasks
    getTasks() {
        return this.getData().tasks || [];
    },

    addTask(task) {
        const data = this.getData();
        task.id = this.generateId();
        task.createdAt = new Date().toISOString();
        data.tasks.push(task);
        this.saveData(data);
        return task;
    },

    updateTask(id, updatedTask) {
        const data = this.getData();
        const index = data.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            data.tasks[index] = { ...data.tasks[index], ...updatedTask, id };
            this.saveData(data);
            return data.tasks[index];
        }
        return null;
    },

    deleteTask(id) {
        const data = this.getData();
        data.tasks = data.tasks.filter(t => t.id !== id);
        this.saveData(data);
    },

    // Utility functions
    exportData() {
        return this.getData();
    },

    importData(data) {
        this.saveData(data);
    },

    clearAllData() {
        localStorage.removeItem('gdgoc_data');
        this.init();
    }
};

// Initialize on load
DataManager.init();

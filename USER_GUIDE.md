# GDGoC SATI Website - User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Public Website Features](#public-website-features)
3. [Admin Panel Guide](#admin-panel-guide)
4. [Data Management](#data-management)
5. [Tips and Best Practices](#tips-and-best-practices)

## Getting Started

### Opening the Website
1. Navigate to the project folder
2. Open `index.html` in a web browser
3. The website will load with all sections visible

### First Time Setup
1. Click on "Admin" in the navigation or open `admin.html`
2. Start adding your club's data:
   - Add team members
   - Create events
   - Add projects
   - Schedule meetings
   - Assign tasks

## Public Website Features

### Home Section
- Displays welcome message and club information
- Shows quick statistics (members, events, projects count)
- Two call-to-action buttons

### About Section
- Club description and mission
- Live statistics that update automatically
- Professional card layout

### Members Section
- **Search**: Use the search box to find members by name or role
- **Member Cards**: Display avatar (initials), name, role, contact info, and skills
- Responsive grid layout adapts to screen size

### Events Section
- **Filter**: Choose between All Events, Upcoming, or Past
- **Event Cards**: Show date, time, location, category, and description
- Color-coded headers for visual appeal
- Registration links when available

### Projects Section
- **Project Cards**: Display project name, status, description
- **Status Badges**: Planning, In Progress, or Completed
- **Technologies**: Shows tech stack used
- **Team Members**: Lists collaborators
- **GitHub Links**: Direct links to repositories

### Meetings Section
- **Meeting Cards**: Display title, date, and time
- **Agenda**: Shows meeting topics
- **Reports**: Meeting outcomes and decisions
- **Attendance**: Lists members who attended

### Tasks Section
- **Filter**: View All, Pending, In Progress, Completed, or Overdue tasks
- **Task Cards**: Show title, assignee, due date, priority, status
- **Reminders**: Automatic alerts for overdue tasks and upcoming deadlines
- **Color Coding**: Border colors indicate status (yellow=pending, blue=in-progress, green=completed, red=overdue)

## Admin Panel Guide

### Accessing the Admin Panel
- Click "Admin" in the navigation menu
- Or directly open `admin.html` in your browser

### Navigation
- Six tabs at the top: Members, Events, Projects, Meetings, Tasks, Data Management
- Click any tab to switch sections
- "Back to Website" link returns to public site

### Managing Members

#### Adding a Member
1. Go to Members tab
2. Fill in the form:
   - **Name** (required): Full name
   - **Role** (required): Select from dropdown (Lead, Co-Lead, Technical Lead, etc.)
   - **Email** (required): Contact email
   - **Phone**: Mobile number
   - **Branch**: Department (e.g., Computer Science)
   - **Year**: Academic year
   - **Skills**: Comma-separated list (e.g., "JavaScript, Python, React")
3. Click "Add Member"
4. Member appears in the list below

#### Editing a Member
1. Find the member in the list
2. Click "Edit" button
3. Form fills with current data
4. Make changes
5. Click "Add Member" (button updates existing member)

#### Deleting a Member
1. Find the member in the list
2. Click "Delete" button
3. Confirm the deletion

### Managing Events

#### Adding an Event
1. Go to Events tab
2. Fill in the form:
   - **Event Name** (required): Title of the event
   - **Date** (required): Event date
   - **Time**: Event start time
   - **Location**: Venue
   - **Description** (required): Event details
   - **Category**: Workshop, Hackathon, Study Jam, Meetup, or Webinar
   - **Registration Link**: URL for sign-ups
3. Click "Add Event"

#### Tips for Events
- Set future dates for upcoming events
- Past events automatically show in "Past" filter
- Add detailed descriptions to attract attendees
- Include registration links when available

### Managing Projects

#### Adding a Project
1. Go to Projects tab
2. Fill in the form:
   - **Project Name** (required): Project title
   - **Status**: Planning, In Progress, or Completed
   - **Description** (required): Project overview
   - **Technologies**: Comma-separated tech stack
   - **GitHub Link**: Repository URL
   - **Team Members**: Comma-separated names
3. Click "Add Project"

#### Best Practices
- Update project status regularly
- Keep team member names consistent with Members section
- Add GitHub links for transparency
- Include all relevant technologies

### Managing Meetings

#### Adding a Meeting
1. Go to Meetings tab
2. Fill in the form:
   - **Meeting Title** (required): Meeting name
   - **Date** (required): Meeting date
   - **Time** (required): Start time
   - **Duration**: Length in minutes (default: 60)
   - **Agenda**: Topics to discuss
   - **Meeting Report**: Outcomes and decisions
3. Click "Add Meeting"

#### Recording Meetings
- Add agenda before the meeting
- Update with report after the meeting
- Keep reports concise but informative

### Managing Tasks

#### Adding a Task
1. Go to Tasks tab
2. Fill in the form:
   - **Task Title** (required): Task name
   - **Priority**: Low, Medium, or High
   - **Description**: Task details
   - **Assigned To** (required): Member name
   - **Due Date** (required): Deadline
   - **Status**: Pending, In Progress, or Completed
3. Click "Add Task"

#### Task Management Tips
- Set realistic due dates
- Use High priority for urgent tasks
- Update status regularly
- Add clear descriptions
- Assign tasks to specific members

#### Understanding Task Reminders
- **Overdue**: Tasks past due date (not completed) show red alert
- **Due Soon**: Tasks due within 3 days show yellow warning
- Tasks automatically sorted by due date

## Data Management

### Exporting Data
1. Go to Data Management tab
2. Click "Export Data" button
3. JSON file downloads with all data
4. Save this file as backup

### Importing Data
1. Go to Data Management tab
2. Click "Choose File" under Import Data
3. Select a JSON file (previously exported)
4. Confirm to replace current data
5. Page reloads with imported data

### Clearing All Data
1. Go to Data Management tab
2. Click "Clear Data" button (red)
3. **Warning**: This deletes everything!
4. Double confirmation required
5. All data removed, page reloads

### Data Storage
- All data stored in browser's localStorage
- Data persists between sessions
- Clearing browser data removes club data
- Export regularly for backups

## Tips and Best Practices

### Regular Maintenance
- Export data weekly as backup
- Update task statuses regularly
- Remove old/completed tasks periodically
- Keep member information current

### Data Entry
- Use consistent naming (e.g., full names)
- Format skills consistently ("JavaScript" not "javascript")
- Add complete contact information
- Write clear descriptions

### Event Management
- Create events well in advance
- Update event details as they change
- Add photos/links in descriptions
- Archive old events (or delete)

### Task Tracking
- Review tasks weekly in team meetings
- Update statuses promptly
- Set realistic deadlines
- Use priority levels effectively

### Search and Filters
- Use member search to quickly find people
- Filter events to see upcoming vs past
- Filter tasks by status to focus work
- All filters update in real-time

### Mobile Usage
- Website is fully responsive
- Admin panel works on tablets
- Navigation menu collapses on mobile
- All features accessible on any device

### Security
- Admin panel has no password protection
- Consider hosting restrictions if needed
- Export data regularly
- Don't share sensitive information publicly

### Troubleshooting

#### Data Not Saving
- Check if browser allows localStorage
- Try different browser
- Check browser settings

#### Data Lost
- Restore from exported JSON backup
- Check if data was cleared accidentally
- Browser data may have been cleared

#### Display Issues
- Clear browser cache
- Refresh the page
- Try different browser
- Check console for errors

## Advanced Features

### Custom Styling
- Edit `css/style.css` for main site
- Edit `css/admin.css` for admin panel
- Customize colors in `:root` variables
- Add your club logo in `images/` folder

### Adding Social Links
- Edit `index.html`
- Find footer social links section
- Replace `#` with actual URLs
- Save and refresh

### Customizing Content
- Edit text in `index.html`
- Update club name, location
- Modify about section
- Change colors in CSS

## Support

For issues or questions:
1. Check this guide first
2. Review README.md
3. Contact your club's technical lead
4. Check browser console for errors

## Credits

Built for Google Developer Group on Campus - SATI
© 2026 GDGoC SATI. All rights reserved.

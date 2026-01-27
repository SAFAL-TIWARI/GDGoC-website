# GDGoC SATI Website

Official Website of Google Developer Group on Campus (GDGoC) - Samrat Ashok Technological Institute, Vidisha

## Overview

This website serves as the central hub for GDGoC SATI, providing comprehensive information about our student chapter, members, events, projects, and a complete data management system for meetings, attendance, and task tracking.

## Features

### Public Pages
- **Home**: Welcome section with club overview and statistics
- **About**: Information about GDGoC SATI
- **Members**: Display all team members with their roles, skills, and contact information
- **Events**: Showcase upcoming and past events with details
- **Projects**: Highlight ongoing and completed projects
- **Meetings**: View meeting schedules, agendas, reports, and attendance
- **Tasks**: Track work allotments, assignments, and task status with reminders

### Admin Panel
The admin panel (`admin.html`) provides complete data management capabilities:
- Add, edit, and delete members
- Create and manage events
- Add and update projects
- Schedule meetings with agenda and reports
- Assign tasks with priorities and due dates
- Track task status (pending, in-progress, completed)
- Attendance management for meetings
- Data export/import functionality
- Complete data backup and restore

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Data Storage**: localStorage (browser-based)
- **Styling**: Custom CSS with Google Colors theme
- **Icons**: Font Awesome 6.4.0

## Getting Started

1. Clone the repository
2. Open `index.html` in a web browser to view the website
3. Open `admin.html` to access the admin panel for data management

## File Structure

```
Website/
├── index.html          # Main website page
├── admin.html          # Admin panel for data management
├── css/
│   ├── style.css       # Main website styles
│   └── admin.css       # Admin panel styles
├── js/
│   ├── data.js         # Data management module (localStorage)
│   ├── app.js          # Main website functionality
│   └── admin.js        # Admin panel functionality
├── images/             # Images and logos
└── README.md           # This file
```

## Data Management

All data is stored locally in the browser using localStorage. The system includes:

- **Members Management**: Store member details including name, role, contact info, branch, year, and skills
- **Events Management**: Track events with dates, locations, descriptions, and registration links
- **Projects Management**: Document projects with status, technologies, team members, and GitHub links
- **Meetings Management**: Schedule meetings with dates, agenda, reports, and attendance tracking
- **Tasks Management**: Assign tasks with priorities, due dates, status tracking, and automatic reminders

### Data Export/Import

- Export all data as JSON for backup
- Import data from JSON files
- Clear all data option (with confirmation)

## Usage

### For Visitors
1. Browse the website to learn about GDGoC SATI
2. View team members and their skills
3. Check upcoming events and register
4. Explore projects undertaken by the club

### For Administrators
1. Access the admin panel via the navigation or `admin.html`
2. Use the tab interface to manage different sections
3. Add/Edit/Delete items as needed
4. Export data regularly for backup
5. Tasks show automatic reminders for due dates

## Features Highlights

### Task Management System
- Priority levels (High, Medium, Low)
- Status tracking (Pending, In Progress, Completed)
- Automatic overdue detection
- Due date reminders (3 days before)
- Filter by status

### Meeting Management
- Meeting schedules with dates and times
- Agenda setting
- Meeting reports
- Attendance tracking
- Historical meeting records

### Responsive Design
- Mobile-friendly navigation
- Responsive grid layouts
- Touch-optimized interface
- Works on all modern browsers

## Contributing

This website is maintained by the GDGoC SATI team. For contributions or suggestions:
1. Contact the club leads
2. Attend our meetings
3. Join as a member and contribute to projects

## Contact

- **Institution**: Samrat Ashok Technological Institute, Vidisha
- **Location**: Vidisha, Madhya Pradesh, India

## License

© 2026 GDGoC SATI. All rights reserved.

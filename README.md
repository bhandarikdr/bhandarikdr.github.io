# Kedar Pd. Bhandari - Personal Profile & CS Resource Portal

This repository contains the source code for the personal website and educational resource portal of **Kedar Pd. Bhandari**, a Computer Science Teacher and STEAM Specialist.

The site is hosted on GitHub Pages: [https://bhandarikdr.github.io/](https://bhandarikdr.github.io/)

## 🚀 Project Overview

The project serves a dual purpose:
1.  **Professional Portfolio**: Showcasing professional experience, technical skills, and educational background.
2.  **Educational Resource Hub**: Providing Grade XI and Grade XII Computer Science students with syllabus overviews, grading schemes, and downloadable laboratory resources.

## 📁 Site Structure

### 1. Main Profile (`index.html`)
The landing page of the site. It features a modern, responsive CV layout including:
*   Professional Summary
*   Detailed Experience Timeline
*   Technical Skills (Programming, IT Infrastructure, Pedagogy)
*   Educational Background
*   Contact Information and Social Links

### 2. Grade XI Computer Science (`CSXI.html`)
A dedicated page for Grade 11 students covering:
*   Course Orientation and Welcome Message.
*   Grading & Assessment breakdown (50 Theory / 50 Practical).
*   Detailed Syllabus Outline (8 Units) with practical involvement status.
*   Download Center for curriculum guides and lab question sets.

### 3. Grade XII Computer Science (`CSXII.html`)
A dedicated page for Grade 12 students covering:
*   Advanced Course Orientation.
*   Detailed Practical Marks Breakdown (Portfolio, External Exam, Live Demo, Viva).
*   Syllabus Outline (7 Units) with a focus on DBMS (SQL), Networking, and Web Tech II.
*   Download Center for advanced lab templates and guides.

### 4. Shared Styling (`course-style.css`)
To maintain a consistent "look and feel" across the educational pages, a shared CSS file is used. It defines:
*   **Color Palette**: Professional deep blues (`#1e293b`), vibrant accents (`#3b82f6`), and warning/error states.
*   **Typography**: Clean 'Segoe UI' based font stack.
*   **Components**: Standardized cards, status badges, resource boxes, and responsive grid layouts.

## 🛠️ Technology Stack

*   **HTML5 & CSS3**: Structural layout and custom styling.
*   **Flexbox & CSS Grid**: Used for responsive design across different device sizes.
*   **Font Awesome**: For iconography.
*   **Google Fonts**: 'Inter' font for the profile page.
*   **GitHub Pages**: For static site hosting.

## 📝 Maintenance & Future Reference

*   **Adding Resources**: To add new lab questions or guides, upload the file to the root directory and add a new `.resource-box` entry in the corresponding `CSXI.html` or `CSXII.html` file.
*   **Updating Syllabus**: The syllabus sections are built using the `.syllabus-grid` and `.syllabus-item` classes in the HTML files.
*   **Theming**: Global theme changes for the course pages should be made in `course-style.css`.

---
*Created and maintained by Kedar Pd. Bhandari.*

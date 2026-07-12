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

### 2. Grade XI Computer Science (`csxi.html`)
A dedicated page for Grade 11 students covering:
*   Course Orientation and Welcome Message.
*   Grading & Assessment breakdown (50 Theory / 50 Practical).
*   Detailed Syllabus Outline (8 Units) with practical involvement status.
*   Download Center for curriculum guides and lab question sets.

### 3. Grade XII Computer Science (`csxii.html`)
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

### 5. CSS Architecture
The project uses separate CSS files for different sections:

| CSS File | Applied To | Purpose |
| :--- | :--- | :--- |
| `css/mystyle.css` | `index.html`, `main_pages/` | Main profile and course pages (CSXI, CSXII) |
| `css/activity.css` | `activities/` | Lab activity guides with standardized components |
| `css/canvas.css` | `assessments/` | Interactive assessment pages |

**Note**: `STYLE_GUIDE.md` documents the design system for `mystyle.css`. `ACTIVITY_PROMPT.md` documents the standardization guide for `activity.css`.

## 🛠️ Technology Stack

*   **HTML5 & CSS3**: Structural layout and custom styling.
*   **Flexbox & CSS Grid**: Used for responsive design across different device sizes.
*   **Font Awesome**: For iconography.
*   **Google Fonts**: 'Inter' font for the profile page.
*   **GitHub Pages**: For static site hosting.

## 📝 Maintenance & Future Reference

*   **Adding Resources**: To add new lab questions or guides, upload the file to the root directory and add a new `.resource-box` entry in the corresponding `csxi.html` or `csxii.html` file.
*   **Updating Syllabus**: The syllabus sections are built using the `.syllabus-grid` and `.syllabus-item` classes in the HTML files.
*   **Theming**: Global theme changes for the course pages should be made in `course-style.css`.

## 📁 File Naming Convention

This project follows a uniform file naming convention to maintain consistency:

- **Resource files** (HTML, CSS, images): All lowercase with underscores
   - Examples: `computer_introduction_activity.html`, `application_packages_lab_activity.html`, `mystyle.css`
  - Directories: `activities/`, `assessments/`, `assignments/`, `css/`, `images/`, `main_pages/`

- **Documentation files**: All uppercase with underscores
  - Examples: `README.md`, `STYLE_GUIDE.md`, `ACTIVITY_PROMPT.md`, `ASSESSMENT_PROMPT.md`, `ASSIGNMENT_PROMPT.md`, `RESOURCE_LINKS.md`

When adding new files, follow this convention to maintain consistency across the project.

---
*Created and maintained by Kedar Pd. Bhandari.*

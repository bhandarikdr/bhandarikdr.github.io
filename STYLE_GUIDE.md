# Resource Portal Style Guide

This document outlines the design system, UI components, and coding patterns used for the Grade XI and XII Computer Science resource pages.

---

## 🎨 Color Palette (CSS Variables)

Defined in `:root` of `course-style.css`.

| Variable | Hex Code | Purpose |
| :--- | :--- | :--- |
| `--primary-color` | `#1e293b` | Dark Slate: Headlines, primary text, dark backgrounds. |
| `--secondary-color` | `#3b82f6` | Blue: Primary actions, active links, borders. |
| `--accent-color` | `#ef4444` | Red: Critical alerts, important icons. |
| `--bg-color` | `#f8fafc` | Off-white: Main body background. |
| `--card-bg` | `#ffffff` | Pure White: Card backgrounds. |
| `--text-color` | `#334155` | Slate Gray: Body text. |
| `--border-color` | `#e2e8f0` | Light Gray: Dividers and container borders. |
| `--success-color` | `#10b981` | Green: Positive statuses, lab guides. |
| `--warning-color` | `#f59e0b` | Amber: Alerts, notes, assignment highlights. |

---

## 📐 Layout & Structure

### 0. Navigation (Glass Navbar)
A floating, blurred navigation bar fixed to the top with auto-hide logic.
- **Trigger**: Requires a `<div class="nav-trigger"></div>` at the start of `<body>`.
- **Active Class**: Use `class="active"` on the `<a>` tag of the current page.

```html

<div class="nav-trigger"></div>
<nav class="glass-nav visible">
    <a href="index.html" class="nav-logo">
        <i class="fa-solid fa-user-graduate"></i>
        <span>Kedar Bhandari</span>
    </a>
    <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="main_pages/CSXI.html" class="active">Grade XI</a></li>
        <li><a href="main_pages/CSXII.html">Grade XII</a></li>
    </ul>
</nav>

<script>
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY <= 50) {
            nav.classList.add('visible');
        } else {
            nav.classList.remove('visible');
        }
    });
</script>
```

### 1. Header Banner
Uses a linear gradient from `--primary-color`.
```html
<div class="header-banner">
    <h1>Title</h1>
    <p>Subtitle</p>
</div>
```

### 2. Containers & Cards
- **`.container`**: Max-width `1000px`, centered.
- **`.card`**: White background, rounded corners (`12px`), subtle shadow, and `30px` padding.
- **`.grid-2`**: A 2-column CSS grid that stacks to 1 column on mobile.

---

## 📚 Syllabus Components

### Syllabus Item
A flex container holding info and a status badge (badge is top-aligned via `align-items: flex-start`).
```html
<div class="syllabus-item">
    <div class="syllabus-info">
        <h4>Unit Title</h4>
        <p>Description text...</p>
        <div class="syllabus-actions">
            <!-- See Action Buttons patterns below -->
        </div>
    </div>
    <span class="status-badge status-theory">Badge Text</span>
</div>
```

### Action Buttons

| Class | Theme | Foreground | Background | Border | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `.handouts` | Blue | `#2563eb` | `#eff6ff` | `#bfdbfe` | Reference materials, syllabus docs |
| `.lab-guide` | Green | `#16a34a` | `#f0fdf4` | `#bbf7d0` | Hands-on lab activities, practical guides |
| `.activity` | Amber | `#c2410c` | `#fff7ed` | `#fed7aa` | Theoretical/conceptual learning activities |
| `.test-yourself` | Purple | `#7851a9` | `#eff6ff` | `#7851a9` | Assessments, quizzes, lab tests |

All hover states fill solid with white text.

### Organizing Multiple Buttons

When a unit has several reference/activity/assessment links, group related items using `.action-group` and separate distinct groups with `.action-separator` (`|`).

**Pattern -- Single reference:**
```html
<div class="syllabus-actions">
    <a href="#" class="action-btn handouts">📖 Handouts</a>
</div>
```

**Pattern -- Activity + Assessment pair (adjacent):**
```html
<div class="syllabus-actions">
    <a href="#" class="action-btn handouts">📖 Handouts</a>
    <span class="action-separator">|</span>
    <div class="action-group">
        <a href="#" class="action-btn activity">🧪 DBMS Concepts</a>
        <a href="#" class="action-btn test-yourself">📝 Quiz</a>
    </div>
    <span class="action-separator">|</span>
    <div class="action-group">
        <a href="#" class="action-btn lab-guide">🧪 SQL Lab</a>
        <a href="#" class="action-btn test-yourself">📝 Test</a>
    </div>
</div>
```

Key rules:
- `.action-group` is `display: inline-flex; align-items: center; gap: 6px` -- activity and its assessment sit side by side.
- `.action-separator` is a light gray `|` with `user-select: none`.
- The outer `.syllabus-actions` uses `display: flex; flex-wrap: wrap;` so groups wrap gracefully on mobile.
- For units with only a single link, no group/separator wrappers are needed.

### Status Badges
- **`.status-theory`**: Neutral gray for concept-heavy units.
- **`.status-practical`**: Light blue for hands-on units.

---

## 📥 Download Center

### Expandable Sections
Uses standard `<details>` and `<summary>` for a clean interface.
```html
<details class="resource-section" open>
    <summary>Section Title</summary>
    <div class="resource-grid">
        <!-- Resource Boxes -->
    </div>
</details>
```

### Resource Box
A flexible box for file downloads.
- **Icons**: Background colors are used to denote file types (Red for PDF, Blue for DOCX).
- **`.inline-download-btn`**: The primary CTA for file access.

---

## ⚠️ Alerts & Messages

### Welcome Text
Used inside the first card for the instructor's message.
- **`.welcome-text`**: Italicized, light gray background, blue left border.

### Alert Boxes
- **`.alert-box`**: Default (Amber/Warning) for important notes.
- **`.alert-box.critical`**: Red background for mandatory requirements (like Lab Reports).

---

## 📱 Responsiveness
- Main containers use relative padding (`20px`).
- Grids (`.grid-2`) switch to single column at `768px`.
- Syllabus items stack vertically at `600px`.

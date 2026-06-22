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
A floating, blurred navigation bar fixed to the top.
```html
<nav class="glass-nav">
    <a href="index.html" class="nav-logo">
        <i class="fa-solid fa-user-graduate"></i>
        <span>Kedar Bhandari</span>
    </a>
    <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="CSXI.html" class="active">Grade XI</a></li>
        <li><a href="CSXII.html">Grade XII</a></li>
    </ul>
</nav>
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
A flex container holding info and a status badge.
```html
<div class="syllabus-item">
    <div class="syllabus-info">
        <h4>Unit Title</h4>
        <p>Description text...</p>
        <div class="syllabus-actions">
            <a href="#" class="action-btn handouts">📖 Handouts</a>
            <a href="#" class="action-btn lab-guide">🧪 Lab Guide</a>
        </div>
    </div>
    <span class="status-badge status-theory">Badge Text</span>
</div>
```

### Action Buttons
- **`.handouts`**: Blue themed (`#eff6ff` bg, `#2563eb` text).
- **`.lab-guide`**: Green themed (`#f0fdf4` bg, `#16a34a` text).

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

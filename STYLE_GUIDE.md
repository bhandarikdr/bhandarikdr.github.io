# Resource Portal Style Guide

This document outlines the design system, UI components, and coding patterns used for the Grade XI and XII Computer Science resource pages.

---

## 📁 File Naming Convention

This project follows a uniform file naming convention to maintain consistency:

- **Resource files** (HTML, CSS, images): All lowercase with underscores
  - Examples: `computer_introduction_activity.html`, `application_packages_lab_guide.html`, `mystyle.css`
  - Directories: `activities/`, `assessments/`, `assignments/`, `css/`, `images/`, `main_pages/`

- **Documentation files**: All uppercase with underscores
  - Examples: `README.md`, `STYLE_GUIDE.md`, `ACTIVITY_PROMPT.md`, `ASSESSMENT_PROMPT.md`, `ASSIGNMENT_PROMPT.md`, `RESOURCE_LINKS.md`

When adding new files, follow this convention to maintain consistency across the project.

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
        <li><a href="main_pages/csxi.html" class="active">Grade XI</a></li>
        <li><a href="main_pages/csxii.html">Grade XII</a></li>
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

### Button Labeling Convention

Choose the CSS class and label text based on the activity type:

| Type | CSS Class | Color | Button Label Pattern | Example |
| :--- | :--- | :--- | :--- | :--- |
| **Theory / worksheet** | `.activity` | Amber | `🧪 <Name>` + `📝 Test` | `🧪 CS Intro  📝 Test` |
| **Hands-on lab** | `.lab-guide` | Green | `🧪 <Name> Lab` + `📝 Lab Test` | `🧪 SQL Lab  📝 Lab Test` |

- Lab activities involve practical/software work (coding, database queries, web design).
- Theory activities are conceptual comprehension worksheets (no hands-on software execution).
- The activity name should be short and meaningful (e.g., "CS Intro", "Sys & IO", "App Packages", "Web Tech I").

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

---

## 🤖 Reusable Prompt: Auditing & Fixing Activity/Assessment Files

Copy the block below when asking opencode to audit and fix a batch of new activity/assessment files. It captures every convention discovered across the existing codebase.

### How to trigger the prompt

Send the block below, prefixed with the file paths (or a glob) of the files to process. For example:

> Apply the standards below to `activities/Foo_Activity.html` and `assessments/Foo_Assessment.html`.

The prompt will be scoped to the specific files mentioned in your message. opencode will read them, compare against the rules, and apply fixes.

### Prompt text

```
## Scope
- The files listed in my message above are new activity/assessment pages.
- Compare each against the standards documented in ACTIVITY_PROMPT.md and ASSESSMENT_PROMPT.md.
- Fix every violation found; do not stop after the first issue.

## File placement
- Theory worksheets → `activities/` directory; link to `../css/activity.css`.
- Interactive assessments → `assessments/` directory; link to `../css/assessment.css`.
- If a file is in the wrong directory, move it.
- **Filename tells the type**: The filename itself indicates lab vs theory:
  - `_Activity.html` (no "lab") → theory worksheet → use `.activity` (amber) + `🧪 <Name>` / `📝 Test`
  - `_lab_guide.html` or `_Lab_Activity.html` → lab activity → use `.lab-guide` (green) + `🧪 <Name> Lab` / `📝 Lab Test`
  - `_Assessment.html` (no "lab") → theory/normal assessment
  - `_lab_assessment.html` → lab assessment

## Activity pages (theory worksheets)
- Uses `<link href="../css/activity.css">`.
- When order matters (numbered steps, sequences), use `<ol class="step-list">`.
- When order does not matter (bullets, non-sequential items), use `<ul>` (no class needed unless it is a step-list).
- Hidden answers (for self-check) MUST use `<details>`/`<summary>`; never leave answers visible inline.
- No CSS overrides that conflict with activity.css (e.g. do not force `list-style: disc` on an `<ol>`).
- Only `<title>` in the `<head>`; no `<h1>`. The page title appears as the first visible heading inside the content.

## Assessment pages (interactive lab tests)
- Uses `<link href="../css/assessment.css">`.
- Entry modal uses `celebration-overlay`/`celebration-card` classes, with three plain `<input>` fields (Full Name, Roll Number, Room Number), a single `.error-msg` div (`#entryError`), and a `.btn-primary` button (`#enterBtn`).
- The enter button must use `addEventListener`, not `onclick`.
- Validation: show/hide `#entryError`; no `alert()` calls.
- Submission uses a `SUBMISSION_CONFIG` object with a `url` and `fields` map, then `fetch(url, { method: 'POST', mode: 'no-cors', body: formData })`. No hidden iframe or form element submission.
- Verification status uses `verification-text verified/unverified` CSS classes, not `feedback valid/invalid`.
- Simplify all language: no buzzwords ("engine", "pipeline", "matrix", "metrics", "namespace", "synchronize", "telemetry", "manifest", "payload", "ledger", "canvas" as a generic term). Use plain task descriptions like "Task 5: Spreadsheet Formula" not "Dynamic Multiplier Engine". Status text shows short phrases like "❌ Correct the typos" / "✅ Spelling corrected".
- Completion screen uses `celebration-overlay`/`celebration-card`, heading "🎉 Assessment Complete", student/score summary, timing line, and "You may close this page."
- Avoid HTML comments.

## Both activity AND assessment pages
- Keep emojis (user preference).
- Do NOT add code comments (no `//`, `/* */`, or `<!-- -->`).
- Keep `<title>` short and descriptive.
- File naming: All lowercase with underscores and no spaces (e.g. `computer_introduction_activity.html`).
- `<html lang="en">` at the top, `<!DOCTYPE html>` first line.
- Each file must have exactly one `</html>`, `</body>`, `</script>`.
```

### Notes
- This prompt works best when you provide the file paths explicitly in your message. opencode will read them, apply each rule, and make edits until all violations are resolved.
- If the files are in a subdirectory not yet covered by these rules, mention it so opencode can adapt the relative CSS path.
- The `SUBMISSION_CONFIG` fields (Google Form entry IDs) should match the existing pattern if the same form is reused, or be adapted for new forms.

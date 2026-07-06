# Resource Portal Style Guide

This document is the single source of truth for the Grade XI and XII Computer Science resource pages. It covers design system, UI components, coding patterns, and content standards for all resource types.

---

## 📁 File Naming Convention

- **Resource files** (HTML, CSS, images): All lowercase with underscores
  - Examples: `computer_introduction_activity.html`, `application_packages_lab_guide.html`, `mystyle.css`
  - Directories: `activities/`, `assessments/`, `assignments/`, `css/`, `images/`, `main_pages/`
- **Documentation files**: All uppercase with underscores
  - Examples: `README.md`, `STYLE_GUIDE.md`, `RESOURCE_LINKS.md`
- **Filename tells the type**:
  | Pattern | Type | Directory |
  | :--- | :--- | :--- |
  | `*_activity.html` (no "lab") | Theory worksheet | `activities/` |
  | `*_lab_guide.html` or `*_lab_activity.html` | Lab/hands-on activity | `activities/` |
  | `*_assessment.html` (no "lab") | Theory assessment (interactive) | `assessments/` |
  | `*_lab_assessment.html` | Lab assessment (interactive) | `assessments/` |
  | `Grade{xi,xii}_assignment{N}.html` | Reflective assignment | `assignments/` |

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

## 📐 Layout & Structure (Main Pages)

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
```html
<div class="syllabus-item">
    <div class="syllabus-info">
        <h4>Unit Title</h4>
        <p>Description text...</p>
        <div class="syllabus-actions">
            <!-- Action buttons -->
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

| Type | CSS Class | Color | Button Label Pattern | Example |
| :--- | :--- | :--- | :--- | :--- |
| **Theory / worksheet** | `.activity` | Amber | `🧪 <Name>` + `📝 Test` | `🧪 App Packages  📝 Test` |
| **Hands-on lab** | `.lab-guide` | Green | `🧪 <Name> Lab` + `📝 Test` | `🧪 SQL Lab  📝 Test` |

- Activity name should be the **shortest possible identifier** for the topic (e.g., "CS Intro", "Sys & IO", "App Packages", "Web Tech I").
- Append **" Lab"** only for hands-on lab work. Theory/worksheet activities never get the "Lab" suffix.
- **All assessment btn_label is "Test"** — regardless of theory or lab. Never use "Assessment", "Quiz", "Lab Test", etc.

### Organizing Multiple Buttons

Group related items with `.action-group` and separate groups with `|` (`.action-separator`).

```html
<div class="syllabus-actions">
    <a href="#" class="action-btn handouts">📖 Handouts</a>
    <span class="action-separator">|</span>
    <div class="action-group">
        <a href="#" class="action-btn activity">🧪 DBMS</a>
        <a href="#" class="action-btn test-yourself">📝 Test</a>
    </div>
    <span class="action-separator">|</span>
    <div class="action-group">
        <a href="#" class="action-btn lab-guide">🧪 SQL Lab</a>
        <a href="#" class="action-btn test-yourself">📝 Test</a>
    </div>
</div>
```

### Status Badges
- **`.status-theory`**: Neutral gray for concept-heavy units.
- **`.status-practical`**: Light blue for hands-on units.

---

## 📥 Download Center

### Expandable Sections
```html
<details class="resource-section" open>
    <summary>Section Title</summary>
    <div class="resource-grid">
        <!-- Resource Boxes -->
    </div>
</details>
```

### Resource Box
- **Icons**: Background colors denote file types (Red for PDF, Blue for DOCX).
- **`.inline-download-btn`**: The primary CTA for file access.

---

## ⚠️ Alerts & Messages

- **`.welcome-text`**: Italicized, light gray background, blue left border.
- **`.alert-box`**: Default (Amber/Warning) for important notes.
- **`.alert-box.critical`**: Red background for mandatory requirements (like Lab Reports).

---

## 📱 Responsiveness

- Main containers use relative padding (`20px`).
- Grids (`.grid-2`) switch to single column at `768px`.
- Syllabus items stack vertically at `600px`.

---

## 🔗 Activity ↔ Assessment Relationship

Activity and Assessment are complementary pairs that build on each other:

- **Activity** (theory worksheet or lab guide) builds knowledge through interactive, playful exercises covering every important topic in the unit.
- **Assessment** (interactive canvas) tests the same content — the student who masters the activity will succeed in the assessment.
- Students should be able to **repeat the activity** as many times as they need until they feel confident.
- Activities should be **engaging and game-like**: MCQs, drag-and-sort, fill-in-blanks, matching, interactive challenges. Boring walls of text defeat the purpose.
- An activity + its assessment must cover the **same set of topics**. Nothing should appear in the test that wasn't practiced in the activity.

---

## 📄 Activity Page Standards

Activity pages live in `activities/` and link to `../css/activity.css`. There are two types: **theory worksheets** and **lab guides**.

### Header Format — Determined by Filename

**Theory worksheet** (`*_activity.html` — no "lab" in name):
```html
<header class="lab-header">
    <h1>Activity: <Topic></h1>
    <p class="subtitle">Short description of the topic</p>
    <span class="grade-badge">Grade XI • Computer Science</span>
</header>
```

**Lab/hands-on activity** (`*_lab_guide.html` or `*_lab_activity.html`):
```html
<header class="lab-header">
    <h1>Lab Activity: <Topic></h1>
    <p class="subtitle">Comprehensive Laboratory Work Guide</p>
    <span class="grade-badge">Grade XI • Computer Science</span>
</header>
```

### Inline `<style>` Discipline
- Only add rules for things NOT already in `activity.css`. Never override the shared stylesheet's classes.
- Use CSS custom properties (`var(--primary-color)`, `var(--text-muted)`, `var(--border-color)`) instead of hardcoded hex codes.
- Keep the `<style>` block minimal (under 20 rules).

### Content Structure (Theory Worksheets)
- Interactive exercises (MCQs, fill-in-blanks, matching, sorting, drag-and-drop style interactions).
- Hidden self-check answers use `<details>`/`<summary>` — never leave answers visible inline.
- Ordered steps use `<ol class="step-list">`; unordered items use plain `<ul>`.
- No CSS overrides that conflict with activity.css.

### Content Structure (Lab Guides)
- Setup/prerequisites section (if technical topic).
- Learning objectives (`.instruction-box.objective`).
- Conceptual walkthrough for technical topics.
- Activity sections with clear part/module divisions (`.section-title` with badge).
- Each part has numbered tasks with step-by-step instructions, expected outputs, and common pitfalls.
- Challenge/quiz section with collapsible solutions.

### General Rules (Both Types)
- Light theme only — no dark backgrounds, no custom dark overrides.
- Keep `<title>` short and descriptive, matching the `<h1>`.
- No HTML comments (`<!-- -->`).
- No code comments (`//`, `/* */`).
- Mobile responsive.
- Use semantic HTML.

---

## 🧪 Assessment Canvas Standards

Assessment pages live in `assessments/` and link to `../css/assessment.css`. Each assessment is an interactive, self-contained HTML canvas with scoring and Google Form submission.

### Inline `<style>` Discipline
- Only add rules for things NOT already in `assessment.css`. Never override the shared stylesheet's classes.
- Use CSS custom properties (`var(--primary)`, `var(--success)`, etc.) instead of hardcoded hex codes.

### Header Format — Determined by Filename
- `*_assessment.html` (no "lab") → `<h1>Assessment: <Topic></h1>`, subtitle describes the scope.
- `*_lab_assessment.html` → `<h1>Assessment: <Topic> Lab</h1>`.

### Entry Screen (Modal Overlay)
- Uses `celebration-overlay` / `celebration-card` classes.
- Three plain `<input>` fields: Full Name, Roll Number, Room Number.
- A single `.error-msg` div (`#entryError`) for validation feedback.
- A `.btn-primary` button (`#enterBtn`).
- Button uses `addEventListener`, not `onclick`.
- Validation shows/hides `#entryError`; no `alert()` calls.

### Workspace
- Status bar showing student name, roll, room, and live progress.
- **10–15 discrete assessment tasks**, each independently verifiable.
- Each task shows verified/unverified status (`.verification-text.verified` / `.verification-text.unverified` — never `feedback valid/invalid`).
- Overall progress bar tied to verified task count.

#### Task Language — No Buzzwords
- Use plain task descriptions: "Task 5: Spreadsheet Formula" not "Dynamic Multiplier Engine".
- Status text: "❌ Correct the typos" / "✅ Spelling corrected".

### Submission — Google Form

**Mandatory `SUBMISSION_CONFIG`:**
```javascript
const SUBMISSION_CONFIG = {
    url: "https://docs.google.com/forms/d/e/1FAIpQLSfGf84mAWH8lnGsDDXufaIsJhfzJ0YQ9jySZj9h5uarnr9uNg/formResponse",
    fields: {
        topic: "entry.1920009954",
        name: "entry.2015805623",
        roll: "entry.419024899",
        room: "entry.2086415032",  // Prepend grade: e.g., `XI - ${room}`
        status: "entry.1234471729",
        startTime: "entry.597147393",
        endTime: "entry.1045529602",
        elapsedTime: "entry.2019742758"
    }
};
```
- Use `fetch(url, { method: 'POST', mode: 'no-cors', body: formData })` — no hidden iframe or form element.

### Anti-Fraud Session Timing (Mandatory)
- **Start Time**: captured on entry modal submit, stored as a `Date`.
- **End Time**: captured on final submission trigger.
- **Elapsed Time**: `endTime - startTime` in ms.
- Formats:
  - Start/End: time-only, e.g. `"3:45:12 PM"` via `date.toLocaleTimeString('en-US', {hour:'numeric', minute:'2-digit', second:'2-digit', hour12:true})`.
  - Elapsed: `"4m 32s"` (or `"38s"` if under a minute).
- All three submitted to the form AND displayed on exit screen.

### Exit Screen
- Same `celebration-overlay` / `celebration-card` treatment.
- Heading: "🎉 Assessment Complete".
- Shows: Title/Topic, Student Name, Roll, Room, Score/Completion status, timing summary.
- "You may close this page."
- **No** "restart" or "try again" button — the session ends here.

---

## 📝 Assignment Standards

Assignment pages live in `assignments/` and link to `../css/assignment.css`.

### Basic Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grade {XI/XII} - {Assignment Type}</title>
    <link rel="stylesheet" href="../css/assignment.css">
</head>
<body>
    <main class="card">
        <!-- content -->
    </main>
</body>
</html>
```

### Header
- Page title: `Grade {XI/XII} · {Assignment Type} ({Subject if applicable})`
- Header emoji: Academic emojis (📘, 📗, 📝, 🔍, 🚀, 💡) or subject-specific.

### Content Sections
1. **Card badge**: short descriptor like `reflective essay · 5‑paragraph roadmap`
2. **Card title**: brief, descriptive title
3. **Card subtitle**: `Past ➔ Present ➔ Future` with `what · how · why` meta
4. **Three sections**: Past, Present, Future (all must be present)
5. **Roadmap**: 5-paragraph structure with subject-specific labels
6. **Commitment box**: Accountability pledge
7. **Global note**: Simple instruction at bottom

### Writing Style
- Clear, simple language suitable for school students.
- Avoid jargon unless subject-specific and necessary.
- Encouraging, supportive tone.
- Pill tags for key concepts.

---

## 🤖 Master Generation Prompt

Paste this prompt to the agent alongside reference materials (PDFs, notes, images). The agent will infer what to build from the attached resources — no back-and-forth needed.

### How to use

```
Read STYLE_GUIDE.md (attached) and the accompanying reference materials, then build
everything needed. Infer the topic, grade, resource types, and content from the files
provided. If unsure about something, make a reasonable default — do not ask me.
```

### Prompt text

```
You are building HTML resources for a Grade XI/XII Computer Science portal.
All standards are documented in STYLE_GUIDE.md (attached).

## Your task

Build the requested resource(s). Infer the topic, grade, and content from the
attached reference materials. If you are genuinely unsure (e.g. cannot determine
the grade, resource type, or topic from the files), ask me — otherwise proceed.

Resource type(s) to build (infer which from context, or build the full pair):
- _Activity_ (theory worksheet) → `activities/`, link `../css/activity.css`
- _Lab Guide_ (hands-on lab) → `activities/`, link `../css/activity.css`
- _Assessment_ (interactive canvas, theory) → `assessments/`, link `../css/assessment.css`
- _Lab Assessment_ (interactive canvas, lab) → `assessments/`, link `../css/assessment.css`
- _Assignment_ (reflective) → `assignments/`, link `../css/assignment.css`

## Rules to follow

### All pages
- File naming: all lowercase with underscores (e.g., `my_topic_activity.html`)
- `<!DOCTYPE html>` first line, `<html lang="en">`
- No HTML comments (`<!-- -->`), no code comments (`//`, `/* */`)
- Keep `<title>` short and matching the visible heading
- Light theme only — no dark backgrounds
- Mobile responsive
- One `</html>`, `</body>`, `</script>` each
- Keep emojis

### Activity / Lab Guide pages
- Activity and assessment are complementary pairs — the activity builds knowledge, the assessment tests it. Both must cover the same topics.
- Activities must be **interactive and playful**: MCQs, drag-and-sort, fill-in-blanks, matching, clickable challenges. No walls of text.
- Cover **every important topic** from the unit. Nothing in the assessment should be unseen in the activity.
- Students repeat activities until confident — make them engaging enough to want to.
- Follow the "Activity Page Standards" section in STYLE_GUIDE.md
- Link to `../css/activity.css`
- Inline `<style>` only for rules not in activity.css; under 20 rules
- Hidden self-check answers use `<details>`/`<summary>`
- Ordered steps use `<ol class="step-list">`
- No CSS overrides that conflict with shared stylesheets
- Use CSS custom properties instead of hardcoded hex colors

### Assessment pages
- Follow the "Assessment Canvas Standards" section in STYLE_GUIDE.md
- Link to `../css/assessment.css`
- Inline `<style>` only for rules not in assessment.css
- Entry modal: `celebration-overlay`/`celebration-card`, three inputs, `#entryError`, `#enterBtn`
- `addEventListener`, not `onclick`
- `SUBMISSION_CONFIG` object with url and fields (use the entry IDs from STYLE_GUIDE.md)
- `fetch(url, { method: 'POST', mode: 'no-cors', body: formData })`
- Session timing (start, end, elapsed) mandatory
- Plain task descriptions — no buzzwords
- `verification-text verified/unverified` status classes
- Exit screen: "🎉 Assessment Complete", summary, no restart button

### Assignment pages
- Follow the "Assignment Standards" section in STYLE_GUIDE.md
- Link to `../css/assignment.css`
- Three sections: Past, Present, Future
- Simple language for school students

## After building

Return the complete HTML file(s) ready to save into the appropriate directory.
```

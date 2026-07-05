# Master Prompt: Interactive Assessment Lab Canvas Generator

Use this prompt (paste it as-is into a new conversation, then attach the resource file) whenever a new interactive HTML lab canvas needs to be built.

---

## PROMPT TO PASTE

> I want you to build a self-contained interactive HTML lab/assessment canvas, following the established standards for my interactive learning tools.
>
> Before building, ask me for:
> 1. **Title / Topic** of this assessment (this is what distinguishes it from other assessments in the same grade's form log).
> 2. **Grade** (e.g., Grade XI or Grade XII).
> 3. The **attached resource file** (lab manual, syllabus, textbook chapter, notes, etc.) that the 7–10 assessment tasks should be derived from.
>
> Then build the canvas following the standards below, and ask me any clarifying questions you still have before writing code.

---

## ESTABLISHED STANDARDS

### 1. Externalized Core CSS
Core framework styles (modals, forms, buttons, progress bars) are provided in a shared file: `/css/assessment.css`.
- The generated HTML file must link to it: `<link rel="stylesheet" href="../css/assessment.css">`.
- Subject-specific layout or activity-unique styles should still be placed in an inline `<style>` block.

### 2. Light mode only
- Use a light palette: white/light-gray card backgrounds (`#ffffff`, `#f8fafc`), dark slate text (`#1e293b` / `#1f2937`), light borders (`#e2e8f0` / `#e5e7eb`).
- Never pair light text on light backgrounds or dark text on dark chrome — check every hardcoded color against the actual background it sits on, not just copy colors from a dark-theme reference.
- Accent/status colors (success green, error red, accent orange/indigo) stay consistent regardless of theme.

### 3. Entry screen — modal popup overlay
- A fixed, full-viewport overlay (`position: fixed`, translucent dark backdrop `rgba(15,23,42,0.75-0.8)`, flex-centered) containing a centered white card (`celebration-overlay` / `celebration-card` pattern, rounded ~16px corners, pop-in scale animation).
- Collects: **Full Name**, **Roll Number**, **Room Number** — all required, with inline validation/error messages, before entry is allowed.
- The underlying canvas/workspace exists in the DOM behind the overlay but is inert until the overlay is dismissed.

### 4. Workspace
- Sidebar or top status bar showing student name, roll, room, and live progress (e.g. `Progress: X/N Completed`).
- **10–15 discrete assessment tasks, covering all topics in the attached resource file**, each independently interactive and independently verified (quiz/multiple-choice, code/text input, drag-drop, formula input, etc. — pick what fits the subject).
- Each task shows a clear verified/unverified status indicator (checkmark, color change, status text) as soon as the person's input satisfies the validation rule.
- A visible overall progress bar/percentage tied to the count of verified tasks.

### 5. Submission — Unified Google Form
All assessments now submit to a single master Google Form. To distinguish between grades, **prepend the Grade to the Room Number** field during submission (e.g., "XII - 101").

**Mandatory JS Configuration Object**:
The generated code must use a structured object for submission parameters to ensure accuracy and easy maintenance:

```javascript
const SUBMISSION_CONFIG = {
    url: "https://docs.google.com/forms/d/e/1FAIpQLSfGf84mAWH8lnGsDDXufaIsJhfzJ0YQ9jySZj9h5uarnr9uNg/formResponse",
    fields: {
        topic: "entry.1920009954",
        name: "entry.2015805623",
        roll: "entry.419024899",
        room: "entry.2086415032", // Prepend grade: e.g., `XII - ${room}`
        status: "entry.1234471729",
        startTime: "entry.597147393",
        endTime: "entry.1045529602",
        elapsedTime: "entry.2019742758"
    }
};
```

**Submission Method**: Use `fetch(..., {method:'POST', mode:'no-cors'})` using `FormData` or a hidden iframe POST.

> ⚠️ Double-check entry-ID-to-field mapping against the reference URL before shipping — a wrong mapping is easy to miss since the form still "submits successfully."

### 5b. Anti-fraud: session timing (mandatory)
Students can inspect the network request and fabricate a fake submission directly, so every canvas must capture and transmit timing data as a basic tamper signal for manual review:

- **Start Time**: captured the moment the entry modal is submitted (name/roll/room accepted), stored as a `Date` in a `sessionTiming` state object.
- **End Time**: captured the moment the student triggers final submission.
- **Elapsed Time**: computed as `endTime - startTime` in ms.
- **Formats**:
  - Start/End Time: time-only, e.g. `"3:45:12 PM"` — via `date.toLocaleTimeString('en-US', {hour:'numeric', minute:'2-digit', second:'2-digit', hour12:true})`.
  - Elapsed Time: human readable, e.g. `"4m 32s"` (or `"38s"` if under a minute).
- All three values are (a) submitted to the form using the timing entry IDs above, and (b) also displayed to the student on the exit screen for transparency.

### 6. Exit screen — modal popup, terminal (no restart/loop)
- Same overlay/card visual treatment as the entry screen.
- Shows a congratulatory message plus a summary: Title/Topic, Student Name, Roll, Room, Score/Completion status.
- **Must not** offer a "restart" or "try again" button that resets state and loops back to the entry screen. The session ends here.
- The overlay backdrop blocks interaction with the workspace underneath, so the page effectively "ends" at this screen.

---

## WHAT TO CONFIRM WITH ME IF UNCLEAR
- What task types best fit the subject matter in the attached resource (quiz vs. code vs. simulated-software interaction, etc.).
- Any subject-specific simulated UI needed (e.g. simulated text editor, spreadsheet, terminal) — base this on what the resource file actually covers.

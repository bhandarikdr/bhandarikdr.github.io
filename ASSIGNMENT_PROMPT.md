# Assignment Standards & Generation Prompt

## HTML Structure Standards

### Basic Structure
- Use `<!DOCTYPE html>` with `lang="en"`
- Include viewport meta tag for responsiveness
- Link to `../css/assignment.css`
- Use generic `<main class="card">` for all assignments

### Header Format
- Page title: `Grade {XI/XII} · {Assignment Type} ({Subject if applicable})`
- Header emoji: Academic emojis for general assignments (📘, 📗, etc.)
- Subtitle: `Grade {11/12} · {Focus/Track}`

### Content Structure
1. **Card badge**: `reflective essay · 5‑paragraph roadmap`
2. **Card title**: Brief, descriptive title
3. **Card subtitle**: `Past ➔ Present ➔ Future` with `what · how · why` meta
4. **Three sections**: Past, Present, Future (all must be present)
5. **Roadmap**: 5-paragraph structure with subject-specific labels
6. **Commitment box**: Accountability pledge
7. **Global note**: Simple instruction at bottom

### Section Guidelines
- **Past section**: Focus on foundations, what was done, why it mattered
- **Present section**: Current state, what's working, what needs change
- **Future section**: Goals, strategies, motivation
- Each section should have WHAT/HOW/WHY questions as appropriate
- Include relevant pill tags for key concepts

### Writing Style
- Keep descriptions brief and simple
- Use clear, easy-to-understand language for school students
- Avoid jargon unless subject-specific and necessary
- Use encouraging, supportive tone

### Emoji Usage
- Academic emojis for general assignments: 📘, 📗, 📝, 🔍, 🚀, 💡
- Subject-specific emojis can be used for technical subjects
- Keep emoji usage consistent within each assignment

---

## Assignment Generation Prompt

Use the following prompt to create new assignment HTML files:

```
Create a Grade {GRADE} assignment HTML file following these specifications:

**Grade:** {GRADE - XI or XII}
**Subject:** {SUBJECT NAME or "General" if not subject-specific}
**Assignment Focus:** {BRIEF DESCRIPTION OF ASSIGNMENT FOCUS}
**Target Audience:** School students (keep language simple and clear)

**Requirements:**
1. Use the standard HTML structure from ASSIGNMENT_PROMPT.md
2. Include all three sections: Past, Present, Future
3. Create subject-specific 5-paragraph roadmap labels
4. Write brief, simple instructions suitable for students
5. Use appropriate emojis (academic for general, subject-specific for technical)
6. Include relevant pill tags for key concepts
7. Add accountability pledge at the end
8. Keep the overall tone encouraging and supportive

**Content Focus:**
- Past: What foundations/experiences students bring
- Present: Current situation, what's working, challenges
- Future: Goals, strategies, motivation, vision

**File naming:** Grade{GRADE}_Assignment{NUMBER}.html
```

---

## Example Usage

**Input:**
```
Grade: XII
Subject: Computer Science
Assignment Focus: Reflective essay on programming journey
```

**Output:** GradeXII_Assignment1.html with CS-specific content, technical emojis, and programming-themed roadmap labels.

---

## File Location
- Save assignment files in: `/assignments/` folder
- Reference CSS: `../css/assignment.css`
- Follow naming convention: `Grade{XI/XII}_Assignment{NUMBER}.html`

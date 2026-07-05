# Lab Guide Standardization & Prompt Template

## Analysis of Current Activity Files

### Core Rules

#### 1. **Filename tells the type — heading must match**
The filename determines whether this is a theory worksheet or a lab activity, and the `<title>` and `<h1>` must be consistent:
- `_Activity.html` (no "lab") → **Theory worksheet** → heading: `Activity: <Topic>`, subtitle: a plain description (never "Comprehensive Laboratory Work Guide").
- `_lab_guide.html` or `_Lab_Activity.html` → **Lab/hands-on activity** → heading: `Lab Activity: <Topic>`, subtitle: `Comprehensive Laboratory Work Guide`.
- This applies to both the `<title>` tag and the visible `<h1>` heading.

#### 2. **Global light theme — no custom dark overrides**
All pages use the shared light theme from `activity.css`. The inline `<style>` block must:
- Only add rules for things NOT already in `activity.css` (e.g. `.data-table`, `.question-block`, `.inline-answer`).
- Never override `activity.css` classes with custom colors, gradients, dark backgrounds, or layout values.
- Use CSS custom properties (`var(--primary-color)`, `var(--text-muted)`, `var(--border-color)`) instead of hardcoded hex codes wherever possible.
- Keep the style block minimal — aim for under 20 rules.

#### 3. **Structure Variations**
- **Application Packages Guide**: Uses numbered questions (Q. No. 1, 2, 3...) within parts
- **SQL Commands Guide**: Uses step-based approach (Step 1.1, 2.1...) without question numbers
- **Inconsistent section naming**: Some use "Part 1", others use "Setup", "Part 1", "Part 2"

#### 3. **Content Depth**
- **Application Packages**: Very detailed with specific formatting requirements, formulas, and sub-tasks
- **SQL Commands**: More concise with setup instructions, but lacks practical examples in the main guide
- **Missing walkthrough sections**: Neither has conceptual walkthroughs before practical tasks

#### 4. **Assessment Alignment**
- **Application Packages Assessment**: 10 canvas tasks aligned with guide questions
- **SQL Commands Assessment**: 10 sequential tasks following a step-by-step approach
- **Different assessment philosophies**: One tests knowledge, the other tests execution

#### 5. **CSS Class Usage**
- **Inconsistent class naming**: `quiz-question`, `step-list`, `instruction-box` used differently
- **Custom inline styles**: Application Packages has extensive inline styles that should be in CSS
- **Missing utility classes**: Some files use `mt-4`, `mb-4` while others don't

#### 6. **Learning Progression**
- **No prerequisite checks**: Neither guide checks if students have necessary background knowledge
- **Missing difficulty indicators**: No clear indication of task complexity
- **No estimated time**: Students don't know how long activities should take

---

## Standardized Lab Guide Structure

### Required Sections (In Order)

#### 1. **Header Section**
Use the heading format that matches the filename (see Core Rule 1 above):

**For a theory worksheet** (`_Activity.html` — no "lab" in name):
```html
<header>
    <h1>Activity: [Topic Name]</h1>
    <p class="subtitle">[Short description of the topic, e.g. "Understanding database keys and ER diagrams"]</p>
    <p class="grade-badge">Grade [XI/XII] &bull; Computer Science</p>
</header>
```

**For a lab/hands-on activity** (`_lab_guide.html` or `_Lab_Activity.html`):
```html
<header>
    <h1>Lab Activity: [Topic Name]</h1>
    <p class="subtitle">Comprehensive Laboratory Work Guide</p>
    <p class="grade-badge">Grade [XI/XII] &bull; Computer Science</p>
</header>
```

#### 2. **Prerequisites & Setup (If Applicable)**
- Required software/tools
- Installation steps
- Environment configuration
- Pre-lab knowledge requirements

#### 3. **Learning Objectives**
- Clear, measurable objectives
- Skills students will gain
- Real-world applications

#### 4. **Conceptual Walkthrough (For Technical Topics)**
- Brief theory overview
- Key concepts explained
- Visual diagrams/flowcharts
- Common pitfalls to avoid
- Best practices

#### 5. **Activity Sections**
- Organized by logical parts/modules
- Each part has:
  - Clear section title with badge
  - Learning focus for that part
  - Numbered tasks/questions
  - Step-by-step instructions
  - Expected outputs
  - Common mistakes

#### 6. **Challenge/Quiz Section**
- Practical challenges
- Multiple-choice questions
- Problem-solving scenarios
- Solutions hidden in collapsible sections

#### 7. **Assessment Preparation**
- What will be tested in the interactive assessment
- Key points to remember
- Practice recommendations

#### 8. **Footer**
- Completion checklist
- Next steps
- Additional resources

---

## Standardized CSS Classes

### Core Structure Classes
- `.container` - Main wrapper
- `.section-title` - Section headers with badge
- `.badge` - Section/part identifier
- `.instruction-box` - Task containers
- `.instruction-box.objective` - Learning objectives
- `.step-list` - Ordered task steps
- `.quiz-container` - Quiz/challenge wrapper
- `.quiz-card` - Individual quiz items
- `.quiz-question` - Question text
- `.quiz-options` - Multiple-choice options
- `.answer-key` - Hidden solutions

### Content Classes
- `.text-box` - Sample content/formatted text
- `.formula` - Code/formula snippets (purple gradient styling)
- `.highlight` - Text highlighting (golden yellow gradient for emphasis)
- `.notice-logo` - Image placeholders
- `.pre` - Code blocks
- `.code` - Inline code

### Utility Classes
- `.mt-4` - Margin top 1rem
- `.mb-4` - Margin bottom 1rem
- `.text-small` - Smaller text
- `.text-center` - Center alignment

---

## Comprehensive Prompt Template

### Lab Guide Generation Prompt

```
You are an expert educational content creator for Computer Science lab activities at the high school level (Grades XI and XII). Your task is to create a comprehensive, standardized lab guide following the structure below.

## Required Information (Please Provide)

1. **Topic Name**: [e.g., SQL Commands, Web Development, C Programming]
2. **Grade Level**: [XI or XII]
3. **Topic Category**: [e.g., Database Management, Web Technologies, Programming Fundamentals]
4. **Prerequisite Knowledge**: [What students should already know]
5. **Software/Tools Required**: [List all necessary tools]
6. **Learning Duration**: [Estimated time for completion]
7. **Difficulty Level**: [Beginner/Intermediate/Advanced]
8. **Number of Activity Parts**: [How many main sections]
9. **Special Requirements**: [e.g., "Include walkthrough section", "Focus on practical skills", "Include theory explanations"]
10. **Assessment Type**: [Knowledge-based or Execution-based]
11. **Additional Resources**: [Any reference materials, links, or specific content to include]

## Standard Structure Requirements

### 1. HTML Document Structure
- Use HTML5 doctype
- Link to `../css/activity.css` (includes standard classes like `.highlight`, `.formula`, etc.)
- **Inline `<style>` discipline**: Only add CSS rules for things NOT already in `activity.css`. Never override the shared stylesheet's classes with custom colors, gradients, or dark backgrounds. Use CSS custom properties (`var(--primary-color)`, `var(--text-muted)`, `var(--border-color)`) instead of hardcoded hex codes.
- Keep the `<style>` block under 20 rules. If you need more, the rule should probably be in the shared stylesheet instead.
- Use semantic HTML elements
- Ensure mobile responsiveness

### 2. Header Section
- Title: "Lab Activity: [Topic Name]"
- Subtitle: "Comprehensive Laboratory Work Guide"
- Grade badge: "Grade [XI/XII] • Computer Science"

### 3. Setup/Prerequisites Section (If Technical Topic)
If this is a technical topic requiring software setup:
- Create a "Setup" section with badge
- Include step-by-step installation instructions
- Provide verification steps to confirm setup
- Add troubleshooting tips for common issues

### 4. Learning Objectives Section
- Create an objective box using `.instruction-box.objective`
- List 3-5 clear, measurable learning objectives
- Include real-world application context

### 5. Conceptual Walkthrough Section (For Technical Topics)
If requested or if topic is technical (Web Development, C Programming, etc.):
- Create a "Concept Overview" section before practical tasks
- Explain key concepts in simple terms
- Include code examples with explanations
- Add visual descriptions for complex concepts
- List common mistakes and how to avoid them
- Provide best practices

### 6. Activity Sections
For each part/module:
- Use `.section-title` with badge (Part 1, Part 2, etc.)
- Create individual tasks using `.instruction-box`
- Use consistent numbering (Q. No. 1, 2, 3... or Step 1.1, 1.2...)
- Include:
  - Clear task description
  - Step-by-step instructions
  - Sample data/content where applicable
  - Expected outputs
  - Formulas/code snippets in `.formula` or `<pre>` tags
  - Tables for structured data using standard table styling

### 7. Challenge/Quiz Section
- Create a "Challenge" or "Quiz" section
- Include 3-5 practical challenges or multiple-choice questions
- Use `.quiz-container` and `.quiz-card` classes
- Hide solutions in `<details>` and `<summary>` tags
- Label solutions clearly

### 8. Footer Section
- Completion checklist
- Next steps/recommendations
- Professional closing message

## Content Guidelines

### Writing Style
- Use clear, concise language - avoid wordy explanations and unnecessary clutter
- Write in active voice
- Define technical terms on first use
- Use consistent terminology throughout
- Address the student directly ("you", "your")
- Keep instructions brief and focused - students should not feel bored by excessive text

### Code/Formula Formatting
- Use `<pre>` for multi-line code blocks
- Use `.formula` class for inline code snippets
- Include comments in code examples
- Show expected output where applicable

### Visual Elements
- Use tables for structured data
- Include placeholder images with descriptive alt text
- Use consistent spacing and alignment
- Apply appropriate CSS classes for styling

### Difficulty Progression
- Start with simpler tasks
- Gradually increase complexity
- Provide scaffolding for difficult concepts
- Include optional challenge tasks for advanced students

## Quality Checklist

Before finalizing, ensure:
- [ ] All required sections are present
- [ ] CSS classes are used consistently
- [ ] Code examples are accurate and tested
- [ ] Instructions are clear and unambiguous
- [ ] Spelling and grammar are correct
- [ ] Links and references are valid
- [ ] Mobile responsiveness is maintained
- [ ] Grade level appropriateness is maintained
- [ ] Estimated time is realistic
- [ ] Learning objectives are achievable

## Special Instructions for Different Topics

### For Web Development Topics
- Include HTML/CSS/JavaScript code examples
- Explain browser rendering concepts
- Provide responsive design principles
- Include debugging tips
- Add browser compatibility notes

### For C Programming Topics
- Include memory management explanations
- Explain pointer concepts clearly
- Provide compilation instructions
- Add common error scenarios
- Include optimization tips

### For Database Topics
- Include SQL syntax explanations
- Explain relational concepts
- Provide sample database schemas
- Add query optimization tips
- Include data integrity considerations

### For Application Packages (Office Tools)
- Include specific software version notes
- Provide keyboard shortcuts
- Explain formatting principles
- Add productivity tips
- Include cross-platform notes

## Output Format

Provide the complete HTML file content that can be directly saved as `[topic]_lab_guide.html` in the `/activities/` directory. Ensure all CSS classes are properly applied and the file is ready for immediate use.

---

## Example Usage

**User Input:**
```
Topic: Web Development Fundamentals
Grade: XI
Category: Web Technologies
Prerequisites: Basic HTML knowledge
Tools: VS Code, Chrome Browser
Duration: 2 hours
Difficulty: Intermediate
Parts: 3
Special: Include walkthrough section
Assessment: Knowledge-based
Resources: None
```

**Expected Output:**
Complete HTML file following the structure above with:
- Setup section for VS Code and browser
- Conceptual walkthrough of HTML/CSS/JavaScript
- 3 activity parts covering HTML structure, CSS styling, JavaScript basics
- Challenge section with practical tasks
- Proper CSS class usage throughout
- Grade XI appropriate content
```

---

## Assessment File Alignment

When creating the corresponding assessment file in `/assessments/`:

### For Knowledge-Based Assessments (like Application Packages)
- Create 10 canvas tasks testing key concepts
- Use multiple-choice, fill-in-blank, matching formats
- Include visual verification where possible
- Track score in real-time
- Submit to Google Forms

### For Execution-Based Assessments (like SQL Commands)
- Create sequential task-based assessment
- Use code editor interface
- Provide real-time feedback
- Simulate actual environment
- Track completion progress
- Submit timing and completion data

### Standard Assessment Elements
- Student authentication (name, roll, room)
- Progress tracking
- Real-time score display
- Final submission screen
- Google Forms integration
- Timing metrics

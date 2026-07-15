let assessmentTasks = [];
let currentTaskIndex = 0;
let studentData = { name: '', roll: '', room: '', startTime: null };
let sessionState = [];

const SUBMISSION_CONFIG = {
    url: "https://docs.google.com/forms/d/e/1FAIpQLSfGf84mAWH8lnGsDDXufaIsJhfzJ0YQ9jySZj9h5uarnr9uNg/formResponse",
    fields: {
        topic: "entry.1920009954",
        name: "entry.2015805623",
        roll: "entry.419024899",
        room: "entry.2086415032",
        status: "entry.1234471729",
        startTime: "entry.597147393",
        endTime: "entry.1045529602",
        elapsedTime: "entry.2019742758"
    }
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initStepper() {
    const stepper = document.getElementById('stepper');
    if (!stepper) return;
    stepper.innerHTML = assessmentTasks.map((_, i) => `<div class="step-dot" id="dot-${i}"></div>`).join('');
    updateStepper();
}

function updateStepper() {
    assessmentTasks.forEach((_, i) => {
        const dot = document.getElementById(`dot-${i}`);
        if (!dot) return;
        dot.className = 'step-dot';
        if (i === currentTaskIndex) dot.classList.add('active');
        if (sessionState[i] && sessionState[i].verified) dot.classList.add('verified');
    });
}

function updateProgress() {
    const completed = sessionState.filter(s => s.verified).length;
    const countEl = document.getElementById('progressCount');
    if (countEl) countEl.textContent = completed;
    const barEl = document.getElementById('progressBar');
    if (barEl) barEl.style.width = `${(completed / assessmentTasks.length) * 100}%`;
}

function showError(msg) {
    const err = document.getElementById('taskError');
    if (!err) return;
    err.textContent = `❌ ${msg}`;
    err.style.display = 'block';
    setTimeout(() => { err.style.display = 'none'; }, 3000);
}

function handleSuccess() {
    const status = document.getElementById('verifyStatus');
    const card = document.querySelector('.task-card-active');

    sessionState[currentTaskIndex].verified = true;
    if (status) {
        status.className = 'verification-text verified';
        status.innerHTML = '<span>✅</span> Verified';
    }
    if (card) card.classList.add('success-pulse');

    updateProgress();
    updateStepper();

    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.classList.remove('btn-secondary');
        nextBtn.classList.add('btn-success');
    }
}

function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
}

function formatElapsed(ms) {
    const totalSec = Math.round(ms / 1000);
    if (totalSec < 60) return `${totalSec}s`;
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}m ${sec}s`;
}

function renderTask() {
    const task = assessmentTasks[currentTaskIndex];
    const container = document.getElementById('taskWorkspace');
    if (!container) return;
    container.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'task-card task-card-active';

    let interactionHtml = '';

    let tableHtml = '';
    if (task.table) {
        tableHtml = `<table class="db-table-mini">
            ${task.table.map((row, r) => `<tr>${row.map(cell => r === 0 ? `<th>${cell}</th>` : `<td>${cell}</td>`).join('')}</tr>`).join('')}
        </table>`;
    }

    let codeSnippetHtml = '';
    if (task.codeSnippet) {
        codeSnippetHtml = `<pre class="code-snippet">${task.codeSnippet}</pre>`;
    }

    if (task.type === 'mcq') {
        const shuffledOptions = task.options.map((opt, i) => ({ text: opt, originalIdx: i }));
        shuffleArray(shuffledOptions);
        interactionHtml = `
            <div class="option-grid">
                ${shuffledOptions.map((opt) => `
                    <div class="interactive-option" data-idx="${opt.originalIdx}">
                        <div class="radio-circle"></div>
                        <span>${opt.text}</span>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (task.type === 'matching') {
        const terms = task.pairs.map(p => p.term);
        const descs = task.pairs.map(p => p.desc);
        shuffleArray(descs);
        interactionHtml = `
            <div class="matching-container">
                ${terms.map((term, i) => `
                    <div class="matching-row">
                        <span>${term}:</span>
                        <select class="match-select" data-term="${term}">
                            <option value="">Select description...</option>
                            ${descs.map(d => `<option value="${d}">${d}</option>`).join('')}
                        </select>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (task.type === 'drag-order' || task.type === 'order') {
        const items = task.items || task.options;
        const shuffledItems = items.map((item, i) => ({ text: item, originalIdx: i }));
        shuffleArray(shuffledItems);
        interactionHtml = `
            <div class="drag-order-list" id="dragList">
                ${shuffledItems.map((item) => `
                    <div class="drag-item" draggable="true" data-idx="${item.originalIdx}">
                        <span class="drag-handle">⠿</span>
                        <span class="drag-text">${item.text}</span>
                    </div>
                `).join('')}
            </div>
            <p class="drag-hint-text">${task.dragHint || 'Drag items to reorder into the correct sequence.'}</p>
        `;
    } else if (task.type === 'text-input' || task.type === 'text') {
        interactionHtml = `
            <div class="text-input-area">
                <input type="text" id="textAnswer" class="text-answer-input" placeholder="${task.placeholder || 'Type your answer here...'}" autocomplete="off">
            </div>
        `;
    } else if (typeof renderCustomTask === 'function') {
        interactionHtml = renderCustomTask(task);
    }

    const taskLabel = (typeof getTaskLabel === 'function') ? getTaskLabel() : "Task";

    card.innerHTML = `
        <div class="task-header">
            <span class="task-num">${taskLabel} ${currentTaskIndex + 1} of ${assessmentTasks.length}</span>
            <div class="verification-text unverified" id="verifyStatus">
                <span class="status-icon">○</span> Unverified
            </div>
        </div>
        <div class="task-question">${task.question}</div>
        ${tableHtml}
        ${codeSnippetHtml}
        <div id="interactionArea">${interactionHtml}</div>
        <div class="feedback-msg error" id="taskError"></div>
        <div class="btn-row">
            <button class="btn btn-primary" id="verifyBtn">Verify Answer</button>
            <button class="btn btn-secondary" id="nextBtn" disabled>Next →</button>
        </div>
    `;

    container.appendChild(card);
    setupInteractions(card, task);

    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentTaskIndex < assessmentTasks.length - 1) {
                currentTaskIndex++;
                renderTask();
            } else {
                showFinalSubmission();
            }
        });
    }
}

function setupInteractions(card, task) {
    const verifyBtn = card.querySelector('#verifyBtn');
    if (!verifyBtn) return;

    if (task.type === 'mcq') {
        let selectedIdx = null;
        const options = card.querySelectorAll('.interactive-option');
        options.forEach(el => {
            el.addEventListener('click', () => {
                options.forEach(opt => opt.classList.remove('selected'));
                el.classList.add('selected');
                selectedIdx = parseInt(el.dataset.idx);
            });
        });

        verifyBtn.addEventListener('click', () => {
            if (selectedIdx === null) {
                showError("Please select an option first.");
                return;
            }
            if (selectedIdx === task.answer) handleSuccess();
            else showError(task.hint || "Incorrect. Try again.");
        });
    } else if (task.type === 'matching') {
        verifyBtn.addEventListener('click', () => {
            const selects = card.querySelectorAll('.match-select');
            let allCorrect = true;
            let anyEmpty = false;
            selects.forEach(sel => {
                const term = sel.dataset.term;
                const val = sel.value;
                if (!val) anyEmpty = true;
                const correctDesc = task.pairs.find(p => p.term === term).desc;
                if (val !== correctDesc) allCorrect = false;
            });
            if (anyEmpty) {
                showError("Please complete all matches.");
                return;
            }
            if (allCorrect) handleSuccess();
            else showError(task.hint || "One or more matches are incorrect.");
        });
    } else if (task.type === 'drag-order' || task.type === 'order') {
        const dragList = card.querySelector('#dragList');
        let draggedEl = null;

        dragList.addEventListener('dragstart', (e) => {
            draggedEl = e.target.closest('.drag-item');
            if (draggedEl) {
                draggedEl.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
            }
        });

        dragList.addEventListener('dragover', (e) => {
            e.preventDefault();
            const target = e.target.closest('.drag-item');
            if (target && target !== draggedEl) {
                const rect = target.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;
                if (e.clientY < midY) {
                    dragList.insertBefore(draggedEl, target);
                } else {
                    dragList.insertBefore(draggedEl, target.nextSibling);
                }
            }
        });

        dragList.addEventListener('dragend', () => {
            if (draggedEl) draggedEl.classList.remove('dragging');
            draggedEl = null;
        });

        verifyBtn.addEventListener('click', () => {
            const items = dragList.querySelectorAll('.drag-item');
            const currentOrder = Array.from(items).map(el => parseInt(el.dataset.idx));
            const correctOrder = (task.items || task.options).map((_, i) => i);
            if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
                handleSuccess();
            } else {
                showError(task.hint || "The order is incorrect. Try again.");
            }
        });
    } else if (task.type === 'text-input' || task.type === 'text') {
        const input = card.querySelector('#textAnswer');
        verifyBtn.addEventListener('click', () => {
            const val = input.value.trim().toLowerCase();
            if (!val) {
                showError("Please enter an answer.");
                return;
            }
            const accepted = (task.acceptedAnswers || [task.answer]).map(a => a.toString().toLowerCase());
            if (accepted.includes(val)) {
                handleSuccess();
            } else {
                showError(task.hint || "Incorrect. Try again.");
            }
        });
    } else if (typeof setupCustomInteractions === 'function') {
        setupCustomInteractions(card, task, verifyBtn);
    }
}

function showFinalSubmission() {
    const endTime = new Date();
    const elapsedMs = endTime - studentData.startTime;
    const elapsedStr = formatElapsed(elapsedMs);
    const completed = sessionState.filter(s => s.verified).length;

    const topicTitle = document.querySelector('header h1').textContent.replace('Assessment: ', '');

    const summary = `
        <strong>Topic:</strong> ${topicTitle}<br>
        <strong>Student:</strong> ${studentData.name}<br>
        <strong>Roll:</strong> ${studentData.roll} | <strong>Room:</strong> ${studentData.room}<br>
        <strong>Time Taken:</strong> ${elapsedStr}<br>
        <strong>Score:</strong> ${completed}/${assessmentTasks.length}
    `;

    const summaryContent = document.getElementById('summaryContent');
    if (summaryContent) summaryContent.innerHTML = summary;
    const exitOverlay = document.getElementById('exitOverlay');
    if (exitOverlay) exitOverlay.classList.remove('hidden');

    const gradePrefix = (document.querySelector('.grade-badge').textContent.includes('Grade XI')) ? 'XI' : 'XII';

    const formData = new FormData();
    formData.append(SUBMISSION_CONFIG.fields.topic, topicTitle + " Assessment");
    formData.append(SUBMISSION_CONFIG.fields.name, studentData.name);
    formData.append(SUBMISSION_CONFIG.fields.roll, studentData.roll);
    formData.append(SUBMISSION_CONFIG.fields.room, `${gradePrefix} - ${studentData.room}`);
    formData.append(SUBMISSION_CONFIG.fields.status, `${completed}/${assessmentTasks.length}`);
    formData.append(SUBMISSION_CONFIG.fields.startTime, formatTime(studentData.startTime));
    formData.append(SUBMISSION_CONFIG.fields.endTime, formatTime(endTime));
    formData.append(SUBMISSION_CONFIG.fields.elapsedTime, elapsedStr);

    fetch(SUBMISSION_CONFIG.url, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    });
}

function init(tasks) {
    assessmentTasks = tasks;
    sessionState = assessmentTasks.map(() => ({ verified: false }));

    const enterBtn = document.getElementById('enterBtn');
    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            const name = document.getElementById('inName').value.trim();
            const roll = document.getElementById('inRoll').value.trim();
            const room = document.getElementById('inRoom').value.trim();

            if (name && roll && room) {
                studentData = { name, roll, room, startTime: new Date() };
                const statName = document.getElementById('statName');
                if (statName) statName.textContent = name;
                const statRoll = document.getElementById('statRoll');
                if (statRoll) statRoll.textContent = `Roll: ${roll}`;
                const statRoom = document.getElementById('statRoom');
                if (statRoom) statRoom.textContent = `Room: ${room}`;

                const entryOverlay = document.getElementById('entryOverlay');
                if (entryOverlay) entryOverlay.classList.add('hidden');
                const workspace = document.getElementById('workspace');
                if (workspace) workspace.classList.remove('hidden');

                initStepper();
                renderTask();
            } else {
                const entryError = document.getElementById('entryError');
                if (entryError) entryError.style.display = 'block';
            }
        });
    }
}

// src/js/assessment-status.js
// Shared dashboard logic for assessment_status pages.
// Usage: initDashboard({ scriptUrl: '...', grade: 'XI' });

function initDashboard(config) {
    var SCRIPT_URL = config.scriptUrl;
    var GRADE = config.grade;

    var allData = [];
    var currentFilters = { topic: 'all', name: 'all', roll: '' };

    var loadingState = document.getElementById('loadingState');
    var errorState = document.getElementById('errorState');
    var dashboardContent = document.getElementById('dashboardContent');
    var errorMessage = document.getElementById('errorMessage');
    var emptyState = document.getElementById('emptyState');

    var topicFilter = document.getElementById('topicFilter');
    var nameFilter = document.getElementById('nameFilter');
    var topicInput = document.getElementById('topicInput');
    var nameInput = document.getElementById('nameInput');
    var topicList = document.getElementById('topicList');
    var nameList = document.getElementById('nameList');
    var rollFilter = document.getElementById('rollFilter');
    var resetBtn = document.getElementById('resetBtn');
    var retryBtn = document.getElementById('retryBtn');

    function getGradeFromRoom(roomStr) {
        return roomStr.split(' - ')[0].trim().toUpperCase();
    }

    async function fetchData() {
        loadingState.classList.remove('hidden');
        errorState.classList.add('hidden');
        dashboardContent.classList.add('hidden');

        try {
            var response = await fetch(SCRIPT_URL);
            if (!response.ok) throw new Error('HTTP ' + response.status);
            var json = await response.json();
            if (json.error) throw new Error(json.error);

            allData = (json.data || []).filter(function(d) {
                return getGradeFromRoom(d.roomNo) === GRADE;
            });

            document.getElementById('lastUpdated').textContent = json.generatedAt
                ? new Date(json.generatedAt).toLocaleString()
                : '—';

            populateFilters();
            resetFilters();
            loadingState.classList.add('hidden');
            dashboardContent.classList.remove('hidden');
        } catch (e) {
            loadingState.classList.add('hidden');
            errorState.classList.remove('hidden');
            errorMessage.textContent = 'Failed to load data: ' + e.message;
        }
    }

    function initCombo(input, hidden, list, options, allLabel, onChange) {
        function render(filterText) {
            var ft = (filterText || '').toLowerCase();
            var html = '<li class="combo-option all-option' + (hidden.value === 'all' ? ' selected' : '') + '" data-value="all">' + allLabel + '</li>';
            options.forEach(function(opt) {
                if (ft && opt.toLowerCase().indexOf(ft) === -1) return;
                var sel = hidden.value === opt ? ' selected' : '';
                html += '<li class="combo-option' + sel + '" data-value="' + opt.replace(/"/g, '&quot;') + '">' + opt + '</li>';
            });
            list.innerHTML = html;
        }

        input.addEventListener('focus', function() {
            render(input.value);
            list.classList.add('open');
        });

        input.addEventListener('input', function() {
            render(input.value);
            list.classList.add('open');
        });

        list.addEventListener('click', function(e) {
            var item = e.target.closest('.combo-option');
            if (!item) return;
            var val = item.getAttribute('data-value');
            hidden.value = val;
            input.value = val === 'all' ? '' : item.textContent;
            list.classList.remove('open');
            onChange(val);
        });

        input.addEventListener('keydown', function(e) {
            var items = list.querySelectorAll('.combo-option');
            var active = list.querySelector('.combo-option.active');
            var idx = Array.from(items).indexOf(active);

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (!list.classList.contains('open')) { render(input.value); list.classList.add('open'); }
                if (active) active.classList.remove('active');
                idx = idx < items.length - 1 ? idx + 1 : 0;
                items[idx].classList.add('active');
                items[idx].scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (active) active.classList.remove('active');
                idx = idx > 0 ? idx - 1 : items.length - 1;
                items[idx].classList.add('active');
                items[idx].scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (active) active.click();
            } else if (e.key === 'Escape') {
                list.classList.remove('open');
                input.blur();
            }
        });

        document.addEventListener('click', function(e) {
            if (!input.closest('.combo-wrap').contains(e.target)) {
                list.classList.remove('open');
            }
        });

        render('');
    }

    function populateFilters() {
        var topics = new Set();
        var names = new Set();
        allData.forEach(function(d) {
            topics.add(d.topic);
            names.add(d.studentName);
        });

        var topicOpts = Array.from(topics).sort();
        var nameOpts = Array.from(names).sort();

        initCombo(topicInput, topicFilter, topicList, topicOpts, 'All Topics', function(val) {
            currentFilters.topic = val;
            updateDashboard();
        });

        initCombo(nameInput, nameFilter, nameList, nameOpts, 'All Students', function(val) {
            currentFilters.name = val;
            updateDashboard();
        });
    }

    function getFilteredData() {
        var rollVal = rollFilter.value.trim().toLowerCase();
        return allData.filter(function(d) {
            if (currentFilters.topic !== 'all' && d.topic !== currentFilters.topic) return false;
            if (currentFilters.name !== 'all' && d.studentName !== currentFilters.name) return false;
            if (rollVal && d.rollNumber.toLowerCase() !== rollVal) return false;
            return true;
        });
    }

    function updateOverviewCards(filtered) {
        var uniqueStudents = new Set();
        filtered.forEach(function(d) {
            uniqueStudents.add(d.studentName.toLowerCase() + '|' + d.rollNumber);
        });
        document.getElementById('totalStudents').textContent = uniqueStudents.size;

        var totalScore = 0;
        var scoreCount = 0;
        var totalTimeMs = 0;
        var timeCount = 0;
        var completed = 0;
        filtered.forEach(function(d) {
            var parts = d.score.split('/');
            if (parts.length === 2) {
                var num = parseInt(parts[0], 10);
                var den = parseInt(parts[1], 10);
                if (!isNaN(num) && !isNaN(den) && den > 0) {
                    totalScore += (num / den) * 100;
                    scoreCount++;
                }
            }
            if (d.status === 'Completed') {
                completed++;
                var timeParts = d.elapsedTime.match(/(?:(\d+)h\s*)?(?:(\d+)m\s*)?(\d+)s/);
                if (timeParts) {
                    var h = parseInt(timeParts[1] || '0', 10);
                    var m = parseInt(timeParts[2] || '0', 10);
                    var s = parseInt(timeParts[3], 10);
                    totalTimeMs += (h * 3600 + m * 60 + s) * 1000;
                    timeCount++;
                }
            }
        });

        var avg = scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0;
        document.getElementById('avgScore').textContent = avg + '%';

        var avgMs = timeCount > 0 ? totalTimeMs / timeCount : 0;
        document.getElementById('avgTime').textContent = formatElapsed(avgMs);

        document.getElementById('completionRate').textContent = completed + '/' + filtered.length;
    }

    function formatElapsed(ms) {
        var totalSec = Math.round(ms / 1000);
        if (totalSec < 60) return totalSec + 's';
        var min = Math.floor(totalSec / 60);
        var sec = totalSec % 60;
        return min + 'm ' + sec + 's';
    }

    function updateTable(filtered) {
        var tbody = document.getElementById('tableBody');

        if (filtered.length === 0) {
            tbody.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }

        emptyState.classList.add('hidden');

        var sorted = filtered.slice().sort(function(a, b) {
            return new Date(b.timestamp) - new Date(a.timestamp);
        });

        var html = '';
        sorted.forEach(function(d, i) {
            var statusClass = d.status === 'Completed' ? 'status-completed' : 'status-incomplete';
            var statusIcon = d.status === 'Completed' ? '\u2705' : '\u23F3';
            var statusText = statusIcon + ' ' + d.status + ' (' + d.score + ')';
            var dateStr = d.timestamp ? new Date(d.timestamp).toLocaleDateString() : '—';

            html += '<tr>'
                + '<td class="col-sn">' + (i + 1) + '</td>'
                + '<td class="col-name">' + escapeHtml(d.studentName) + '</td>'
                + '<td class="col-roll">' + escapeHtml(d.rollNumber) + '</td>'
                + '<td class="col-topic">' + escapeHtml(d.topic) + '</td>'
                + '<td class="col-status"><span class="' + statusClass + '">' + statusText + '</span></td>'
                + '<td class="col-time">' + escapeHtml(d.elapsedTime) + '</td>'
                + '<td class="col-date">' + dateStr + '</td>'
                + '</tr>';
        });

        tbody.innerHTML = html;
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function updateDashboard() {
        var filtered = getFilteredData();
        updateOverviewCards(filtered);
        updateTable(filtered);
    }

    function resetFilters() {
        currentFilters = { topic: 'all', name: 'all', roll: '' };
        topicFilter.value = 'all';
        nameFilter.value = 'all';
        topicInput.value = '';
        nameInput.value = '';
        rollFilter.value = '';
        topicList.innerHTML = '';
        nameList.innerHTML = '';
        populateFilters();
        updateDashboard();
    }

    rollFilter.addEventListener('input', function() {
        updateDashboard();
    });

    resetBtn.addEventListener('click', resetFilters);
    retryBtn.addEventListener('click', fetchData);

    fetchData();
}

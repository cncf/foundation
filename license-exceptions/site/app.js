/**
 * CNCF License Exceptions - Client-side Application
 */

(function () {
    'use strict';

    const STATUS_META = {
        'approved': {
            label: 'Approved',
            cssClass: 'status-approved',
            glyph: '\u2713',
            description: 'Exception granted by the Governing Board',
            order: 1,
        },
        'denied': {
            label: 'Denied',
            cssClass: 'status-denied',
            glyph: '\u2715',
            description: 'Exception request denied',
            order: 2,
        },
        'not-eligible': {
            label: 'Not Eligible',
            cssClass: 'status-not-eligible',
            glyph: '\u2298',
            description: 'Not eligible for the exception process',
            order: 3,
        },
        'allowlisted': {
            label: 'Allowlisted',
            cssClass: 'status-allowlisted',
            glyph: '\u2714',
            description: 'License is on the CNCF allowlist \u2014 no exception needed',
            order: 4,
        },
        'apache-2.0': {
            label: 'Apache-2.0',
            cssClass: 'status-apache-2-0',
            glyph: '\u2714',
            description: 'Apache-2.0 licensed \u2014 no exception needed',
            order: 5,
        },
    };

    const ALL_PROJECTS = 'All CNCF Projects';
    const ALLOWLIST_POLICY_DATE = '2019-11-01';
    const NO_SCOPE_STATUSES = new Set(['denied', 'not-eligible']);
    const NO_EXCEPTION_STATUSES = new Set(['allowlisted', 'apache-2.0']);
    const COLUMN_COUNT = 7;
    const DEFAULT_SORT = 'date-desc';

    // Only bare owner/repo paths are safe to auto-link; anything with a
    // subpath or trailing description ("… documentation") would 404.
    const GITHUB_REPO_RE = /^github\.com\/[\w.-]+\/[\w.-]+$/;

    // Splits SPDX expressions into identifiers on operators, grouping and list separators.
    const LICENSE_TOKEN_RE = /\s+(?:AND|OR|WITH)\s+|[(),]|\s+\/\s+/;

    const URL_PARAMS = {
        search: 'q',
        licenseFilter: 'license',
        statusFilter: 'status',
        projectFilter: 'project',
        yearFilter: 'year',
        sortBy: 'sort',
    };

    // State
    let data = null;
    let filteredExceptions = [];
    let currentSort = { column: 'date', direction: 'desc' };

    // DOM Elements
    const elements = {
        search: document.getElementById('search'),
        licenseFilter: document.getElementById('license-filter'),
        statusFilter: document.getElementById('status-filter'),
        projectFilter: document.getElementById('project-filter'),
        yearFilter: document.getElementById('year-filter'),
        sortBy: document.getElementById('sort-by'),
        clearFilters: document.getElementById('clear-filters'),
        statusLegend: document.getElementById('status-legend'),
        resultsCount: document.getElementById('results-count'),
        projectNote: document.getElementById('project-note'),
        tableBody: document.getElementById('exceptions-tbody'),
        noResults: document.getElementById('no-results'),
        downloadCsv: document.getElementById('download-csv'),
        dataVersion: document.getElementById('data-version'),
        lastUpdated: document.getElementById('last-updated'),
    };

    function debounce(fn, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    async function init() {
        try {
            // Try same-directory first (deployed), fall back to parent (local dev)
            let response = await fetch('exceptions.json');
            if (!response.ok) {
                response = await fetch('../exceptions.json');
            }
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            data = await response.json();

            elements.dataVersion.textContent = data.version || '-';
            elements.lastUpdated.textContent = data.lastUpdated || '-';

            populateFilters();
            renderLegend();
            restoreStateFromUrl();
            applyFiltersAndRender();
            setupEventListeners();
            highlightDeepLink();
        } catch (error) {
            console.error('Failed to load data:', error);
            elements.tableBody.innerHTML = `
                <tr>
                    <td colspan="${COLUMN_COUNT}" class="error-cell">
                        Failed to load data. Please try refreshing the page.
                    </td>
                </tr>
            `;
            elements.resultsCount.textContent = 'Error loading data';
        }
    }

    function getStatusMeta(status) {
        return STATUS_META[status] || {
            label: status,
            cssClass: '',
            glyph: '',
            description: '',
            order: Number.MAX_SAFE_INTEGER,
        };
    }

    function normalizeProject(project) {
        if (!project) return [];
        if (Array.isArray(project)) return project;
        return [project];
    }

    function formatProject(project) {
        const projects = normalizeProject(project);
        if (projects.length === 0) return '-';
        return projects.join(', ');
    }

    function tokenizeLicense(license) {
        return String(license || '')
            .split(LICENSE_TOKEN_RE)
            .map(token => token.trim())
            .filter(Boolean);
    }

    function addOption(select, value, text) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        select.appendChild(option);
    }

    function populateFilters() {
        const licenseTokens = new Set();
        data.exceptions.forEach(e => tokenizeLicense(e.license).forEach(t => licenseTokens.add(t)));
        [...licenseTokens]
            .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
            .forEach(token => addOption(elements.licenseFilter, token, token));

        Object.entries(STATUS_META)
            .sort(([, a], [, b]) => a.order - b.order)
            .forEach(([key, meta]) => addOption(elements.statusFilter, key, meta.label));

        const projectSet = new Set();
        data.exceptions.forEach(e => {
            normalizeProject(e.project).forEach(p => projectSet.add(p));
        });
        [...projectSet].sort().forEach(project => addOption(elements.projectFilter, project, project));

        const years = [...new Set(
            data.exceptions
                .map(e => e.approvedDate ? e.approvedDate.split('-')[0] : null)
                .filter(Boolean)
        )].sort().reverse();
        years.forEach(year => addOption(elements.yearFilter, year, year));
    }

    function renderLegend() {
        elements.statusLegend.innerHTML = Object.entries(STATUS_META)
            .sort(([, a], [, b]) => a.order - b.order)
            .map(([key, meta]) => `
                <li class="legend-item">
                    ${renderBadge(key)}
                    <span class="legend-description">${escapeHtml(meta.description)}</span>
                </li>
            `).join('');
    }

    function restoreStateFromUrl() {
        const params = new URLSearchParams(window.location.search);

        Object.entries(URL_PARAMS).forEach(([elementKey, param]) => {
            if (!params.has(param)) return;
            const value = params.get(param);
            const el = elements[elementKey];
            if (el.tagName === 'SELECT') {
                if (el.querySelector(`option[value="${cssEscape(value)}"]`)) {
                    el.value = value;
                }
            } else {
                el.value = value;
            }
        });

        applySortValue(elements.sortBy.value);
    }

    function syncStateToUrl() {
        const params = new URLSearchParams();
        Object.entries(URL_PARAMS).forEach(([elementKey, param]) => {
            const value = elements[elementKey].value.trim();
            if (!value) return;
            if (param === 'sort' && value === DEFAULT_SORT) return;
            params.set(param, value);
        });

        const query = params.toString();
        const url = `${window.location.pathname}${query ? '?' + query : ''}${window.location.hash}`;
        window.history.replaceState(null, '', url);
    }

    function applySortValue(value) {
        const separator = value.lastIndexOf('-');
        if (separator === -1) return;
        const column = value.slice(0, separator);
        const direction = value.slice(separator + 1);
        if (direction !== 'asc' && direction !== 'desc') return;
        currentSort = { column, direction };
    }

    function applyFiltersAndRender() {
        const searchTerm = elements.search.value.toLowerCase().trim();
        const licenseFilter = elements.licenseFilter.value;
        const statusFilter = elements.statusFilter.value;
        const projectFilter = elements.projectFilter.value;
        const yearFilter = elements.yearFilter.value;

        filteredExceptions = data.exceptions.filter(exc => {
            if (searchTerm) {
                const searchableText = [
                    exc.package,
                    exc.license,
                    exc.status,
                    getStatusMeta(exc.status).label,
                    exc.scope || '',
                    normalizeProject(exc.project).join(' '),
                    exc.comment || ''
                ].join(' ').toLowerCase();

                if (!searchableText.includes(searchTerm)) {
                    return false;
                }
            }

            if (licenseFilter && !tokenizeLicense(exc.license).includes(licenseFilter)) {
                return false;
            }

            if (statusFilter && exc.status !== statusFilter) {
                return false;
            }

            if (projectFilter) {
                const projects = normalizeProject(exc.project);
                if (!projects.includes(projectFilter) && !projects.includes(ALL_PROJECTS)) {
                    return false;
                }
            }

            if (yearFilter) {
                const excYear = exc.approvedDate ? exc.approvedDate.split('-')[0] : '';
                if (excYear !== yearFilter) {
                    return false;
                }
            }

            return true;
        });

        sortExceptions();
        renderTable();
        updateResultsCount();
        updateSortIndicators();
        syncStateToUrl();
    }

    function sortExceptions() {
        const { column, direction } = currentSort;
        const modifier = direction === 'asc' ? 1 : -1;

        filteredExceptions.sort((a, b) => {
            let valA, valB;

            switch (column) {
                case 'package':
                    valA = a.package.toLowerCase();
                    valB = b.package.toLowerCase();
                    break;
                case 'license':
                    valA = a.license.toLowerCase();
                    valB = b.license.toLowerCase();
                    break;
                case 'project':
                    valA = formatProject(a.project).toLowerCase();
                    valB = formatProject(b.project).toLowerCase();
                    break;
                case 'status':
                    valA = getStatusMeta(a.status).order;
                    valB = getStatusMeta(b.status).order;
                    break;
                case 'date':
                    valA = a.approvedDate || '';
                    valB = b.approvedDate || '';
                    break;
                default:
                    return 0;
            }

            if (valA < valB) return -1 * modifier;
            if (valA > valB) return 1 * modifier;
            return 0;
        });
    }

    function handleColumnSort(column) {
        if (currentSort.column === column) {
            currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            currentSort.column = column;
            currentSort.direction = column === 'date' ? 'desc' : 'asc';
        }

        const sortValue = `${column}-${currentSort.direction}`;
        if (elements.sortBy.querySelector(`option[value="${sortValue}"]`)) {
            elements.sortBy.value = sortValue;
        }

        applyFiltersAndRender();
    }

    function updateSortIndicators() {
        const headers = document.querySelectorAll('#exceptions-table th.sortable');
        headers.forEach(header => {
            const column = header.dataset.sort;
            const indicator = header.querySelector('.sort-indicator');

            if (column === currentSort.column) {
                indicator.textContent = currentSort.direction === 'asc' ? ' \u25B2' : ' \u25BC';
                header.classList.add('sorted');
                header.setAttribute('aria-sort', currentSort.direction === 'asc' ? 'ascending' : 'descending');
            } else {
                indicator.textContent = '';
                header.classList.remove('sorted');
                header.setAttribute('aria-sort', 'none');
            }
        });
    }

    function renderTable() {
        if (filteredExceptions.length === 0) {
            elements.tableBody.innerHTML = '';
            elements.noResults.hidden = false;
            return;
        }

        elements.noResults.hidden = true;

        elements.tableBody.innerHTML = filteredExceptions.map((exc, index) => {
            const rowId = getRowId(exc, index);
            const commentId = `comment-${rowId}`;
            const hasComment = Boolean(exc.comment && exc.comment.trim());
            const rowTitle = exc.id ? ` title="${escapeHtml(exc.id)}"` : '';

            const mainRow = `
                <tr id="${escapeHtml(rowId)}" class="exception-row"${rowTitle}>
                    <td data-label="Package">
                        <div class="package-cell">
                            ${formatPackage(exc)}
                            ${hasComment ? renderCommentToggle(commentId) : ''}
                        </div>
                    </td>
                    <td data-label="Status">${renderBadge(exc.status)}</td>
                    <td data-label="License"><span class="license-badge">${escapeHtml(exc.license)}</span></td>
                    <td data-label="Project">${escapeHtml(formatProject(exc.project))}</td>
                    <td data-label="Scope">${formatScope(exc)}</td>
                    <td data-label="Decision Date">${formatDecisionDate(exc)}</td>
                    <td data-label="Issue">${formatIssueLink(exc.results ?? exc.issueUrl)}</td>
                </tr>
            `;

            const commentRow = hasComment ? `
                <tr id="${escapeHtml(commentId)}" class="comment-row" hidden>
                    <td colspan="${COLUMN_COUNT}">
                        <span class="comment-label">Comment</span>
                        <span class="comment-text">${escapeHtml(exc.comment)}</span>
                    </td>
                </tr>
            ` : '';

            return mainRow + commentRow;
        }).join('');
    }

    function getRowId(exc, index) {
        if (!exc.id) return `exc-row-${index}`;
        return exc.id.startsWith('exc-') ? exc.id : `exc-${exc.id}`;
    }

    function renderBadge(status) {
        const meta = getStatusMeta(status);
        const glyph = meta.glyph ? `<span class="status-glyph" aria-hidden="true" data-glyph="${escapeHtml(meta.glyph)}"></span>` : '';
        return `<span class="status-badge ${meta.cssClass}">${glyph}${escapeHtml(meta.label)}</span>`;
    }

    function renderCommentToggle(commentId) {
        return `<button type="button" class="comment-toggle" aria-expanded="false" aria-controls="${escapeHtml(commentId)}" aria-label="Show comment">` +
            '<svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="16" height="16">' +
            '<circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/>' +
            '<circle cx="8" cy="4.75" r="1" fill="currentColor"/>' +
            '<path d="M8 7v5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>' +
            '</svg></button>';
    }

    function formatPackage(exc) {
        const name = escapeHtml(exc.package);
        let url = null;

        if (exc.packageUrl) {
            url = exc.packageUrl;
        } else if (GITHUB_REPO_RE.test(exc.package)) {
            url = `https://${exc.package}`;
        }

        if (url) {
            return `<a href="${escapeHtml(url)}" class="package-link" target="_blank" rel="noopener noreferrer">${name}<span class="visually-hidden"> (opens in new tab)</span></a>`;
        }
        return `<span class="package-name">${name}</span>`;
    }

    function formatScope(exc) {
        if (NO_SCOPE_STATUSES.has(exc.status)) {
            return '<span class="cell-empty" aria-label="Not applicable">\u2014</span>';
        }
        return escapeHtml(exc.scope || '-');
    }

    function formatDecisionDate(exc) {
        const date = exc.approvedDate || '';
        if (date === ALLOWLIST_POLICY_DATE && NO_EXCEPTION_STATUSES.has(exc.status)) {
            return `<span class="policy-date" title="${escapeHtml(date)}">Allowlist policy</span>`;
        }
        return `<time datetime="${escapeHtml(date)}">${escapeHtml(date || '-')}</time>`;
    }

    function formatIssueLink(url) {
        if (!url) {
            return '<span class="cell-empty">-</span>';
        }

        let linkText = 'Link';
        if (url.includes('docs.google.com')) {
            linkText = 'Google Doc';
        } else if (url.includes('github.com')) {
            linkText = 'GitHub';
        }

        return `<a href="${escapeHtml(url)}" class="results-link" target="_blank" rel="noopener noreferrer">${linkText}<span class="visually-hidden"> (opens in new tab)</span></a>`;
    }

    function updateResultsCount() {
        const total = data.exceptions.length;
        const filtered = filteredExceptions.length;

        if (filtered === total) {
            elements.resultsCount.innerHTML = `<strong>${total}</strong> exceptions`;
        } else {
            elements.resultsCount.innerHTML = `<strong>${filtered}</strong> of ${total} exceptions`;
        }

        const project = elements.projectFilter.value;
        elements.projectNote.hidden = !(project && project !== ALL_PROJECTS);
    }

    function toggleComment(button) {
        const target = document.getElementById(button.getAttribute('aria-controls'));
        if (!target) return;
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!expanded));
        button.setAttribute('aria-label', expanded ? 'Show comment' : 'Hide comment');
        target.hidden = expanded;
    }

    function highlightDeepLink() {
        const hash = window.location.hash;
        if (!hash || !hash.startsWith('#exc-')) return;
        const row = document.getElementById(hash.slice(1));
        if (!row) return;

        document.querySelectorAll('.exception-row.highlighted').forEach(r => r.classList.remove('highlighted'));
        row.classList.add('highlighted');
        row.scrollIntoView({ block: 'center' });

        const toggle = row.querySelector('.comment-toggle');
        if (toggle && toggle.getAttribute('aria-expanded') !== 'true') {
            toggleComment(toggle);
        }
    }

    function clearFilters() {
        elements.search.value = '';
        elements.licenseFilter.value = '';
        elements.statusFilter.value = '';
        elements.projectFilter.value = '';
        elements.yearFilter.value = '';
        elements.sortBy.value = DEFAULT_SORT;
        currentSort = { column: 'date', direction: 'desc' };
        applyFiltersAndRender();
    }

    function downloadCsv() {
        const headers = ['Package or Category', 'Status', 'License', 'Project', 'Scope', 'Decision Date', 'Issue', 'Comment'];
        const rows = filteredExceptions.map(exc => [
            exc.package,
            getStatusMeta(exc.status).label,
            exc.license,
            formatProject(exc.project),
            NO_SCOPE_STATUSES.has(exc.status) ? '' : (exc.scope || ''),
            exc.approvedDate || '',
            exc.results ?? exc.issueUrl ?? '',
            exc.comment || ''
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'cncf-license-exceptions.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    function escapeHtml(text) {
        if (text === null || text === undefined) return '';
        const div = document.createElement('div');
        div.textContent = String(text);
        return div.innerHTML;
    }

    function cssEscape(value) {
        return window.CSS && CSS.escape ? CSS.escape(value) : value.replace(/["\\]/g, '\\$&');
    }

    function setupEventListeners() {
        elements.search.addEventListener('input', debounce(applyFiltersAndRender, 300));

        elements.licenseFilter.addEventListener('change', applyFiltersAndRender);
        elements.statusFilter.addEventListener('change', applyFiltersAndRender);
        elements.projectFilter.addEventListener('change', applyFiltersAndRender);
        elements.yearFilter.addEventListener('change', applyFiltersAndRender);

        elements.sortBy.addEventListener('change', function () {
            applySortValue(this.value);
            applyFiltersAndRender();
        });

        document.querySelectorAll('#exceptions-table th.sortable').forEach(header => {
            header.addEventListener('click', () => handleColumnSort(header.dataset.sort));
        });

        elements.tableBody.addEventListener('click', event => {
            const toggle = event.target.closest('.comment-toggle');
            if (toggle) toggleComment(toggle);
        });

        elements.clearFilters.addEventListener('click', clearFilters);
        elements.downloadCsv.addEventListener('click', downloadCsv);
        window.addEventListener('hashchange', highlightDeepLink);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

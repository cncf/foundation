/**
 * CNCF License Exceptions - Client-side Application
 */

(function () {
    'use strict';

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
        resultsCount: document.getElementById('results-count'),
        tableBody: document.getElementById('exceptions-tbody'),
        noResults: document.getElementById('no-results'),
        downloadCsv: document.getElementById('download-csv'),
        dataVersion: document.getElementById('data-version'),
        lastUpdated: document.getElementById('last-updated'),
    };

    // Debounce utility
    function debounce(fn, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // Fetch and initialize data
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

            // Update metadata
            elements.dataVersion.textContent = data.version || '-';
            elements.lastUpdated.textContent = data.lastUpdated || '-';

            // Populate filters
            populateFilters();

            // Initial render
            applyFiltersAndRender();

            // Set up event listeners
            setupEventListeners();
        } catch (error) {
            console.error('Failed to load data:', error);
            elements.tableBody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center; padding: 2rem; color: #dc3545;">
                        Failed to load data. Please try refreshing the page.
                    </td>
                </tr>
            `;
            elements.resultsCount.textContent = 'Error loading data';
        }
    }

    // Helper to normalize project field to array
    function normalizeProject(project) {
        if (!project) return [];
        if (Array.isArray(project)) return project;
        return [project];
    }

    // Helper to format project for display
    function formatProject(project) {
        const projects = normalizeProject(project);
        if (projects.length === 0) return '-';
        return projects.join(', ');
    }

    // Populate filter dropdowns from data
    function populateFilters() {
        // Get unique licenses
        const licenses = [...new Set(data.exceptions.map(e => e.license))].sort();
        licenses.forEach(license => {
            const option = document.createElement('option');
            option.value = license;
            option.textContent = license;
            elements.licenseFilter.appendChild(option);
        });

        // Get unique projects (flatten arrays)
        const projectSet = new Set();
        data.exceptions.forEach(e => {
            normalizeProject(e.project).forEach(p => projectSet.add(p));
        });
        const projects = [...projectSet].sort();
        projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project;
            option.textContent = project;
            elements.projectFilter.appendChild(option);
        });

        // Get unique years from approvedDate
        const years = [...new Set(
            data.exceptions
                .map(e => e.approvedDate ? e.approvedDate.split('-')[0] : null)
                .filter(Boolean)
        )].sort().reverse();

        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            elements.yearFilter.appendChild(option);
        });
    }

    // Apply filters and render table
    function applyFiltersAndRender() {
        const searchTerm = elements.search.value.toLowerCase().trim();
        const licenseFilter = elements.licenseFilter.value;
        const statusFilter = elements.statusFilter.value;
        const projectFilter = elements.projectFilter.value;
        const yearFilter = elements.yearFilter.value;

        // Filter
        filteredExceptions = data.exceptions.filter(exc => {
            // Search filter - search across all fields
            if (searchTerm) {
                const projectText = normalizeProject(exc.project).join(' ');
                const searchableText = [
                    exc.package,
                    exc.license,
                    exc.status,
                    exc.scope || '',
                    projectText,
                    exc.approvedDate || '',
                    exc.comment || ''
                ].join(' ').toLowerCase();
                
                if (!searchableText.includes(searchTerm)) {
                    return false;
                }
            }

            // License filter
            if (licenseFilter && exc.license !== licenseFilter) {
                return false;
            }

            // Status filter
            if (statusFilter && exc.status !== statusFilter) {
                return false;
            }

            // Project filter
            if (projectFilter) {
                const projects = normalizeProject(exc.project);
                if (!projects.includes(projectFilter)) {
                    return false;
                }
            }

            // Year filter
            if (yearFilter) {
                const excYear = exc.approvedDate ? exc.approvedDate.split('-')[0] : '';
                if (excYear !== yearFilter) {
                    return false;
                }
            }

            return true;
        });

        // Sort based on current sort state
        sortExceptions();

        // Render
        renderTable();
        updateResultsCount();
        updateSortIndicators();
    }

    // Sort exceptions based on current sort state
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
                    valA = a.status.toLowerCase();
                    valB = b.status.toLowerCase();
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

    // Handle column header click for sorting
    function handleColumnSort(column) {
        if (currentSort.column === column) {
            // Toggle direction if same column
            currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            // New column, default to ascending (except date which defaults to descending)
            currentSort.column = column;
            currentSort.direction = column === 'date' ? 'desc' : 'asc';
        }

        // Update the dropdown to match
        const sortValue = `${column}-${currentSort.direction}`;
        if (elements.sortBy.querySelector(`option[value="${sortValue}"]`)) {
            elements.sortBy.value = sortValue;
        }

        applyFiltersAndRender();
    }

    // Update sort indicators in table headers
    function updateSortIndicators() {
        const headers = document.querySelectorAll('#exceptions-table th.sortable');
        headers.forEach(header => {
            const column = header.dataset.sort;
            const indicator = header.querySelector('.sort-indicator');
            
            if (column === currentSort.column) {
                indicator.textContent = currentSort.direction === 'asc' ? ' \u25B2' : ' \u25BC';
                header.classList.add('sorted');
            } else {
                indicator.textContent = '';
                header.classList.remove('sorted');
            }
        });
    }

    // Render the exceptions table
    function renderTable() {
        if (filteredExceptions.length === 0) {
            elements.tableBody.innerHTML = '';
            elements.noResults.style.display = 'block';
            return;
        }

        elements.noResults.style.display = 'none';

        const html = filteredExceptions.map(exc => {
            const packageHtml = formatPackage(exc.package);
            const statusClass = getStatusClass(exc.status);
            const resultsHtml = formatResults(exc.results);
            const projectHtml = escapeHtml(formatProject(exc.project));

            return `
                <tr>
                    <td>${packageHtml}</td>
                    <td><span class="license-badge">${escapeHtml(exc.license)}</span></td>
                    <td>${projectHtml}</td>
                    <td>${escapeHtml(exc.scope || '-')}</td>
                    <td><span class="status-badge ${statusClass}">${escapeHtml(exc.status)}</span></td>
                    <td>${escapeHtml(exc.approvedDate || '-')}</td>
                    <td>${resultsHtml}</td>
                </tr>
            `;
        }).join('');

        elements.tableBody.innerHTML = html;
    }

    // Format package name, auto-linking GitHub URLs
    function formatPackage(packageName) {
        if (packageName.startsWith('github.com/')) {
            const url = `https://${packageName}`;
            return `<a href="${escapeHtml(url)}" class="package-link" target="_blank" rel="noopener noreferrer">${escapeHtml(packageName)}</a>`;
        }
        return `<span class="package-name">${escapeHtml(packageName)}</span>`;
    }

    // Format results link (Google Doc or GitHub)
    function formatResults(resultsUrl) {
        if (!resultsUrl) {
            return '-';
        }
        
        let linkText = 'View';
        if (resultsUrl.includes('docs.google.com')) {
            linkText = 'Google Doc';
        } else if (resultsUrl.includes('github.com')) {
            linkText = 'GitHub';
        }
        
        return `<a href="${escapeHtml(resultsUrl)}" class="results-link" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
    }

    // Get CSS class for status badge
    function getStatusClass(status) {
        switch (status) {
            case 'approved':
                return 'status-approved';
            case 'denied':
                return 'status-denied';
            case 'allowlisted':
                return 'status-allowlisted';
            case 'apache-2.0':
                return 'status-apache-2-0';
            default:
                return '';
        }
    }

    // Update results count
    function updateResultsCount() {
        const total = data.exceptions.length;
        const filtered = filteredExceptions.length;

        if (filtered === total) {
            elements.resultsCount.textContent = `${total} exceptions`;
        } else {
            elements.resultsCount.textContent = `${filtered} of ${total} exceptions`;
        }
    }

    // Clear all filters
    function clearFilters() {
        elements.search.value = '';
        elements.licenseFilter.value = '';
        elements.statusFilter.value = '';
        elements.projectFilter.value = '';
        elements.yearFilter.value = '';
        elements.sortBy.value = 'date-desc';
        currentSort = { column: 'date', direction: 'desc' };
        applyFiltersAndRender();
    }

    // Download CSV
    function downloadCsv() {
        const headers = ['Package or Category', 'License', 'Project', 'Scope', 'Status', 'Approved Date', 'Results', 'Comment'];
        const rows = filteredExceptions.map(exc => [
            exc.package,
            exc.license,
            formatProject(exc.project),
            exc.scope || '',
            exc.status,
            exc.approvedDate || '',
            exc.results || '',
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

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        if (text === null || text === undefined) return '';
        const div = document.createElement('div');
        div.textContent = String(text);
        return div.innerHTML;
    }

    // Set up event listeners
    function setupEventListeners() {
        // Debounced search
        elements.search.addEventListener('input', debounce(applyFiltersAndRender, 300));

        // Filter dropdowns
        elements.licenseFilter.addEventListener('change', applyFiltersAndRender);
        elements.statusFilter.addEventListener('change', applyFiltersAndRender);
        elements.projectFilter.addEventListener('change', applyFiltersAndRender);
        elements.yearFilter.addEventListener('change', applyFiltersAndRender);

        // Sort dropdown
        elements.sortBy.addEventListener('change', function() {
            const value = this.value;
            const parts = value.split('-');
            if (parts.length >= 2) {
                currentSort.column = parts[0];
                currentSort.direction = parts[parts.length - 1];
                applyFiltersAndRender();
            }
        });

        // Clickable column headers
        const sortableHeaders = document.querySelectorAll('#exceptions-table th.sortable');
        sortableHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const column = header.dataset.sort;
                handleColumnSort(column);
            });
        });

        // Clear filters
        elements.clearFilters.addEventListener('click', clearFilters);

        // Download CSV
        elements.downloadCsv.addEventListener('click', downloadCsv);
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

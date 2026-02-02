/**
 * CNCF License Exceptions - Client-side Application
 */

(function () {
    'use strict';

    // State
    let data = null;
    let filteredExceptions = [];

    // DOM Elements
    const elements = {
        search: document.getElementById('search'),
        licenseFilter: document.getElementById('license-filter'),
        statusFilter: document.getElementById('status-filter'),
        yearFilter: document.getElementById('year-filter'),
        sortBy: document.getElementById('sort-by'),
        clearFilters: document.getElementById('clear-filters'),
        resultsCount: document.getElementById('results-count'),
        blanketCards: document.getElementById('blanket-cards'),
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
            const response = await fetch('../exceptions.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            data = await response.json();

            // Update metadata
            elements.dataVersion.textContent = data.version || '-';
            elements.lastUpdated.textContent = data.lastUpdated || '-';

            // Populate filters
            populateFilters();

            // Render blanket exceptions
            renderBlanketExceptions();

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

    // Render blanket exceptions as cards
    function renderBlanketExceptions() {
        if (!data.blanketExceptions || data.blanketExceptions.length === 0) {
            document.getElementById('blanket-exceptions').style.display = 'none';
            return;
        }

        const html = data.blanketExceptions.map(blanket => `
            <div class="blanket-card">
                <h3>${escapeHtml(blanket.name)}</h3>
                <p>${escapeHtml(blanket.description)}</p>
                <div class="meta">
                    <span class="meta-item"><strong>Scope:</strong> ${escapeHtml(blanket.scope)}</span>
                    <span class="meta-item"><strong>Approved:</strong> ${escapeHtml(blanket.approvedDate)}</span>
                </div>
                <div class="licenses">
                    ${blanket.licenses.map(l => `<span class="license-tag">${escapeHtml(l)}</span>`).join('')}
                </div>
                ${blanket.documentUrl ? `<p style="margin-top: 1rem; margin-bottom: 0;"><a href="${escapeHtml(blanket.documentUrl)}" target="_blank" rel="noopener noreferrer">View Documentation</a></p>` : ''}
            </div>
        `).join('');

        elements.blanketCards.innerHTML = html;
    }

    // Apply filters and render table
    function applyFiltersAndRender() {
        const searchTerm = elements.search.value.toLowerCase().trim();
        const licenseFilter = elements.licenseFilter.value;
        const statusFilter = elements.statusFilter.value;
        const yearFilter = elements.yearFilter.value;
        const sortBy = elements.sortBy.value;

        // Filter
        filteredExceptions = data.exceptions.filter(exc => {
            // Search filter
            if (searchTerm && !exc.package.toLowerCase().includes(searchTerm)) {
                return false;
            }

            // License filter
            if (licenseFilter && exc.license !== licenseFilter) {
                return false;
            }

            // Status filter
            if (statusFilter && exc.status !== statusFilter) {
                return false;
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

        // Sort
        filteredExceptions.sort((a, b) => {
            switch (sortBy) {
                case 'date-desc':
                    return (b.approvedDate || '').localeCompare(a.approvedDate || '');
                case 'date-asc':
                    return (a.approvedDate || '').localeCompare(b.approvedDate || '');
                case 'package-asc':
                    return a.package.toLowerCase().localeCompare(b.package.toLowerCase());
                case 'package-desc':
                    return b.package.toLowerCase().localeCompare(a.package.toLowerCase());
                case 'license-asc':
                    return a.license.localeCompare(b.license);
                default:
                    return 0;
            }
        });

        // Render
        renderTable();
        updateResultsCount();
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

            return `
                <tr>
                    <td>${packageHtml}</td>
                    <td><span class="license-badge">${escapeHtml(exc.license)}</span></td>
                    <td><span class="status-badge ${statusClass}">${escapeHtml(exc.status)}</span></td>
                    <td>${escapeHtml(exc.approvedDate || '-')}</td>
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

    // Get CSS class for status badge
    function getStatusClass(status) {
        switch (status) {
            case 'approved':
                return 'status-approved';
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
        elements.yearFilter.value = '';
        elements.sortBy.value = 'date-desc';
        applyFiltersAndRender();
    }

    // Download CSV
    function downloadCsv() {
        const headers = ['Package', 'License', 'Status', 'Approved Date', 'Comment'];
        const rows = filteredExceptions.map(exc => [
            exc.package,
            exc.license,
            exc.status,
            exc.approvedDate || '',
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
        elements.yearFilter.addEventListener('change', applyFiltersAndRender);

        // Sort
        elements.sortBy.addEventListener('change', applyFiltersAndRender);

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

/**
 * CNCF License Exceptions - Blanket Exceptions Page
 */

(function () {
    'use strict';

    // DOM Elements
    const elements = {
        blanketCards: document.getElementById('blanket-cards'),
        noResults: document.getElementById('no-results'),
        dataVersion: document.getElementById('data-version'),
        lastUpdated: document.getElementById('last-updated'),
    };

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        if (text === null || text === undefined) return '';
        const div = document.createElement('div');
        div.textContent = String(text);
        return div.innerHTML;
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
            const data = await response.json();

            // Update metadata
            elements.dataVersion.textContent = data.version || '-';
            elements.lastUpdated.textContent = data.lastUpdated || '-';

            // Render blanket exceptions
            renderBlanketExceptions(data.blanketExceptions || []);
        } catch (error) {
            console.error('Failed to load data:', error);
            elements.blanketCards.innerHTML = `
                <div class="error-message">
                    Failed to load data. Please try refreshing the page.
                </div>
            `;
        }
    }

    // Render blanket exceptions as cards
    function renderBlanketExceptions(blanketExceptions) {
        if (!blanketExceptions || blanketExceptions.length === 0) {
            elements.noResults.style.display = 'block';
            return;
        }

        const html = blanketExceptions.map(blanket => `
            <div class="blanket-card blanket-card-large">
                <h3>${escapeHtml(blanket.name)}</h3>
                <p class="description">${escapeHtml(blanket.description)}</p>
                <div class="meta">
                    <div class="meta-item">
                        <strong>Scope:</strong> 
                        <span>${escapeHtml(blanket.scope || 'Not specified')}</span>
                    </div>
                    <div class="meta-item">
                        <strong>Approved:</strong> 
                        <span>${escapeHtml(blanket.approvedDate)}</span>
                    </div>
                </div>
                <div class="licenses">
                    <strong>Licenses:</strong>
                    <div class="license-tags">
                        ${blanket.licenses.map(l => `<span class="license-tag">${escapeHtml(l)}</span>`).join('')}
                    </div>
                </div>
                ${blanket.documentUrl ? `
                    <div class="documentation">
                        <a href="${escapeHtml(blanket.documentUrl)}" target="_blank" rel="noopener noreferrer" class="doc-link">
                            View Documentation
                        </a>
                    </div>
                ` : ''}
            </div>
        `).join('');

        elements.blanketCards.innerHTML = html;
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

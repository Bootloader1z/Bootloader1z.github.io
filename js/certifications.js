/**
 * Certifications Module
 * Handles fetching and displaying PDF certifications from Google Drive
 * Security-first approach with input sanitization and CSP compliance
 */

const CertificationsManager = (function() {
    'use strict';

    const CERTIFICATIONS = [
        // April 2026
        {
            id: 'cert-new-1',
            title: 'DICT NSOC Knowledge Transfer',
            issuer: 'Maroon Studios / Google Cloud Partner',
            date: 'April 2026',
            driveFileId: '1Sd4EwIRnBXeGQnt6ZKB_iO-bEfI4wC8a',
            thumbnailId: null,
            type: 'image'
        },
        // March 2026
        {
            id: 'cert-new-4',
            title: 'DICT Google SecOps Training Workshop',
            issuer: 'Maroon Studios / Google Cloud Partner',
            date: 'March 2026',
            driveFileId: '1qWeaXoxgSaobaZNM6szmHP3wQkuFFX5j',
            thumbnailId: null,
            type: 'pdf',
            rotation: 0
        },
        // February 2026
        {
            id: 'cert-new-2',
            title: 'Launching Your IT Career: CompTIA Tech+ and Certification Roadmap Webinar',
            issuer: 'Trainocate',
            date: 'February 2026',
            driveFileId: '1uiblUFkcZqrrNdi4Q8Kawtl9Ul4N3k4t',
            thumbnailId: null,
            type: 'pdf'
        },
        // November 2025
        {
            id: 'cert-new-3',
            title: 'Design Thinking and Mobile App Wireframing',
            issuer: 'DICT R5 - Camarines Norte',
            date: 'November 2025',
            driveFileId: '1NJqPIcpFXWNDuRk_fVoDXKjNl2JwbhB1',
            thumbnailId: null,
            type: 'pdf'
        },
        // October 2025
        {
            id: 'cert-1',
            title: 'Security Essentials on AWS',
            issuer: 'Trainocate',
            date: 'October 2025',
            driveFileId: '1hZkv2MAgAK40CVAygu0sB3aCRZ37Ms6a',
            thumbnailId: null,
            type: 'pdf'
        },
        {
            id: 'cert-2',
            title: 'Technical Essential on AWS',
            issuer: 'Trainocate',
            date: 'October 2025',
            driveFileId: '11P1RX3Wzvxo1DQ63vk1d7k6duheMCG5A',
            thumbnailId: null,
            type: 'pdf'
        },
        // September 2025
        {
            id: 'cert-3',
            title: 'Building with Agentic Systems and Gemini CLI',
            issuer: 'Google',
            date: 'September 2025',
            driveFileId: '1pZOwHcpkwenEkYDwpXp_xPOivTRb1EJG',
            thumbnailId: null,
            type: 'pdf'
        },
        {
            id: 'cert-4',
            title: 'DHIS2 Server Administration and Management',
            issuer: 'PMNP IS Project',
            date: 'September 2025',
            driveFileId: '1iC2INWJybqqfrFx4vzj_Iiuq3uO8wfrn',
            thumbnailId: null,
            type: 'pdf',
            rotation: 0
        },
        // July 2025
        {
            id: 'cert-5',
            title: 'AWS Cloud Immersion Day Workshop',
            issuer: 'Amazon Web Services',
            date: 'July 2025',
            driveFileId: '1LRAb9-drSTUYBiwlPlaSGmEQcLDrQkmw',
            thumbnailId: null,
            type: 'pdf'
        },
        {
            id: 'cert-6',
            title: 'MTA-HELPS Application Modernization Discovery Workshop',
            issuer: 'SoftwareOne',
            date: 'July 2025',
            driveFileId: '1XxEZAHNhRWIt_dKcuC4dH6yMYaCZMQ5u',
            thumbnailId: null,
            type: 'pdf'
        },
        // April 2025
        {
            id: 'cert-7',
            title: 'AWS Cloud Essential Workshop',
            issuer: 'Amazon Web Services',
            date: 'April 2025',
            driveFileId: '1HoGSBu5bPx-IKj_Ugu-nX1NcXKwPYUUn',
            thumbnailId: null,
            type: 'pdf'
        },
        // February 2025
        {
            id: 'cert-8',
            title: 'Streamlining Mobile Development Using Flutterflow',
            issuer: 'Flutterflow',
            date: 'February 2025',
            driveFileId: '1Am9LKTL1dv0sjGtiJLXeDerJKUvZIfJi',
            thumbnailId: null,
            type: 'pdf',
            rotation: 0
        },
        // December 2024
        {
            id: 'cert-9',
            title: 'AWS Cloud Practitioner Essentials',
            issuer: 'ECloudValley',
            date: 'December 2024',
            driveFileId: '17hulrmyFQxTNPfWlsofm6MSI9s6sPA05',
            thumbnailId: null,
            type: 'pdf'
        },
        // September 2024
        {
            id: 'cert-10',
            title: 'AWS Cloud Practitioner: Technical & Support Resources',
            issuer: 'Codecademy',
            date: 'September 2024',
            driveFileId: '1YzokfSOJTfcxmhyRxWU69laxkdA211ez',
            thumbnailId: null,
            type: 'pdf'
        },
        {
            id: 'cert-11',
            title: 'Using OpenAI APIs: Fine-tuning Models, Assistants API & Embeddings',
            issuer: 'Codecademy',
            date: 'September 2024',
            driveFileId: '1NZ_rr6KbM3TIN_CahKc5ogEBk8tuQuKz',
            thumbnailId: null,
            type: 'pdf'
        },
        {
            id: 'cert-12',
            title: 'Using OpenAI APIs: Image & Audio APIs',
            issuer: 'Codecademy',
            date: 'September 2024',
            driveFileId: '1mr89SN1xs-Lef5SDA7z426T4ynWrQ65d',
            thumbnailId: null,
            type: 'pdf'
        },
        {
            id: 'cert-13',
            title: 'Product Management: Understanding and Developing Customers',
            issuer: 'Codecademy',
            date: 'September 2024',
            driveFileId: '1MUAiIG8XNaLXaLRDCTyglF7-KtMLNZJC',
            thumbnailId: null,
            type: 'pdf'
        },
        {
            id: 'cert-14',
            title: 'Google Associate Cloud Engineer: Managing Google Compute Engine',
            issuer: 'Codecademy',
            date: 'September 2024',
            driveFileId: '1IEwK8yxVINqAq2d-53ZywegSOHy_1c1m',
            thumbnailId: null,
            type: 'pdf'
        },
        {
            id: 'cert-15',
            title: 'Security Goals & Controls',
            issuer: 'Codecademy',
            date: 'September 2024',
            driveFileId: '1O-O2JrofIPuoMwWgIykaxGkFWzFSRvG9',
            thumbnailId: null,
            type: 'pdf'
        },
        // June 2024
        {
            id: 'cert-16',
            title: 'CMIS Certification',
            issuer: 'CMIS',
            date: 'June 2024',
            driveFileId: '1Ws6F7u-hgg6PcB1vAHmB_vrJyQQO_WlN',
            thumbnailId: null,
            type: 'pdf'
        },
        // February 2024
        {
            id: 'cert-17',
            title: 'Linux Basics',
            issuer: 'TRULINE INC',
            date: 'February 2024',
            driveFileId: '1DR-yMulwtjJ8Lb3jStbgf5bhbIc-0MYI',
            thumbnailId: null,
            type: 'pdf'
        },
        {
            id: 'cert-18',
            title: 'Applications Basics',
            issuer: 'TRULINE INC',
            date: 'February 2024',
            driveFileId: '1-r-xFQ5TnVSS-wq_xj1P8euSRczQqhxk',
            thumbnailId: null,
            type: 'pdf'
        },
        {
            id: 'cert-19',
            title: 'Network Basics',
            issuer: 'TRULINE INC',
            date: 'February 2024',
            driveFileId: '1Cmrk8okWkyaRhxj-KZ4bfuKB8Vjpg3lx',
            thumbnailId: null,
            type: 'pdf'
        },
        {
            id: 'cert-20',
            title: 'Private Cloud',
            issuer: 'TRULINE INC',
            date: 'February 2024',
            driveFileId: '1g61tCYAHM9TPsB07RxlhilczTlRXt65h',
            thumbnailId: null,
            type: 'pdf'
        },
        {
            id: 'cert-21',
            title: 'Cloud Native',
            issuer: 'TRULINE INC',
            date: 'February 2024',
            driveFileId: '16iwFTKRPGsBfJ8sTNKPtZ6PH3zsNspGs',
            thumbnailId: null,
            type: 'pdf'
        },
        // December 2023
        {
            id: 'cert-22',
            title: 'Enterprise Networks',
            issuer: 'TRULINE INC',
            date: 'December 2023',
            driveFileId: '12Fn2SZy_NDMTWKECOFPGB3tRT4sGDL7s',
            thumbnailId: null,
            type: 'pdf'
        },
        {
            id: 'cert-23',
            title: 'Data Center Networks',
            issuer: 'TRULINE INC',
            date: 'December 2023',
            driveFileId: '1Hi3f_EUURJGjJZQE6HE-YBUvxT33CY5y',
            thumbnailId: null,
            type: 'pdf'
        },
        {
            id: 'cert-24',
            title: 'Public Cloud',
            issuer: 'TRULINE INC',
            date: 'December 2023',
            driveFileId: '11CV1wKFeEypEH9dlMVD9ZxPgQOuOnGbx',
            thumbnailId: null,
            type: 'pdf'
        },
        // June 2023
        {
            id: 'cert-25',
            title: 'Technical Support Fundamentals',
            issuer: 'Google',
            date: 'June 2023',
            driveFileId: '1GfybxSwsGGF3WzhVwhzPdiyxdLHdjKhh',
            thumbnailId: null,
            type: 'pdf'
        },
        // October 2022
        {
            id: 'cert-26',
            title: 'Python Programming Basics',
            issuer: 'TRULINE INC',
            date: 'October 2022',
            driveFileId: '1CBhYxdBw3mfan711F0keqEqySzOAKrDe',
            thumbnailId: null,
            type: 'pdf'
        }
    ];

    // Cache for loaded thumbnails (reduces data transfer)
    const thumbnailCache = new Map();
    
    // Intersection Observer for lazy loading
    let observer = null;

    /**
     * Sanitize string to prevent XSS
     * @param {string} str - Input string
     * @returns {string} Sanitized string
     */
    function sanitize(str) {
        if (typeof str !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Validate Google Drive file ID format
     * @param {string} fileId - Google Drive file ID
     * @returns {boolean} Is valid
     */
    function isValidDriveId(fileId) {
        // Google Drive IDs are typically 33 characters, alphanumeric with - and _
        return /^[a-zA-Z0-9_-]{10,50}$/.test(fileId);
    }

    /**
     * Generate Google Drive thumbnail URL (low bandwidth)
     * @param {string} fileId - Google Drive file ID
     * @returns {string} Thumbnail URL
     */
    function getThumbnailUrl(fileId) {
        if (!isValidDriveId(fileId)) return '';
        // Using thumbnail export for certificate preview
        return `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w600`;
    }

    /**
     * Generate Google Drive PDF preview URL
     * @param {string} fileId - Google Drive file ID
     * @returns {string} Preview URL
     */
    function getPdfPreviewUrl(fileId) {
        if (!isValidDriveId(fileId)) return '';
        return `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/preview`;
    }

    /**
     * Generate Google Drive image URL for full view
     * @param {string} fileId - Google Drive file ID
     * @returns {string} Image URL
     */
    function getImageUrl(fileId) {
        if (!isValidDriveId(fileId)) return '';
        return `https://drive.google.com/uc?export=view&id=${encodeURIComponent(fileId)}`;
    }

    /**
     * Create certification card element
     * @param {Object} cert - Certification data
     * @returns {HTMLElement} Card element
     */
    function createCertCard(cert) {
        const card = document.createElement('article');
        card.className = 'cert-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `View ${sanitize(cert.title)} certificate`);
        card.dataset.certId = sanitize(cert.id);
        card.dataset.driveId = sanitize(cert.driveFileId);

        const thumbnailSrc = cert.thumbnailId 
            ? getThumbnailUrl(cert.thumbnailId) 
            : getThumbnailUrl(cert.driveFileId);

        const rotation = cert.rotation !== undefined ? cert.rotation : -90;

        card.innerHTML = `
            <div class="cert-thumbnail" data-src="${sanitize(thumbnailSrc)}" data-rotation="${rotation}">
                <span class="cert-placeholder">📜</span>
            </div>
            <div class="cert-info">
                <h3 class="cert-title">${sanitize(cert.title)}</h3>
                <p class="cert-issuer">${sanitize(cert.issuer)}</p>
                <span class="cert-date">${sanitize(cert.date)}</span>
                <span class="cert-badge">Verified</span>
            </div>
        `;

        // Event listeners
        card.addEventListener('click', () => openCertModal(cert));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCertModal(cert);
            }
        });

        return card;
    }

    /**
     * Lazy load thumbnail image
     * @param {HTMLElement} thumbnail - Thumbnail container element
     */
    function loadThumbnail(thumbnail) {
        const src = thumbnail.dataset.src;
        const rotation = thumbnail.dataset.rotation || '-90';
        if (!src || thumbnailCache.has(src)) {
            if (thumbnailCache.has(src)) {
                thumbnail.innerHTML = `<img src="${thumbnailCache.get(src)}" alt="Certificate thumbnail" loading="lazy" style="transform: rotate(${rotation}deg);">`;
            }
            return;
        }

        const img = new Image();
        img.onload = function() {
            thumbnailCache.set(src, src);
            thumbnail.innerHTML = '';
            img.alt = 'Certificate thumbnail';
            img.style.transform = `rotate(${rotation}deg)`;
            thumbnail.appendChild(img);
        };
        img.onerror = function() {
            // Keep placeholder on error
            console.warn('Failed to load thumbnail');
        };
        img.src = src;
    }

    /**
     * Setup Intersection Observer for lazy loading
     */
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const thumbnail = entry.target.querySelector('.cert-thumbnail');
                        if (thumbnail) {
                            loadThumbnail(thumbnail);
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '100px',
                threshold: 0.1
            });
        }
    }

    /**
     * Open certificate modal with PDF or image preview
     * @param {Object} cert - Certification data
     */
    function openCertModal(cert) {
        const modal = document.getElementById('pdf-modal');
        const title = document.getElementById('modal-title');
        const viewer = document.getElementById('pdf-viewer');
        const imageViewer = document.getElementById('image-viewer');

        if (!modal || !title) return;

        // Validate drive ID before loading
        if (!isValidDriveId(cert.driveFileId)) {
            console.error('Invalid Drive file ID');
            return;
        }

        title.textContent = cert.title;

        // Handle different file types
        if (cert.type === 'image') {
            if (viewer) viewer.style.display = 'none';
            if (imageViewer) {
                imageViewer.src = getImageUrl(cert.driveFileId);
                imageViewer.style.display = 'block';
                imageViewer.alt = cert.title;
            }
        } else {
            if (imageViewer) imageViewer.style.display = 'none';
            if (viewer) {
                viewer.src = getPdfPreviewUrl(cert.driveFileId);
                viewer.style.display = 'block';
            }
        }

        modal.hidden = false;
        document.body.style.overflow = 'hidden';

        // Focus trap
        modal.querySelector('.modal-close').focus();
    }

    /**
     * Close certificate modal
     */
    function closeModal() {
        const modal = document.getElementById('pdf-modal');
        const viewer = document.getElementById('pdf-viewer');
        const imageViewer = document.getElementById('image-viewer');

        if (modal) {
            modal.hidden = true;
            document.body.style.overflow = '';
        }
        if (viewer) {
            viewer.src = ''; // Clear iframe to stop loading
        }
        if (imageViewer) {
            imageViewer.src = ''; // Clear image
        }
    }

    /**
     * Initialize certifications grid
     */
    function init() {
        const grid = document.getElementById('cert-grid');
        const loading = document.getElementById('cert-loading');

        if (!grid) return;

        setupLazyLoading();

        // Simulate async loading (replace with actual API call if needed)
        setTimeout(() => {
            if (loading) loading.remove();

            CERTIFICATIONS.forEach(cert => {
                const card = createCertCard(cert);
                grid.appendChild(card);

                if (observer) {
                    observer.observe(card);
                } else {
                    // Fallback for browsers without IntersectionObserver
                    const thumbnail = card.querySelector('.cert-thumbnail');
                    if (thumbnail) loadThumbnail(thumbnail);
                }
            });
        }, 300);

        // Modal event listeners
        const modal = document.getElementById('pdf-modal');
        if (modal) {
            const closeBtn = modal.querySelector('.modal-close');
            const overlay = modal.querySelector('.modal-overlay');

            if (closeBtn) closeBtn.addEventListener('click', closeModal);
            if (overlay) overlay.addEventListener('click', closeModal);

            // Escape key to close
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !modal.hidden) {
                    closeModal();
                }
            });
        }
    }

    // Public API
    return {
        init,
        closeModal
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', CertificationsManager.init);
} else {
    CertificationsManager.init();
}
    
# Portfolio Website

A secure, optimized portfolio website with Google Drive PDF certification display.

## Features

- **Security-First Design**: CSP headers, input sanitization, XSS prevention, honeypot bot protection
- **Optimized Performance**: Lazy loading, thumbnail caching, minimal data transfer
- **Responsive Design**: Mobile-first approach with smooth animations
- **Accessibility**: ARIA labels, keyboard navigation, focus management

## Setup Google Drive Certifications

1. Upload your PDF certificates to Google Drive
2. Right-click each file → Share → "Anyone with the link can view"
3. Copy the file ID from the share URL:
   ```
   https://drive.google.com/file/d/FILE_ID_HERE/view
   ```
4. Edit `js/certifications.js` and replace `YOUR_GOOGLE_DRIVE_FILE_ID_X` with your actual file IDs

## File Structure

```
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   ├── main.js         # Navigation, form, animations
│   └── certifications.js # Google Drive PDF handling
└── README.md
```

## Security Features

- Content Security Policy (CSP) headers
- Input sanitization on all user inputs
- Rate limiting on form submissions
- Honeypot field for bot detection
- Sandboxed iframes for PDF viewing
- Validated Google Drive file IDs
- No inline event handlers

## Optimization Features

- Lazy loading with Intersection Observer
- Thumbnail caching to reduce repeat requests
- Google Drive thumbnail API (400px width) for minimal bandwidth
- CSS variables for efficient theming
- Minimal JavaScript with IIFE pattern

## Customization

1. Update personal info in `index.html`
2. Add your certifications in `js/certifications.js`
3. Modify colors in CSS `:root` variables
4. Add your profile image to replace the avatar placeholder

## Browser Support

Modern browsers with ES6+ support (Chrome, Firefox, Safari, Edge)

# SHAPES & SHADES - Interior Design Website Redesign

## Overview
A complete redesign of the Shapes & Shades interior design website featuring a sleek, minimalistic, and luxurious black and white aesthetic. This modern website showcases professional interior design services with elegant animations and a fully responsive layout.

## Features

### Design Elements
- **Strict Black & White Theme**: Monochromatic color scheme for sophisticated, timeless appeal
- **Minimalistic Layout**: Clean lines, ample white space, and focused content presentation
- **Luxury Aesthetics**: Premium typography, elegant transitions, and refined visual hierarchy
- **Modern Animations**: Smooth fade-ins, parallax effects, scroll-triggered animations
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices

### Pages Included
1. **Home Page (index.html)** - Hero section, philosophy, featured projects, services overview, testimonials
2. **About Page (about.html)** - Company story, values, team members, statistics
3. **Portfolio Page (portfolio.html)** - Filterable project gallery with modal details
4. **Services Page (services.html)** - Detailed service offerings and process overview
5. **Contact Page (contact.html)** - Contact form, company information, FAQ section

### Technical Features
- HTML5 semantic markup
- CSS3 with modern features (Grid, Flexbox, CSS Variables, Animations)
- Vanilla JavaScript (no jQuery dependency)
- Bootstrap 5.3.2 for responsive grid system
- Custom scroll animations
- Portfolio filtering system
- Animated statistics counter
- Form validation
- Smooth page transitions
- Scroll progress indicator
- Mobile-optimized navigation

## File Structure
```
shapes-shades-redesign/
├── index.html          # Home page
├── about.html          # About us page
├── portfolio.html      # Portfolio/projects page
├── services.html       # Services page
├── contact.html        # Contact page
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── main.js         # JavaScript functionality
└── README.md           # This file
```

## Technologies Used
- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Custom properties, animations, transitions, Grid, Flexbox
- **JavaScript (ES6+)**: Interactive features and animations
- **Bootstrap 5.3.2**: Responsive grid and components
- **CDN Resources**: Bootstrap CSS/JS loaded from CDN

## Key Design Principles

### Color Palette
- Primary Black: `#000000`
- Primary White: `#ffffff`
- Dark Gray: `#1a1a1a`
- Medium Gray: `#666666`
- Light Gray: `#e5e5e5`

### Typography
- Font Family: Helvetica Neue, Arial, sans-serif
- Font Weights: 100 (thin), 200 (light), 300 (regular), 400 (medium)
- Letter Spacing: Generous spacing for luxury feel
- Font Sizes: Responsive using clamp() for fluid typography

### Spacing System
- Small: 1rem
- Medium: 2rem
- Large: 4rem
- Extra Large: 6rem

## Interactive Features

### Animations & Transitions
1. **Navbar Scroll Effect**: Background changes on scroll
2. **Hero Parallax**: Hero section moves at different speed
3. **Fade-in Animations**: Elements animate into view on scroll
4. **Hover Effects**: Cards, buttons, and images have smooth hover transitions
5. **Counter Animation**: Statistics count up when scrolled into view
6. **Portfolio Filter**: Smooth filtering with fade effects
7. **Modal Transitions**: Elegant modal open/close animations

### Responsive Breakpoints
- Desktop: 992px and above
- Tablet: 768px to 991px
- Mobile: Below 768px

## Image Placeholders
All image placeholders are styled with:
- Gradient backgrounds (light gray)
- Centered text labels
- Shimmer animation effect
- Appropriate aspect ratios for each context

To replace placeholders:
1. Remove the `.image-placeholder` div
2. Replace with `<img src="your-image.jpg" alt="description">`
3. Maintain the same class structure for styling

## Customization Guide

### Changing Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
    --black: #000000;
    --white: #ffffff;
    --gray-dark: #1a1a1a;
    /* etc. */
}
```

### Adding New Portfolio Items
1. Copy an existing `.portfolio-item` div in `portfolio.html`
2. Update the `data-category` attribute
3. Change the image placeholder text
4. Update project details in overlay
5. Create corresponding modal if needed

### Modifying Navigation
Edit the navbar section in each HTML file. The navigation is consistent across all pages.

### Form Handling
The contact form currently uses JavaScript validation. To connect to a backend:
1. Add `action` and `method` attributes to the form
2. Update the JavaScript in `js/main.js` to handle actual submission
3. Configure your server-side processing

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations
- Minimal external dependencies
- Efficient CSS selectors
- Optimized animations using transform and opacity
- Lazy loading ready (data-src attributes)
- Compressed and minified production-ready code

## Accessibility Features
- Semantic HTML5 elements
- ARIA labels where appropriate
- Keyboard navigation support
- High contrast color scheme
- Responsive font sizes
- Focus states for interactive elements

## Future Enhancements
Potential additions for phase 2:
- Blog section
- Client portal
- 3D room visualizer
- Virtual consultation booking
- Instagram feed integration
- Multi-language support
- Dark mode toggle (inverted colors)

## Installation & Usage

### Local Development
1. Extract all files to a directory
2. Open any HTML file in a web browser
3. No build process required - works immediately

### Deployment
1. Upload all files to your web server
2. Ensure directory structure is maintained
3. Update any absolute paths if needed
4. Configure SSL certificate for HTTPS

### Testing Checklist
- [ ] Test all navigation links
- [ ] Verify responsive design on multiple devices
- [ ] Check form validation
- [ ] Test portfolio filters
- [ ] Verify animations on scroll
- [ ] Check modal functionality
- [ ] Test mobile menu
- [ ] Validate HTML/CSS

## Credits
Designed and developed for Shapes & Shades Interior Design
Built with modern web technologies and best practices

## License
Proprietary - All rights reserved to Shapes & Shades

## Support
For questions or support, contact: info@shapesandshades.com

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Production Ready

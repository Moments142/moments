# 💖 Our Story in Moments

A beautiful, romantic interactive webpage that tells your love story through a visual timeline. This project creates a cinematic experience with smooth animations, real-time relationship counter, and elegant design.

## ✨ Features

- **Real-time Relationship Counter**: Automatically calculates and displays years, months, and days since your start date (February 14, 2022)
- **Interactive Timeline**: Vertical timeline layout with 10 photo moments
- **Smooth Animations**: GSAP-style animations with fade-in and slide-up effects
- **Background Music**: Optional ambient music with toggle button
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Romantic Theme**: Soft pink, deep navy, and rose gold color palette
- **Glassmorphism Effects**: Modern frosted glass design elements
- **Heart Animations**: Floating hearts and animated elements
- **Parallax Scrolling**: Subtle depth effects as you scroll

## 🎨 Design Elements

- **Typography**: Dancing Script for romantic headings, Poppins for body text
- **Colors**: Gradient backgrounds with soft pink (#ff6b9d), rose gold (#feca57), and deep navy (#1a1a2e)
- **Effects**: Glassmorphism cards, smooth transitions, hover animations
- **Layout**: Alternating left/right image placement for visual interest

## 📱 Responsive Features

- Mobile-first design approach
- Touch-optimized interactions
- Adaptive grid layouts
- Optimized font sizes for different screen sizes
- Smooth scrolling on all devices

## 🚀 Getting Started

1. **Place your images**: Make sure you have 10 images named `1.jpeg` through `10.jpeg` in the same directory as the HTML file
2. **Open the webpage**: Simply open `index.html` in your web browser
3. **Customize**: Edit the quotes, dates, or styling as needed

## 🎵 Music Feature

The webpage includes an optional background music feature:
- Click the music note icon in the top-right corner
- Music will play automatically (may require user interaction due to browser policies)
- Toggle on/off as desired

## 📝 Customization

### Changing the Start Date
In `script.js`, modify the `relationshipStartDate` variable:
```javascript
const relationshipStartDate = new Date('2022-02-14'); // Change this date
```

### Updating Quotes
In `index.html`, find the blockquote elements and replace the text:
```html
<blockquote>
    "Your custom quote here"
</blockquote>
```

### Changing Colors
In `styles.css`, modify the CSS custom properties:
```css
:root {
    --primary-color: #ff6b9d;
    --secondary-color: #feca57;
    --accent-color: #1a1a2e;
}
```

## 🔧 Technical Details

- **HTML5**: Semantic structure with accessibility features
- **CSS3**: Modern features including Grid, Flexbox, and animations
- **JavaScript**: Vanilla JS with Intersection Observer API
- **Libraries**: AOS (Animate On Scroll) for smooth animations
- **Performance**: Optimized with throttled scroll events and lazy loading

## 📁 File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Interactive functionality
├── README.md           # This documentation
├── 1.jpeg              # Timeline image 1
├── 2.jpeg              # Timeline image 2
├── ...                 # Timeline images 3-9
└── 10.jpeg             # Timeline image 10
```

## 🌟 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 💡 Tips for Best Experience

1. **Image Optimization**: Use high-quality images (recommended: 800x600px or similar)
2. **Performance**: The page is optimized for smooth scrolling on most devices
3. **Mobile**: Test on actual mobile devices for best touch experience
4. **Music**: Add your own background music file for a more personal touch

## 🎭 Quotes Used

The timeline includes these romantic quotes:
1. "Moments that remind me how lucky I was and still am to have shared them with you."
2. "Every photo here is a small piece of a story I never stopped cherishing."
3. "These aren't just memories — they're lessons, warmth, and a reason to grow."
4. "Some of my favorite moments with you."
5. "The moments I took for granted."
6. "Love in its quiet form."
7. "Every laugh still echoes."
8. "You were my peace."
9. "Forever grateful for every second we shared."
10. "And maybe, just maybe, this isn't the end."

## 💖 Made with Love

This project was created as a romantic gesture to tell your love story through technology. Every animation, color choice, and interaction was designed to evoke emotion and create a memorable experience.

---

*Made with love, from me to you.* 💕

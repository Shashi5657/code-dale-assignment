# Adaline.ai Landing Page Replica

A pixel-perfect Next.js replication of the [Adaline.ai](https://adaline.ai) landing page, featuring smooth scroll-triggered animations, a nature-themed aesthetic, and modern UI components.

## Features

- **Pixel-perfect design** matching the original Adaline.ai landing page
- **Scroll-triggered sequence animation** using 280 frame images with GSAP ScrollTrigger
- **Nature/garden aesthetic** with earthy green color palette
- **Responsive design** optimized for desktop, tablet, and mobile
- **Interactive navbar** with animated products dropdown
- **Japanese shoji screen frame** video showcase section
- **Company logos** in trusted by section
- **Smooth animations** throughout the page

## Tech Stack

- **Framework**: Next.js 16.1.6 (with Turbopack)
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 4
- **Animation**: GSAP 3.12.5 with ScrollTrigger
- **Motion**: Framer Motion 11.0.3
- **React**: 19.2.3

## Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

```bash
# Clone or navigate to the project directory
cd adeline-test-codedale

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
adeline-test-codedale/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation with products dropdown
│   │   ├── HeroSection.tsx     # Hero with sequence animation
│   │   ├── TrustedBy.tsx       # Company logos section
│   │   ├── VideoShowcase.tsx   # Shoji frame video section
│   │   ├── ProductShowcase.tsx # Product cards (optional)
│   │   ├── ValueProps.tsx      # Value propositions (optional)
│   │   ├── FeaturesSection.tsx # Features grid (optional)
│   │   └── StatsSection.tsx    # Statistics section (optional)
│   ├── globals.css             # Global styles and Tailwind config
│   ├── layout.tsx              # Root layout with fonts
│   └── page.tsx                # Main page component
├── public/
│   ├── images/
│   │   ├── sequence/           # 280 frame sequence images
│   │   │   └── 16x9_281/
│   │   │       └── standard/   # graded_4K_100_gm_50_1080_3-XXX.jpg
│   │   ├── hero/               # Hero section images
│   │   └── footer/             # Footer images
│   ├── videos/
│   │   └── product-demo.mp4    # Product demo video
│   ├── fonts/                  # Custom fonts (woff2)
│   └── icons/                  # SVG icons
├── package.json
├── next.config.ts
├── tailwind.config.ts          # Tailwind configuration (v4)
└── tsconfig.json
```

## Assets

### Sequence Images

The hero background animation uses 280 sequential images located at:
```
public/images/sequence/16x9_281/standard/graded_4K_100_gm_50_1080_3-XXX.jpg
```

Images are numbered from `002` to `281`.

### How Assets Were Extracted

1. **Sequence images**: Downloaded from the original Adaline.ai website's CDN
2. **Fonts**: Extracted from the website's static assets (woff2 format)
3. **Product demo video**: Captured from the original website
4. **Icons**: Recreated as inline SVG components for optimal performance

## Animation System

### GSAP ScrollTrigger

The project uses GSAP ScrollTrigger for scroll-based animations:

```typescript
// Hero sequence animation
gsap.to(frameRef.current, {
  current: TOTAL_FRAMES - 1,
  ease: 'none',
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top top',
    end: '+=300%',
    scrub: 0.5,
    pin: true,
  },
})
```

### Canvas-based Frame Rendering

The sequence animation uses HTML5 Canvas for optimal performance:

1. All 280 frames are preloaded on mount
2. A loading indicator shows progress
3. Frames are rendered to canvas based on scroll position
4. Canvas resizes responsively on window resize

### Scroll Animation Configuration

| Section | Start | End | Effect |
|---------|-------|-----|--------|
| Hero | top top | +=300% | Frame sequence, pinned |
| Video Showcase | top 70% | center | Scale, opacity |
| Trusted By | top 85% | bottom 60% | Staggered fade-in |

## Custom Tailwind Configuration

### Colors

```css
--color-adaline-green: #2D3E2F;      /* Primary dark green */
--color-adaline-green-dark: #1a2a1c;  /* Darker green for hover */
--color-adaline-cream: #F5F3EE;       /* Background cream */
--color-adaline-beige: #E8E4DC;       /* Secondary beige */
--color-adaline-text: #2D3E2F;        /* Text color */
--color-adaline-text-muted: #5C6D5E;  /* Muted text */
```

### Typography

The project uses Inter font from Google Fonts:
- Display: Inter 400-700
- Body: Inter 400-500
- Tracking: Tight (-0.02em) for headlines

## Responsive Breakpoints

| Breakpoint | Width | Notes |
|------------|-------|-------|
| Mobile | < 640px | Single column, simplified nav |
| Tablet | 640px - 1024px | 2-column layouts |
| Desktop | 1024px+ | Full layout with all features |

## Key Components

### Navbar
- Fixed position with backdrop blur on scroll
- Products dropdown with 4 pillars (Iterate, Evaluate, Deploy, Monitor)
- Mobile hamburger menu
- Center-aligned logo (desktop) / Left-aligned (mobile)

### HeroSection
- Canvas-based sequence animation (280 frames)
- Scroll-pinned with 300% scroll range
- Trusted by logos integrated
- Loading state with progress indicator

### VideoShowcase
- Japanese shoji screen frame aesthetic
- Embedded video player
- Product interface mockup
- Decorative elements (rocks, shadows)

## Performance Optimizations

1. **Image preloading**: All sequence frames are preloaded before animation starts
2. **Canvas rendering**: Uses canvas instead of image elements for smoother animation
3. **Will-change hints**: Applied to animated elements
4. **Code splitting**: Automatic with Next.js
5. **Font optimization**: Using next/font for optimal loading
6. **Package optimization**: GSAP and Framer Motion tree-shaking enabled

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

### Running Linting

```bash
npm run lint
```

### Building for Production

```bash
npm run build
```

### Environment Variables

No environment variables are required for basic functionality.

## Troubleshooting

### Images Not Loading

Ensure all sequence images are present in the correct directory:
```
public/images/sequence/16x9_281/standard/
```

### Slow Initial Load

The 280 sequence images need to be preloaded. Consider:
- Using a CDN for production
- Implementing lazy loading for sections below the fold
- Using WebP format for smaller file sizes

### Animation Jittering

If animations appear choppy:
- Ensure GPU acceleration is enabled in the browser
- Check for other resource-intensive operations
- Reduce sequence frame count for lower-end devices

## License

This is a replica for educational purposes. Original design and branding are property of Adaline.ai.

## Acknowledgments

- **Adaline.ai** - Original design inspiration
- **Next.js Team** - Excellent framework
- **TailwindCSS** - Utility-first CSS
- **GSAP** - Powerful animation library

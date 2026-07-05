# Card Showcase

A lightweight HTML/Cypress project for generating promotional videos of double-sided trading cards.

The project renders an animated card that continuously flips between its front and back artwork, making it ideal for recording short promotional clips for Etsy listings, social media, and other marketing content.

## Features

* Animated front/back card flip
* Reusable HTML template
* Responsive card sizing
* Custom background image support
* Cypress integration for automated browser playback and video capture
* Designed for post-production workflows in Adobe Premiere Pro

## Project Structure

```text
card-showcase/
│
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── images/
│   │   ├── rotate_front.png
│   │   ├── rotate_back.png
│   │   ├── cardRotateBackground.png
│   │   └── vampire-favicon.png
│   └── js/
│       └── main.js
│
├── cypress/
├── cardrotation.html
├── cypress.config.js
├── package.json
└── README.md
```

## Requirements

* Node.js (LTS)
* npm
* Cypress

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd card-showcase
```

Install dependencies:

```bash
npm install
```

## Running the Project

Start the local web server:

```bash
npm run serve
```

The project will be available at:

```text
http://localhost:8080/cardrotation.html
```

## Opening Cypress

Launch the Cypress Test Runner:

```bash
npm run cy:open
```

Run Cypress headlessly (records video):

```bash
npm run cy:run
```

Recorded videos are saved to:

```text
cypress/videos/
```

## Customizing the Showcase

Replace the following assets to generate a new showcase:

* `assets/images/rotate_front.png`
* `assets/images/rotate_back.png`
* `assets/images/cardRotateBackground.png`

The animation timing can be adjusted in `cardrotation.html` by modifying:

```javascript
const FLIP_INTERVAL = 3000;
const START_DELAY = 220;
```

## Workflow

1. Replace the front and back card images.
2. Optionally replace the background artwork.
3. Run the local server.
4. Record the animation using Cypress.
5. Import the resulting MP4 into Adobe Premiere Pro.
6. Add branding, music, captions, and export for Etsy, TikTok, Instagram Reels, or YouTube Shorts.


## License

This project is intended as an internal production tool for creating promotional content.

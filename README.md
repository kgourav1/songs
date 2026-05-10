# AURA Music Player — Setup Guide

## Project Structure

```
/aura-music-player
  index.html       ← Main app file
  style.css        ← All styles
  script.js        ← All logic
  /songs
    song1.mp3      ← Your MP3 files go here
    song2.mp3
    song3.mp3
  /covers
    song1.jpg      ← Album cover images (JPG/PNG/WEBP)
    song2.jpg
    song3.jpg
```

---

## Quick Start

### Step 1 — Add Your Songs
Drop your `.mp3` files into the `/songs` folder.

### Step 2 — Add Cover Art
Drop album cover images (`.jpg`, `.png`, `.webp`) into the `/covers` folder.
Recommended size: **400×400 px** or larger.

### Step 3 — Register Songs in `script.js`
Open `script.js` and find the `SONGS` array (near the top). Add entries:

```js
const SONGS = [
  {
    title:  "My Song Title",
    artist: "Artist Name",
    album:  "Album Name",       // optional
    file:   "mysong.mp3",       // file in /songs/
    cover:  "mycover.jpg",      // file in /covers/
  },
  // add more...
];
```

### Step 4 — Open in a Browser
**Important:** Due to browser security, you must serve the files via a local server.

**Option A — VS Code:**
Install the "Live Server" extension → right-click `index.html` → Open with Live Server

**Option B — Python:**
```bash
cd aura-music-player
python -m http.server 8080
# then open http://localhost:8080
```

**Option C — Node.js:**
```bash
npx serve .
```

---

## Features

| Feature | Description |
|---|---|
| Play / Pause | Click the orange button or press `Space` |
| Next / Prev | Buttons or `N` / `P` keys |
| Seek | Drag the progress bar |
| Volume | Drag the volume slider or `↑↓` keys |
| Mute | Mute button or `M` key |
| Shuffle | Randomize playback order |
| Repeat | Loop current song |
| Favorites | Click ♡ on any song or press `F` |
| Search | Type in the search box — real-time filter |
| Dark/Light | Toggle top-right in sidebar |
| Audio Visualizer | Canvas bars react to frequency data |
| Keyboard seek | `←` / `→` arrow keys seek ±5 seconds |

---

## localStorage — What's Saved

The app automatically remembers between sessions:
- Last played song & playback position
- Volume level
- Favorite songs
- Recently played list (last 50)
- Dark/light theme preference

---

## Customization

**Change accent color:** Edit `--accent` in `:root` inside `style.css`
**Change fonts:** Swap the Google Fonts `<link>` in `index.html`
**Add more songs:** Add entries to the `SONGS` array in `script.js`

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `Space` | Play / Pause |
| `N` | Next song |
| `P` | Previous song |
| `M` | Toggle mute |
| `F` | Favorite current song |
| `←` `→` | Seek ±5 seconds |
| `↑` `↓` | Volume ±10% |

---

## Browser Support
Chrome, Firefox, Edge, Safari (all modern versions). Requires a local HTTP server to load audio files.

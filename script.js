/**
 * ═══════════════════════════════════════════════════════════
 *  AURA MUSIC PLAYER — script.js
 *  Fully offline, no APIs, no frameworks, no dependencies
 * ═══════════════════════════════════════════════════════════
 *
 *  HOW TO ADD SONGS:
 *  1. Drop your .mp3 files into the /songs folder
 *  2. Drop matching cover images into /covers folder
 *     (filenames don't need to match — just reference them below)
 *  3. Add an entry to the SONGS array below, e.g.:
 *     { title:"My Song", artist:"Artist", album:"Album", file:"mysong.mp3", cover:"mysong.jpg" }
 *
 *  HOW LOCALSTORAGE WORKS:
 *  The app saves: lastSongIndex, lastTime, volume, favorites[], theme,
 *  recentlyPlayed[] — all restored on next page load automatically.
 *
 *  KEYBOARD SHORTCUTS:
 *  Space → Play/Pause  |  N → Next  |  P → Previous  |  M → Mute
 *  ← → → Seek 5s       |  F → Favorite current song
 */

"use strict";

/* ═══════════════════════════════════════
   1. SONGS ARRAY
   Add as many songs as you want here.
   Files must live in ./songs/ and covers in ./covers/
═══════════════════════════════════════ */
const SONGS = [
  {
    title: "Nakara",
    artist: "Kumar Gourav",
    album: "Love",
    file: "song (1).mp3",
    cover: "kogo.png",
  },
  {
    title: "Suno Jana",
    artist: "Kumar Gourav",
    album: "Love",
    file: "song (2).mp3",
    cover: "kogo.png",
  },
  {
    title: "Kismat",
    artist: "Kumar Gourav",
    album: "Love",
    file: "song (3).mp3",
    cover: "kogo.png",
  },
  {
    title: "Mai Tum aur",
    artist: "Kumar Gourav",
    album: "Love",
    file: "song (4).mp3",
    cover: "kogo.png",
  },
  {
    title: "Bahut Galat",
    artist: "Kumar Gourav",
    album: "Motivation",
    file: "song (5).mp3",
    cover: "kogo.png",
  },
  {
    title: "Baat itni si",
    artist: "Kumar Gourav",
    album: "Love",
    file: "song (6).mp3",
    cover: "kogo.png",
  },
  {
    title: "Ehsaas",
    artist: "Kumar Gourav",
    album: "Love",
    file: "song (7).mp3",
    cover: "kogo.png",
  },
  {
    title: "Wait",
    artist: "Kumar Gourav",
    album: "Love",
    file: "song (8).mp3",
    cover: "kogo.png",
  },
  {
    title: "Rukna nahi hai",
    artist: "Kumar Gourav",
    album: "Motivation",
    file: "song (9).mp3",
    cover: "kogo.png",
  },
  {
    title: "Palat",
    artist: "Kumar Gourav",
    album: "Love",
    file: "song (10).mp3",
    cover: "kogo.png",
  },
  {
    title: "Sapne",
    artist: "Kumar Gourav",
    album: "Love",
    file: "song (11).mp3",
    cover: "kogo.png",
  },
  {
    title: "Mohini",
    artist: "Kumar Gourav",
    album: "Love",
    file: "song (12).mp3",
    cover: "kogo.png",
  },
  {
    title: "Mouka",
    artist: "Kumar Gourav",
    album: "Love",
    file: "song (13).mp3",
    cover: "kogo.png",
  },
  {
    title: "Mumkin",
    artist: "Kumar Gourav",
    album: "Love",
    file: "song (14).mp3",
    cover: "kogo.png",
  },
  {
    title: "Likhne Wale",
    artist: "Kumar Gourav",
    album: "Motivation",
    file: "song (15).mp3",
    cover: "kogo.png",
  },
  {
    title: "Na Rukna",
    artist: "Kumar Gourav",
    album: "Motivation",
    file: "song (16).mp3",
    cover: "kogo.png",
  },
  {
    title: "Itvaar",
    artist: "Kumar Gourav",
    album: "Love",
    file: "song (17).mp3",
    cover: "kogo.png",
  },
  {
    title: "Socha na tha",
    artist: "Kumar Gourav",
    album: "Love",
    file: "song (18).mp3",
    cover: "kogo.png",
  },
  {
    title: "Pehli Mulaakat",
    artist: "Kumar Gourav",
    album: "Love",
    file: "song (19).mp3",
    cover: "kogo.png",
  },
  {
    title: "Ta-umr-bhar",
    artist: "Kumar Gourav",
    album: "Love",
    file: "song (20).mp3",
    cover: "kogo.png",
  },
  {
    title: "Maamu ka Jaanu",
    artist: "Kumar Gourav",
    album: "Love",
    file: "song (21).mp3",
    cover: "kogo.png",
  },
  {
    title: "Tera Bhai",
    artist: "Kumar Gourav",
    album: "Love",
    file: "song (22).mp3",
    cover: "kogo.png",
  },
  // ─── Add more songs here ───────────────
  // { title: "Song Name", artist: "Artist", album: "Album", file: "song4.mp3", cover: "song4.jpg" },
];

/* ═══════════════════════════════════════
   2. DOM REFERENCES
═══════════════════════════════════════ */
const $ = (id) => document.getElementById(id);

const audio = $("audioPlayer");
const albumArt = $("albumArt");
const trackTitle = $("trackTitle");
const trackArtist = $("trackArtist");
const trackAlbum = $("trackAlbum");
const timeCurrent = $("timeCurrent");
const timeTotal = $("timeTotal");
const progressFill = $("progressFill");
const progressThumb = $("progressThumb");
const progressWrap = $("progressWrap");
const songList = $("songList");
const songCount = $("songCount");
const panelTitle = $("panelTitle");
const searchInput = $("searchInput");
const clearSearch = $("clearSearch");
const playBtn = $("playBtn");
const prevBtn = $("prevBtn");
const nextBtn = $("nextBtn");
const shuffleBtn = $("shuffleBtn");
const repeatBtn = $("repeatBtn");
const muteBtn = $("muteBtn");
const volumeSlider = $("volumeSlider");
const favBtn = $("favBtn");
const themeToggle = $("themeToggle");
const loader = $("loader");
const toast = $("toast");
const app = $("app");
const canvas = $("visualizer");
const eqBars = $("eqBars");
const mbArt = $("mbArt");
const mbTitle = $("mbTitle");
const mbArtist = $("mbArtist");
const mbPlay = $("mbPlay");
const mbPrev = $("mbPrev");
const mbNext = $("mbNext");
const menuToggle = $("menuToggle");
const sidebar = $("sidebar");
const mobileBar = $("mobileBar");
const navItems = document.querySelectorAll(".nav-item");
const tabs = document.querySelectorAll(".tab");

/* ═══════════════════════════════════════
   3. STATE
═══════════════════════════════════════ */
let currentIndex = -1; // index into SONGS
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let isMuted = false;
let isDragging = false; // seeking in progress
let currentTab = "all"; // 'all' | 'favorites' | 'recent'
let searchQuery = "";

// localStorage-backed state
let favorites = []; // array of song indices
let recentlyPlayed = []; // array of { index, timestamp }

// Audio context for visualizer
let audioCtx = null;
let analyser = null;
let source = null;
let animFrame = null;
let canvasReady = false;

/* ═══════════════════════════════════════
   4. INIT
═══════════════════════════════════════ */
function init() {
  loadState();
  buildSongList();
  attachEvents();
  restoreSession();

  // Hide loader after short delay
  setTimeout(() => {
    loader.classList.add("hidden");
    app.classList.add("ready");
  }, 1200);
}

/* ═══════════════════════════════════════
   5. LOCALSTORAGE  ── save / load
═══════════════════════════════════════ */
function saveState() {
  localStorage.setItem("aura_favorites", JSON.stringify(favorites));
  localStorage.setItem("aura_recent", JSON.stringify(recentlyPlayed));
  localStorage.setItem("aura_volume", audio.volume);
  localStorage.setItem("aura_song", currentIndex);
  localStorage.setItem("aura_time", audio.currentTime);
  localStorage.setItem("aura_theme", document.documentElement.dataset.theme);
}

function loadState() {
  try {
    favorites = JSON.parse(localStorage.getItem("aura_favorites")) || [];
    recentlyPlayed = JSON.parse(localStorage.getItem("aura_recent")) || [];
    const vol = parseFloat(localStorage.getItem("aura_volume"));
    if (!isNaN(vol)) {
      audio.volume = vol;
      volumeSlider.value = vol;
    }
    const theme = localStorage.getItem("aura_theme") || "dark";
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    favorites = [];
    recentlyPlayed = [];
  }
}

function restoreSession() {
  // Restore last played song (but don't auto-play)
  const savedIndex = parseInt(localStorage.getItem("aura_song"), 10);
  const savedTime = parseFloat(localStorage.getItem("aura_time"));
  if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < SONGS.length) {
    loadSong(savedIndex, false); // false = don't autoplay
    if (!isNaN(savedTime)) audio.currentTime = savedTime;
  }
  updateVolumeFill();
}

/* ═══════════════════════════════════════
   6. BUILD SONG LIST  (dynamic)
═══════════════════════════════════════ */
function buildSongList(filter) {
  songList.innerHTML = "";

  let items = [];

  if (currentTab === "favorites") {
    items = favorites.map((i) => ({ index: i, song: SONGS[i] }));
    panelTitle.textContent = "Favorites";
  } else if (currentTab === "recent") {
    items = recentlyPlayed
      .slice()
      .reverse()
      .slice(0, 30)
      .map((r) => ({ index: r.index, song: SONGS[r.index] }));
    panelTitle.textContent = "Recently Played";
  } else {
    items = SONGS.map((song, i) => ({ index: i, song }));
    panelTitle.textContent = "All Songs";
  }

  // Apply search filter
  const q = (filter || searchQuery).toLowerCase().trim();
  if (q) {
    items = items.filter(
      ({ song }) =>
        song.title.toLowerCase().includes(q) ||
        song.artist.toLowerCase().includes(q) ||
        (song.album || "").toLowerCase().includes(q),
    );
  }

  songCount.textContent = `${items.length} song${items.length !== 1 ? "s" : ""}`;

  if (!items.length) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/><path d="M9 9h.01M15 9h.01M9.5 15a3.5 3.5 0 0 0 5 0"/>
      </svg>
      <p>${q ? 'No results for "' + q + '"' : "Nothing here yet"}</p>`;
    songList.appendChild(empty);
    return;
  }

  items.forEach(({ index, song }, listPos) => {
    const isFav = favorites.includes(index);
    const isActive = index === currentIndex;
    const li = document.createElement("li");
    li.className = "song-item" + (isActive ? " active" : "");
    li.setAttribute("role", "option");
    li.setAttribute("aria-selected", isActive);
    li.dataset.index = index;
    li.style.animationDelay = `${listPos * 0.03}s`;

    // Playing indicator dots
    const pi =
      '<div class="playing-indicator"><span></span><span></span><span></span></div>';

    li.innerHTML = `
      <img class="song-thumb" src="./covers/${song.cover}" alt="${song.title}" loading="lazy"
           onerror="this.src='data:image/svg+xml,${encodeURIComponent(defaultCoverSVG())}'" />
      <div class="song-info">
        <div class="song-name">${song.title}</div>
        <div class="song-artist-sm">${song.artist}</div>
      </div>
      <button class="song-fav ${isFav ? "active" : ""}" data-idx="${index}" aria-label="Favorite" title="Favorite">
        <svg viewBox="0 0 24 24" fill="${isFav ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
      ${pi}
    `;

    // Play on row click
    li.addEventListener("click", (e) => {
      if (e.target.closest(".song-fav")) return;
      selectSong(index);
    });

    // Favorite toggle
    li.querySelector(".song-fav").addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(index);
    });

    songList.appendChild(li);
  });
}

/* ─── Fallback cover SVG ─── */
function defaultCoverSVG() {
  return `<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44'>
    <rect width='44' height='44' rx='8' fill='%231e1830'/>
    <circle cx='22' cy='22' r='8' fill='none' stroke='%23f5a623' stroke-width='1.5'/>
    <circle cx='22' cy='22' r='2' fill='%23f5a623'/>
  </svg>`;
}

/* ═══════════════════════════════════════
   7. PLAYBACK
═══════════════════════════════════════ */
function selectSong(index) {
  if (index < 0 || index >= SONGS.length) return;
  loadSong(index, true);
}

function loadSong(index, autoplay = true) {
  const song = SONGS[index];
  if (!song) return;

  currentIndex = index;

  // Set audio source
  audio.src = `./songs/${song.file}`;

  // Update UI
  trackTitle.textContent = song.title;
  trackArtist.textContent = song.artist;
  trackAlbum.textContent = song.album || "";
  mbTitle.textContent = song.title;
  mbArtist.textContent = song.artist;

  const coverSrc = `./covers/${song.cover}`;
  albumArt.src = coverSrc;
  albumArt.onerror = () => {
    albumArt.src =
      "data:image/svg+xml," + encodeURIComponent(defaultCoverSVG());
  };
  mbArt.src = coverSrc;

  // Favorite state
  updateFavBtn();

  // Update song list highlights
  document.querySelectorAll(".song-item").forEach((el) => {
    const active = parseInt(el.dataset.index) === index;
    el.classList.toggle("active", active);
    el.setAttribute("aria-selected", active);
    if (active) el.scrollIntoView({ block: "nearest", behavior: "smooth" });
  });

  // Progress reset
  progressFill.style.width = "0%";
  timeCurrent.textContent = "0:00";
  timeTotal.textContent = "0:00";

  if (autoplay) {
    playAudio();
    addToRecent(index);
  }

  saveState();
}

function playAudio() {
  initAudioContext();
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => setPlayingState(true))
      .catch(() => setPlayingState(false));
  }
}

function pauseAudio() {
  audio.pause();
  setPlayingState(false);
}

function togglePlay() {
  if (currentIndex < 0) {
    selectSong(0);
    return;
  }
  if (isPlaying) pauseAudio();
  else playAudio();
}

function setPlayingState(playing) {
  isPlaying = playing;
  document.body.classList.toggle("playing", playing);
  // Sync mobile play button
  // (CSS handles icon swap via body.playing)
}

function playNext() {
  if (SONGS.length === 0) return;
  let next;
  if (isShuffle) {
    let r;
    do {
      r = Math.floor(Math.random() * SONGS.length);
    } while (r === currentIndex && SONGS.length > 1);
    next = r;
  } else {
    next = (currentIndex + 1) % SONGS.length;
  }
  selectSong(next);
}

function playPrev() {
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }
  if (SONGS.length === 0) return;
  const prev = (currentIndex - 1 + SONGS.length) % SONGS.length;
  selectSong(prev);
}

/* ═══════════════════════════════════════
   8. FAVORITES
═══════════════════════════════════════ */
function toggleFavorite(index) {
  const pos = favorites.indexOf(index);
  if (pos === -1) {
    favorites.push(index);
    showToast(`♡  Added to Favorites`);
  } else {
    favorites.splice(pos, 1);
    showToast(`Removed from Favorites`);
  }
  updateFavBtn();
  buildSongList();
  saveState();
}

function updateFavBtn() {
  const isFav = favorites.includes(currentIndex);
  favBtn.classList.toggle("active", isFav);
  favBtn.querySelector("svg").setAttribute("fill", isFav ? "#e74c7f" : "none");
}

/* ═══════════════════════════════════════
   9. RECENTLY PLAYED
═══════════════════════════════════════ */
function addToRecent(index) {
  // Remove duplicate, push to end
  recentlyPlayed = recentlyPlayed.filter((r) => r.index !== index);
  recentlyPlayed.push({ index, timestamp: Date.now() });
  if (recentlyPlayed.length > 50) recentlyPlayed.shift();
  saveState();
}

/* ═══════════════════════════════════════
   10. PROGRESS BAR / SEEK
═══════════════════════════════════════ */
function updateProgress() {
  if (isDragging || !audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = pct + "%";
  progressThumb.style.left = pct + "%";
  timeCurrent.textContent = formatTime(audio.currentTime);
  timeTotal.textContent = formatTime(audio.duration);
  // Save time periodically
  if (Math.floor(audio.currentTime) % 5 === 0) saveState();
}

function seekTo(e) {
  const rect = progressWrap.getBoundingClientRect();
  const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  const pct = Math.max(0, Math.min(1, x / rect.width));
  audio.currentTime = pct * audio.duration;
  progressFill.style.width = pct * 100 + "%";
  progressThumb.style.left = pct * 100 + "%";
  timeCurrent.textContent = formatTime(audio.currentTime);
}

function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ═══════════════════════════════════════
   11. VOLUME
═══════════════════════════════════════ */
function updateVolumeFill() {
  const v = audio.volume * 100;
  volumeSlider.style.setProperty("--vol", v + "%");
}

function toggleMute() {
  isMuted = !isMuted;
  audio.muted = isMuted;
  muteBtn.classList.toggle("muted", isMuted);
  showToast(isMuted ? "🔇 Muted" : "🔊 Unmuted");
}

/* ═══════════════════════════════════════
   12. SHUFFLE / REPEAT
═══════════════════════════════════════ */
function toggleShuffle() {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("shuffle-on", isShuffle);
  showToast(isShuffle ? "🔀 Shuffle On" : "Shuffle Off");
}

function toggleRepeat() {
  isRepeat = !isRepeat;
  audio.loop = isRepeat;
  repeatBtn.classList.toggle("repeat-on", isRepeat);
  showToast(isRepeat ? "🔁 Repeat On" : "Repeat Off");
}

/* ═══════════════════════════════════════
   13. AUDIO VISUALIZER  (Canvas API)
═══════════════════════════════════════ */
function initAudioContext() {
  if (audioCtx) return; // already set up
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;
    source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    canvasReady = true;
    drawVisualizer();
  } catch (e) {
    // Canvas API unavailable — fall back to CSS bars
    canvas.style.display = "none";
    eqBars.style.display = "flex";
  }
}

function drawVisualizer() {
  if (!canvasReady || !analyser) return;
  animFrame = requestAnimationFrame(drawVisualizer);

  const isDark = document.documentElement.dataset.theme !== "light";
  const W = canvas.offsetWidth;
  const H = canvas.offsetHeight;
  if (canvas.width !== W) canvas.width = W;
  if (canvas.height !== H) canvas.height = H;

  const ctx = canvas.getContext("2d");
  const data = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(data);

  ctx.clearRect(0, 0, W, H);

  const bars = data.length;
  const barW = (W / bars) * 0.8;
  const gap = (W / bars) * 0.2;

  for (let i = 0; i < bars; i++) {
    const val = data[i] / 255;
    const h = val * H;
    const x = i * (barW + gap);
    const y = H - h;

    // Gradient bar
    const grad = ctx.createLinearGradient(0, y, 0, H);
    grad.addColorStop(
      0,
      isDark ? "rgba(245,166,35,0.9)" : "rgba(196,111,224,0.9)",
    );
    grad.addColorStop(
      1,
      isDark ? "rgba(196,111,224,0.3)" : "rgba(245,166,35,0.3)",
    );

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y, barW, h, 2);
    ctx.fill();
  }
}

/* ═══════════════════════════════════════
   14. THEME
═══════════════════════════════════════ */
function toggleTheme() {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
  saveState();
}

/* ═══════════════════════════════════════
   15. TOAST NOTIFICATION
═══════════════════════════════════════ */
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ═══════════════════════════════════════
   16. SEARCH
═══════════════════════════════════════ */
function onSearch(q) {
  searchQuery = q;
  clearSearch.classList.toggle("visible", q.length > 0);
  buildSongList();
}

/* ═══════════════════════════════════════
   17. TABS
═══════════════════════════════════════ */
function switchTab(tab) {
  currentTab = tab;
  tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === tab));
  buildSongList();
}

/* ═══════════════════════════════════════
   18. SIDEBAR NAV (home / favorites / recent)
═══════════════════════════════════════ */
function switchView(view) {
  navItems.forEach((n) =>
    n.classList.toggle("active", n.dataset.view === view),
  );
  // Map nav views to tabs
  const map = { home: "all", favorites: "favorites", recent: "recent" };
  switchTab(map[view] || "all");
}

/* ═══════════════════════════════════════
   19. KEYBOARD SHORTCUTS
═══════════════════════════════════════ */
document.addEventListener("keydown", (e) => {
  const tag = e.target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return;

  switch (e.key) {
    case " ":
      e.preventDefault();
      togglePlay();
      break;
    case "n":
    case "N":
      playNext();
      break;
    case "p":
    case "P":
      playPrev();
      break;
    case "m":
    case "M":
      toggleMute();
      break;
    case "f":
    case "F":
      if (currentIndex >= 0) toggleFavorite(currentIndex);
      break;
    case "ArrowRight":
      e.preventDefault();
      audio.currentTime += 5;
      break;
    case "ArrowLeft":
      e.preventDefault();
      audio.currentTime -= 5;
      break;
    case "ArrowUp":
      e.preventDefault();
      audio.volume = Math.min(1, audio.volume + 0.1);
      volumeSlider.value = audio.volume;
      updateVolumeFill();
      break;
    case "ArrowDown":
      e.preventDefault();
      audio.volume = Math.max(0, audio.volume - 0.1);
      volumeSlider.value = audio.volume;
      updateVolumeFill();
      break;
  }
});

/* ═══════════════════════════════════════
   20. MOBILE SIDEBAR TOGGLE
═══════════════════════════════════════ */
let overlay;
function openSidebar() {
  sidebar.classList.add("open");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "sidebar-overlay";
    document.body.appendChild(overlay);
    overlay.addEventListener("click", closeSidebar);
  }
  overlay.classList.add("visible");
}
function closeSidebar() {
  sidebar.classList.remove("open");
  if (overlay) overlay.classList.remove("visible");
}

/* ═══════════════════════════════════════
   21. EVENT LISTENERS
═══════════════════════════════════════ */
function attachEvents() {
  // Play controls
  playBtn.addEventListener("click", togglePlay);
  nextBtn.addEventListener("click", playNext);
  prevBtn.addEventListener("click", playPrev);
  shuffleBtn.addEventListener("click", toggleShuffle);
  repeatBtn.addEventListener("click", toggleRepeat);
  muteBtn.addEventListener("click", toggleMute);
  favBtn.addEventListener("click", () => {
    if (currentIndex >= 0) toggleFavorite(currentIndex);
  });
  themeToggle.addEventListener("click", toggleTheme);

  // Mobile bar
  mbPlay.addEventListener("click", togglePlay);
  mbNext.addEventListener("click", playNext);
  mbPrev.addEventListener("click", playPrev);

  // Mobile sidebar
  menuToggle.addEventListener("click", openSidebar);

  // Volume
  volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
    if (audio.muted) {
      audio.muted = false;
      isMuted = false;
      muteBtn.classList.remove("muted");
    }
    updateVolumeFill();
    saveState();
  });

  // Search
  searchInput.addEventListener("input", (e) => onSearch(e.target.value));
  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    onSearch("");
    searchInput.focus();
  });

  // Tabs
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  // Sidebar nav
  navItems.forEach((n) => {
    n.addEventListener("click", () => switchView(n.dataset.view));
  });

  // Audio events
  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("loadedmetadata", () => {
    timeTotal.textContent = formatTime(audio.duration);
  });
  audio.addEventListener("ended", () => {
    if (!isRepeat) playNext();
  });
  audio.addEventListener("error", () => {
    showToast("⚠ Could not load audio file");
    setPlayingState(false);
  });
  audio.addEventListener("play", () => setPlayingState(true));
  audio.addEventListener("pause", () => setPlayingState(false));

  // Seek bar — mouse
  progressWrap.addEventListener("mousedown", (e) => {
    isDragging = true;
    seekTo(e);
  });
  document.addEventListener("mousemove", (e) => {
    if (isDragging) seekTo(e);
  });
  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Seek bar — touch
  progressWrap.addEventListener(
    "touchstart",
    (e) => {
      isDragging = true;
      seekTo(e);
    },
    { passive: true },
  );
  document.addEventListener(
    "touchmove",
    (e) => {
      if (isDragging) seekTo(e);
    },
    { passive: true },
  );
  document.addEventListener("touchend", () => {
    isDragging = false;
  });

  // Seek bar — keyboard
  progressWrap.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") audio.currentTime += 5;
    if (e.key === "ArrowLeft") audio.currentTime -= 5;
  });
}

/* ═══════════════════════════════════════
   22. ROUNDRECT POLYFILL (for older browsers)
═══════════════════════════════════════ */
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
  };
}

/* ═══════════════════════════════════════
   23. BOOT
═══════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", init);

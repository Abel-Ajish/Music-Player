# 🎵 Web-Based Music Player

A sleek, Material You-inspired music player built with HTML, CSS, and JavaScript. This app allows users to upload and play local audio files in a beautiful, responsive UI with support for dark mode, custom controls, cover art display, and playlist navigation.

## 🌟 Features

- 🎧 Upload and play multiple local audio files
- 🖼️ Cover art preview (with partial ID3 tag support for `.mp3` files)
- ⏯️ Custom audio controls (play/pause, next, previous, seek, volume)
- 🌓 Dark mode toggle with animated curtain transition
- 📱 Fully responsive layout with mobile optimizations
- ✨ Stylish Material You-themed UI with smooth button animations

## 🚀 Getting Started

### Prerequisites

No dependencies or server setup required. All functionality is client-side.

### Run Locally

1. Clone or download this repository.
2. Open `index.html` in any modern browser.

```bash
git clone https://github.com/Abel-Ajish/music-player.git
cd music-player
start index.html  # Or just double-click it
```

## 📁 Project Structure

```
music-player/
├── index.html         # Main HTML file
├── style.css          # UI styles and responsive layout
└── script.js          # Logic for player control and interaction
```

## 📸 Screenshots

[Music Player Screenshot - Light Mode]
![image](https://github.com/user-attachments/assets/3f7bd4c9-e635-4b4b-a6d7-1e7956c23556)
[Music Player Screenshot - Dark Mode]
![image](https://github.com/user-attachments/assets/c3f63c72-008a-4d9b-99a3-f57dd834e836)



## 🛠️ Customization

- **UI Theme**: Modify CSS variables in `style.css` under `:root` to change colors.
- **Icons & Animations**: Add more animations or replace emoji with SVG icons.
- **Cover Art**: Supports embedded `.mp3` cover art via `APIC` tag extraction.

## 🙌 Credits

- UI inspired by [Material You](https://material.io/)
- Cover art logic adapted from open ID3 parsing techniques

## 📄 License

This project is open-source under the [MIT License](LICENSE).

---

Enjoy your music in style! 🎶

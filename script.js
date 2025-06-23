const fileInput = document.getElementById('fileInput');
const audioPlayer = document.getElementById('audioPlayer');
const fileName = document.getElementById('fileName');
const customControls = document.getElementById('customControls');
const playPause = document.getElementById('playPause');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const seekBar = document.getElementById('seekBar');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const volumeBar = document.getElementById('volumeBar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const coverArt = document.getElementById('coverArt');

let playlist = [];
let currentTrack = 0;

fileInput.addEventListener('change', function() {
  playlist = Array.from(this.files);
  currentTrack = 0;
  if (playlist.length > 0) {
    loadTrack(currentTrack);
    customControls.classList.add('visible');
  } else {
    audioPlayer.src = '';
    customControls.classList.remove('visible');
    fileName.textContent = '';
    coverArt.style.display = 'none';
    coverArt.src = '';
  }
});

function loadTrack(index) {
  const file = playlist[index];
  if (!file) return;
  const url = URL.createObjectURL(file);
  audioPlayer.src = url;
  audioPlayer.style.display = 'none';
  fileName.textContent = file.name;
  audioPlayer.load();
  audioPlayer.play();
  extractCoverArt(file);
}

prevBtn.addEventListener('click', function() {
  if (playlist.length === 0) return;
  prevBtn.classList.add('animated');
  setTimeout(() => prevBtn.classList.remove('animated'), 350);
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
});

nextBtn.addEventListener('click', function() {
  if (playlist.length === 0) return;
  nextBtn.classList.add('animated');
  setTimeout(() => nextBtn.classList.remove('animated'), 350);
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
});

// Play/Pause toggle
playPause.addEventListener('click', function() {
  if (audioPlayer.paused) {
    audioPlayer.play();
  } else {
    audioPlayer.pause();
  }
});

audioPlayer.addEventListener('play', () => {
  playIcon.classList.remove('active');
  playIcon.classList.add('fadeout');
  setTimeout(() => {
    playIcon.classList.remove('fadeout');
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'inline';
    pauseIcon.classList.add('active');
  }, 200);
});
audioPlayer.addEventListener('pause', () => {
  pauseIcon.classList.remove('active');
  pauseIcon.classList.add('fadeout');
  setTimeout(() => {
    pauseIcon.classList.remove('fadeout');
    pauseIcon.style.display = 'none';
    playIcon.style.display = 'inline';
    playIcon.classList.add('active');
  }, 200);
});

audioPlayer.addEventListener('loadedmetadata', () => {
  seekBar.max = Math.floor(audioPlayer.duration);
  duration.textContent = formatTime(audioPlayer.duration);
});

audioPlayer.addEventListener('timeupdate', () => {
  seekBar.value = Math.floor(audioPlayer.currentTime);
  currentTime.textContent = formatTime(audioPlayer.currentTime);
});

seekBar.addEventListener('input', () => {
  audioPlayer.currentTime = seekBar.value;
});

volumeBar.addEventListener('input', () => {
  audioPlayer.volume = volumeBar.value;
});

audioPlayer.addEventListener('ended', () => {
  if (playlist.length > 1) {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    setTimeout(() => {
      audioPlayer.play(); // Ensure autoplay on next track
    }, 50);
  } else {
    pauseIcon.classList.remove('active');
    playIcon.classList.add('active');
  }
});

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// Set initial icon state
playIcon.classList.add('active');
playIcon.style.display = 'inline';
pauseIcon.style.display = 'none';

// Add accessibility for sliders
seekBar.title = 'Seek';
volumeBar.title = 'Volume';

// Cover art extraction using browser APIs (ID3 for mp3)
function extractCoverArt(file) {
  coverArt.style.display = 'block';
  coverArt.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='100' height='100' viewBox='0,0,256,256' style='fill:%237950F2;'><g fill='%237950f2' fill-rule='nonzero' stroke='none' stroke-width='1' stroke-linecap='butt' stroke-linejoin='miter' stroke-miterlimit='10' stroke-dasharray='' stroke-dashoffset='0' font-family='none' font-weight='none' font-size='none' text-anchor='none' style='mix-blend-mode: normal'><g transform='scale(10.66667,10.66667)'><path d='M11,3v11.56055c-0.59163,-0.3469 -1.26933,-0.56055 -2,-0.56055c-2.19729,0 -4,1.80271 -4,4c0,2.19729 1.80271,4 4,4c2.19729,0 4,-1.80271 4,-4v-9h6v-6zM13,5h4v2h-4zM9,16c1.11641,0 2,0.88359 2,2c0,1.11641 -0.88359,2 -2,2c-1.11641,0 -2,-0.88359 -2,-2c0,-1.11641 0.88359,-2 2,-2z'></path></g></g></svg>";
  if (file.type === 'audio/mpeg' || file.name.endsWith('.mp3')) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const data = new Uint8Array(e.target.result);
      let i = 0;
      let found = false;
      while (i < data.length - 10) {
        if (data[i] === 0x41 && data[i+1] === 0x50 && data[i+2] === 0x49 && data[i+3] === 0x43) { // 'APIC'
          let picStart = i + 10;
          if (data[picStart] === 0x69 && data[picStart+1] === 0x6d && data[picStart+2] === 0x61 && data[picStart+3] === 0x67 && data[picStart+4] === 0x65 && data[picStart+5] === 0x2f) {
            let mimeEnd = picStart + 6;
            while (data[mimeEnd] !== 0x00 && mimeEnd < data.length) mimeEnd++;
            const mime = new TextDecoder().decode(data.slice(picStart, mimeEnd));
            let imgStart = mimeEnd + 2;
            while (data[imgStart] !== 0xFF && imgStart < data.length) imgStart++;
            if (imgStart < data.length) {
              const imgData = data.slice(imgStart);
              const blob = new Blob([imgData], {type: mime});
              coverArt.src = URL.createObjectURL(blob);
              found = true;
              break;
            }
          }
        }
        i++;
      }
    };
    reader.readAsArrayBuffer(file);
  }
}

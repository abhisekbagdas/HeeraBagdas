// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

function initializeApp() {
    lucide.createIcons();
    setupObserver();
}

// Song data
const songs = [
    {
        title: 'भेट्ने कहिले कहिले',
        artist: 'Heera Bagdas ft. Laxmi Pariyar',
        url: './Assets/Musics/Bhetne Kaile Kaile भटन कहल कहल by Laxmi Pariyar & Hira Bagdas  New Lok Dohori Song 2075.mp3',
        cover: './Assets/Images/Bhetne Kaile Kaile भटन कहल कहल by Laxmi Pariyar & Hira Bagdas  New Lok Dohori Song 2075.jpg'
    },
    {
        title: 'सारा खुशी',
        artist: 'Heera Bagdas - Solo',
        url: './Assets/Musics/सारा खुशी  New Nepali Lok Dohori 2076, 2020  Hira Bagdas & Pratima Bishwakarma.mp3',
        cover: './Assets/Images/Sara Khusi सारा खुशी by Hira Bagdas New Lok Dohori Song 2075.jpg'
    },
    {
        title: 'मेरी उनि',
        artist: 'Heera Bagdas ft. Sarita Thapa',
        url: './Assets/Musics/Meri Uni (मर उन ) Purnakala Bc & Hira Bagdas Ft. Dilip Regmi, Kanchan Pun New Nepali Song 2078.mp3',
        cover: './Assets/Images/Meri Unni मेरी उनि by Hira Bagdas New Lok Dohori Song 2075.jpg'
    }
];

let currentSongIndex = 0;
const audioPlayer = document.getElementById('audio-player');
const playerTitle = document.getElementById('player-title');
const playerArtist = document.getElementById('player-artist');
const mainPlayBtn = document.getElementById('main-play-btn');
const playlistItems = document.getElementById('playlist').children;

// Initialize player
function loadSong(index) {
    currentSongIndex = index;
    const song = songs[index];
    audioPlayer.src = song.url;
    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;

    // Update playlist highlighting
    Array.from(playlistItems).forEach((item, i) => {
        if (i === index) {
            item.classList.add('bg-purple-50');
            item.querySelector('span:first-child').classList.add('text-purple-600');
            item.querySelector('span:first-child').classList.remove('text-gray-400');
        } else {
            item.classList.remove('bg-purple-50');
            item.querySelector('span:first-child').classList.remove('text-purple-600');
            item.querySelector('span:first-child').classList.add('text-gray-400');
        }
    });

    lucide.createIcons();
}

function playSong(index) {
    loadSong(index);
    audioPlayer.play();
    updatePlayButton(true);

    // Scroll to player
    document.getElementById('main-player').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function togglePlay() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        updatePlayButton(true);
        document.getElementById('main-play-btn').classList.add('playing');
    } else {
        audioPlayer.pause();
        updatePlayButton(false);
        document.getElementById('main-play-btn').classList.remove('playing');
    }
}

function updatePlayButton(isPlaying) {
    mainPlayBtn.innerHTML = isPlaying
        ? '<i data-lucide="pause" class="w-8 h-8"></i>'
        : '<i data-lucide="play" class="w-8 h-8"></i>';
    lucide.createIcons();
}

function previousSong() {
    const newIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    playSong(newIndex);
}

function nextSong() {
    const newIndex = currentSongIndex === songs.length - 1 ? 0 : currentSongIndex + 1;
    playSong(newIndex);
}

// Audio event listeners
audioPlayer.addEventListener('play', () => updatePlayButton(true));
audioPlayer.addEventListener('pause', () => updatePlayButton(false));
audioPlayer.addEventListener('ended', () => nextSong());

// Video initialization\nfunction initializeVideos() {\n    document.querySelectorAll('iframe').forEach(iframe => {\n        lucide.createIcons();\n    });\n}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    lucide.createIcons();
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        lucide.createIcons();
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
function setupObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.song-card, .section-title, .contact p').forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
}

// Initialize
loadSong(0);

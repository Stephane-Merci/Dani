// Photo gallery data
const photos = [
    '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg',
    '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg'
];

// Valentine Popup Functionality
let noButtonMoveCount = 0;

function initPopup() {
    const popup = document.getElementById('valentinePopup');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const shyMessage = document.getElementById('shyMessage');

    // Yes button click - close popup
    yesBtn.addEventListener('click', () => {
        popup.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    // No button hover - move it away!
    noBtn.addEventListener('mouseenter', () => {
        moveNoButton();
        shyMessage.classList.add('visible');
        noButtonMoveCount++;
    });

    function moveNoButton() {
        const popup = document.querySelector('.popup-content');
        const popupRect = popup.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        // Calculate available space in popup
        const maxX = popupRect.width - btnRect.width - 100;
        const maxY = popupRect.height - btnRect.height - 100;

        // Generate random position
        const randomX = Math.random() * maxX - maxX / 2;
        const randomY = Math.random() * maxY - maxY / 2;

        // Apply transform
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

        // Add rotation for fun
        const randomRotation = Math.random() * 360;
        noBtn.style.transform += ` rotate(${randomRotation}deg)`;
    }
}

// Message Slider Functionality
let currentMessageIndex = 1;
const totalMessages = 3;

function initMessageSlider() {
    const navButtons = document.querySelectorAll('.message-nav-btn');
    const dots = document.querySelectorAll('.dot');

    // Navigation button clicks
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const direction = btn.getAttribute('data-nav');
            if (direction === 'next') {
                currentMessageIndex = currentMessageIndex === totalMessages ? 1 : currentMessageIndex + 1;
            } else {
                currentMessageIndex = currentMessageIndex === 1 ? totalMessages : currentMessageIndex - 1;
            }
            updateMessage();
        });
    });

    // Dot clicks
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentMessageIndex = parseInt(dot.getAttribute('data-dot'));
            updateMessage();
        });
    });
}

function updateMessage() {
    const messages = document.querySelectorAll('.message-content');
    const dots = document.querySelectorAll('.dot');

    // Update messages
    messages.forEach(msg => {
        msg.classList.remove('active');
        if (parseInt(msg.getAttribute('data-message')) === currentMessageIndex) {
            msg.classList.add('active');
        }
    });

    // Update dots
    dots.forEach(dot => {
        dot.classList.remove('active');
        if (parseInt(dot.getAttribute('data-dot')) === currentMessageIndex) {
            dot.classList.add('active');
        }
    });
}

// Load gallery images
function loadGallery() {
    const galleryGrid = document.getElementById('galleryGrid');

    photos.forEach((photo, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        galleryItem.setAttribute('data-index', index);

        const img = document.createElement('img');
        img.src = `pics/${photo}`;
        img.alt = `Memory ${index + 1}`;
        // Removed lazy loading for better mobile compatibility

        const overlay = document.createElement('div');
        overlay.classList.add('gallery-item-overlay');
        overlay.innerHTML = '<span>💕</span>';

        galleryItem.appendChild(img);
        galleryItem.appendChild(overlay);
        galleryGrid.appendChild(galleryItem);

        // Add click event for lightbox
        galleryItem.addEventListener('click', () => {
            openLightbox(index);
        });
    });
}

// Lightbox functionality
let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCounter = document.getElementById('lightboxCounter');

    lightboxImage.src = `pics/${photos[index]}`;
    lightboxCounter.textContent = `${index + 1} / ${photos.length}`;
    lightbox.classList.add('active');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');

    // Restore body scroll
    document.body.style.overflow = 'auto';
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % photos.length;
    openLightbox(currentImageIndex);
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + photos.length) % photos.length;
    openLightbox(currentImageIndex);
}

// Event listeners for lightbox
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxNext').addEventListener('click', showNextImage);
document.getElementById('lightboxPrev').addEventListener('click', showPrevImage);

// Close lightbox on background click
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    }
});

// Intersection Observer for scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Smooth reveal on scroll
function setupRevealOnScroll() {
    const sections = document.querySelectorAll('.love-message, .gallery-section, .final-message');

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Initialize floating hearts
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘'];

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 10 + 15) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        container.appendChild(heart);
    }
}

// Add sparkle effect on cursor
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '10px';
    sparkle.style.height = '10px';
    sparkle.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, transparent 70%)';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'sparkleAnimation 1s ease-out forwards';

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleAnimation {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 0.8;
            transform: scale(1.5) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Create sparkles on mouse move (throttled)
let lastSparkleTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkleTime > 100) { // Throttle to every 100ms
        if (Math.random() > 0.7) { // Only create sparkles 30% of the time
            createSparkle(e.clientX, e.clientY);
        }
        lastSparkleTime = now;
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize popup
    initPopup();

    // Initialize message slider
    initMessageSlider();

    // Create floating hearts
    createFloatingHearts();

    // Load gallery
    loadGallery();

    // Wait a bit for images to load before setting up animations
    setTimeout(() => {
        setupScrollAnimations();
        setupRevealOnScroll();
    }, 500);
});

// Add a special message to console for your girlfriend
console.log('%c💕 Happy Valentine\'s Day! 💕', 'font-size: 24px; color: #f093fb; font-weight: bold;');
console.log('%cYou are loved more than words can express ❤️', 'font-size: 16px; color: #667eea;');

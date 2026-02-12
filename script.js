// Floating hearts background
function createFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 300);
}

// Envelope interaction
const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');

envelope.addEventListener('click', () => {
    envelope.classList.toggle('open');
    letter.classList.toggle('show');
});

// Reason cards animation with enhanced effects
const reasonCards = document.querySelectorAll('.reason-card');
reasonCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.addEventListener('mouseenter', () => {
        const emoji = card.querySelector('.emoji');
        emoji.style.animation = 'none';
        setTimeout(() => {
            emoji.style.animation = 'bounce 0.5s ease';
        }, 10);
        
        // Create sparkle effect around card
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = '✨';
                sparkle.style.position = 'absolute';
                sparkle.style.left = Math.random() * card.offsetWidth + 'px';
                sparkle.style.top = Math.random() * card.offsetHeight + 'px';
                sparkle.style.fontSize = '20px';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.zIndex = '1000';
                sparkle.style.animation = 'float-up 1s ease-out';
                
                card.style.position = 'relative';
                card.appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.remove();
                }, 1000);
            }, i * 100);
        }
    });
});

// Game functionality
let score = 0;
let gameActive = false;
let gameInterval;
let timerInterval;
let timeLeft = 30;
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startGameBtn = document.getElementById('startGame');

startGameBtn.addEventListener('click', () => {
    if (!gameActive) {
        startGame();
    } else {
        endGame();
    }
});

function startGame() {
    gameActive = true;
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    startGameBtn.textContent = 'Stop Game';
    gameArea.innerHTML = '';
    
    gameInterval = setInterval(() => {
        createGameHeart();
    }, 800);
    
    // Timer countdown
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        // Change color when time is running out
        if (timeLeft <= 10) {
            timerDisplay.style.color = '#e63946';
            timerDisplay.style.animation = 'pulse 0.5s ease-in-out infinite';
        }
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameActive = false;
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    startGameBtn.textContent = 'Start Game';
    timerDisplay.style.color = '#667eea';
    timerDisplay.style.animation = 'none';
    timeLeft = 30;
    timerDisplay.textContent = timeLeft;
    
    setTimeout(() => {
        const hearts = gameArea.querySelectorAll('.game-heart');
        hearts.forEach(heart => heart.remove());
    }, 1000);
    
    if (score > 0) {
        showCongratulatoryMessage(score);
    }
}

function createGameHeart() {
    if (!gameActive) return;
    
    const heart = document.createElement('div');
    heart.className = 'game-heart';
    const heartEmojis = ['❤️', '💕', '💖', '💗'];
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    
    const maxX = gameArea.clientWidth - 50;
    const maxY = gameArea.clientHeight - 50;
    heart.style.left = Math.random() * maxX + 'px';
    heart.style.top = Math.random() * maxY + 'px';
    
    gameArea.appendChild(heart);
    
    heart.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = score;
        heart.style.animation = 'heartPop 0.3s ease';
        setTimeout(() => {
            heart.remove();
        }, 300);
        
        // Create mini celebration
        createMiniCelebration(heart.style.left, heart.style.top);
    });
    
    setTimeout(() => {
        if (heart.parentElement) {
            heart.remove();
        }
    }, 2500);
}

function createMiniCelebration(x, y) {
    const celebration = document.createElement('div');
    celebration.textContent = '✨';
    celebration.style.position = 'absolute';
    celebration.style.left = x;
    celebration.style.top = y;
    celebration.style.fontSize = '30px';
    celebration.style.pointerEvents = 'none';
    celebration.style.animation = 'float-up 1s ease-out';
    
    gameArea.appendChild(celebration);
    
    setTimeout(() => {
        celebration.remove();
    }, 1000);
}

function showCongratulatoryMessage(finalScore) {
    const messages = [
        `Amazing! You caught ${finalScore} hearts! You're as quick as my heart beats for you! 💓`,
        `Wow! ${finalScore} hearts! That's how many times I think about you every hour! 💕`,
        `Incredible! ${finalScore} hearts caught! You're a natural... just like how naturally I fell for you! 💖`,
        `${finalScore} hearts! You know what? That's still less than how much I love you! ❤️`
    ];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    const msgBox = document.createElement('div');
    msgBox.style.position = 'fixed';
    msgBox.style.top = '50%';
    msgBox.style.left = '50%';
    msgBox.style.transform = 'translate(-50%, -50%)';
    msgBox.style.background = 'linear-gradient(135deg, #ff6b9d 0%, #e63946 100%)';
    msgBox.style.color = 'white';
    msgBox.style.padding = '30px 40px';
    msgBox.style.borderRadius = '20px';
    msgBox.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.5)';
    msgBox.style.zIndex = '1000';
    msgBox.style.textAlign = 'center';
    msgBox.style.fontSize = '1.3em';
    msgBox.style.maxWidth = '80%';
    msgBox.style.animation = 'fadeInUp 0.5s ease';
    msgBox.innerHTML = `<p>${message}</p>`;
    
    document.body.appendChild(msgBox);
    
    setTimeout(() => {
        msgBox.style.animation = 'fadeInDown 0.5s ease reverse';
        setTimeout(() => {
            msgBox.remove();
        }, 500);
    }, 3000);
}

// Love quotes carousel
const quotes = [
    "You're the reason I believe in love at first sight... and second, and third... 💕",
    "Being with you is like a dream I never want to wake up from 🌙",
    "You're my favorite notification, my favorite person, my favorite everything 📱💕",
    "In a room full of art, I'd still stare at you 🎨❤️",
    "You're the 'extra' in extraordinary, the 'super' in superb, the 'wonder' in wonderful! ✨",
    "My love for you is like pi... irrational and never-ending! 🥧💕",
    "You're the WiFi to my heart - I feel disconnected when you're not around 📶❤️",
    "If I could rearrange the alphabet, I'd put U and I together... but honestly, we're already perfect! 💖",
    "You're the peanut butter to my jelly, the cheese to my pizza, the love to my life! 🍕💕",
    "Every love story is beautiful, but ours is my favorite 📖❤️"
];

let currentQuoteIndex = 0;
const quoteElement = document.getElementById('quote');
const nextQuoteBtn = document.getElementById('nextQuote');

function displayQuote() {
    quoteElement.style.opacity = '0';
    quoteElement.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        quoteElement.textContent = quotes[currentQuoteIndex];
        quoteElement.style.transition = 'all 0.5s ease';
        quoteElement.style.opacity = '1';
        quoteElement.style.transform = 'translateY(0)';
    }, 300);
}

nextQuoteBtn.addEventListener('click', () => {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    displayQuote();
});

// Initial quote display
displayQuote();

// Auto-rotate quotes every 8 seconds
setInterval(() => {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    displayQuote();
}, 8000);

// Add sparkle effect on cursor
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.pageX + 'px';
        sparkle.style.top = e.pageY + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = '20px';
        sparkle.style.zIndex = '9999';
        sparkle.style.animation = 'float-up 1s ease-out';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
});

// Add click animation to the whole page
document.addEventListener('click', (e) => {
    const heart = document.createElement('div');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓'];
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.position = 'fixed';
    heart.style.left = e.pageX + 'px';
    heart.style.top = e.pageY + 'px';
    heart.style.fontSize = '30px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'float-up 2s ease-out';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
});

// Initialize floating hearts
createFloatingHearts();

// Add confetti effect on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        createConfetti();
    }, 500);
});

function createConfetti() {
    const colors = ['#ff6b9d', '#c06c84', '#f67280', '#355c7d', '#6c5b7b'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            confetti.style.animation = `float-up ${Math.random() * 3 + 3}s ease-out`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 6000);
        }, i * 30);
    }
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        secretMessage();
        konamiCode = [];
    }
});

function secretMessage() {
    const msgBox = document.createElement('div');
    msgBox.style.position = 'fixed';
    msgBox.style.top = '50%';
    msgBox.style.left = '50%';
    msgBox.style.transform = 'translate(-50%, -50%)';
    msgBox.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    msgBox.style.color = 'white';
    msgBox.style.padding = '40px';
    msgBox.style.borderRadius = '20px';
    msgBox.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.5)';
    msgBox.style.zIndex = '10000';
    msgBox.style.textAlign = 'center';
    msgBox.style.fontSize = '1.5em';
    msgBox.style.maxWidth = '80%';
    msgBox.style.animation = 'heartbeat 1s ease-in-out';
    msgBox.innerHTML = `
        <h2>🎉 You Found The Secret! 🎉</h2>
        <p>You're not just beautiful, you're adventurous too!</p>
        <p>I love discovering new things with you! 💕</p>
    `;
    
    document.body.appendChild(msgBox);
    
    createConfetti();
    
    setTimeout(() => {
        msgBox.style.opacity = '0';
        msgBox.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            msgBox.remove();
        }, 500);
    }, 4000);
}

console.log('💕 P.S. Try the Konami code for a special surprise! (↑ ↑ ↓ ↓ ← → ← → B A) 💕');

// Smooth scroll reveal animations
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

document.querySelectorAll('.reason-card, .game-section, .quote-section, .special-message').forEach(el => {
    observer.observe(el);
});

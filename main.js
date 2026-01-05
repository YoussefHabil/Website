document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Typing Effect for Hero
    // 2. Advanced Scramble Text Effect
    const dynamicText = document.getElementById('dynamic-text');
    const words = ["Scalable", "Secure", "Modern", "Robust"];
    let wordIndex = 0;

    const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

    function scramble(newText) {
        let iterations = 0;
        const interval = setInterval(() => {
            dynamicText.innerText = newText.split("")
                .map((letter, index) => {
                    if (index < iterations) {
                        return newText[index];
                    }
                    return randomChars[Math.floor(Math.random() * randomChars.length)];
                })
                .join("");

            if (iterations >= newText.length) {
                clearInterval(interval);
            }

            iterations += 1 / 2; // Speed of reveal
        }, 40);
    }

    // Cycle every 4 seconds
    setInterval(() => {
        wordIndex = (wordIndex + 1) % words.length;
        scramble(words[wordIndex]);
    }, 4000);
    // Typing effect disabled due to static professional title.

    // 3. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .project-card, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add CSS class for animation via JS
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
    // 4. Preloader Logic
    const counter = document.querySelector('.counter');
    const preloader = document.querySelector('.preloader');
    let count = 0;

    // Simulate loading
    const countInterval = setInterval(() => {
        if (count === 100) {
            clearInterval(countInterval);
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        } else {
            count++;
            if (counter) counter.textContent = count + "%";
        }
    }, 20);

    // 5. Custom Cursor Logic REMOVED
    // The user requested to remove the "Cursor Spot"

    // 6. Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        document.querySelector('.scroll-progress').style.width = scrolled + "%";
    });

    // 7. Tab Title Activity (Fun Hack)
    let docTitle = document.title;
    window.addEventListener("blur", () => {
        document.title = "Come back! 😭";
    });
    window.addEventListener("focus", () => {
        document.title = docTitle;
    });

    // 8. Bento Grid Tilt Effect (Superseded by Universal Tilt below)
    // Removed to prevent conflict with new universal listener.

    // 9. Copy Email Function
    window.copyEmail = function () {
        const email = "youssefhabil711@gmail.com";
        navigator.clipboard.writeText(email).then(() => {
            const emailText = document.getElementById("email-text");
            const originalText = emailText.innerText;
            emailText.innerText = "Copied!";
            setTimeout(() => {
                emailText.innerText = originalText;
            }, 2000);
        });
    }

    // 11. Advanced Nebula Background
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;

        class Blob {
            constructor() {
                this.init();
            }
            init() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 300 + 200; // Large blobs
                this.vx = (Math.random() - 0.5) * 0.2; // Slow movement
                this.vy = (Math.random() - 0.5) * 0.2;
                // Randomly choose between Primary (Purple) and Accent (Cyan) and Secondary (Pink)
                const colors = ['109, 40, 217', '34, 211, 238', '236, 72, 153'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.alpha = Math.random() * 0.2 + 0.1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                // Bounce off edges (or wrap) - Wrapping is smoother
                if (this.x < -this.size) this.x = width + this.size;
                if (this.x > width + this.size) this.x = -this.size;
                if (this.y < -this.size) this.y = height + this.size;
                if (this.y > height + this.size) this.y = -this.size;
            }
            draw() {
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                gradient.addColorStop(0, `rgba(${this.color}, ${this.alpha})`);
                gradient.addColorStop(1, `rgba(${this.color}, 0)`);
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }


        // --- Constellation Stars ---
        class Star {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 1.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }
            draw() {
                ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        let stars = [];
        const STAR_COUNT = 60; // Adjust for density

        function initStars() {
            stars = [];
            for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star());
        }

        let blobs = [];
        const blobCount = 12; // Richer background

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            blobs = [];
            for (let i = 0; i < blobCount; i++) blobs.push(new Blob());
            initStars();
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // 1. Draw Blobs (Background Layer)
            ctx.globalCompositeOperation = 'screen';
            blobs.forEach(blob => {
                blob.update();
                blob.draw();
            });
            ctx.globalCompositeOperation = 'source-over';

            // 2. Draw Constellations (Foreground Layer)
            stars.forEach(star => {
                star.update();
                star.draw();
            });

            // Connect Stars
            ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
            ctx.lineWidth = 1;
            for (let i = 0; i < stars.length; i++) {
                for (let j = i + 1; j < stars.length; j++) {
                    const dx = stars[i].x - stars[j].x;
                    const dy = stars[i].y - stars[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(stars[i].x, stars[i].y);
                        ctx.lineTo(stars[j].x, stars[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize(); // Init
        animate(); // Loop
    }

    // 12. Spotlight & Universal 3D Tilt Effect
    const allCards = document.querySelectorAll('.bento-card, .project-card');
    allCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Spotlight Variable Update
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Tilt Logic
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
        });
    });
});

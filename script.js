/**
 * MIDHUNESH R - PORTFOLIO INTERACT ENGINE
 * Handles: Theme toggle, Canvas Particles, Typing Animation, Projects Filtering,
 * Skills Animators, Contact Verification, Scroll Progress, and Mouse Glow.
 */

document.addEventListener('DOMContentLoaded', () => {

  // Initialize Lucide Icons
  lucide.createIcons();

  /* ==========================================================================
     THEME (DARK / LIGHT MODE) TOGGLER
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');

  function getSavedTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    // Fallback to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }

  // Set initial theme
  const currentTheme = getSavedTheme();
  applyTheme(currentTheme);

  // Event Listeners
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const active = document.body.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(active);
    });
  }
  if (themeToggleMobileBtn) {
    themeToggleMobileBtn.addEventListener('click', () => {
      const active = document.body.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(active);
    });
  }


  /* ==========================================================================
     STICKY NAVBAR & SCROLL PROGRESS BAR
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const scrollProgressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    // Scroll progress calculations
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    if (scrollProgressBar) {
      scrollProgressBar.style.width = scrolled + "%";
    }

    // Sticky navbar backdrop toggle
    if (winScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top visibility
    if (winScroll > 400) {
      backToTopBtn.classList.remove('opacity-0', 'translate-y-10');
      backToTopBtn.classList.add('opacity-100', 'translate-y-0');
    } else {
      backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
      backToTopBtn.classList.add('opacity-0', 'translate-y-10');
    }
  });

  // Back to top scroll click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* ==========================================================================
     MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking a link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }


  /* ==========================================================================
     MOUSE GLOW radial spotlight tracker (for Desktop only)
     ========================================================================== */
  const mouseGlow = document.getElementById('mouse-glow');
  window.addEventListener('mousemove', (e) => {
    if (mouseGlow) {
      document.body.style.setProperty('--x', e.clientX + 'px');
      document.body.style.setProperty('--y', e.clientY + 'px');
    }
  });


  /* ==========================================================================
     TYPING TEXT ANIMATION
     ========================================================================== */
  const typingTextSpan = document.getElementById('typing-text');
  const phrases = [
    "Electronics & Communication Engineer",
    "Embedded Systems Specialist",
    "Internet of Things (IoT) Developer",
    "Microcontroller Enthusiast",
    "Autonomous Robotics Builder"
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      // Removing letters
      typingTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deletes faster
    } else {
      // Writing letters
      typingTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // Typing pace
    }

    // Toggle typing states
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2000; // Hold full sentence for 2 seconds
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Wait slightly before next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typingTextSpan) {
    setTimeout(typeEffect, 1000);
  }


  /* ==========================================================================
     CANVAS PARTICLE BACKGROUND SYSTEM
     ========================================================================== */
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const maxParticles = 65; // Density

    // Resize listener
    function setCanvasDimensions() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Particle blueprint
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce back boundaries
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
      }

      draw() {
        const isDark = document.body.classList.contains('dark');
        ctx.fillStyle = isDark ? 'rgba(6, 182, 212, 0.45)' : 'rgba(37, 99, 235, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize list
    function init() {
      particlesArray = [];
      for (let i = 0; i < maxParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    init();

    // Connect close dots with grid lines
    function connectLines() {
      const isDark = document.body.classList.contains('dark');
      const maxDistance = 140;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            // Gradient opacity based on distance proximity
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = isDark 
              ? `rgba(6, 182, 212, ${opacity * 0.12})` 
              : `rgba(37, 99, 235, ${opacity * 0.08})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    // Animation Loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      connectLines();
      requestAnimationFrame(animate);
    }
    animate();
  }


  /* ==========================================================================
     INTERSECTION OBSERVER FOR SKILLS PROGRESS BARS & COUNTERS
     ========================================================================== */
  const skillSection = document.getElementById('skills');
  const skillBars = document.querySelectorAll('.skill-progress');

  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Trigger fill animation
        skillBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width');
          bar.style.width = targetWidth;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  if (skillSection) {
    skillObserver.observe(skillSection);
  }


  // Count-Up Statistics Animation
  const aboutSection = document.getElementById('about');
  const statsCounters = document.querySelectorAll('.count-up');

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statsCounters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const duration = 1200; // Total count-up milliseconds
          const stepTime = Math.max(Math.floor(duration / target), 15);
          
          const timer = setInterval(() => {
            count++;
            counter.textContent = count;
            if (count >= target) {
              counter.textContent = target;
              clearInterval(timer);
            }
          }, stepTime);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  if (aboutSection) {
    statsObserver.observe(aboutSection);
  }


  /* ==========================================================================
     PROJECT CARD FILTERING
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active highlights
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-blue-600', 'text-white', 'border-blue-600');
        b.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300', 'border-slate-200', 'dark:border-slate-700');
      });
      
      btn.classList.add('active');
      btn.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300', 'border-slate-200', 'dark:border-slate-700');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('filtered-out');
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });


  /* ==========================================================================
     PROFESSIONAL CONTACT FORM VERIFICATION (SIMULATION)
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formSuccessAlert = document.getElementById('form-success-alert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Stop page reload

      // Capture inputs
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value;

      // Select submit button and store original text
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;

      // Update loading status
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Message... <i data-lucide="loader" class="w-4 h-4 animate-spin inline-block align-middle ml-1"></i>';
      if (window.lucide) {
        window.lucide.createIcons();
      }

      contactForm.classList.add('opacity-50', 'pointer-events-none');

      // Send details to FormSubmit.co AJAX API
      fetch("https://formsubmit.co/ajax/midhunesh6@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          subject: subject,
          message: message
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not submit form');
        }
        return response.json();
      })
      .then(data => {
        console.log("Contact form successfully submitted:", data);
        contactForm.reset();
        contactForm.classList.add('hidden');
        contactForm.classList.remove('opacity-50', 'pointer-events-none');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        if (formSuccessAlert) {
          formSuccessAlert.classList.remove('hidden');
          // Automatically hide success alert and restore form after 8 seconds
          setTimeout(() => {
            formSuccessAlert.classList.add('hidden');
            contactForm.classList.remove('hidden');
          }, 8000);
        }
      })
      .catch(error => {
        console.error("Submission failed:", error);
        alert("Oops! There was a problem submitting your message. Please verify your connection or email me directly at midhunesh6@gmail.com.");
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        contactForm.classList.remove('opacity-50', 'pointer-events-none');
        if (window.lucide) {
          window.lucide.createIcons();
        }
      });
    });
  }

});

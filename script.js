```javascript
"use strict";

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "إغلاق القائمة" : "فتح القائمة"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the menu after selecting a section
document.querySelectorAll("#navLinks a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "فتح القائمة");
        menuToggle.textContent = "☰";
    });
});

// Animated statistics
const counters = document.querySelectorAll(".stat-number");

const animateCounter = (counter) => {
    const target = Number(counter.dataset.target);
    const duration = 1200;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
        const progress = Math.min(
            (currentTime - startTime) / duration,
            1
        );

        const easedProgress = 1 - Math.pow(1 - progress, 3);

        counter.textContent = Math.floor(
            target * easedProgress
        ).toLocaleString("en-US");

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    };

    requestAnimationFrame(updateCounter);
};

const observer = new IntersectionObserver(
    (entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                currentObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.5
    }
);

counters.forEach((counter) => {
    observer.observe(counter);
});

// Automatic copyright year
document.getElementById("year").textContent =
    new Date().getFullYear();

// Highlight the active navigation link
const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navigationLinks.forEach((link) => {
                    const matches =
                        link.getAttribute("href") ===
                        `#${entry.target.id}`;

                    link.classList.toggle("active", matches);
                });
            }
        });
    },
    {
        rootMargin: "-30% 0px -60% 0px"
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});
```

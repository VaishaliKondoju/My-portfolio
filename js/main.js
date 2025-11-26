document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll("section, header");
    const navLinks = document.querySelectorAll(".nav-links a");
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-links");

    let currentSectionId = "";

    window.onscroll = () => {
        let newSectionId = "";

        // 1. Calculate which section is currently being viewed
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust offset (150px) to trigger 'active' slightly before the section hits top
            if (scrollY >= sectionTop - 150) {
                newSectionId = section.getAttribute("id");
            }
        });

        // 2. Only update if the section has changed (improves performance)
        if (newSectionId !== currentSectionId) {
            currentSectionId = newSectionId;

            // A. Update the Address Bar URL (without reloading)
            if (currentSectionId) {
                // This changes the text in the browser bar
                history.replaceState(null, null, '#' + currentSectionId);
            }

            // B. Update the Navigation Menu Colors
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href").includes(currentSectionId)) {
                    link.classList.add("active");
                }
            });
        }
    };

    // Mobile Menu Toggle
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});
// Custom JavaScript for the Travel and Tourism website

// Scroll to section when clicking on the navigation links
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetSection = document.querySelector(link.getAttribute('href'));
            const yOffset = -80; // Adjust the offset if you have a sticky header

            const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    });
});


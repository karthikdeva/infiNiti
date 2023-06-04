document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        const headerHeight = document.querySelector('.header').offsetHeight;
        const scrollToPosition = section.offsetTop - headerHeight;

        window.scrollTo({
            top: scrollToPosition,
            behavior: 'smooth'
        });
        history.pushState(null, null, '#' + sectionId);

    }

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionId = link.getAttribute('href').slice(1);
            scrollToSection(sectionId);
        });
    });

    function highlightNavLink() {
        let activeSectionId = null;
        let closestDistance = Infinity;

        sections.forEach(function(section) {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top) + 250;

            if (distance < closestDistance) {
                closestDistance = distance;
                activeSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + activeSectionId) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    window.addEventListener('load', highlightNavLink);
});
document.addEventListener('DOMContentLoaded', () => {

    // Logic for the smooth appearance of elements on scroll
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is in the viewport
            if (entry.isIntersecting) {
                // Add the class to trigger the animation
                entry.target.classList.add('visible');
                // Stop observing the element so the animation doesn't repeat
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Animation will start when 10% of the element is visible
    });

    // Start observing each element with the .reveal class
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});
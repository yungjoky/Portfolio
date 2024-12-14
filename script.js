document.addEventListener("DOMContentLoaded", function() {
    // Animate images with IntersectionObserver
    const images = document.querySelectorAll(".projects img");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
                observer.unobserve(entry.target);
            }
        });
    });

    images.forEach((image, index) => {
        observer.observe(image);
        image.style.transitionDelay = `${index * 0.1}s`;
    });

    // Image dragging functionality
    let isDragging = false;
    let startX;
    let scrollLeft;

    const parentElement = images[0]?.parentElement;

    const startDragging = (e) => {
        isDragging = true;
        startX = (e.pageX || e.touches[0].pageX) - parentElement.offsetLeft;
        scrollLeft = parentElement.scrollLeft;
        images.forEach(image => image.classList.add('dragging'));
    };

    const stopDragging = () => {
        isDragging = false;
        images.forEach(image => image.classList.remove('dragging'));
    };

    const drag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = (e.pageX || e.touches[0].pageX) - parentElement.offsetLeft;
        const walk = (x - startX) * 2; // Fast scrolling
        parentElement.scrollLeft = scrollLeft - walk;
    };

    if (parentElement) {
        // Mouse events
        parentElement.addEventListener('mousedown', startDragging);
        parentElement.addEventListener('mouseleave', stopDragging);
        parentElement.addEventListener('mouseup', stopDragging);
        parentElement.addEventListener('mousemove', drag);

        // Touch events
        parentElement.addEventListener('touchstart', startDragging);
        parentElement.addEventListener('touchend', stopDragging);
        parentElement.addEventListener('touchmove', drag);
    }

    // Background audio setup
    const audio = document.getElementById('backgroundMusic');
    if (audio) {
        audio.volume = 0.05;
        audio.loop = true;

        function playAudio() {
            audio.play().then(() => {
                console.log('Audio playing successfully');
            }).catch(error => {
                console.error('Audio play failed:', error);
            });
        }

        // Overlay click to play audio
        const overlay = document.getElementById('overlay');
        overlay.addEventListener('click', function() {
            overlay.classList.add('hidden');

            const mainContent = document.getElementById('mainContent');
            mainContent?.classList.add('show');

            // Play audio on click
            playAudio();

            // Ensure playback on additional interactions if required
            document.body.addEventListener('click', playAudio, { once: true });
            document.body.addEventListener('touchstart', playAudio, { once: true });
        });
    }

    // Prevent right-click on specific elements
    const homeImage = document.querySelector('.home-img img');
    homeImage?.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    });

    // Input sanitization function
    function sanitizeInput(input) {
        return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
});

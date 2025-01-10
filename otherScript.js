function openGithub() {
    window.open("https://github.com/yungjoky", "_blank");
}

document.addEventListener("DOMContentLoaded", function() {
    const fullTitle = "Welcome to my profile ";
    let currentTitle = "W";
    let index = 1; 
    let isDeleting = false;

    function typeTitle() {
        if (!isDeleting) {
            // Keep it only as "W"
            currentTitle = fullTitle.substring(0, 1); 
            
            if (index === 1) {
                setTimeout(typeTitle, 300); 
                return;
            }
        }
        
        document.title = currentTitle;
        setTimeout(typeTitle, 300);
    }

    typeTitle();
    //snowflakes start here
     const snowContainer = document.getElementById('snow-container');
    const createSnowflake = () => {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.width = `${Math.random() * 10 + 5}px`;
        snowflake.style.height = snowflake.style.width;
        snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
        snowContainer.appendChild(snowflake);

        setTimeout(() => {
            snowflake.remove();
        }, parseFloat(snowflake.style.animationDuration) * 1000);
    };

    setInterval(createSnowflake, 20);

    //snowflakes end here
});

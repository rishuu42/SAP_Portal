document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        console.log('Response data:', data);

        if (response.status === 401 || data.error === "Invalid credentials") {
            console.log("Invalid credentials");
            document.getElementById('type').innerHTML = 'Invalid credentials. Please try again.';
        } else if (response.status === 200) {
            window.location.href = '/dashboard';
        } else {
            console.error('Unexpected response:', data);
            document.getElementById('type').innerHTML = 'An unexpected error occurred. Please try again later.';
        }
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('type').innerHTML = 'An unexpected error occurred. Please try again later.';
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const slideshowImage = document.getElementById('slideshow-image');
    const imagePaths = [
        './imageslogin/slide1.png',
        './imageslogin/slide2.png',
        './imageslogin/slide3.png'
    ];

    let currentImageIndex = 0;

    function changeImage() {
        currentImageIndex = (currentImageIndex + 1) % imagePaths.length;
        slideshowImage.src = imagePaths[currentImageIndex];
    }


    slideshowImage.src = imagePaths[currentImageIndex];

    setInterval(changeImage, 30000);
});

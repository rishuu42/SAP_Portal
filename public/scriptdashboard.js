async function fetchUserData() {
    try {
        const response = await fetch('/api/user');
        if (response.ok) {
            const userData = await response.json();
            document.getElementById('userName').textContent = userData.name;
            document.getElementById('profilePicture').src = userData.profilePicture;
            document.getElementById('phone').textContent = userData.phone;
            document.getElementById('name').textContent= userData.name;
            document.getElementById('session').textContent= userData.session;
            document.getElementById('sap').textContent= userData.sap;
            document.getElementById('program').textContent= userData.program;
            document.getElementById('email').textContent= userData.email;
            document.getElementById('enroll').textContent= userData.enroll;
            document.getElementById('security').textContent= userData.security;
            document.getElementById('netamountdue').textContent= userData.netamountdue;
        } else {
            console.error('Failed to fetch user data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}
function viewTimetable(username) {
    window.location.href = `/timetable.html?username=${username}`;
}

function displaySelectedPDF() {
    const selectedPDF = document.getElementById('pdfSelect').value;
    const pdfViewer = document.getElementById('pdfViewer');
    if (selectedPDF) {
        pdfViewer.src = selectedPDF;
    } else {
        pdfViewer.src = ''; 
    }
}
fetchUserData();

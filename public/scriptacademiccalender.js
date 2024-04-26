const username = 'rishitt.107002@stu.upes.ac.in';
fetch(`/api/academiccalender/${username}`)
    .then(response => response.json())
    .then(data => {
        const timetableUrl = data.timetableUrl;
        const embedElement = document.getElementById('timetableEmbed');
        embedElement.src = timetableUrl + '#zoom=230';
    })
    .catch(error => {
        console.error('Error fetching timetable URL:', error);
    });
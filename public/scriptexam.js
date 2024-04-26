// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    const panels = document.querySelectorAll('.panel');

    panels.forEach(panel => {
        panel.addEventListener('mouseover', () => {
            removeActiveClasses();
            panel.classList.add('active');
        });
    });

    function removeActiveClasses() {
        panels.forEach(panel => {
            panel.classList.remove('active');
        });
    }
});
$(document).ready(function() {
    $('a.noticelinks').click(function(e) {
        const panelOpacity = $(this).closest('.panel').css('opacity');
        if (panelOpacity == 0) {
            e.preventDefault();
            console.log('Link click prevented because panel is hidden.');
        }
    });
});
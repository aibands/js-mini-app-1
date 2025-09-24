const locationButtons = document.querySelectorAll('.function-button');
const body = document.body;
const actionButtons = document.querySelectorAll('#action-btn-section > div');

function updateView(location) {
    // Remove previous background
    body.classList.remove('bedroom-background', 'bathroom-background', 'kitchen-background', 'home-background');

    // Add new background
    body.classList.add(`${location}-background`);

    // Hide action buttons
    actionButtons.forEach(actionDiv => {
        actionDiv.style.display = 'none';
    });

    // Show only button for the image
    const currentActionDiv = document.querySelector(`[data-action="${location}"]`);
    if (currentActionDiv) {
        currentActionDiv.style.display = 'block';
    }
}

locationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const location = button.dataset.location;
        updateView(location);
    });
});

// Define initial page state (one more)
document.addEventListener('DOMContentLoaded', () => {
    updateView('home');
});
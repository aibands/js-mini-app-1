const locationButtons = document.querySelectorAll('.function-button');

const body = document.body;

locationButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        const location = button.dataset.location;
        
        body.classList.remove('bedroom-background', 'bathroom-background', 'kitchen-background', 'home-background');
        
        body.classList.add(`${location}-background`);
    });
});
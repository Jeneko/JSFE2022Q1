window.onload = () => {
    burgerMenuHandler();
}

function burgerMenuHandler() {
    const body = document.body;
    const burgerMenu = document.querySelector('.burger-menu');
    const headerConent = document.querySelector('.header');

    document.addEventListener('click', function (e) {
        // Handle burger button and backdrop
        if (e.target.closest('.burger-button') || e.target.closest('.backdrop')) {
            toggleBurgerMenu();
        }
        // Handle anchor links
        if (e.target.classList.contains('burger-menu__menu-link')) {
            toggleBurgerMenu();
        }
    });

    function toggleBurgerMenu() {
        // Toggle burger-menu visibility
        burgerMenu.classList.toggle('visible');
        // Toggle header content visibility
        headerConent.classList.toggle('hidden');
        // Toggle scroll on body
        body.classList.toggle('overflow-hidden');
        // Rotate all burger-buttons
        document.querySelectorAll('.burger-button').forEach(el => el.classList.toggle('rotate-90'));
    }
}
export function burgerMenuHandler() {
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
        // Rotate all burger-buttons
        document.querySelectorAll('.burger-button').forEach(el => el.classList.toggle('rotate-90'));
        // Toggle scroll on body
        // and fix horizontal shifting caused by hidden scroll
        if (burgerMenu.classList.contains('visible')) {
            let prevWidth = document.body.getBoundingClientRect().width;
            document.body.classList.add('overflow-hidden');
            let curWidth = document.body.getBoundingClientRect().width;
            let diffWidth = curWidth - prevWidth;
            document.body.style.marginRight = diffWidth + 'px';
            document.querySelector('.header--fixed').style.marginRight = diffWidth + 'px';
        } else {
            document.body.classList.remove('overflow-hidden');
            document.body.style.marginRight = '';
            document.querySelector('.header--fixed').style.marginRight = '';
        }
    }
}
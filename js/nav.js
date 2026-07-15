const nav = document.querySelector('.glass-nav');
if (nav) {
    window.addEventListener('scroll', () => {
        if (window.scrollY <= 50) {
            nav.classList.add('visible');
        } else {
            nav.classList.remove('visible');
        }
    });
}

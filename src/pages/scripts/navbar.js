(()=>{
    const hamburger = document.getElementById('hamburger');
    const hamburgerMenu = document.getElementById('hamburger-menu');

    hamburger.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('phone:hidden');
    });

    const navbar = document.getElementById('navbar');
    document.addEventListener('scroll', () => {
        if(document.body.scrollTop > 10 || document.documentElement.scrollTop > 10){
            navbar.classList.add('drop-shadow-xl');
        } else {
            navbar.classList.remove('drop-shadow-xl');
        }
    });

})()
class MobileNavBar {
    constructor(mobileMenu, navList, navLinks){
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        console.log(this);
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
    }
    addClickEvent(){
        this.mobileMenu.addEventListener("click", this.handleClick);
    }
    init(){
        if(this.mobileMenu){
            this.addClickEvent();
        }
        return this;
    }
}

const mobileNavBar = new MobileNavBar(
    ".mobile-menu",
    ".nav-links",
    ".nav-links li"
);
mobileNavBar.init();
document.addEventListener('DOMContentLoaded', () => {
    const planosContainer = document.querySelector('.planos-container');
    
   
    planosContainer.scrollLeft = 0;
    

    planosContainer.style.scrollBehavior = 'smooth';


    let isDown = false;
    let startX;
    let scrollLeft;
    setTimeout(() => {
        const firstCard = document.querySelector('.plano-card');
        if (firstCard) {
            const containerWidth = planosContainer.offsetWidth;
            const cardWidth = firstCard.offsetWidth;
            planosContainer.scrollLeft = (cardWidth + 70) / 2 - (containerWidth / 2);
        }
    }, 100);

    const startDragging = (e) => {
        isDown = true;
        planosContainer.classList.add('active');
        
        const pageX = e.pageX || e.touches[0].pageX;
        
        startX = pageX - planosContainer.getBoundingClientRect().left;
        scrollLeft = planosContainer.scrollLeft;
    };


    const stopDragging = () => {
        isDown = false;
        planosContainer.classList.remove('active');
    };


    const move = (e) => {
        if(!isDown) return;
        e.preventDefault();
        
     
        const pageX = e.pageX || (e.touches && e.touches[0].pageX);
        if(!pageX) return;
        
        const x = pageX - planosContainer.getBoundingClientRect().left;
        const walk = (x - startX) * 1.5;
        planosContainer.scrollLeft = scrollLeft - walk;
    };


    planosContainer.addEventListener('mousedown', startDragging);
    planosContainer.addEventListener('mouseleave', stopDragging);
    planosContainer.addEventListener('mouseup', stopDragging);
    planosContainer.addEventListener('mousemove', move);

    planosContainer.addEventListener('touchstart', startDragging);
    planosContainer.addEventListener('touchend', stopDragging);
    planosContainer.addEventListener('touchmove', move);
});
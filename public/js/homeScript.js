
const navLinks = Array.from(document.querySelectorAll(".nav__link")) ;
console.log(navLinks)


var observer = new IntersectionObserver(entries => {
    
    if(entries[0].intersectionRatio >= 0.6){
        const id = entries[0].target.id;
        console.log(id)
        const navLink = navLinks.filter(link => link.name === id);
        console.log(navLink[0].name)
        navLink[0].classList.add("current-section");

    }else if(entries[0].intersectionRatio < 0.6){
        const id = entries[0].target.id;
        console.log(id)
        const navLink = navLinks.filter(link => link.name === id);
        console.log(navLink[0].name)
        navLink[0].classList.remove("current-section");
    }
}, { threshold: 0.6})


observer.observe(document.getElementById("hero"));
observer.observe(document.getElementById("habilidades-calculador"));
observer.observe(document.getElementById("obras"));
observer.observe(document.getElementById("contacto"));
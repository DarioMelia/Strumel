
AOS.init({                         //Iniciamos la librería para las animaciones de scroll.
    easing: 'ease-in-sine',
    duration: 400,
    offset: 250,
    mirror: true           //acepta paramaetros
  });

// %%%%%%%%%%%%%%%%%%%%% SCROLLSPY %%%%%%%%%%%%%%%%%%%%%%%%

const navLinks = Array.from(document.querySelectorAll(".nav__link")) ;
const header = document.querySelector(".logo__title");


var observer = new IntersectionObserver(entries => {
    
    if(entries[0].intersectionRatio >= 0.7){
        const id = entries[0].target.id;
      
        const navLink = navLinks.filter(link => link.name === id);
     
       
        navLink[0].classList.add("current-section");
       
        
    
    }else if(entries[0].intersectionRatio < 0.7){
        const id = entries[0].target.id;
        
       
        const navLink = navLinks.filter(link => link.name === id);
       
        navLink[0].classList.remove("current-section");
    }
}, { threshold: 0.7})



observer.observe(document.getElementById("hero"));
observer.observe(document.getElementById("habilidades-calculador"));
observer.observe(document.getElementById("obras"));
observer.observe(document.getElementById("contacto"));




// %%%%%%%%%%%%% TYPEWRITER %%%%%%%%%%%%%%%%

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

const figures = document.querySelectorAll(".gallery figure");         //Gallery consts
const descriptions = document.querySelectorAll(".gallery__descript"); //Gallery consts

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);

   
    
   // %%%%%%%%%%%%%%% GALLERY %%%%%%%%%%%%%%%%%     
        var item = 0,
          itemNo = figures.length;
    console.log("itemNo:" + itemNo)
        function transitionSlide() {
          item++;
          if (item > itemNo - 1) {
            item = 0;
          }
    
         handleClassChanges(item);
    
        }
      
        var autoTransition = setInterval(transitionSlide, 9000);
      
        figures.forEach(figure => {
            figure.addEventListener("click", (e) => {
                clearInterval(autoTransition);
                var figuresArray = Array.prototype.slice.call( document.querySelector(".gallery").children);
                console.log(figuresArray);
                console.log(e.target.parentElement)
                item = figuresArray.indexOf(e.target.parentElement);
                console.log("clickItem:" + item);
               handleClassChanges(item);
    
                autoTransition = setInterval(transitionSlide, 9000);
            })
        })
    
        function handleClassChanges(item){
            figures.forEach(figure => {
                figure.classList.remove("on");
            });
        
            descriptions.forEach(description => {
              description.classList.remove("gallery__descript--grow");
            });
        
            figures[item].classList.add("on");
        
            setTimeout(() => {
                descriptions[item].classList.add("gallery__descript--grow");
            }, 250);
          }
};

//%%%%%%%%%%%%%%%%%%% RESPONSIVE NAV %%%%%%%%%%%%%%%%%%%

const burger = document.querySelector(".nav__btn");
const burgerLine = document.querySelector(".nav__burger");
const navItems = document.querySelectorAll(".nav__item");
const navList = document.querySelector(".nav__list");



burger.addEventListener("click", e =>{
navItems.forEach(item =>{
    item.classList.add("nav__open");
})
burgerLine.classList.toggle("burger--close");

void navList.offsetWidth; 

if(navList.classList.contains("grow")){
    navList.classList.remove("grow");
    navList.classList.add("shrink");
    setTimeout(()=>{
        navItems.forEach(item =>{
            item.classList.remove("nav__open");
            
        })
    }, 240);
    
}else{
    navList.classList.add("grow");
    if(navList.classList.contains("shrink")){
        navList.classList.remove("shrink");
    }
}


})





 
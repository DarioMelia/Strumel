
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

                item = figuresArray.indexOf(e.target.parentElement);

            if(e.target.type != "submit"){
                handleClassChanges(item);
                autoTransition = setInterval(transitionSlide, 9000);
            }
               
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
        const loader = document.getElementById("loader");
        // loader.classList.add("display-none");
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
burgerLine.classList.add("burger--close");

void navList.offsetWidth; 

if(navList.classList.contains("grow")){
    burgerLine.classList.remove("burger--close");
    burger.classList.toggle("nav__btn--spin");
    setTimeout(() => {
        navList.classList.remove("grow");
        navList.classList.add("shrink");
        setTimeout(()=>{
            navItems.forEach(item =>{
                item.classList.remove("nav__open");
                
            })
        }, 252);
    }, 500);
    
    
}else{
    navList.classList.add("grow");
    if(navList.classList.contains("shrink")){
        navList.classList.remove("shrink");
    }
    setTimeout(()=>{
            burger.classList.toggle("nav__btn--spin");
      
    }, 100);
}


})



// %%%%%%%%%% HAB SLIDE %%%%%%%%%%%%%%

const nextHabBtns = document.querySelectorAll(".next-hab-btn");
nextHabBtns.forEach(btn => {
    btn.addEventListener("click", habSlideHandler);
})



function habSlideHandler(e){
const currentSlideSet = e.target.parentElement.parentElement;
const items= currentSlideSet.querySelectorAll(".hab-item");
items.forEach(item => {
    item.classList.toggle("hab-active");
})


}

// %%%%%%%%%% GALLERY BUTTON %%%%%%%%%%%%%%

const galleryBtns = document.querySelectorAll(".gallery__btn button");
const obraOverlays = document.querySelectorAll(".obra-info");
const closeBtns = document.querySelectorAll(".obra-info--close");

galleryBtns.forEach(btn => {
    btn.addEventListener("click", obraOverlayHandler);
})

closeBtns.forEach(btn => {
    btn.addEventListener("click", closeHandler);
})


function obraOverlayHandler(e){
    console.log(e.target);
    const index = parseInt(e.target.name, 10);
    obraOverlays[index].classList.add("open");
    document.body.classList.add("overflow-hidden");
}

function closeHandler(e){
    const index = parseInt(e.target.parentElement.name, 10);
    
    obraOverlays[index].classList.remove("open");
    document.body.classList.remove("overflow-hidden");
}



 
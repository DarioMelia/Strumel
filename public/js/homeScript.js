
AOS.init({                         //Iniciamos la librería para las animaciones de scroll.
    easing: 'ease-in-sine',
    duration: 400,
    offset: 250           //acepta paramaetros
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

var headerOb = new IntersectionObserver(entries => {
    if(entries[0].intersectionRatio < 0.5){
        header.classList.add("header-fixed");
    }
}, {threshold:0.5});

observer.observe(document.getElementById("hero"));
observer.observe(document.getElementById("habilidades-calculador"));
observer.observe(document.getElementById("obras"));
observer.observe(document.getElementById("contacto"));

headerOb.observe(header);


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



// %%%%%%%%%%%%%%% GALLERY %%%%%%%%%%%%%%%%%

$(document).ready(function() {
    var item = 0,
      itemNo = $(".gallery figure").length;
    function transitionSlide() {
      item++;
      if (item > itemNo - 1) {
        item = 0;
      }
      $(".gallery figure").removeClass("on");
      $(".gallery__descript").removeClass("gallery__descript--grow");
    

      $(".gallery figure")
        .eq(item)
        .addClass("on");

        setTimeout(() => {
            $(".gallery__descript")
            .eq(item)
            .addClass("gallery__descript--grow");
        }, 250);

    }
  
    var autoTransition = setInterval(transitionSlide, 9000);
  
    $(".gallery figure").click(function() {
        console.log("!pinchao")
      clearInterval(autoTransition);
      item = $(this).index();
      $(".gallery figure").removeClass("on");
      $(".gallery__descript").removeClass("gallery__descript--grow");
      
      $(".gallery figure")
        .eq(item)
        .addClass("on");


        setTimeout(() => {
            $(".gallery__descript")
            .eq(item)
            .addClass("gallery__descript--grow");
        }, 250);
      
      autoTransition = setInterval(transitionSlide, 9000);
    });
  });
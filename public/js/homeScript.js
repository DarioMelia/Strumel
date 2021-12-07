

AOS.init({                         //Iniciamos la librería para las animaciones de scroll.
    easing: 'ease-in-sine',
    duration: 400,
    offset: 250,
    mirror: true           //acepta paramaetros
  });


// %%%%%%%%%%%%%%%%%%%%% SCROLLSPY %%%%%%%%%%%%%%%%%%%%%%%%

const navLinks = Array.from(document.querySelectorAll(".nav__current")) ;
const header = document.querySelector(".logo__title");
const heroConocenosText = document.querySelector(".conocenos-text");
const heroConocenosTextContent = document.querySelector(".conocenos-text__content");
const scrollArrows = document.querySelector(".scroll-arrows");

//Observer que al salir del hero quita el texto de conocenos y la scroll-arrow
var heroObserver = new IntersectionObserver(entries =>{
  if(entries[0].intersectionRatio < 1){
    scrollArrows.classList.add("disapear");
    setTimeout(() => {
      scrollArrows.classList.add("display-none");
    }, 300);
    
    if(heroConocenosTextContent.classList.contains("active")){
      heroConocenosTextContent.classList.remove("active");
      setTimeout(() => {heroConocenosText.classList.remove("active")}, 400);
    }
    
    
  }
},{threshold:0.4})

heroObserver.observe(document.getElementById("hero"));

//Observer para saber el punto de la pagina, y realzar el simbolo correspondiente en el navList
var observer = new IntersectionObserver(entries => {
    
    if(entries[0].intersectionRatio >= 0.7){
        const id = entries[0].target.id; //Id de la sección que predomina en el viewport
        const navLink = navLinks.filter(link => link.dataset.id === id); //Buscamos el link asociado a esa sección
        navLink[0].classList.add("current-section");//Añadimos la clase que hace realzar el fondo del simbolo
       
        
    }else if(entries[0].intersectionRatio < 0.7){
      //Lo mismo que anteriormente pero para quitar el realze al salir la seccion del viewport
      const id = entries[0].target.id;
      const navLink = navLinks.filter(link => link.dataset.id === id);
      navLink[0].classList.remove("current-section");
    }
}, { threshold: 0.7})


//Observar todas las secciones
observer.observe(document.getElementById("hero"));
observer.observe(document.getElementById("habilidades-calculador"));
observer.observe(document.getElementById("obras"));
observer.observe(document.getElementById("contacto"));



  ///// %%%%%%%%%%%%%% HERO %%%%%%%%%%%%%%%%
  const hero = document.getElementById("hero");
  const conocenosBtn = document.querySelector(".hero__btn--conocenos");
  const conocenosText = document.querySelector(".conocenos-text");
  const conocenosTextContent = document.querySelector(
    ".conocenos-text__content"
  );

  

  let isMobileDevice = /Mobi/i.test(window.navigator.userAgent); //Comprueba si user agent contiene "mobi" en su nbombre 

    if(isMobileDevice && window.innerWidth < 450){ //Si es una movil y es tamaño móvil
      let vh1 = window.innerHeight * 0.01; //Queremos saber cuant oes 1vh real, teniendo en cuenta el browser menu
      document.documentElement.style.setProperty('--vh', `${vh1}px`); //creamos una property en root
      hero.style.height = "calc(var(--vh, 1vh) * 100)"; //Y la usamos para establecer el height total de la pantalla.
      //Antes de esto 100vh consideraba el tamaño completo de pantalla, con esto considera solo lo visible.
    }


  
  //Abrimos el conocenos text. con un delay para la animnacion, al pulsar el botón, 
  //y lo cerramos al pulsar en cualquyier parte sobre el overlay
  conocenosBtn.addEventListener("click", (e) => {
    conocenosText.classList.toggle("active");
    setTimeout(() => {
      conocenosTextContent.classList.add("active");
    }, 20);
  });
  conocenosText.addEventListener("click", (e) => {
    if (conocenosText.classList.contains("active")) {
      conocenosTextContent.classList.remove("active");
      setTimeout(() => {
        conocenosText.classList.remove("active");
      }, 400);
    }
  });

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
//%%%%%% NO SOLO TYPEWRITTER TAMBIEN CAMBIOS DE GALERIA A HACER EN ONLOAD %%%%%%
const figures = document.querySelectorAll(".gallery figure");         //Gallery consts
const descriptions = document.querySelectorAll(".gallery__descript"); //Gallery consts

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);


  // %%%%%%%%%%%%%%% GALLERY cosas que hacer en onload %%%%%%%%%%%%%%%%%
  var item = 0,
    itemNo = figures.length; //numero de imagenes en galeria

  function transitionSlide() {
    item++; //Pasamos al sigeuienbte item
    if (item > itemNo - 1) {
      item = 0; //reiniciamos si ha superado el máximo
    }

    handleClassChanges(item); //cabiamos el item de la galería
  }

  var autoTransition = setInterval(transitionSlide, 6000); //Cada 6s pasa automaticamente al siguiente

  figures.forEach((figure) => {
    figure.addEventListener("click", (e) => {
      clearInterval(autoTransition);//Si pulsas la que ya está abierta, el tiempo se reinicia
      var figuresArray = Array.prototype.slice.call(
        document.querySelector(".gallery").children //array de figures
      );

      item = figuresArray.indexOf(e.target.parentElement);//Item pasa a ser el index de la figura clickeada

      if (e.target.type != "submit") {
        handleClassChanges(item); //Cuando no pulsas en saber más, cambiamos al item en cuestion
      }
      autoTransition = setInterval(transitionSlide, 6000); //Se vuelve a activar la animación automatica
    });
  });

  function handleClassChanges(item) {
    figures.forEach((figure, i) => {
      if (i !== item) {
        //Si se ha clickeado en el mismo figure no reiniciart la animnacion
        figure.classList.remove("on");
      }
    });

    descriptions.forEach((description) => {
      if (description !== descriptions[item]) {
        //Si se ha clickeado en el mismo figure no reiniciart la animnacion
        description.classList.remove("gallery__descript--grow");
      }
    });

    figures[item].classList.add("on");//Abrimos el figure que toque en el auto o haya sido clickeada

    setTimeout(() => {
      descriptions[item].classList.add("gallery__descript--grow");//Despues la animacion del fondo azul de la descripción
    }, 250);
  }
};


// %%%%%%%%%% GALLERY BUTTON %%%%%%%%%%%%%%

const galleryBtns = document.querySelectorAll(".gallery__btn button");
const obraOverlays = document.querySelectorAll(".obra-info");
const closeBtns = document.querySelectorAll(".obra-info--close");


galleryBtns.forEach((btn) => {
  btn.addEventListener("click", obraOverlayHandler);
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", closeHandler);
});



function obraOverlayHandler(e) {
  const index = parseInt(e.target.name, 10); //Cada Overlay tiene su index en el array como nombre
  const currentOverlay = obraOverlays[index];
  
  //Primero quitamos el display none, luego añadimos la opacidad para animar la aparición, y luego bloqueamos el scroll
  currentOverlay.classList.add("open");
  setTimeout(() => {
    currentOverlay.classList.add("full-opacity");
  }, 20);
  document.body.classList.add("overflow-hidden");
}

//Podemos acceder a esta funcionj desde el botón o pulsando escape
//Solo a traves de escape recibe openObraOverlay, y solo a traves de escape el target tiene name
function closeHandler(e, openObraOverlay) {
  const index = parseInt(e.target.parentElement.name, 10);
  var currentOverlay = obraOverlays[index];

  if(openObraOverlay){//Solo hay openObraOverlay si venimos de pulsar Escape
    currentOverlay = openObraOverlay;
    if(currentOverlay.querySelector(".obra-info__expand-img-btn").classList.contains("grow")){
      //Para evitar que expand button siga grande al volver a abrir
      currentOverlay.querySelector(".obra-info__expand-img-btn").classList.remove("grow")
    }
  }
  //Quitando la clase, animacion de opacidad, luego cerrramos el overlay
  currentOverlay.classList.remove("full-opacity")
  document.body.classList.remove("overflow-hidden");
  setTimeout(() => {
    currentOverlay.classList.remove("open");
    
  }, 350);
  
}


//Exandir imagen
document.querySelectorAll(".obra-info__expand-img-btn").forEach(btn => {
  btn.addEventListener("click", expandImage);
})

document.querySelectorAll(".obra-info__img").forEach((img) => {
  img.addEventListener("click", (e) => {
    //Al pulksart cualquier cosa que no sea el boton, por evitar redundancia. Quitamos expand y vuelve a su tamaño
    if (e.target !== img.querySelector(".obra-info__expand-img-btn .fas")) {
      if (img.classList.contains("expand-image")) {
        img.querySelector(".obra-info__expand-img-btn").classList.remove("grow");
        img.classList.remove("expand-image");
      }
    }
  });
});

function expandImage(e){
  const imgDiv = e.target.parentElement.parentElement;
  e.target.parentElement.classList.toggle("grow"); //MOdificamos el grow del boton
  imgDiv.classList.toggle("expand-image");
}



//%%%%%%%%%%%%%%%%%%% RESPONSIVE NAV %%%%%%%%%%%%%%%%%%%

const burger = document.querySelector(".nav__btn");
const burgerLine = document.querySelector(".nav__burger");
const navItems = document.querySelectorAll(".nav__item");
const navList = document.querySelector(".nav__list");

burger.addEventListener("click", e =>{
    
navItems.forEach(item =>{
    item.classList.add("nav__open");
})
burgerLine.classList.add("burger--close");//Animacion para la hamburguer en cruz

void navList.offsetWidth; 

//Animación del botón al cerrarlo
if(navList.classList.contains("grow")){
    burgerLine.classList.remove("burger--close");
    burger.classList.toggle("nav__btn--spin");
    //Primero gira el botón, luego cerramos el list
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
    //Abrimos primero el list
    navList.classList.add("grow");
    if(navList.classList.contains("shrink")){
        navList.classList.remove("shrink");
    }
    //LUego la animación
    setTimeout(()=>{
            burger.classList.toggle("nav__btn--spin");
      
    }, 100);
}

})


// %%%%%%%%%% HAB SLIDE %%%%%%%%%%%%%%

const habCalc = document.getElementById("habilidades-calculador");
const nextHabBtns = document.querySelectorAll(".next-hab-btn .fas");
const habItems = document.querySelectorAll(".hab-item");
const habTexts = document.querySelectorAll(".hab-text");
const habTextPintura = document.querySelector(".hab-text--pintura");
const calculadoraLink = document.querySelector(".calculadora__link");
const calculadora = document.querySelector(".calculadora");



nextHabBtns.forEach(btn => {
    btn.addEventListener("click", habSlideHandler);
})

habItems.forEach(item => {
    item.addEventListener("click", habClickHandler);
})

//Si pinchamos en la calculadora de pintura, no se cierra, al pulsar en cualquier otr sí
habCalc.addEventListener("click", e => {
  habTexts.forEach(habText => {
    if(habText.classList.contains("hab-text-open")){
      if(habTextPintura.contains(e.target)){
        return;
      }else{
        removeHabText(habText);
      } 
    } 
  });
})

//Animacion de la calculadora al pulsar el link de reforma
calculadoraLink.addEventListener("click", (e) => {
  calculadora.classList.add("grow");
  setTimeout(() => {
    calculadora.classList.remove("grow");
  }, 900);
}) 



function habSlideHandler(e){
const currentSlideSet = e.target.parentElement.parentElement;
const items = currentSlideSet.querySelectorAll(".hab-item");

//Animación del botón
e.target.parentElement.classList.add("active");
setTimeout(() => {e.target.parentElement.classList.remove("active")},200);

//el que esté displayeado lo quitamos y el que no lo displayeamos
items.forEach(item => {
    item.classList.toggle("hab-active");
})
}

function habClickHandler(e){
    const currentItem = e.target.parentElement;//hab-item
    var habText = currentItem.querySelector(".hab-text");

    if(habText){//Si tiene habText, que uno no
      if(habText.classList.contains("hab-text-open")){
        removeHabText(habText);
      }else{
        habText.style.display = "block"; //si no está abierto lo displayeamos
        setTimeout(() => {habText.classList.add("hab-text-open")}, 20);
        
        
      }
    } 
}

function removeHabText(habText){
  habText.classList.remove("hab-text-open");//Primero quitamos la clase para la animacion
  setTimeout(()=>{habText.style.display ="none"}, 400);//Luego display none
}




//%%%%%%%%%%%%%% ESCAPE HANDLING %%%%%%%%%%%%%%
document.addEventListener("keydown", e => {
  if(e.key === "Escape"){
   const openObraOverlay = document.querySelector(".obra-info.open");
   const conocenosText = document.querySelector(".conocenos-text");
   const conocenosTextContent = document.querySelector(".conocenos-text__content");
   
  
   if(openObraOverlay){//Si hay un overlay abiero
    closeHandler(e, openObraOverlay);
    const obraInfoImageDiv = openObraOverlay.querySelector(".obra-info__img.expand-image");
    if(obraInfoImageDiv){//Desexpandir la imgaen si está grande
      obraInfoImageDiv.classList.remove("expand-image");
    }
   }

   if(conocenosText.classList.contains("active")){//Si el texto de conocenos está abierto
    conocenosTextContent.classList.remove("active");
    setTimeout(() => {conocenosText.classList.remove("active")}, 400)
  }

}
})


 
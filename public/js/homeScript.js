
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


var heroObserver = new IntersectionObserver(entries =>{
  if(entries[0].intersectionRatio < 0.8){
    heroConocenosTextContent.classList.remove("active");
    heroConocenosText.classList.remove("active");
    
  }
})

heroObserver.observe(document.getElementById("hero"));
var observer = new IntersectionObserver(entries => {
    
    if(entries[0].intersectionRatio >= 0.7){
        const id = entries[0].target.id;
      
        const navLink = navLinks.filter(link => link.name === id);
     
       
        navLink[0].classList.add("current-section");
       
        
    }else if(entries[0].intersectionRatio < 0.7){
      const id = entries[0].target.id;
        
      const navLink = navLinks.filter(link => link.name === id);
     
      navLink[0].classList.remove("current-section");

      if(entries[0].target == hero){
        
      }
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

///// %%%%%%%%%%%%%% HERO %%%%%%%%%%%%%%%%
const conocenosBtn = document.querySelector(".hero__btn--conocenos");
const conocenosText = document.querySelector(".conocenos-text");
const conocenosTextContent = document.querySelector(".conocenos-text__content");
conocenosBtn.addEventListener("click", e => {
  conocenosText.classList.toggle("active");
  setTimeout(() => {conocenosTextContent.classList.add("active")}, 20);
                    
})
conocenosText.addEventListener("click", e => {
  if(conocenosText.classList.contains("active")){
    conocenosTextContent.classList.remove("active");
    setTimeout(() => {conocenosText.classList.remove("active")}, 400)
  }
})

    
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

const habCalc = document.getElementById("habilidades-calculador");
const nextHabBtns = document.querySelectorAll(".next-hab-btn .fas");
const habItems = document.querySelectorAll(".hab-item");
const habTexts = document.querySelectorAll(".hab-text");


nextHabBtns.forEach(btn => {
    btn.addEventListener("click", habSlideHandler);
})

habItems.forEach(item => {
    item.addEventListener("click", habClickHandler);
})

habCalc.addEventListener("click", e => {
  habTexts.forEach(habText => {
    if(habText.classList.contains("hab-text-open")){
      removeHabText(habText);
    }
  });
  

})



function habSlideHandler(e){
const currentSlideSet = e.target.parentElement.parentElement;
const items = currentSlideSet.querySelectorAll(".hab-item");
items.forEach(item => {
    item.classList.toggle("hab-active");
})
}

function habClickHandler(e){
    const currentItem = e.target.parentElement;
    var habText = currentItem.querySelector(".hab-text");

    if(habText){
      if(habText.classList.contains("hab-text-open")){
        removeHabText(habText);
      }else{
        habText.style.display = "block";
        setTimeout(() => {habText.classList.add("hab-text-open")}, 20);
        
        
      }
    } 
}

function removeHabText(habText){
  habText.classList.remove("hab-text-open");
  setTimeout(()=>{habText.style.display ="none"}, 400);
}


// %%%%%%%%%%%% CALCULADORA %%%%%%%%%%%%%
const tabs = document.querySelectorAll(".calc__tab");
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

var chosenTabs;
const tabsBano = [tabs[0], tabs[1], tabs[4], tabs[5]];
const tabsCocina = [tabs[0], tabs[2], tabs[4], tabs[5]];
const tabsIntegral = [tabs[0], tabs[3], tabs[4], tabs[5]];



function showTab(n, chosenTabs) {
  // Esta funcion displayea la tab correspondiente dentro del array elegido.
  const nextBtn = document.querySelector(".calc__btns .next-btn");
  const prevBtn = document.querySelector(".calc__btns .prev-btn");
  if(nextBtn.classList.contains("submit-btn")){
      nextBtn.classList.remove("submit-btn");
  }
  //Si es la primera vez, cogemos de tab, despues, segun la elección del jugador
  if(!chosenTabs){
    tabs[n].style.display = "block";
    setTimeout(()=>{tabs[n].style.transform = "translateX(0%)";},50);
  } else {
      
    chosenTabs[n].style.transform = "translateX(100%)"
      chosenTabs[n].style.display = "block";
    setTimeout(()=>{chosenTabs[n].style.transform = "translateX(0%)";},25);
    
      adaptCalcDesscription(chosenTabs[n]);
      //CAmbiamos el contenido del boton siguiente por terminar al final.
      if (n == (chosenTabs.length - 1)) {
        nextBtn.innerHTML = "Terminar";
        nextBtn.classList.add("submit-btn");
      } else {
        nextBtn.innerHTML = "Siguiente";
      }
  }
  
  // solo hacemos parecer el botón de atrás cuando no estemos en la primera página
  if (n == 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "inline";
  }
  

}

function showFinalTab(price, calcInputs){
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  })
  
  const formattedPrice = formatter.format(Math.round(price));
  const finalTab = document.querySelector(".tab--final");
  const choicesList = finalTab.querySelector(".choices__list");
  const nextBtn = document.querySelector(".calc__btns .next-btn");
  const prevBtn = document.querySelector(".calc__btns .prev-btn");
  const calcDes = document.querySelector(".calc__des");
  const restartBtn = document.querySelector(".calc__restart-btn");

  finalTab.querySelector(".calc__price").innerHTML = formattedPrice ;
  finalTab.style.display = "block";
  setTimeout(() => finalTab.querySelector(".calc__price").style.transform = "scale(1)", 100);
  restartBtn.style.display = "block";
  restartBtn.addEventListener("click", e => {e.preventDefault()})
  nextBtn.style.display = "none";
  prevBtn.style.display = "none";
  calcDes.innerHTML = "Su precio aproximado es:";
  
  choicesList.innerHTML = insertChoicesHtml(calcInputs);


}

function nextPrev(n) {
    // Esa función decide qué tab displayear

    ///%%%%%%% VALIDATION %%%%%%%%%

    //Si estamos en la tab principal...
    if(tabs[currentTab].classList.contains("tab--main")){
    //cogemos el valor de la opción elegida, si no, salimos de la función
    try{
     var refElegida = document.querySelector('input[name="tipo-reforma"]:checked').value;
     console.log(refElegida);
     chosenTabs = wichReforma(refElegida); //Devuelve el array de tabs correspondiente a la eleccion del cliente
    } catch(err){
        if(err){
            return false}
    }    
    };

    if(chosenTabs[currentTab].classList.contains("tab--material")){
        //cogemos el valor de la opción elegida, si no, salimos de la función
        try{
         var gamaMatElegida = document.querySelector('input[name="tipo-material"]:checked').value;
         console.log(gamaMatElegida);
        } catch(err){
            if(err && n==1){
                return false}
        }    
        };
    
    if(!atLeastOneNumberHasValue(chosenTabs[currentTab])){
     //Si existen input-number, que al menos uno esté relleno
     if(currentTab == 1 && !atLeastOneCheckboxChecked(chosenTabs[1])){
        //Si el usuario quiere ir hacia atrás pese a no haber sellecionado nada, puede
        if(n == 1){
        return false;
        }
     }
    }

    ///%%%%%%% End - VALIDATION %%%%%%%%%

    // Ocultar la tab actual
    chosenTabs[currentTab].style.display = "none";
    // Aumentar o disminuir currentTab en 1 segun si avanzamos o retrocedemos
    currentTab = currentTab + n;

    // Al final del form, siguiente se ha convertido en terminar y submiteamos, si está relleno los metros
    if (currentTab >= chosenTabs.length && atLeastOneNumberHasValue(chosenTabs[chosenTabs.length - 1])) {
      const calcInputs = getCalcInputs(chosenTabs);
      const finalPrice = getPrice(calcInputs);
     
      showFinalTab(finalPrice, calcInputs);

      // document.getElementById("calc__form").submit();
      return false;
    }
    //Si no están rellenos reseteamos current tab
    if(currentTab >= chosenTabs.length && !atLeastOneNumberHasValue(chosenTabs[chosenTabs.length - 1])){
        currentTab = currentTab -1;
        showTab(currentTab, chosenTabs);
        return false;
    }
    // Si no hemos llegado al final, mostramos el siguiente:
    showTab(currentTab, chosenTabs);
  };



  function wichReforma(refElegida){

      switch(refElegida){
          case "reforma-bano":
              return tabsBano;
              break;
          case "reforma-cocina":
              return tabsCocina;
              break;
          case "reforma-integral":
              return tabsIntegral;
              break;
          default:
              return undefined;

      }
  }

  function atLeastOneCheckboxChecked(tab){
      const checkboxes = Array.from(tab.querySelectorAll(".calc__checkbox"));
      return checkboxes.reduce((acc,curr) => acc || curr.checked, false);
  }

  function atLeastOneNumberHasValue(tab){
      let atLeastOne = false;
      const numberInputs = Array.from(tab.querySelectorAll("input[type = number]"));
    
      if(numberInputs == []){return false};

      numberInputs.forEach(input => {
          
          if(input.value){
            console.log(input.value)
              atLeastOne = true;
          } 
      })
      if(atLeastOne){
          return true
      }else{return false}
  };

  function adaptCalcDesscription(tab){
      let tabName = tab.classList[1];
      const calcDes = document.querySelector(".calc__des");
      
      switch(tabName){
          case "tab--main":
            calcDes.innerHTML = "Estoy buscando...";
            break;
          case "tab--bano":
            calcDes.innerHTML = "¿Qué quiere cambiar de su baño?";
            break;
          case "tab--cocina":
            calcDes.innerHTML = "¿Qué quiere cambiar de su cocina?";
            break;
          case "tab--integral":
            calcDes.innerHTML = "¿Reforma íntegra o parcial?";
            break;
          case "tab--material":
            calcDes.innerHTML = "Elija la gama de materiales que emplearemos";
            break;
          case "tab--metros":
            calcDes.innerHTML = "Ya casi está";
            break;
          default:
              calcDes.innerHTML ="Estoy buscando...";
        }    

  }

  function getCalcInputs(tabs){
    //Inicializo el array de objetos, uno por tab
    
    let calcInputs = [];
    for(i=0;i <= tabs.length -1;i++){
       calcInputs[i] = {};
       calcInputs[1] = {type: ""}
    }
    if(tabs[1].classList.contains("tab--bano")){
      calcInputs[1].type = "bano";
    } else if(tabs[1].classList.contains("tab--cocina")){
      calcInputs[1].type = "cocina";
    }else if(tabs[1].classList.contains("tab--integral")){
      calcInputs[1].type = "integral";
    }
   //Por cada tabla...
    tabs.forEach((tab,i) => {
    //Un array de inputs checkeables filtrado a uno de lso checkeados
    const checkInputs = Array.from(tab.querySelectorAll("input[type = radio], input[type = checkbox]"));
    let checkedInputs = checkInputs.filter(input => input.checked === true);
    //Si de verdad hay alguno checkeado, se añade un array de los id's de los inputs checkeados
     if(checkedInputs.length > 0){
     calcInputs[i].checkedInputs = checkedInputs.map(input => input.id);
     }

     //Si al menos un input-numero tiene valor se crea el objeto que lo guarda.
     //para cada input con value se crea una nueva key en numValues con el input.name, y se le da valor con el value
     if(atLeastOneNumberHasValue(tab)){
      
      calcInputs[i].numValues = {};
      const numInputs = tab.querySelectorAll("input[type = number]");
      numInputs.forEach(input => {
        if(input.value){
          calcInputs[i].numValues[input.name] = Number(input.value);
        }})
     }
    
    })
    return calcInputs;
  }

  function getPrice(calcInputs){
    let price = 0;
    let gamaMultiplier = 1;
    let addPrice = 0;
    let metros = calcInputs[3].numValues.metros2;

    switch(calcInputs[0].checkedInputs[0]){
      case "bano":
        price += 20;
      break;
      case "cocina":
        price += 30;
      break;
      case "integral":
        price += 50;
      break;
    }
    switch(calcInputs[2].checkedInputs[0]){
      case "gamaBaja":
        gamaMultiplier = 1;
        break;
      case "gamaMedia":
        gamaMultiplier = 1.3;
        break;
      case "gamaAlta":
        gamaMultiplier = 1.7;
    }

    switch(calcInputs[1].type){
      case "bano":
        calcInputs[1].checkedInputs.forEach(input => {
          switch(input){
            case "lavabo":
              addPrice += 100 * gamaMultiplier;
            case "banera":
              addPrice += 200 * gamaMultiplier;
            case "plato-de-ducha":
                addPrice += 150 * gamaMultiplier;
            case "mampara":
              addPrice += 50 * gamaMultiplier;
            case "wc":
              addPrice += 80 * gamaMultiplier;
            case "suelos-bano":
              addPrice += 5 * gamaMultiplier * metros;
            case "paredes-bano": 
              addPrice +=3 *gamaMultiplier * metros;
            case "techos-bano":
              addPrice +=2.5 * gamaMultiplier * metros;
          }
        })
        break;
      case "cocina":
        calcInputs[1].checkedInputs.forEach(input => {
          switch(input){
            case "mobiliario":
              addPrice += 100 * gamaMultiplier;
            case "unir-cocina-y-salón":
              addPrice += 200 * gamaMultiplier;
            case "isla-central":
                addPrice += 150 * gamaMultiplier;
            case "suelos-cocina":
              addPrice += 4 * gamaMultiplier * metros;
            case "paredes-cocina": 
              addPrice +=3.6 *gamaMultiplier * metros;
            case "techos-cocina":
              addPrice +=1.8 * gamaMultiplier * metros;
          }
        })
        break;
     case "integral":
       if(calcInputs[1].checkedInputs){
        calcInputs[1].checkedInputs.forEach(input => {
          switch(input){
            case "climatizacion":
              addPrice += 600;
            case "electricidad":
              addPrice += 800;
            case "fontanería":
                addPrice += 30 * metros;
            case "suelos-integral":
              addPrice += 3 * gamaMultiplier * metros;
            case "paredes-integral": 
              addPrice +=2.2 *gamaMultiplier * metros;
            case "techos-integral":
              addPrice +=2.6 * gamaMultiplier * metros;
          }
        })
       }
    
      break;

    }
   if(calcInputs[1].numValues){
    if(calcInputs[1].numValues.numBanos){
      addPrice += 1400 * calcInputs[1].numValues.numBanos;
    }
    if(calcInputs[1].numValues.numHabitaciones){
      addPrice += 1200 * calcInputs[1].numValues.numHabitaciones;
    }
    if(calcInputs[1].numValues.numVentanas){
      addPrice += 250 * calcInputs[1].numValues.numVentanas;
    }
    if(calcInputs[1].numValues.numPuertas){
      addPrice += 200 * calcInputs[1].numValues.numPuertas;
    }
  }



    console.log(((price * metros) + addPrice))
    console.log(calcInputs);
    return (price * metros) + addPrice;
  };

  function restartCalc(){
    const finalTab = document.querySelector(".tab--final");
    const nextBtn = document.querySelector(".calc__btns .next-btn");
    const prevBtn = document.querySelector(".calc__btns .prev-btn");
    const calcDes = document.querySelector(".calc__des");
    const form = document.getElementById("calc__form");
    const restartBtn = document.querySelector(".calc__restart-btn");
    
    form.reset();
    finalTab.querySelector(".calc__price").style.transform = "scale(0)";
    finalTab.style.display = "none";
    nextBtn.style.display = "block";
    nextBtn.innerHTML = "Siguiente";
    restartBtn.style.display = "none";
    calcDes.innerHTML = "Estoy buscando...";
    currentTab = 0;
    showTab(currentTab,undefined);
  }


  
  function insertChoicesHtml(calcInputs){
    let innerHtml = `<li>Reforma ${calcInputs[0].checkedInputs[0]}</li>`;
    
    if(calcInputs[0].checkedInputs[0] == "bano"){
      innerHtml = `<li>Reforma baño.</li>`
    }


    if(calcInputs[1].numValues){
    
      if(calcInputs[1].numValues.numBanos){
         innerHtml = innerHtml.concat(`<li>Baños: ${calcInputs[1].numValues.numBanos}</li>`)
       }
      if(calcInputs[1].numValues.numHabitaciones){
        innerHtml = innerHtml.concat(`<li>Habitaciones: ${calcInputs[1].numValues.numHabitaciones}</li>`)
      }
      if(calcInputs[1].numValues.numVentanas){
        innerHtml = innerHtml.concat(`<li>Ventanas: ${calcInputs[1].numValues.numVentanas}</li>`)
      }
      if(calcInputs[1].numValues.numPuertas){
        innerHtml = innerHtml.concat(`<li>Puertas: ${calcInputs[1].numValues.numPuertas}</li>`)
      }
      
    }

    if(calcInputs[1].checkedInputs){
      calcInputs[1].checkedInputs.forEach(input => {
        sentenceCaseInput = input.replace(/-/g, ' ');
        sentenceCaseInput = sentenceCaseInput.slice(0, 1).toUpperCase() + sentenceCaseInput.slice(1);
        if(input === "fontaneria"){
          innerHtml = innerHtml.concat(`<li>Fontanería</li>`)
        }else if(input === "climatizacion"){
          innerHtml = innerHtml.concat(`<li>Climatización</li>`)
        }else  if(input === "banera"){
          innerHtml = innerHtml.concat(`<li>Bañera</li>`)
        }else{
          innerHtml = innerHtml.concat(`<li>${sentenceCaseInput}</li>`);
        }})
    }

    switch(calcInputs[2].checkedInputs[0]){
      case "gamaBaja":
        innerHtml = innerHtml.concat(` `,`<li>Gama media de materiales</li>`);
        break;
      case "gamaMedia":
        innerHtml = innerHtml.concat(` `,`<li>Gama comfort de materiales</li>`);
        break;
      case "gamaAlta":
        innerHtml = innerHtml.concat(` `,`<li>Gama alta de materiales</li>`);
        break;
    }
    
    innerHtml = innerHtml.concat(`<li class = "calc__choices--metros">${calcInputs[3].numValues.metros2} m²</li>`);

    
    return innerHtml;

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



 
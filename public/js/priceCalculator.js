const tabs = document.querySelectorAll(".calc__tab");
var currentTab = 0; // Current tab es la primera tab (0)
showTab(currentTab); // Display current tab

var chosenTabs;
//A cada posible combinacion de tabs, le asignamos las tabs correspondientes
const tabsBano = [tabs[0], tabs[1], tabs[4], tabs[5]];
const tabsCocina = [tabs[0], tabs[2], tabs[4], tabs[5]];
const tabsIntegral = [tabs[0], tabs[3], tabs[4], tabs[5]];

//Formatter para euros
const formatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0
})

////%%%%%%% ADD AND SUBSTREACT NUMBER INPUTS IN INTEGRAL %%%%%%%%
const controlInputBtns = document.querySelectorAll(".number-input-btn");
controlInputBtns.forEach(btn => {
  btn.addEventListener("click", numInputChangeHandler);
})

function numInputChangeHandler(e){
  const btnType = e.target.getAttribute("data-btn-type");
  if(btnType === "minus"){
    const input = e.target.nextElementSibling;
    if(!input.value){
      input.value = 0;
    }else{
      if(parseInt(input.value) <= 0){
       input.value = 0;
      }else{
        input.value = parseInt(input.value) - 1;
      }
    }
  }else if(btnType === "plus"){
    const input = e.target.previousElementSibling;
    if(!input.value){
      input.value = 1;
    }else{
      input.value = parseInt(input.value) + 1;
    }
  }
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%



function showTab(n, chosenTabs) {
  // Esta funcion displayea la tab correspondiente dentro del array elegido.
  const calcBtns = document.querySelector(".calc__btns");
  const nextBtn = calcBtns.querySelector(".next-btn");
  const prevBtn = calcBtns.querySelector(".prev-btn");
  if(nextBtn.classList.contains("submit-btn")){
      nextBtn.classList.remove("submit-btn");
  }
  //Si es la primera vez, cogemos de tab, despues, segun la elección del jugador
  if(!chosenTabs){
    tabs[n].style.display = "block";
    setTimeout(()=>{tabs[n].style.transform = "translateX(0%)";},50);
  } else {
    //Displayemos la tab correspondiente con su animación
    chosenTabs[n].style.transform = "translateX(100%)"
    chosenTabs[n].style.display = "block";
    setTimeout(()=>{chosenTabs[n].style.transform = "translateX(0%)";},25);
    
      adaptCalcDesscription(chosenTabs[n]);//Cambiamos el contenido de la descreip según la tab

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
    document.querySelector(".calc__contactLink").classList.add("display-none");
    calcBtns.classList.remove("final");
  } else {
    prevBtn.style.display = "inline";
  }
  

}

function showFinalTab(price, calcInputs){
  const finalTab = document.querySelector(".tab--final");
  const choicesList = finalTab.querySelector(".choices__list");
  const calcBtns = document.querySelector(".calc__btns");
  const nextBtn = document.querySelector(".calc__btns .next-btn");
  const prevBtn = document.querySelector(".calc__btns .prev-btn");
  const calcDes = document.querySelector(".calc__des");
  const restartBtn = document.querySelector(".calc__restart-btn");
  const contactLink = document.querySelector(".calc__contactLink");

  const formattedPrice = formatter.format(Math.round(price));
  
  //Displayeamos la tab del final, con el resultado y las elecciones del usuario
  finalTab.querySelector(".calc__price").innerHTML = formattedPrice ;
  finalTab.style.display = "block";
  setTimeout(() => finalTab.querySelector(".calc__price").style.transform = "scale(1)", 100); //delay para la animacion
  
  calcBtns.classList.add("final");

  restartBtn.style.display = "block";
  restartBtn.addEventListener("click", e => {e.preventDefault()})//Para que no nos recargue la página auqnue el form esté completo
  
  contactLink.classList.remove("display-none");

  nextBtn.style.display = "none";//Desaparecen los botones
  prevBtn.style.display = "none";

  calcDes.innerHTML = "Su precio aproximado es:";//Cambiamos la des
  
  choicesList.innerHTML = insertChoicesHtml(calcInputs);//Mostramos las elecciones que ha hecho el usuario

}

function nextPrev(n) {
    // Esa función decide qué tab displayear

    ///%%%%%%% VALIDATION %%%%%%%%%

    //Si estamos en la tab principal...
    if(tabs[currentTab].classList.contains("tab--main")){
    //cogemos el valor de la opción elegida, si no, salimos de la función
    try{
     var refElegida = document.querySelector('input[name="tipo-reforma"]:checked').value;
     chosenTabs = wichReforma(refElegida); //Devuelve el array de tabs correspondiente a la eleccion del cliente
    } catch(err){
        if(err){
            return false}
    }    
    };

    if(chosenTabs[currentTab].classList.contains("tab--material")){
        //Comprobamos si el usuario ha elegido un tipo de material, si no, no puede avanzar
        try{
         document.querySelector('input[name="tipo-material"]:checked').value;
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


  //Según la reforma elegida, asignamos uno de los arrays de tabs ya creados.
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

  //Comprueba si al menos un input está checkeado
  function atLeastOneCheckboxChecked(tab){
      const checkboxes = Array.from(tab.querySelectorAll(".calc__checkbox"));
      return checkboxes.reduce((acc,curr) => acc || curr.checked, false);
  }

  //Si hay al menos un input number con valor en la tab, devuleve true, si no, false.
  function atLeastOneNumberHasValue(tab){
      let atLeastOne = false;
      const numberInputs = Array.from(tab.querySelectorAll("input[type = number]"));
    
      if(numberInputs == []){return false};

      numberInputs.forEach(input => {
          
          if(input.value){
            // console.log(input.value)
              atLeastOne = true;
          } 
      })
      if(atLeastOne){
          return true
      }else{return false}
  };

  //Adaptamos la descripcion del cuadro azul según la tab en lña que etemos
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

  //Recibe un array con los inputs seleccionados.
  function getPrice(calcInputs){
    let price = 0;
    let gamaMultiplier = 1;
    let addPrice = 0;
    let metros = calcInputs[3].numValues.metros2;
 
    //Según el tipo de reforma que haya elegido, precio base por m2
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
    //Según la gama de materiales, tenemos un multiplier.
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
    //Según el tipo de reforma recibimos los inputs de su tab. Luego recorremos todos los inputs de la tab y
    //según su valor asignamos un precio que se multiplica por la gama
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


   //En la reforma integral, estos calculos son para los input numbers
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
    // console.log(((price * metros) + addPrice))
    // console.log(calcInputs);
    return (price * metros) + addPrice;
  };

  function restartCalc(){
    const finalTab = document.querySelector(".tab--final");
    const nextBtn = document.querySelector(".calc__btns .next-btn");
    const calcDes = document.querySelector(".calc__des");
    const form = document.getElementById("calc__form");
    const restartBtn = document.querySelector(".calc__restart-btn");
    //Reseteamos el form y volvemos a la primera tab
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


  //ASigna y formatea las elecciones del usuaria para mostrarlas junto al precio
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
        //Cambiamos los giones de las propiedades por espacios, para no hardcodearlo todo
        sentenceCaseInput = input.replace(/-/g, ' ');
        sentenceCaseInput = sentenceCaseInput.slice(0, 1).toUpperCase() + sentenceCaseInput.slice(1);
        //Las tildes y eñes sí deben ser hardcodeadas
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



/// CALCULADORA PINTURA /////////////

const pintCalcBtn = document.querySelector(".pintCalc__btn");
const pintCalc = document.querySelector(".pintCalc");

const pintResult = document.querySelector(".pint-result");
const pintPrice = pintResult.querySelector(".pint-precio");
const pintRestart = document.querySelector(".pintCalc__restartBtn");

const metrosInput = pintCalc.querySelector("input[type='number']");
const radioInputs = pintCalc.querySelectorAll('input[type="radio"]');


pintCalcBtn.addEventListener("click", pintCalcResult);
pintRestart.addEventListener("click", pintCalcRestart);
metrosInput.addEventListener("input", pintCalcIsChecked);
//Cuando se selecciona cualquiera de lso radios, se comprueba si el input-num tiene valor que no sea "". Para activar el btn
radioInputs.forEach(input => input.addEventListener("change", pintCalcIsChecked));



function pintCalcResult(e) {
//El radio-input que esté seleccionado.
const selectedInput = pintCalc.querySelector('input[type="radio"]:checked');
const metros = pintCalc.querySelector("input[type='number']");
//Si hay un radio seleccionado y el de metros tiene valor, calculamos el precio.
  if(selectedInput && metros.value !== ""){
    var finalPrice = getPintPrice(selectedInput.id, metros.value);
    //Si el precio supera los 1000 añadimos una clase de css que adapta el tamaño
    if(finalPrice > 1000){
      pintPrice.classList.add("big-number");
    }else {
      if(pintPrice.classList.contains("big-number")){
        pintPrice.classList.remove("big-number");
      }
    }
    //Si es demasiado grande 
    if(finalPrice > 99000){
      finalPrice = "+99.999€";
    }else {
      //Si es un numero "aceptable" se formatea a moneda
      finalPrice = formatter.format(Math.round(finalPrice)); 
      finalPrice = finalPrice.substring(0, finalPrice.length - 2) +"€";
    }
    pintPrice.innerHTML = finalPrice;
    //desaparece la calculadora y mostramos el resultado con el botón de restart
    pintCalc.classList.add("display-none");
    if(pintCalc.classList.contains("open")){
      pintCalc.classList.remove("open");
    }
    pintRestart.classList.remove("display-none");
    pintResult.style.display = "block";
    setTimeout(() => {
      pintResult.classList.add("open");
    }, 20);
    
  }
}

function getPintPrice(pintura, metros){
  metros = parseInt(metros);
  let precioPlastica = 8;
  let precioTemple = 9;
  let precioEsmalte = 11;
  let finalPrice;
  switch(pintura){
    case "plastica":
      finalPrice = metros * precioPlastica;
      break;
    case "temple":
      finalPrice = metros * precioTemple;
      break;
    case "esmalte":
      finalPrice = metros * precioEsmalte;
      break;
  }

  return finalPrice;
}


function pintCalcIsChecked(e){
  //Salto al change en el number input. Si hay radio checkeado, aumenta opacity del boton, si el valor se reduce a nulo,
  //vuelve a perder la opacity, y si es diferente de nulo, lña recupera
  if(e.target.type === "number"){
    if(pintCalc.querySelector('input[type="radio"]:checked')){
      pintCalcBtn.classList.add("full-opacity");
    }
    if(pintCalc.querySelector("input[type='number']").value == ""){
      if(pintCalcBtn.classList.contains("full-opacity")){pintCalcBtn.classList.remove("full-opacity");}
    }
  
  }else{
    if(pintCalc.querySelector("input[type='number']").value != ""){
      pintCalcBtn.classList.add("full-opacity");
    }
  }
}



function pintCalcRestart(e){
  //Escondemos el restrart-btn y el resultado, luego volvemos a mostrar la calculadora
  pintResult.classList.remove("open");
    setTimeout(() => {
      pintResult.style.display = "none";
      pintCalc.classList.remove("display-none");
      pintRestart.classList.add("display-none");
      setTimeout(() => {
        pintCalc.classList.add("open");
      }, 20);
      
    }, 200);
    
}
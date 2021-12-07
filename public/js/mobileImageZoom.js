var win = window,
  doc = document,
  docElem = doc.documentElement,
  body = doc.getElementsByTagName("body")[0],
  vx = docElem.clientWidth || body.clientWidth,
  vy = docElem.clientHeight || body.clientHeight;

 
  var hammertimes;
if (vx <= 450) {
  hammertimes = makeImageZoom();
}

//%%%%%%% END OF RESIZE HANDLER %%%%%%%%%%

function debounce(func) { //solo se llama al termiar el resize o pasado un tiempo
  var timer;
  return function (event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 100, event);
  };
}

window.addEventListener("resize",debounce(function (e) {
  
    let oldVx = vx;
    //Recalculamos las medidas de la pantalla
    vx =  docElem.clientWidth || body.clientWidth,
    vy =  docElem.clientHeight || body.clientHeight;

    //Adaptar pantalla en movil por menu
    //Con esto el hero mantiene el tamaño real de viewport que le damos en homeScript cuando es mobil ,
    //Pero si resizeamos en developer tools pasa a ser 100vh
    if(isMobileDevice && vx > 450){
      document.getElementById("hero").style.height = "100vh";
    }
    if(oldVx < 450 && vx < 450 && oldVx != vx){ //Si el resize es dentro de movil y no es solo en y, tambien hero es 100vh
      document.getElementById("hero").style.height = "100vh";
    }

    if(vx > 450 && oldVx <= 450){ //Cancelamos la detección de touch eventes cuando ha resizeado a mas grande que movil
      if(hammertimes){
        hammertimes.forEach(hammertime => {
          hammertime.off("tap",hammerEnd);
          hammertime.off("panmove",hammerEnd);
          hammertime.off("panend",hammerEnd);
          hammertime.off("pinchmove",hammerEnd);
          hammertime.off("pinchend",hammerEnd);
        });
      }
    
    }
    if(vx <= 450 && oldVx > 450){ //Activamos el zomm si resizeamos de pantallas de no movil a movil
      hammertimes = makeImageZoom();
    }
    
  }));

function makeImageZoom() {
  
  const images = document.querySelectorAll(".obra-info__img > img");
  var hammertimes = []; //array para guardar los diferentes hammertimes que corren, y pararlos posteriormente cuando corresponda
  images.forEach((image) => {
    image.parentNode.style.overflow = "visible";

    const hammertime = new Hammer(image); //Hammer nos permite detectar diferentes touch events
    hammertime.get("pan").set({ direction: Hammer.DIRECTION_ALL });
    hammertime.get("pinch").set({ enable: true });

    
    
    let isBig = false;//Bolleano para comprobar si la imagen está expandida

    hammertime.on("tap", (event) => {
      //Cuando tapeas la imagen se hace mas grande, si ya es grande se hace pequeña
      if (isBig) {
        image.style.transform = "translate(0 ,0)";
        image.parentElement.classList.remove("expanded");
        isBig = false;
      } else {
        image.style.transform = "translate(0, 40px) ";
        image.parentElement.classList.add("expanded");
        isBig = true;
      }
    });

    hammertime.on("panmove", handleDrag);
    hammertime.on("panend", (ev) => { 
      //cuando se termina el paneo, la hacemos pequeña y volvemos a su posicion original
      setTimeout(() => {
        ev.target.style.transform = "translate(0 ,0)";
        ev.target.parentElement.classList.remove("expanded");
        isBig = false;
      }, 100);
    });

    hammertime.on("pinchmove", handleDrag);
    hammertime.on("pinchend", (ev) => {
      //cuando se termina el pinch(event de zoom con dos dedos), la hacemos pequeña y volvemos a su posicion original
      setTimeout(() => {
        ev.target.style.transform = "translate(0 ,0)";
        ev.target.parentElement.classList.remove("expanded");
        isBig = false;
      }, 100);
    });

    function handleDrag(ev) {
      //Una vez hecha grande la imagen esto nos permite arrastras y mover la imagen, también con el pinch
      var elem = ev.target;
      var posX, posY;
      posX = ev.deltaX;
      posY = ev.deltaY;

      let maxX = (135 * vx) / 450; //Regla de 3 para sacar maximos y minimos teniendo en cuenta tamaño de 450/750
      let minX = (-135 * vx) / 450;
      let maxY = (89 * vy) / 750;
      let minY = (36 * vy) / 750;
      //Si se sale de los limites se queda en el limite
      if (posX > maxX) posX = maxX;
      if (posX < minX) posX = minX;
      if (posY > maxY) posY = maxY;
      if (posY < minY) posY = minY;

      // mover nuestro elemento a esa posición
      isBig = true;
      firstPanMove = false;
      elem.style.transform = `translateX(${posX}px) translateY(${posY}px)`;
      elem.parentElement.classList.add("expanded");
    }
  

    
    hammertimes.push(hammertime); //Cada vez que se genera uun hammertime al final, lo añadimos al array
  });
  return hammertimes;
}

function hammerEnd(){
  console.log("Hammer end")
}

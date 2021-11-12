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

function debounce(func) {
  var timer;
  return function (event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 100, event);
  };
}
window.addEventListener("resize",debounce(function (e) {
    console.log("end of resizing");
    let oldVx = vx;
    //Recalculamos las medidas de la pantalla
    vx =  docElem.clientWidth || body.clientWidth,
    vy =  docElem.clientHeight || body.clientHeight;

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
    if(vx <= 450 && oldVx > 450){
      hammertimes = makeImageZoom();
    }
    
  }));

function makeImageZoom() {
  
  const images = document.querySelectorAll(".obra-info__img > img");
  var hammertimes = [];
  images.forEach((image) => {
    image.parentNode.style.overflow = "visible";

    const hammertime = new Hammer(image);
    hammertime.get("pan").set({ direction: Hammer.DIRECTION_ALL });
    hammertime.get("pinch").set({ enable: true });

    
    
    let isBig = false;

    hammertime.on("tap", (event) => {
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
      
      setTimeout(() => {
        ev.target.style.transform = "translate(0 ,0)";
        ev.target.parentElement.classList.remove("expanded");
        isBig = false;
      }, 100);
    });

    hammertime.on("pinchmove", handleDrag);
    hammertime.on("pinchend", (ev) => {
      setTimeout(() => {
        ev.target.style.transform = "translate(0 ,0)";
        ev.target.parentElement.classList.remove("expanded");
        isBig = false;
      }, 100);
    });

    function handleDrag(ev) {
      
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

      // move our element to that position
      isBig = true;
      firstPanMove = false;
      elem.style.transform = `translateX(${posX}px) translateY(${posY}px)`;
      elem.parentElement.classList.add("expanded");
    }
  

    
    hammertimes.push(hammertime);
  });
  return hammertimes;
}

function hammerEnd(){
  console.log("Hammer end")
}

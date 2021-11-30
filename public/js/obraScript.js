AOS.init({                         //Iniciamos la librería para las animaciones de scroll.
    easing: 'ease-in-sine',
    duration: 400,
    offset: 150
  });
  

 ///// ScrollSpy for Lazy Loading Images
 const domImages = document.querySelectorAll(".gallery__img");
 
 const observerOptions = {};
 const imgObserver = new IntersectionObserver((entries, imgObserver) => {
   entries.forEach(entry => {
     if(!entry.isIntersecting){
       return;
     }else{
       loadImage(entry.target);
       imgObserver.unobserve(entry.target);
     }
   })
 }, observerOptions);


 function loadImage(img){
  const url = `/api/getImage/${img.getAttribute("data-id")}`;
 
  if(!url){
    return;
  }
  
  fetch(url).then(response => response.json()).then(data => {
    let contentType = data.contentType;
    let dataBase64 = data.data;
    img.src = `data:image/${contentType};base64,
    ${dataBase64}`; 
  });
 }



 domImages.forEach(img => {
   imgObserver.observe(img);
 })



  /// Animattion on button press for overlay
  const toggleBtns = document.querySelectorAll(".toggle-overlay");
  const obras = document.querySelectorAll(".obra__box");
  const firstOverlays = document.querySelectorAll(".obra__overlay");

  toggleBtns.forEach((btn, i) => {
    
  btn.addEventListener("click", (e) => {
      
      firstOverlays[i].classList.toggle("appear");
      e.target.classList.toggle("cross");
      e.target.classList.toggle("square");
    })
  })

  //Display overlay on hover 
  obras.forEach((obra) => {
    obra.onmouseover = e => {
      if(e.target !== obra.querySelector(".toggle-overlay")){
        obra.querySelector(".obra__overlay").classList.add("appear");
        obra.querySelector(".toggle-overlay").classList.add("cross", "square");
      }
    
    };
    obra.onmouseleave = () => {
      obra.querySelector(".obra__overlay").classList.remove("appear");
      obra.querySelector(".toggle-overlay").classList.remove("cross", "square");
    };
  });




  // %%%%%% INFO OVERLAY %%%%%%%

const infoBtns = document.querySelectorAll(".info-btn");
const obraOverlay = document.querySelector(".obra-info");
const fecha = obraOverlay.querySelector(".obra-info__date");
const resumen = obraOverlay.querySelector(".contenido-scroll > h3");
const contenido = obraOverlay.querySelector(".contenido-scroll > p");
const img = obraOverlay.querySelector(".obra-info__img img");
const closeBtn = document.querySelector(".obra-info--close");


infoBtns.forEach(btn => {
    btn.addEventListener("click", obraOverlayHandler);
})

closeBtn.addEventListener("click", closeHandler);


function obraOverlayHandler(e){
  if(e.target.getAttribute("data-id") === obraOverlay.getAttribute("data-id")){
    obraOverlay.classList.add("open");
    obraOverlay.classList.add("full-opacity");
    setTimeout(() => {
      obraOverlay.firstElementChild.classList.add("grow");
    }, 20);
    document.body.classList.add("overflow-hidden");
    return;
  }else{
    obraOverlay.setAttribute("data-id", e.target.getAttribute("data-id"));
    obraOverlay.classList.add("open");
    obraOverlay.classList.add("full-opacity");
    setTimeout(() => {
      obraOverlay.firstElementChild.classList.add("grow");
    }, 20);
    document.body.classList.add("overflow-hidden");
    img.src = "/css/images/loader.gif";
    setTimeout(() => {
      loadobraOverlay();
    }, 20);
  }
 
}

function closeHandler(e){
    obraOverlay.firstElementChild.classList.remove("grow");
    obraOverlay.classList.remove("full-opacity");
    setTimeout(() => {
      obraOverlay.classList.remove("open");
      document.body.classList.remove("overflow-hidden");
    }, 350);
   
}



function loadobraOverlay(){
  const url = `/api/getObra/${obraOverlay.getAttribute("data-id")}`;
  if(!url){
    return;
  }
  fetch(url).then(response => response.json()).then(data => {
    var obra = data;

    fecha.innerText = obra.fecha;
    resumen.innerText = obra.resumen;
    contenido.innerText = obra.contenido;
    obraOverlay.querySelector(".contenido-scroll").scrollTop = 0;
    img.setAttribute("alt", obra.resumen);
    img.src = `data:image/${obra.img.contentType};base64,
    ${obra.img.data}`; 

  });

 }


//Exandir imagen
document.querySelectorAll(".obra-info__expand-img-btn").forEach(btn => {
  btn.addEventListener("click", expandImage);
})

document.querySelectorAll(".obra-info__img").forEach((img) => {
  img.addEventListener("click", (e) => {
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
  e.target.parentElement.classList.toggle("grow");
  imgDiv.classList.toggle("expand-image");
}

  
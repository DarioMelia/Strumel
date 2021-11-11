AOS.init({                         //Iniciamos la librería para las animaciones de scroll.
    easing: 'ease-in-sine',
    duration: 400,
    offset: 150
  });
  

 ///// ScrollSpy for Lazy Loading Images

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

 const domImages = document.querySelectorAll(".gallery__img");
 const domInfoImages = document.querySelectorAll(".obra-info__img img");

 domImages.forEach(img => {
   imgObserver.observe(img);
 })
 domInfoImages.forEach(img => {
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

const obraOverlays = document.querySelectorAll(".obra-info");
const closeBtns = document.querySelectorAll(".obra-info--close");


infoBtns.forEach(btn => {
    btn.addEventListener("click", obraOverlayHandler);
})

closeBtns.forEach(btn => {
    btn.addEventListener("click", closeHandler);
})



function obraOverlayHandler(e){
    
    const index = parseInt(e.target.name, 10);
    obraOverlays[index].classList.add("open");
    document.body.classList.add("overflow-hidden");
}

function closeHandler(e){
    const index = parseInt(e.target.parentElement.name, 10);
    
    obraOverlays[index].classList.remove("open");
    document.body.classList.remove("overflow-hidden");
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

  
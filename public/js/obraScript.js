AOS.init({                         //Iniciamos la librería para las animaciones de scroll.
    easing: 'ease-in-sine',
    duration: 400,
    offset: 150
  });
  

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

  obras.forEach((obra) => {
    obra.onmouseover = () => {
      obra.querySelector(".obra__overlay").classList.add("appear");
      obra.querySelector(".toggle-overlay").classList.add("cross", "square");
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

  
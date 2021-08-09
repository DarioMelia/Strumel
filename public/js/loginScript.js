// %%%%%%%%%%%%% LOGIN %%%%%%%%%%%%%%%

const logInputs = document.querySelectorAll(".login__input");


logInputs.forEach(input => {
    input.addEventListener("focus", e => {
      
        e.target.parentElement.querySelector(".login__span").classList.add("scaleX1");
    })
    input.addEventListener("blur", e => {
        e.target.parentElement.querySelector(".login__span").classList.remove("scaleX1");
    })
})
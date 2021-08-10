const buttonEdit = document.querySelector(".btn-edit");
const overlay = document.querySelector(".edit__overlay");
const buttonClose = document.querySelector(".edit__overlay--close");

buttonEdit.addEventListener("click", e => {
 overlay.classList.add("open");
})

buttonClose.addEventListener("click", e =>{
    overlay.classList.remove("open");
})







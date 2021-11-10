

const url = "/api/getLastImages";
const domImages = document.querySelectorAll(".gallery__img");
fetch(url).then(response => response.json()).then(data => setImages(data));



function setImages(images){
    domImages.forEach((img, i )=> {
    let currentImage = images[i];
    let contentType = currentImage.img.contentType;
    let dataBase64 = currentImage.img.data.toString('base64');
    console.log(dataBase64, contentType)
    let msg = "hola"
    console.log(msg.toString("base64"))


      img.src = `data:image/${contentType};base64,
      ${dataBase64}`;
    })
}


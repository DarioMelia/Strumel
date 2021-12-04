
//Lazy loading para las imagenes de la galeria en home
const url = "/api/getLastImages";
const domImages = document.querySelectorAll(".gallery__img");
const domInfoImages = document.querySelectorAll(".obra-info__img img");

//hacemos la llamada a la api del server y generamos el src correspondiente a cada imagen
fetch(url).then(response => response.json()).then(data => {
  generateSrc(data,domImages);
  generateSrc(data,domInfoImages);
});


function generateSrc(imagesData,imagesDom){
  imagesDom.forEach((img, i )=> {
    let currentImage = imagesData[i]; //la imagen del servidor correspondiente a la imagen en cuestion
    let contentType = currentImage.contentType;
    let dataBase64 = currentImage.data;
    
      img.src = `data:image/${contentType};base64,
      ${dataBase64}`; //src para displayear imagenes en base64
    })
}


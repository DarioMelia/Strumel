

const url = "/api/getLastImages";
const domImages = document.querySelectorAll(".gallery__img");
const domInfoImages = document.querySelectorAll(".obra-info__img img");

fetch(url).then(response => response.json()).then(data => {
  generateSrc(data,domImages);
  generateSrc(data,domInfoImages);
});


function generateSrc(imagesData,imagesDom){
  imagesDom.forEach((img, i )=> {
    let currentImage = imagesData[i];
    let contentType = currentImage.contentType;
    let dataBase64 = currentImage.data;
    
      img.src = `data:image/${contentType};base64,
      ${dataBase64}`;
    })
}


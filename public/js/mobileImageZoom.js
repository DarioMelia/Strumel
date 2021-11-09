const images = document.querySelectorAll(".obra-info__img > img");


images.forEach(image => {
const minScale = 1;
const maxScale = 12;
const hammertime = new Hammer.Manager(image, {
    touchAction: "auto",
    recognizers: [
      [Hammer.Pinch, { enable: true }],
      [Hammer.Tap]
    ]
  });

  
  hammertime.on('tap', event => {
      console.log('tap', event);
    });
  hammertime.on('pinchstart', event => {
    console.log('pinchstart', event);
  });

  hammertime.on('pinchmove', event => {
    // console.log('pinchmove', event);
    imageScale = Math.min(Math.max(minScale, event.scale), maxScale);
    updateRange();
    updateImage(event.deltaX, event.deltaY);
  });

  hammertime.on('pinchend', event => {
    console.log('pinchend', event);
    resetImage();
  });



    const imageWidth = image.offsetWidth;
    const imageHeight = image.offsetHeight;
  
    let imageScale = 1;
  
    let rangeMaxX = 0;
    let rangeMinX = 0;
  
    let rangeMaxY = 0;
    let rangeMinY = 0;

  image.parentNode.style.overflow = 'visible';
  image.classList.add('pz-Image');

 

  const updateRange = () => {
    const rangeX = Math.max(0, Math.round(imageWidth * imageScale) - imageWidth);
    const rangeY = Math.max(0, Math.round(imageHeight * imageScale) - imageHeight);
    rangeMaxX = Math.round(rangeX / 2);
    rangeMinX = Math.round(0 - rangeMaxX);

    rangeMaxY = Math.round(rangeY / 2);
    rangeMinY = Math.round(0 - rangeMaxY);
  };

  const updateImage = (deltaX, deltaY) => {
    const imageCurrentX = Math.min(Math.max(rangeMinX, deltaX), rangeMaxX) * 2;
    const imageCurrentY = Math.min(Math.max(rangeMinY, deltaY), rangeMaxY) * 2;

    const transform = `translate3d(${imageCurrentX}px, ${imageCurrentY}px, 0) scale(${imageScale})`;
    image.style.transform = transform;
    image.style.WebkitTransform = transform;
    image.style.zIndex = "9999";
  };

  const resetImage = () => {
    image.style.transform = "";
    image.style.WebkitTransform = "";
    image.style.zIndex = "";
  };

  

})





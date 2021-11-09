var win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    vx = win.innerWidth || docElem.clientWidth || body.clientWidth,
    vy = win.innerHeight|| docElem.clientHeight|| body.clientHeight;


    if(vx <= 450){
        makeImageZoom();
    }





    function makeImageZoom() {
        const images = document.querySelectorAll(".obra-info__img > img");


    images.forEach(image => {
        image.parentNode.style.overflow = 'visible';
        image.classList.add('pz-Image');
            
        const hammertime = new Hammer(image);
        hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
        
        let isBig = false;
        
        hammertime.on('tap', event => {
            console.log('tap', event);
            if(isBig){
              image.style.transform = "scale(1) translate(0 ,0)";
              isBig = false;
            }else{
              image.style.transform = "scale(2.5)";
              isBig = true;
            }
          });
        
        
          hammertime.on("panmove", handleDrag);
          hammertime.on("panend", ev => {
              console.log("panENd");
            //   ev.target.style.transform = "translate(0 ,0) scale(1)";
            setTimeout(() => {
                ev.target.style.transform = "translate(0 ,0) scale(1)";
                isBig = false}, 2000)
          });
        
        
        
        var lastPosX = 0;
        var lastPosY = 0;
        
        function handleDrag(ev) {
        
            console.log('drag', ev.deltaX, ev.deltaY)
           
          // for convience, let's get a reference to our object
          var elem = ev.target;
          
            lastPosX = elem.offsetLeft;
            lastPosY = elem.offsetTop;
        
          var posX = ev.deltaX + lastPosX;
          var posY = ev.deltaY + lastPosY;
          
          // move our element to that position
          isBig = true;
          elem.style.transform = `translateX(${posX}px) translateY(${posY}px) scale(2.5) `;
        
        
        }
          
        
        })
        
    }





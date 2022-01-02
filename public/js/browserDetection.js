
//Usando bowser detectamos el navegador que se está utilizando, y segun el nombre y la version displayeamos un
//mensaje en las versiones de navegador donde la página empieza a fallar(normalmente por clamp() o el flex-gap), pidiendo
//que actualice la versión del navegador.

const oldBrowserMsg = document.getElementById("oldBrowser-msg");
oldBrowserMsg.addEventListener("click", e => oldBrowserMsg.classList.add("display-none"));

const result = bowser.getParser(window.navigator.userAgent);
const os = result.parsedResult.os.name;
const browser = result.parsedResult.browser.name;
const version = parseInt(result.parsedResult.browser.version.slice(0,2));
const platform = result.parsedResult.platform.type

// alert(os +" "+ browser +" "+version +" "+ platform)

if(browser === "Chrome" && version <= 83){
  displayMsg(browser)
}
if(browser === "Microsoft Edge" && version <= 83){
  displayMsg(browser)
}


if(platform === "desktop"){
  if(browser === "Firefox" && version <= 74){
    displayMsg(browser)
  }
  if(browser === "Safari" && version <= 14){
    displayMsg(browser)
  }
  if(browser === "Opera" && version <= 72){
    displayMsg(browser)
  }

}else if(platform === "mobile"){
  if(browser === "Firefox" && version <= 79){
    displayMsg(browser)
  }
  if(browser === "Opera" && version <= 59){
    displayMsg(browser)
  }
  if(browser === "Safari" && parseInt(result.parsedResult.browser.version.slice(0,3)) <= 14.4){
    displayMsg(browser)
  }
}


function displayMsg(browser){
  oldBrowserMsg.classList.remove("display-none");
  oldBrowserMsg.querySelector("span").innerHTML = browser;
}


    
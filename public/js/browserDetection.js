var result = bowser.getParser(window.navigator.userAgent);


var os = result.parsedResult.os.name;
var browser = result.parsedResult.browser.name;
var version = parseInt(result.parsedResult.browser.version.slice(0,2));
var platform = result.parsedResult.platform.type
console.log(os,browser,version, platform)
if(platform === "desktop"){
  if(browser === "Chrome" && version <= 83){
    alert("Version antigua de Chrome en ordenador")
  }
  if(browser === "Microsoft Edge" && version <= 83){
    alert("Version antigua de Edge en ordenador")
  }
  if(browser === "Firefox" && version <= 74){
    alert("Version antigua de Firefox en ordenador")
  }
  if(browser === "Safari" && version <= 14){
    alert("Version antigua de Safari en ordenador")
  }
  if(browser === "Opera" && version <= 72){
    alert("Version antigua de Opera en ordenador")
  }

}else if(platform === "mobile"){
  if(browser === "Safari" && parseInt(result.parsedResult.browser.version.slice(0,3)) <= 14.4){
    alert("Version antigua de Safari en movil")
  }
}

//chrome 83 abajo
//edge 83 abajo
//firefox 74
//Safari 14 abajo
//Safari mobile 14.4 abajo
//Opera 72 abajo


    
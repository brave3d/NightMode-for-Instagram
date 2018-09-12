
function modifyDOM() {
      var path = chrome.extension.getURL('nightmode.css');
      head = document.head || document.getElementsByTagName('head')[0];
      link= document.createElement('link');
      link.type= 'text/css';
      link.id="mystyle";
      link.rel = "stylesheet";
      link.href= path;
      setTimeout(()=>{
        head.appendChild(link);
      },150)
        return "document.body.innerHTML";

    }




var mystyle =''
function appendStyle(){
    head = document.head || document.getElementsByTagName('head')[0];
    if (mystyle!=null)
    {
      head.appendChild(mystyle)
    }
}

function removeStyle(){

    head = document.head || document.getElementsByTagName('head')[0];
    mystyle= document.getElementById("mystyle");
    if (mystyle!=null)
    {
      head.removeChild(mystyle)
    }
}

var excludedlinks = ["https://www.instagram.com/developer/","https://www.instagram.com/about/jobs/","https://www.instagram.com/about/us/"]
var updatelinks = ["https://www.instagram.com/accounts/edit/"]

chrome.webNavigation.onHistoryStateUpdated.addListener(function(e) {
        if (excludedlinks.includes(e.url)) {
          chrome.tabs.executeScript({
              code: '(' + removeStyle + ')();'
          }, (results) => {});
        }
        if(updatelinks.includes(e.url)) {
          chrome.tabs.executeScript({
              code: '(' + removeStyle + ')(); (' + appendStyle + ')();'
          }, (results) => {});
        }

});



function updateIcon(){
  isActive = localStorage.getItem("isActive");
  if (isActive=='true') {
    localStorage.setItem("isActive",false);
    isActive=false;
    chrome.browserAction.setIcon({
      path: '/imgs/icon128.png'
    });
    chrome.browserAction.setTitle({
      title: 'NightMode is OFF'
    });

  }
  else
  {
    localStorage.setItem("isActive",true);
    isActive=true;
    chrome.browserAction.setIcon({
      path: '/imgs/icon128-dark.png'
    });
    chrome.browserAction.setTitle({
      title: 'NightMode is ON'
    });
  }
}

updateIcon();
function modifyDOM() {

  var path = chrome.extension.getURL('nightmode.css');
  head = document.head || document.getElementsByTagName('head')[0];
  link= document.createElement('link');
  link.type= 'text/css';
  link.id="mystyle";
  link.rel = "stylesheet";
  link.href= path;

  isInstagram= /^https?:\/\/([a-zA-Z\d-]+\.){0,}instagram\.com\/*/.test(document.URL)

    if(checked && isInstagram) {
      setTimeout(()=>{
        head.appendChild(link);
      },150)

    } else {
      mystyle= document.getElementById("mystyle");
      if (mystyle!=null)
      {
        head.removeChild(mystyle)

      }
    }
    return "document.body.innerHTML";

}
chrome.browserAction.onClicked.addListener(function(tab) {

    if (excludedlinks.includes(tab.url)) {
      return;
    }
      updateIcon()
      //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
      ch = isActive;
      chrome.tabs.executeScript(null,{
          code: "var checked =   " + ch + ";"  //argument here is a string but function.toString() returns function's code
      }, () => {
        chrome.tabs.executeScript({
            code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
        }, (results) => {});

      });

});




chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
        isActive = localStorage.getItem("isActive");
        if(message.data.type=="getStatus");
        {
          sendResponse({"isActive":isActive,"excludedlinks":excludedlinks});

        }
        if (message.data.type=="setStatus") {
          localStorage.setItem("isActive",message.data.isActive);
          isActive=localStorage.getItem("isActive");
        }

  });

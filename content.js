
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  console.log(message);
});

var excludedlinks=[];
chrome.runtime.sendMessage({data:{type:"getStatus"}},function(response){
  excludedlinks= response.excludedlinks;
  if (response.isActive=="true") {
      modifyDOM();

  }
});

function modifyDOM() {
      if (excludedlinks.includes(document.URL)) {
        return;
      }
      var path = chrome.extension.getURL('nightmode.css');
      head = document.head || document.getElementsByTagName('head')[0];
      link= document.createElement('link');
      link.type= 'text/css';
      link.id="mystyle";
      link.rel = "stylesheet";
      link.href= path;
      setTimeout(()=>{
        head.appendChild(link);
      },300)
        return "document.body.innerHTML";
    }

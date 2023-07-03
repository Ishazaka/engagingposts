let scrapeEmails = document.getElementById("scrapeEmails");
let list =  document.getElementById("text-list")
let namePerson =  document.getElementById("name-input")



   //  Handler to recieve emails from content scripting
   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let gettingpost =  request.gettingpost;
    let gettingName =  request.gettingName;

  
       list.innerText = gettingpost;
       namePerson.value = gettingName;
    

})


// button's click event listener
scrapeEmails.addEventListener("click" , async function(){
  
    // get current active tab
    let [tab] = await  chrome.tabs.query({
        active:true, currentWindow:true
      });


    //   excute script to parse email on page
     chrome.scripting.executeScript({
        target: {tabId : tab.id},
        func: scrapingemailfromweb,
     })      

     function scrapingemailfromweb(){

       
    
  const gettingpost   = document.getElementsByClassName("update-components-text ")[0].getElementsByTagName("span")[0].getElementsByTagName("span")[0].getElementsByTagName("span")[0].innerText


  const gettingName =  document.getElementsByClassName("update-components-actor__name")[0].getElementsByTagName("span")[0].getElementsByTagName("span")[0].innerText;

  //  alert([gettingName , gettingpost])
  // console.log(gettingpost)




    chrome.runtime.sendMessage({gettingpost, gettingName})
      
     }

})

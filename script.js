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
scrapeEmails.addEventListener("click", async function () {

   // get current active tab
   let [tab] = await chrome.tabs.query({
      active: true, currentWindow: true
   });

   // execute script to parse email on page
   chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: scrapingemailfromweb,
   });

   async function scrapingemailfromweb() {
      const gettingpost = document.getElementsByClassName("update-components-text ")[0].getElementsByTagName("span")[0].getElementsByTagName("span")[0].getElementsByTagName("span")[0].innerText;
      const gettingName = document.getElementsByClassName("update-components-actor__name")[0].getElementsByTagName("span")[0].getElementsByTagName("span")[0].innerText;

      // Clean up the text
      let cleanedPost = gettingpost.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, " ");

      // Send data to server
      const response = await fetch('http://localhost:4000/gpt', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ prompt: `Be a LinkedIn user who makes a joke in response to the following LinkedIn post, has to be 14 lines. ${cleanedPost}` })
      });

      const data = await response.json();

      console.log("resopnse", response);

      // log data to the console
      console.log('getting data', data.response);
      console.log('cleaned post', cleanedPost);

      // Send data to background.js
      chrome.runtime.sendMessage({ gettingpost: cleanedPost, gettingName });
   }

});

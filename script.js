
let scrapeEmails = document.getElementById("scrapeEmails");
let list =  document.getElementById("text-list")
let namePerson =  document.getElementById("name-input")



document.addEventListener("DOMContentLoaded", async function() {
   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

   chrome.scripting.executeScript({
       target: { tabId: tab.id },
       func: replyforthepost,
   });

   function replyforthepost() {
       let commentInnerbox = document.getElementsByClassName("ql-editor");
       let getPostReply = document.createElement('div');
       getPostReply.innerHTML = `©`;
       getPostReply.className = "engagebtn";

       Array.from(commentInnerbox).forEach((comment) => {
           comment.addEventListener("click", function(event) {
               let emogibox = event.currentTarget.parentNode.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName("mlA")[0];
               emogibox.prepend(getPostReply);

               getPostReply.addEventListener('click', function(event) {
                   let takethisincomment = event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName("feed-shared-update-v2__description-wrapper")[0].innerText;
                   event.currentTarget.parentElement.parentElement.getElementsByClassName("ql-editor")[0].getElementsByTagName("p")[0].innerText = takethisincomment;
                   console.log(takethisincomment);
               });
           })
       })
   }
});


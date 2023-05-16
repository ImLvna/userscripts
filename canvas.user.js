// ==UserScript==
// @name         Canvas Things
// @namespace    https://lvna.me/
// @version      0.1
// @description  Canvas utilities
// @author       Luna
// @match        https://*.instructure.com/courses/*/assignments/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instructure.com
// @run-at       document-end
// @grant        GM.registerMenuCommand
// @grant        unsafeWindow
// ==/UserScript==

(function() {
  'use strict';
  console.log('running')

  let fakeTime = (date) => {
    console.log(date)
    if (unsafeWindow.localStorage.getItem(`faketime-${unsafeWindow.ENV.ASSIGNMENT_ID}`) == null) {
      unsafeWindow.localStorage.setItem(`faketime-${unsafeWindow.ENV.ASSIGNMENT_ID}`, date)
    }
    let ampm = date.toLocaleTimeString().split(' ')[1].toLowerCase()
    let time = date.toLocaleTimeString().split(' ')[0].split(':').slice(0, 2).join(':')
    document.querySelector('.submit_assignment_link').innerHTML = 'New Attempt'
    document.getElementById('sidebar_content').innerHTML = `
    <div class="details">
        <h2>Submission</h2>
            <div class="header">
                <i class="icon-check" aria-hidden="true"></i>
                Submitted!
            </div>
        <div class="content">
            <span class="">
                ${date.toDateString().split(' ').slice(1, 3).join(' ')} at ${time}${ampm}
            </span>
            <div>
            <a href="/">
                Submission Details
            </a>
            </div>
            <div class="module">
            </div>
            <div class="comments module">
                <h3>Comments: </h3>
                No Comments
            </div>
        </div>
    </div>`
  }


  if (unsafeWindow.localStorage.getItem(`faketime-${unsafeWindow.ENV.ASSIGNMENT_ID}`) != null) {
    fakeTime(new Date(unsafeWindow.localStorage.getItem(`faketime-${unsafeWindow.ENV.ASSIGNMENT_ID}`)))
  }

  GM.registerMenuCommand("Fake Submission", ()=>fakeTime(new Date()))
  GM.registerMenuCommand("Remove Fake Submission", ()=>unsafeWindow.localStorage.removeItem(`faketime-${unsafeWindow.ENV.ASSIGNMENT_ID}`))
})();
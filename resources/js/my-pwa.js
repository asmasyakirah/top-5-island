// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


(function() 
{ 
  // Service worker
  if ('serviceWorker' in navigator) 
  {
    window.addEventListener('load', function() 
    {
      navigator.serviceWorker.register('./service-worker.js').then(function(registration) 
      {
        console.log('Worker registration successful', registration.scope);
      }, 
      function(err) 
      {
        console.log('Worker registration failed', err);
      }).catch(function(err) 
      {
        console.log(err);
      });
    });
  } 
  else 
  {
    console.log('Service Worker is not supported by browser.');
  }
      
  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker
  //            .register('./service-worker.js')
  //            .then(function() { console.log('Service Worker Registered'); });
  // }
})();

// Global Variables
let deferredPrompt;
var isIos = false;
var isOnApp = false;
var iAmGuest = true;
var isInstalled = true;

// Check if device is iOS
if (/iphone|ipad|ipod/.test( window.navigator.userAgent.toLowerCase() )) 
{
  isIos = true;
}

if (window.matchMedia('(display-mode: standalone)').matches) 
{
  isOnApp = true;
  // console.log("This is running as standalone.");
}
else if (window.matchMedia('(display-mode: browser)').matches) 
{
  isOnApp = false;
  // console.log("This is running as browser.");
}


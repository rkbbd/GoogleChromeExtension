// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";
//----------------------Color Start----------------------------
let Color1 = document.getElementById("Color1");
let Color2 = document.getElementById("Color2");
let Color3 = document.getElementById("Color3");
// chrome.storage.sync.get("color", function(data) {
//   Color1.style.backgroundColor = data.color;
//   Color1.setAttribute("value", data.color);
// });
Color1.onclick = function(element) {
  let color = element.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            code: 'document.body.style.backgroundColor = "' + color + '";'
        });
    });
    setStorage("color", color);
};
Color2.onclick = function(element) {
  let color2 = element.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            code: 'document.body.style.backgroundColor = "' + color2 + '";'
        });
    });
    setStorage("color", color2);
};
Color3.onclick = function(element) {
  let color3 = element.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            code: 'document.body.style.backgroundColor = "' + color3 + '";'
        });
    });
    setStorage("color", color3);
};
//----------------------Color End----------------------------

//----------------------Height Start-------------------------
let modalHeight = document.getElementById("modal_height");
let range_modalHeight = document.getElementById("range_modal_height");

modalHeight.onkeyup = function(element) {
    if (element.keyCode == 13) {
      let modal_Height = element.target.value;
        changeModalHeight(modal_Height + "px");
    }
};

range_modalHeight.oninput = function(element) {
  let modal_Height = element.target.value;
    changeModalHeight(modal_Height + "%");
};

function changeModalHeight(modal_Height) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            code:
              'document.getElementById("modal_content").style.height  ="' +
              modal_Height +
              '";'
        });
    });
}
//----------------------Height End----------------------------

//----------------------Width Start-------------------------
let modalWidth = document.getElementById("modal_width");
let range_modalWidth = document.getElementById("range_modal_width");

modalWidth.onkeyup = function(element) {
    if (element.keyCode == 13) {
      let modal_Width = element.target.value;
        changeModalWidth(modal_Width + "px");
    }
};

range_modalWidth.oninput = function(element) {
  let modal_Width = element.target.value;
    changeModalWidth(modal_Width + "%");
};

function changeModalWidth(modal_Width) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            code:
              'document.getElementById("modal_content").style.width  ="' +
              modal_Width +
              '";'
        });
    });
}
//----------------------Width End----------------------------

//----------------------URL Start-------------------------
 
let turnOffWindow = document.getElementById("turnOffWindow");
turnOffWindow.onclick=function(e){
   
    if (e.target.checked != false)
    {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.executeScript(tabs[0].id, {
                code:
                  'document.getElementById("modal_content").style.display  ="none"'
            });
        });
        setStorage("windowFeature", "false");
    }else{
        setStorage("windowFeature", "true");
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.executeScript(tabs[0].id, {
                code:
                  'document.getElementById("modal_content").style.display  ="block"'
            });
        });
    }
    
}

 
// //----------------------Width End----------------------------

function setStorage(name, value) {
    chrome.storage.sync.set({ name: value }, function() {
        console.log("color is " + value);
    });
}

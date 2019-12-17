// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

chrome.runtime.onInstalled.addListener(function () {
    var color = "";
    chrome.storage.sync.get("color", function (data) {
        color = data.color;
    });
    chrome.storage.sync.get("windowFeature", function (data) {
        var windowFeature = data.windowFeature;
    });
    chrome.storage.sync.set({"windowFeature": "true"});
    if (!color) {
        chrome.storage.sync.set({color: "#DBEEDD"},
    function () {
      console.log("The color is green.");
        });
    }

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([
          {
              conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostContains: "." }
                })
              ],
              actions: [new chrome.declarativeContent.ShowPageAction()]
          }
        ]);
    });

    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status == "complete")
            chrome.tabs.executeScript(tabId, { file: "code.js" });
    });
});

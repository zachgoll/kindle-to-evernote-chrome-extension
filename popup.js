// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let copyButton = document.getElementById('copyButton');

function processor (results) {
    setTimeout(() => {
        copyButton.innerText = 'Copy Notes to Clipboard';
    }, 8000);
    copyButton.innerText = 'Copied!'
}

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    let p1 = document.getElementById('validPage');
    let p2 = document.getElementById('invalidPage');
    let re = new RegExp(/https:\/\/read.amazon.com/)

    if (re.test(url)) {
        p2.style.display = 'none';
        p1.style.display = 'block';
    } else {
        p2.style.display = 'block';
        p1.style.display = 'none';
    }
});

copyButton.onclick = (element) => {
    chrome.tabs.executeScript(null, {
        file: 'parser.js'
    }, processor);
}
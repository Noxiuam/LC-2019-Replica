const app = require('electron').remote;
const { shell } = require('electron')
const request = require('request');
const fs = require('fs');
const { machineIdSync } = require('node-machine-id');
hwid = machineIdSync();

// COPYRIGHT LABEL //
let copyrightString = 'Moonsworth, LLC ' + ' &bullet; ' + "1.0.0";
let copyright = document.querySelector('.copyright');
copyright.innerHTML = copyrightString;
copyright.addEventListener('click', function() {
  copyright.innerHTML = hwid.substring(0, 20);
  setTimeout(function() {
    copyright.innerHTML = copyrightString;
  }, 2000);
});

// EXIT BUTTON //
document.querySelector('.close-button').addEventListener('click', function() {
  window.close();
});

// SETTINGS TAB //
document.querySelector('.settings-tab').addEventListener('click', function() {
  document.querySelector('.settings-page').style.visibility = 'visible';
  document.querySelector('.home-page').style.visibility = 'hidden';
});

// HOME TAB //
document.querySelector('.home-tab').addEventListener('click', function() {
  document.querySelector('.home-page').style.visibility = 'visible';
  document.querySelector('.settings-page').style.visibility = 'hidden';
});

// STORE TAB //
document.querySelector('.store-tab').addEventListener('click', function() {
  shell.openExternal('https://discord.gg/2WFMVPrWrz');
});
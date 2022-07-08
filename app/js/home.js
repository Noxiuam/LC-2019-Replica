const getAppdata = require('appdata-path');
const sha1 = require('sha1-file');
const fs = require('fs');
const { machineIdSync } = require('node-machine-id');
const log = require('electron-log');
const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();
const ServerURL = "http://YOUR DOMAIN HERE";

hwid = machineIdSync();
launchButton = document.querySelector('.launch-button');
launchText = document.querySelector('.launch-text');
launchState = 'no_access';
log.transports.file.level = "info";

const remote = require("electron").remote;
const { getAppDataPath } = require('appdata-path');
var window = remote.getCurrentWindow()

var clienthash = null;

function setLaunchState(state) {
    if (state === 'no_access') {
        launchText.innerHTML = 'No Access';
        launchButton.src = 'images/launch/no_auth.png';
    } else if (state === 'ready') {
        launchText.innerHTML = 'Launch Client';
        launchButton.src = 'images/launch/ready.png';
    } else if (state === 'authenticating') {
        launchText.innerHTML = 'Authenticating...';
        launchButton.src = 'images/launch/loading.png';
    } else if (state === 'connecting') {
        launchText.innerHTML = 'Connecting...';
        launchButton.src = 'images/launch/loading.png';
    } else if (state === 'launching') {
        launchText.innerHTML = 'Launching...';
        launchButton.src = 'images/launch/loading.png';
    } else if (state === 'banned') {
        document.querySelector('.launch-text').style = "margin-top: -10px;"
        launchText.innerHTML = "You're still <br> banned";
        launchButton.src = 'images/launch/no_auth.png';
    } else {
        launchText.innerHTML = 'Error';
        launchButton.src = '';
    }

    launchState = state;
}

function launchClient() {
    if (launchState != 'ready') {
        return;
    }

    getClientHash();

    log.info("[LC] Launching...");
    setLaunchState('connecting');

    setTimeout(function() {
        log.info('[LC] Got hash: ' + clienthash)
        handleLaunch();
    }, 1000);
}

function handleLaunch() {

    if (!fs.existsSync(getAppdata('.minecraft/versions/Lunar Client 1.7.10/Lunar Client 1.7.10.jar'))) {
        log.info('[LC] Starting first-time launch');
        launchLunar(`${ServerURL}/client.zip`);
    }

    var checkedhash = sha1.sync(getAppdata('.minecraft/versions/Lunar Client 1.7.10/Lunar Client 1.7.10.jar'));
    if (checkedhash == clienthash) {
        setLaunchState('launching')
        launchLunar(null);
        log.info('[LC] No Client Updates found, launching');
    } else {
        log.info('[LC] Client Update found! Updating');
        launchLunar(`${ServerURL}/client.zip`);
    }

}

async function getClientHash() {
    const response = await fetch(`${ServerURL}/latest`);
    const text = await response.text();

    clienthash = text.replaceAll('\n', '');
}

function launchLunar(update) {

    let opts = {
        clientPackage: update,
        authorization: Authenticator.getAuth("LunarUser"),
        root: getAppdata('.minecraft'),
        version: {
            number: "1.7.10",
            custom: "Lunar Client 1.7.10"
        },
        memory: {
            max:  document.getElementById("settings-memory").value,
            min: "1024"
        }
    }

    launcher.launch(opts);
    launcher.on('data', (e) => {
        setLaunchState('launching');
        window.hide();
    })
    launcher.on('close', (e) => {
        setLaunchState('ready');
        window.show();
    })
}

launchButton.addEventListener('click', launchClient);
launchText.addEventListener('click', launchClient);

// POPULATE BLOG POST AREA //
console.log('[LC] Received meta response');

let url = `${ServerURL}/news.json`;

fetch(url)
    .then(news => news.json())
    .then((response) => {
        document.querySelector('.blog-title').innerHTML = response.title;
        document.querySelector('.blog-content').innerHTML = response.content;
        document.querySelector('.blog-author').innerHTML = 'Posted by ' + response.author;
        document.querySelector('.blog-author-skin').src = 'https://minotar.net/helm/' + response.author + '/32.png';
    })
    .catch(err => {
        throw err
    });

let heap = 2048;

try {
    let settingsRaw = fs.readFileSync(getAppdata('LunarClient2020/settings/settings.json'));
    let settings = JSON.parse(settingsRaw);
    heap = settings.heap;
} catch (ignore) {}

memorySlider = document.querySelector('#settings-memory');
memorySlider.value = heap;

setLaunchState('ready');
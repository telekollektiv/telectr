var remote = 'wss://' + document.location.host + '/ws';

// utils

var statusBar = (function() {
    var bar = document.getElementById('status');

    return {
        disconnected: function() {
            bar.classList = ['progress'];
            bar.textContent = 'Connecting..';
        },

        connected: function() {
            bar.classList = ['connected'];
            bar.textContent = 'Connected';
        }
    };
})();

// websocket

var sock = new WebSocket(remote);

var inc = document.getElementById('inc').onclick = function() {
    sock.send('+' + key);
};

var dec = document.getElementById('dec').onclick = function() {
    sock.send('-' + key);
};

var sync = document.getElementById('sync').onclick = function() {
    sock.send('_' + key);
};

sock.onopen = function() {
    statusBar.connected();
    if(key) {
        sync();
    }
};

sock.onerror = function(error) {
    console.log('ws error: ' + error);
    statusBar.disconnected();
};

sock.onmessage = function(msg) {
    console.log('server: ' + msg.data);
    document.getElementById('value').textContent = msg.data
};

// controller

var toggle = function(name) {
    ['intro', 'ctr'].forEach(function(x) {
        document.getElementById(x).hidden = (x != name);
    });
};

var openRoom = function(name) {
    document.location = '#' + key;
    document.getElementById('key').textContent = key;
    toggle('ctr');
};

var key = document.location.hash.slice(1);

document.getElementById('intro-form').onsubmit = function() {
    key = document.getElementById('intro-key').value;
    openRoom(key);
    sync();

    return false;
};

if(key) {
    openRoom(key);
} else {
    toggle('intro');
}


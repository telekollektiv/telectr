var remote = 'wss://' + document.location.host + '/ws';

// utils
var statusBar = (function() {
    var bar = document.getElementById('status');

    return {
        disconnected: function() {
            bar.className = 'progress';
            bar.textContent = 'Connecting..';
        },

        connected: function() {
            bar.className = 'connected';
            bar.textContent = 'Connected';
        }
    };
})();

// websocket
var socket = (function(remote) {
    var sock;

    var connect = function() {
        sock = new WebSocket(remote);

        sock.onopen = function() {
            statusBar.connected();
            if(key) {
                sync();
            }
        };

        sock.onerror = function(error) {
            console.log('ws error: ' + error);
            sock.close();
        };

        sock.onclose = function() {
            statusBar.disconnected();
            setTimeout(function() {
                connect();
            }, 1000);
        };

        sock.onmessage = function(msg) {
            console.log('server: ' + msg.data);
            document.getElementById('value').textContent = msg.data
        };
    };

    connect();

    return {
        send: function(msg) {
            return sock.send(msg);
        }
    };
})(remote);

var inc = document.getElementById('inc').onclick = function() {
    socket.send('+' + key);
};

var dec = document.getElementById('dec').onclick = function() {
    socket.send('-' + key);
};

var sync = document.getElementById('sync').onclick = function() {
    socket.send('_' + key);
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

var key = document.location.hash.slice(1).trim();

document.getElementById('intro-form').onsubmit = function() {
    key = document.getElementById('intro-key').value.trim();
    openRoom(key);
    sync();

    return false;
};

if(key) {
    openRoom(key);
} else {
    toggle('intro');
}

document.ontouchmove = function(event) {
    event.preventDefault();
}

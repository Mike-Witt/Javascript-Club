var frame1 = null;
var dbg = null;

function debug(msg) {
    dbg.innerHTML += msg + '\n';
}

function dbgnl(msg) {
    dbg.innerHTML += msg;
}

function initialize() {
    frame1 = document.getElementById("frame1");
    frame1.innerHTML = "This is the animation area."; 
    dbg = document.getElementById("debug");
    dbg.innerHTML = ''; // Need this to avoid indent?
    dbgnl('.');
    dbgnl('.');
    dbgnl('.');
    debug("This is the debug area.");
}

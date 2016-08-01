var frame1 = null;
var out = null;
var nextBlockNumber = 0;
var block0 = null;

// The right size and bottom of the animation. We don't want the block to
// move outside of these limits. These values are currently hard-coded in
// the .html file.
var animRight = 800;
var animBottom = 550;

function output(msg) {
    out.innerHTML += msg + '\n';
    out.scrollTop = out.scrollHeight;
}

function outnl(msg) {
    out.innerHTML += msg;
    out.scrollTop = out.scrollHeight;
}

function dispBlock(b) {
    string = 'top=' + b.top + ', left=' + b.left + ', size=' + b.size;
    string += ', number=' + b.number + ', id=' + b.id + ', div=' + b.div;
    return(string);
}

function createBlock(top, left, size) {
    output('createBlock():');
    b = new Object();
    b.top = top;
    b.left = left;
    b.size = size;
    b.number = nextBlockNumber++;
    output('  number: ' + b.number);
    b.id = 'block' + b.number;
    output('  id: ' + b.id);
    blockDef = '<div id="' + b.id + '"';
    blockDef += ' style="background:red; ' + 'height:';
    blockDef += b.size + 'px; width:' + b.size + 'px;'
    blockDef += ' position: relative;"></div>';
    output('  blockDef: ' + blockDef);

    //frame1.innerHTML += blockDef;
    $('#frame1').append(blockDef);

    b.div= document.getElementById(b.id);
    return b;
}

function initialize() {
    frame1 = document.getElementById("frame1");
    out = document.getElementById("messages");
    out.innerHTML = ''; // Need this to avoid indent
    output('initialize():');
    // For the purposes of this test, I'm only creating one special "block0"
    block0 = createBlock(0, 0, 25);
    output('new block: ' + dispBlock(block0));
}

function boundsCheck(b) {
    //output('boundsCheck():');
    if (b.top < 0) b.top = 0;
    if (b.left < 0) b.left = 0;
    if (b.left > animRight - b.size) b.left = animRight - b.size;
    if (b.top > animBottom - b.size) b.top = animBottom - b.size;
}

function moveUp(b) {
    b.top = b.top - b.size;
    move(b);
}    

function moveDown(b) {
    b.top = b.top + b.size;
    move(b);
}    

function moveLeft(b) {
    b.left = b.left - b.size;
    move(b);
}    

function moveRight(b) {
    b.left = b.left + b.size;
    move(b);
} 

function move(b) {
    boundsCheck(b);
    target = '#' + b.id;
    //output('  target:' + target);
    $(target).animate( {
        left: b.left + 'px',
        top: b.top + 'px',
        height: b.size + 'px',
        width: b.size + 'px'
    },{
        queue: true,
        duration: 200
    });
}

function randomMove(b) {
    r = parseInt(4 * Math.random());
    //output('random: ' + r);
    switch(r) {
        case 0: moveUp(b); break;
        case 1: moveDown(b); break;
        case 2: moveLeft(b); break;
        case 3: moveRight(b); break;
    }
}

function do_click(id) {
    b = block0; // This is my only block for now!
    //output('do_click(' + id + ')');
    switch(id) {
        case '1': moveUp(b); break;
        case '2': moveDown(b); break;
        case '3': moveLeft(b); break;
        case '4': moveRight(b); break;
        case '5': randomMove(b); break;
        case '6': 
            for ( var i = 0; i < 100; i++) randomMove(b);
            break;
    }
}

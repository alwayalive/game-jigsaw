var game = require("./module/game");
var Jigsaw = require("./module/jigsaw");
var Chip = require("./module/chip");
var pos = require("./module/position");

var canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d"),
    // perWidht = 300,
    // perHeight = 300,
    jigsaw = null;

loadImage('6b8c14f8gw1eyeugdb018j20xc0p0n2p.jpg', function(e) {

    var img = e.target || e.srcElement;
    // width = img.width,
    // _width = width;
    // height = img.height,
    // sx = 0,
    // sy = 0,
    // chip = null,
    // index = 0;

    jigsaw = new Jigsaw(img, 300, 300);

    // for( var i = 0 ; ( height -= perHeight ) >= 0 ; i++ ){
    // 	for( var j = 0 ; ( width -= perWidht ) >= 0 ; j++ ){

    // 		sx = j * perWidht;
    // 		sy = i * perHeight;

    // 		chip = new Chip( index++, sx , sy , perWidht , perHeight, perWidht , perHeight );
    // 		// chip.draw( ctx, img , j * ( perWidht + 1 ) , i * ( perHeight + 1 ) );
    // 		jigsaw.push( chip , j === 0 );
    // 		// ctx.drawImage( e.target , sx , sy , perWidht , perHeight , j * (perWidht+1) ,i * (perHeight+1) ,perWidht , perHeight);
    // 	}
    // 	width = _width;
    // }
    game.init(canvas, ctx, jigsaw);
});

//加载图片
function loadImage(src, fn) {
    var img = new Image();
    img.src = src;
    img.onload = fn;
    return img;
}

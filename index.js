var game = require("./module/game"),    //游戏对象
    Jigsaw = require("./module/jigsaw"),    //拼图类
    Chip = require("./module/chip"),    //碎片类
    pos = require("./module/position"); //在canvas空间上的坐标偏移函数

var canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d"),
    jigsaw = null;

//加载完图片以后初始化游戏界面
loadImage('6b8c14f8gw1eyeugdb018j20xc0p0n2p.jpg', function(e) {

    var img = e.target || e.srcElement;
    jigsaw = new Jigsaw(img, 300, 300, 1);
    game.init(canvas, ctx, jigsaw);
});

//加载图片
function loadImage(src, fn) {
    var img = new Image();
    img.src = src;
    img.onload = fn;
    return img;
}

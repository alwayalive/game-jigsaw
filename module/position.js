// 得到在target容器内的坐标
function offset(target, e) {
    var x = parseInt(e.pageX - target.offsetLeft);
    var y = parseInt(e.pageY - target.offsetTop);
    return {
        x,
        y
    }
}
module.exports = {
    offset,
    screen
}

//得到点击的坐标
// function getEventPosition(ev){
//   	var x, y;
//   	if (ev.layerX || ev.layerX == 0) {
//     	x = ev.layerX;
//     	y = ev.layerY;
//  	}else if (ev.offsetX || ev.offsetX == 0) { // Opera
//     	x = ev.offsetX;
//     	y = ev.offsetY;
//   	}
//   	return {x: x, y: y};
// }

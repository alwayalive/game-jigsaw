var Chip = require("./chip");
var BlankChip = require("./blank_chip");
var pos = require("./position");

var sortedGraphicsObjectArray;
// var totalStep = 0;//点击步数
// var totalTime = 0;//使用时间
var blankChip = null;
var blankChipIndex = 0;
var vanishedChip = null;
var __convas = null;
var __ctx = null;
var __jigsaw = null;
var win = false;


function victory() {
    var chips = __jigsaw.getChips();
    win = true;
    alert("闯关成功！");
    // chips.pop(blankChip);
    // chips.push(vanishedChip);
    // __jigsaw.chipMargin = 0;
    // __jigsaw.draw(__ctx);
    __ctx.drawImage(__jigsaw.target,0,0,__jigsaw.width(),__jigsaw.height());
}
//移动空块
function move(chip1, chip2) {
    var tmp,
        chips = __jigsaw.getChips(),
        colspan = __jigsaw.colspan,
        len = chips.length,
        leftIndex = blankChipIndex - 1, //空白块的左边块索引
        rightIndex = blankChipIndex + 1, //空白块的右边块索引
        topIndex = blankChipIndex - colspan, //空白块的上边块索引
        bottomIndex = blankChipIndex + colspan; //空白块的下边块索引

    if (leftIndex >= 0 && chips[leftIndex] === chip2) {
        chips[blankChipIndex] = chip2;
        chips[leftIndex] = chip1;
    } else if (rightIndex < len && chips[rightIndex] === chip2) {
        chips[blankChipIndex] = chip2;
        chips[rightIndex] = chip1;
    } else if (topIndex >= 0 && chips[topIndex] === chip2) {
        chips[blankChipIndex] = chip2;
        chips[topIndex] = chip1;
    } else if (bottomIndex < len && chips[bottomIndex] === chip2) {
        chips[blankChipIndex] = chip2;
        chips[bottomIndex] = chip1;
    }

}

//把最后一个碎片使用空块替换
function createBlankChip(chip) {
    return new BlankChip(chip);
}

//刷新画板
function redrawBoard() {
    __ctx.fillStyle = "#ffffff";
    __ctx.fillRect(0, 0, __jigsaw.width(), __jigsaw.height());
    __ctx.restore();
}

function bindContext(ctx) {
    __ctx = ctx;
}

function bindJigsaw(jigsaw) {
    __jigsaw = jigsaw;
}

function bindCanvas(convas) {
    __convas = convas;
}

//处理canvas点击行为
function canvasClickHandle(e) {
    if( win )
        return;
    var target = e.target || e.srcElement,
        mouse = pos.offset(target, e),
        hit, i;
    for (i = 0; i < sortedGraphicsObjectArray.length; i++) {
        hit = sortedGraphicsObjectArray[i].handleClick(mouse);
        if (hit) break;
    }
    if (hit) {
        blankChipIndex = getBlankChipIndex();
        move(blankChip, hit.data);
        redrawBoard();
        sortObjectArray(__jigsaw.draw(__ctx));
        if (__jigsaw.orderable) victory();
    }
}
//事件监听
function eventListener(canvas) {
    canvas.addEventListener("click", canvasClickHandle);
    canvas.addEventListener("dragstart ", preventDefaultHandle);
    canvas.addEventListener("selectstart ", preventDefaultHandle);
}
//取消事件默认行为
function preventDefaultHandle(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    return false;
}

function sortObjectArray(graphicsObjectArray) {
    //给图形对象数组排序
    sortedGraphicsObjectArray = graphicsObjectArray.sort(function(gameObject1, gameObject2) {
        return gameObject1.zIndex < gameObject2.zIndex;
    });
}
//逆运算  x/y  
//坐标计算公式  x = i * ( width + margin )
//x / ( width + margin ) = i
function inverseOpera(r, a1, a2) {
    return r / (a1 + a2);
}
//通过逆运算得到空白块在jigsaw.__chips数组中的索引
function getBlankChipIndex(x, y, width, height, margin) {
    var iy = inverseOpera(blankChip.y, blankChip.height, __jigsaw.chipMargin),
        ix = inverseOpera(blankChip.x, blankChip.width, __jigsaw.chipMargin);
    return iy * __jigsaw.colspan + ix;
}

//切割图片分成Chip碎片对象保存进入Jigsaw对象中
function cropImg(img, width, height, chipWidth, chipHeight) {
    var _width = width,
        sx = 0,
        sy = 0,
        chip = null,
        index = 0,
        i, j,
        rowspan = 0,
        chips = [];
    for (i = 0; (height -= chipHeight) >= 0; i++) {
        rowspan++;
        for (j = 0; (width -= chipWidth) >= 0; j++) {

            sx = j * chipWidth;
            sy = i * chipHeight;

            chip = new Chip(index++, sx, sy, chipWidth, chipHeight, chipWidth, chipHeight);
            chips.push(chip);
        }
        width = _width;
    }
    return {
            chips : chips,
            rowspan : rowspan,
            colspan : parseInt(chips.length / rowspan)
        };
}
module.exports = {
    init: function(convas, ctx, jigsaw) {
        jigsaw.fill( cropImg(jigsaw.img, jigsaw.width(), jigsaw.height(), jigsaw.chipWidth, jigsaw.chipHeight) );  //把一张图分割成一组Chip数据
        bindContext(ctx);
        bindCanvas(convas);
        bindJigsaw(jigsaw);
        eventListener(convas);
        //创建可交换碎片，并与最后一张图片进行替换
        blankChip = createBlankChip(vanishedChip = jigsaw.pop());   
        jigsaw.push(blankChip);
        //绘制碎片，将返回的图形对象数据根据绘制的顺序进行排序
        sortObjectArray(jigsaw.redraw(ctx));
    }
};

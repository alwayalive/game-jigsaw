/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var game = __webpack_require__(2);
	var Jigsaw = __webpack_require__(8);
	var Chip = __webpack_require__(3);
	var pos = __webpack_require__(5);

	var canvas = document.querySelector("canvas"),
	    ctx = canvas.getContext("2d"),

	// perWidht = 300,
	// perHeight = 300,
	jigsaw = null;

	loadImage('6b8c14f8gw1eyeugdb018j20xc0p0n2p.jpg', function (e) {

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Chip = __webpack_require__(3);
	var BlankChip = __webpack_require__(6);
	var pos = __webpack_require__(5);

	var sortedGraphicsObjectArray;
	var totalStep = 0;
	var totalTime = 0;
	var blankChip = null;
	var blankChipIndex = 0;
	var vanishedChip = null;
	var __convas = null;
	var __ctx = null;
	var __jigsaw = null;

	function winner() {
		alert("闯关成功！");
		var chips = __jigsaw.getChips();
		chips.pop(blankChip);
		chips.push(vanishedChip);
	}
	//移动空块
	function move(chip1, chip2) {
		var tmp,
		    chips = __jigsaw.getChips(),
		    colspan = __jigsaw.getColspan(),
		    len = chips.length,
		    leftIndex = blankChipIndex - 1,
		    //空白块的左边块索引
		rightIndex = blankChipIndex + 1,
		    //空白块的右边块索引
		topIndex = blankChipIndex - colspan,
		    //空白块的上边块索引
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
		var target = e.target || e.srcElement,
		    mouse = pos.offset(target, e),
		    hit,
		    i;
		for (i = 0; i < sortedGraphicsObjectArray.length; i++) {
			hit = sortedGraphicsObjectArray[i].handleClick(mouse);
			if (hit) break;
		}
		if (hit) {
			blankChipIndex = getBlankChipIndex();
			move(blankChip, hit.data);
			redrawBoard();
			sortObjectArray(__jigsaw.draw(__ctx));
			if (__jigsaw.orderable) winner();
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
		sortedGraphicsObjectArray = graphicsObjectArray.sort(function (gameObject1, gameObject2) {
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
	function getBlankChipIndex() {
		var iy = inverseOpera(blankChip.y, blankChip.height, blankChip.margin),
		    ix = inverseOpera(blankChip.x, blankChip.width, blankChip.margin);
		return iy * __jigsaw.getColspan() + ix;
	}

	//切割图片分成Chip碎片对象保存进入Jigsaw对象中
	function cropImg(jigsaw) {
		var width = jigsaw.width,
		    _width = width;
		height = jigsaw.height, sx = 0, sy = 0, chip = null, index = 0, i, j;

		for (i = 0; (height -= jigsaw.chipHeight) >= 0; i++) {
			for (j = 0; (width -= jigsaw.chipWidth) >= 0; j++) {

				sx = j * perWidht;
				sy = i * perHeight;

				chip = new Chip(index++, sx, sy, perWidht, perHeight, perWidht, perHeight);
				// chip.draw( ctx, img , j * ( perWidht + 1 ) , i * ( perHeight + 1 ) );
				jigsaw.push(chip, j === 0);
				// ctx.drawImage( e.target , sx , sy , perWidht , perHeight , j * (perWidht+1) ,i * (perHeight+1) ,perWidht , perHeight);
			}
			width = _width;
		}
	}
	module.exports = {
		init: function (convas, ctx, jigsaw) {
			bindContext(ctx);
			bindCanvas(convas);
			bindJigsaw(jigsaw);
			cropImg(jigsaw);
			eventListener(convas);
			blankChip = createBlankChip(vanishedChip = jigsaw.pop());
			jigsaw.push(blankChip);
			sortObjectArray(jigsaw.redraw(ctx));
		}
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var GraphicsObject = __webpack_require__(4);

	function Chip(i, sx, sy, swidth, sheight, width, height, margin) {
		if (i instanceof Chip) {
			Object.assign(this, i);
			return this;
		}
		this.__i = i;
		this.sx = sx;
		this.sy = sy;
		this.swidth = swidth;
		this.sheight = sheight;
		this.width = width;
		this.height = height;
		this.margin = margin || 1;
	}

	Chip.prototype.draw = function (ctx, img, x, y) {
		this.x = x;
		this.y = y;
		ctx.drawImage(img, this.sx, this.sy, this.swidth, this.sheight, x, y, this.width, this.height);
		return new GraphicsObject(this);
	};

	module.exports = Chip;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var pos = __webpack_require__(5);
	var _zIndex = 1;

	function GraphicsObject(obj) {
		// this.minX = x;
		// this.maxX = x + width;
		// this.minY = y;
		// this.maxY = y + height;
		if (!obj.x && !obj.y && !obj.width && obj.height) {
			throw new Error('GraphicsObject initial is error!!');
		}
		this.x = obj.x;
		this.y = obj.y;
		this.width = obj.width;
		this.height = obj.height;
		this.zIndex = _zIndex = obj.zIndex || ++_zIndex;
		this.data = obj;
		// mouse parameter holds the mouse coordinates
		// this.handleClick = function(mouse) {

		//     // perform hit test between bounding box
		//     // and mouse coordinates

		//     if (this.x < mouse.x &&
		//         this.x + this.width > mouse.x &&
		//         this.y < mouse.y &&
		//         this.y + this.height > mouse.y) {

		//         // hit test succeeded, handle the click event!
		//         return true;
		//     }

		//     // hit test did not succeed
		//     return false;
		// }
	}

	GraphicsObject.prototype.handleClick = function (mouse) {

		// perform hit test between bounding box
		// and mouse coordinates

		if (this.x < mouse.x && this.x + this.width > mouse.x && this.y < mouse.y && this.y + this.height > mouse.y) {

			// hit test succeeded, handle the click event!
			return this;
		}

		// hit test did not succeed
		return false;
	};

	module.exports = GraphicsObject;

/***/ },
/* 5 */
/***/ function(module, exports) {

	function offset(target, e) {
		var x = parseInt(e.pageX - target.offsetLeft);
		var y = parseInt(e.pageY - target.offsetTop);
		return {
			x,
			y
		};
	}
	function screen(target, e) {
		var x = parseInt(e.pageX - target.screenLeft);
		var y = parseInt(e.pageY - target.screenTop);
		return {
			x,
			y
		};
	}
	module.exports = {
		offset,
		screen
	};

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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Chip = __webpack_require__(3);
	var clazz = __webpack_require__(7);
	var GraphicsObject = __webpack_require__(4);

	function BlankChip(i, sx, sy, swidth, sheight, width, height, margin) {
		Chip.apply(this, arguments);
	}
	clazz.inherit(Chip, BlankChip);

	BlankChip.prototype.draw = function (ctx, img, x, y) {
		this.x = x;
		this.y = y;
		ctx.fillStyle = "brown";
		ctx.fillRect(x, y, this.width, this.height);
		ctx.restore();
		return new GraphicsObject(this);
	};

	module.exports = BlankChip;

/***/ },
/* 7 */
/***/ function(module, exports) {

	var clazz = {};

	clazz.inherit = function (sup, sub) {
		var prototype = sup.prototype;
		sub.prototype = Object.create(prototype);
		sub.prototype.constructor = sup;
	};

	clazz.singleton = function (fn) {
		var result;
		return function () {
			return retult || (result = fn.apply(undefined, arguments));
		};
	};

	module.exports = clazz;

/***/ },
/* 8 */
/***/ function(module, exports) {

	function Jigsaw(img, width, height) {
		this.__chips = [];
		this.__img = img;
		this.__rowspan = 0;
		this.chipWidth = width;
		this.chipHeight = height;
		this.orderable = true;
	}

	Jigsaw.prototype = {
		draw: function (ctx) {
			var colspan = this.getColspan(),
			    graphicsObjectArray = [],
			    _i = 0,
			    _j = 0,
			    x = 0,
			    y = 0,
			    chip = null,
			    flag = true;

			for (var i = 0; i < this.__chips.length; i++) {

				if ((_i = parseInt(i % colspan)) === 0 && i != 0) _j++;
				chip = this.__chips[i];
				x = _i * (chip.width + chip.margin);
				y = _j * (chip.height + chip.margin);
				if (i > 0 && flag && (flag = this.__chips[i].__i > this.__chips[i - 1].__i)) ;
				graphicsObjectArray.push(chip.draw(ctx, this.__img, x, y));
			}
			this.orderable = flag;
			return graphicsObjectArray;
		},
		getChips: function () {
			return this.__chips;
		},
		push: function (chip, flag) {
			this.__chips.push(chip);
			if (flag) this.__rowspan++;
		},
		pop: function (chip, flag) {
			return this.__chips.pop();
		},
		getColspan: function () {
			if (this.__chips.length === 0) return 0;
			return this.__chips.length / this.__rowspan;
		},
		getRowspan: function () {
			return this.__rowspan;
		},
		width: function () {
			return this.__img.width;
		},
		height: function () {
			return this.__img.height;
		},
		redraw: function (ctx) {
			random(this.__chips);
			return this.draw(ctx);
		}
	};

	/**
	 *	洗牌（把一个数组顺序打乱）
	 */
	function random(arr) {
		var len = arr.length,
		    tmp,
		    i,
		    j;
		for (i = 0; i < len; i++) {
			j = parseInt(Math.random() * len);
			tmp = arr[i];
			arr[i] = arr[j];
			arr[j] = tmp;
		}
	}
	module.exports = Jigsaw;

/***/ }
/******/ ]);
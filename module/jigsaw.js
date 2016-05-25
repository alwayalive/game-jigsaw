function Jigsaw(img, width, height) {
    this.__chips = [];
    this.__img = img;
    this.rowspan = 0;
    this.colspan = 0;
    this.chipWidth = width;
    this.chipHeight = height;
    this.orderable = true;
}

Jigsaw.prototype = {
    draw: function(ctx) {
        var colspan = this.colspan,
            graphicsObjectArray = [],
            _i = 0,
            _j = 0,
            x = 0,
            y = 0,
            chip = null,
            flag = true;

        for (var i = 0; i < this.__chips.length; i++) {

            if ((_i = parseInt(i % colspan)) === 0 && i != 0)
                _j++;
            chip = this.__chips[i];
            x = _i * (chip.width + chip.margin);
            y = _j * (chip.height + chip.margin);
            if (i > 0 && flag && (flag = this.__chips[i].__i > this.__chips[i - 1].__i));
            graphicsObjectArray.push(chip.draw(ctx, this.__img, x, y));
        }
        this.orderable = flag;
        return graphicsObjectArray;
    },
    getChips: function() {
        return this.__chips;
    },
    pop: function(chip) {
        return this.__chips.pop();
    },
    push: function(chip) {
        return this.__chips.push(chip);
    },
    // getColspan: function() {
    //     // if (this.__chips.length === 0)
    //     //     return 0;
    //     // return this.__chips.length / this.rowspan;
    //     return this.colspan;
    // },
    // getRowspan: function() {
    //     return this.rowspan;
    // },
    width: function() {
        return this.__img.width;
    },
    height: function() {
        return this.__img.height;
    },
    redraw: function(ctx) {
        random(this.__chips);
        return this.draw(ctx);
    },
    fill: function( fillDate ){
        this.__chips = fillDate.chips;
        this.rowspan = fillDate.rowspan;
        this.colspan = fillDate.colspan;
    }
}

/**
 *	洗牌（把一个数组顺序打乱）
 */
function random(arr) {
    var len = arr.length,
        tmp,
        i, j;
    for (i = 0; i < len; i++) {
        j = parseInt(Math.random() * len);
        tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
}
module.exports = Jigsaw;

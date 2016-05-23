var Chip = require("./chip");
var clazz = require("./clazz");
var GraphicsObject = require("./graphics_object");

function BlankChip(i, sx, sy, swidth, sheight, width, height, margin) {
    Chip.apply(this, arguments);
}
clazz.inherit(Chip, BlankChip);

BlankChip.prototype.draw = function(ctx, img, x, y) {
    this.x = x;
    this.y = y;
    ctx.fillStyle = "brown";
    ctx.fillRect(x, y, this.width, this.height);
    ctx.restore();
    return new GraphicsObject(this);
}

module.exports = BlankChip;

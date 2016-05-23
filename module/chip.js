var GraphicsObject = require("./graphics_object");

function Chip( i, sx, sy, swidth, sheight, width, height , margin ){
	if( i instanceof Chip ){
		Object.assign( this, i);
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

Chip.prototype.draw = function( ctx , img , x , y ){
	this.x = x;
	this.y = y;
	ctx.drawImage( img , this.sx , this.sy , this.swidth , this.sheight , x ,y ,this.width , this.height);
	return new GraphicsObject( this );
};

module.exports = Chip;
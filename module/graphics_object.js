var pos = require("./position");
var _zIndex = 1;

function GraphicsObject(obj) {
    if (!obj.x && !obj.y && !obj.width && obj.height) {
        throw new Error('GraphicsObject initial is error!!');
    }
    this.x = obj.x;
    this.y = obj.y;
    this.width = obj.width;
    this.height = obj.height;
    this.zIndex = _zIndex = obj.zIndex || ++_zIndex;
    this.data = obj;
}

GraphicsObject.prototype.handleClick = function(mouse) {

    // perform hit test between bounding box 
    // and mouse coordinates 

    if (this.x < mouse.x &&
        this.x + this.width > mouse.x &&
        this.y < mouse.y &&
        this.y + this.height > mouse.y) {

        // hit test succeeded, handle the click event! 
        return this;
    }

    // hit test did not succeed 
    return false;
};

module.exports = GraphicsObject;

var clazz = {};

clazz.inherit = function(sup, sub) {
    var prototype = sup.prototype;
    sub.prototype = Object.create(prototype);
    sub.prototype.constructor = sup;
}

clazz.singleton = function(fn) {
    var result;
    return function() {
        return retult || (result = fn.apply(undefined, arguments));
    }
}

module.exports = clazz;

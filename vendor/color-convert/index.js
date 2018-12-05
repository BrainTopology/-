function n(n) {
    var o = function(o) {
        return void 0 === o || null === o ? o : (arguments.length > 1 && (o = Array.prototype.slice.call(arguments)), 
        n(o));
    };
    return "conversion" in n && (o.conversion = n.conversion), o;
}

function o(n) {
    var o = function(o) {
        if (void 0 === o || null === o) return o;
        arguments.length > 1 && (o = Array.prototype.slice.call(arguments));
        var r = n(o);
        if ("object" === (void 0 === r ? "undefined" : e(r))) for (var t = r.length, c = 0; c < t; c++) r[c] = Math.round(r[c]);
        return r;
    };
    return "conversion" in n && (o.conversion = n.conversion), o;
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
    return typeof n;
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
}, r = require("./conversions"), t = require("./route"), c = {};

Object.keys(r).forEach(function(e) {
    c[e] = {}, Object.defineProperty(c[e], "channels", {
        value: r[e].channels
    }), Object.defineProperty(c[e], "labels", {
        value: r[e].labels
    });
    var i = t(e);
    Object.keys(i).forEach(function(r) {
        var t = i[r];
        c[e][r] = o(t), c[e][r].raw = n(t);
    });
}), module.exports = c;
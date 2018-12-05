var r = require("../color-convert/index");

module.exports = function(t) {
    var e, c, a, n;
    if (e = /^((?:rgb|hs[lv]|cmyk|xyz|lab)a?)\s*\(([^\)]*)\)/.exec(t)) {
        var o = e[1], s = "cmyk" === (i = o.replace(/a$/, "")) ? 4 : 3;
        c = r[i], a = e[2].replace(/^\s+|\s+$/g, "").split(/\s*,\s*/).map(function(r, t) {
            return /%$/.test(r) && t === s ? parseFloat(r) / 100 : (/%$/.test(r), parseFloat(r));
        }), o === i && a.push(1), n = void 0 === a[s] ? 1 : a[s], a = a.slice(0, s), c[i] = function() {
            return a;
        };
    } else if (/^#[A-Fa-f0-9]+$/.test(t)) {
        var i = t.replace(/^#/, ""), s = i.length;
        c = r.rgb, a = i.split(3 === s ? /(.)/ : /(..)/), a = a.filter(Boolean).map(function(r) {
            return 3 === s ? parseInt(r + r, 16) : parseInt(r, 16);
        }), n = 1, c.rgb = function() {
            return a;
        }, a[0] || (a[0] = 0), a[1] || (a[1] = 0), a[2] || (a[2] = 0);
    } else (c = r.keyword).keyword = function() {
        return t;
    }, a = t, n = 1;
    var l = {
        rgb: void 0,
        hsl: void 0,
        hsv: void 0,
        cmyk: void 0,
        keyword: void 0,
        hex: void 0
    };
    try {
        l.rgb = c.rgb(a);
    } catch (t) {}
    try {
        l.hsl = c.hsl(a);
    } catch (t) {}
    try {
        l.hsv = c.hsv(a);
    } catch (t) {}
    try {
        l.cmyk = c.cmyk(a);
    } catch (t) {}
    try {
        l.keyword = c.keyword(a);
    } catch (t) {}
    return l.rgb && (l.hex = "#" + l.rgb.map(function(r) {
        var t = r.toString(16);
        return 1 === t.length ? "0" + t : t;
    }).join("")), l.rgb && (l.rgba = l.rgb.concat(n)), l.hsl && (l.hsla = l.hsl.concat(n)), 
    l.hsv && (l.hsva = l.hsv.concat(n)), l.cmyk && (l.cmyka = l.cmyk.concat(n)), l;
};
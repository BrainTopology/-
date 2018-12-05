function n() {
    for (var n = {}, r = Object.keys(a), t = r.length, e = 0; e < t; e++) n[r[e]] = {
        distance: -1,
        parent: null
    };
    return n;
}

function r(r) {
    var t = n(), e = [ r ];
    for (t[r].distance = 0; e.length; ) for (var u = e.pop(), o = Object.keys(a[u]), c = o.length, i = 0; i < c; i++) {
        var s = o[i], f = t[s];
        -1 === f.distance && (f.distance = t[u].distance + 1, f.parent = u, e.unshift(s));
    }
    return t;
}

function t(n, r) {
    return function(t) {
        return r(n(t));
    };
}

function e(n, r) {
    for (var e = [ r[n].parent, n ], u = a[r[n].parent][n], o = r[n].parent; r[o].parent; ) e.unshift(r[o].parent), 
    u = t(a[r[o].parent][o], u), o = r[o].parent;
    return u.conversion = e, u;
}

var a = require("./conversions");

module.exports = function(n) {
    for (var t = r(n), a = {}, u = Object.keys(t), o = u.length, c = 0; c < o; c++) {
        var i = u[c];
        null !== t[i].parent && (a[i] = e(i, t));
    }
    return a;
};
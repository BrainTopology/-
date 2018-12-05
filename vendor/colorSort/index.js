function r(r) {
    if (Array.isArray(r)) {
        for (var t = 0, n = Array(r.length); t < r.length; t++) n[t] = r[t];
        return n;
    }
    return Array.from(r);
}

function t(r, t, n) {
    var e = Math.max(r, t, n), o = Math.min(r, t, n), a = (e + o) / 2, u = void 0, v = void 0;
    if (e === o) u = 0, v = 0; else {
        var i = e - o;
        switch (v = a > .5 ? i / (2 - e - o) : i / (e + o), e) {
          case r:
            u = (t - n) / i + (t < n ? 6 : 0);
            break;

          case t:
            u = (n - r) / i + 2;
            break;

          case n:
            u = (r - t) / i + 4;
        }
        u /= 6;
    }
    return new Array(360 * u, 360 * v, 360 * a);
}

function n() {
    var r = arguments[0] / 255, t = arguments[1] / 255, n = arguments[2] / 255, e = Math.max(r, t, n), o = e - Math.min(r, t, n), a = function(r) {
        return (e - r) / 6 / o + .5;
    }, u = void 0, v = void 0, i = void 0, f = void 0, h = void 0;
    return 0 === o ? (u = 0, v = 0) : (v = o / e, i = a(r), h = a(t), f = a(n), r === e ? u = f - h : t === e ? u = 1 / 3 + i - f : n === e && (u = 2 / 3 + h - i), 
    u < 0 ? u += 1 : u > 1 && (u -= 1)), [ Math.round(360 * u), Math.round(360 * v), Math.round(360 * e) ];
}

function e(r, n) {
    var e = r, o = n, a = 0;
    e = t(e[0], e[1], e[2]), o = t(o[0], o[1], o[2]);
    for (var u = 0; u < 3; u++) a += (e[u] - o[u]) * (e[u] - o[u]) * v[u];
    return Math.floor(e[0] / 30) !== Math.floor(o[0] / 30) ? 0 : a;
}

function o(r, t) {
    for (var n = r, e = t, o = 0, a = 0; a < 3; a++) o += (n[a] - e[a]) * (n[a] - e[a]) * i[a];
    return o;
}

function a(r, t) {
    var a = r, v = t, i = 0;
    i += o(a, v), i += e(a, v), a = n(a[0], a[1], a[2]), v = n(v[0], v[1], v[2]);
    for (var f = 0; f < 3; f++) i += (a[f] - v[f]) * (a[f] - v[f]) * u[f];
    return i;
}

var u = [ .9, 0, .01 ], v = [ .3, 0, 0 ], i = [ .5, .2, .1 ];

module.exports = {
    sortColors: function(t) {
        for (var n = [], e = 0; e < t.length; e++) {
            n[e] = [];
            for (var o = 0; o < e; o++) n.push([ t[e], t[o], a(t[e], t[o]) ]);
        }
        n.sort(function(r, t) {
            return r[2] - t[2];
        });
        for (var u = {}, v = 0; v < t.length; v++) u[t[v]] = [ t[v] ];
        for (var i = void 0, f = 0; f < n.length; f++) {
            var h = n[f][0], s = n[f][1], l = u[h], c = u[s];
            l && c && l !== c && (h !== l[l.length - 1] && l.reverse(), s !== c[0] && c.reverse(), 
            l.push.apply(l, r(c)), delete u[h], delete u[s], u[l[0]] = l, u[l[l.length - 1]] = l, 
            i = l);
        }
        return i;
    }
};
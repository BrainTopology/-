function r(r, n, o) {
    return (r << 2 * c) + (n << c) + o;
}

function n(r) {
    function n() {
        o.sort(r), t = !0;
    }
    var o = [], t = !1;
    return {
        push: function(r) {
            o.push(r), t = !1;
        },
        peek: function(r) {
            return t || n(), void 0 === r && (r = o.length - 1), o[r];
        },
        pop: function() {
            return t || n(), o.pop();
        },
        size: function() {
            return o.length;
        },
        map: function(r) {
            return o.map(r);
        },
        debug: function() {
            return t || n(), o;
        }
    };
}

function o(r, n, o, t, u, e, i) {
    var c = this;
    c.r1 = r, c.r2 = n, c.g1 = o, c.g2 = t, c.b1 = u, c.b2 = e, c.histo = i;
}

function t() {
    this.vboxes = new n(function(r, n) {
        return v.naturalOrder(r.vbox.count() * r.vbox.volume(), n.vbox.count() * n.vbox.volume());
    });
}

function u(n) {
    var o, t, u, e, i = 1 << 3 * c, a = new Array(i);
    return n.forEach(function(n) {
        t = n[0] >> f, u = n[1] >> f, e = n[2] >> f, o = r(t, u, e), a[o] = (a[o] || 0) + 1;
    }), a;
}

function e(r, n) {
    var t, u, e, i = 1e6, c = 0, a = 1e6, s = 0, v = 1e6, l = 0;
    return r.forEach(function(r) {
        t = r[0] >> f, u = r[1] >> f, e = r[2] >> f, t < i ? i = t : t > c && (c = t), u < a ? a = u : u > s && (s = u), 
        e < v ? v = e : e > l && (l = e);
    }), new o(i, c, a, s, v, l, n);
}

function i(n, o) {
    if (o.count()) {
        var t = o.r2 - o.r1 + 1, u = o.g2 - o.g1 + 1, e = o.b2 - o.b1 + 1, i = v.max([ t, u, e ]);
        if (1 == o.count()) return [ o.copy() ];
        var c, f, a, s, l = 0, p = [], h = [];
        if (i == t) for (c = o.r1; c <= o.r2; c++) {
            for (s = 0, f = o.g1; f <= o.g2; f++) for (a = o.b1; a <= o.b2; a++) s += n[r(c, f, a)] || 0;
            l += s, p[c] = l;
        } else if (i == u) for (c = o.g1; c <= o.g2; c++) {
            for (s = 0, f = o.r1; f <= o.r2; f++) for (a = o.b1; a <= o.b2; a++) s += n[r(f, c, a)] || 0;
            l += s, p[c] = l;
        } else for (c = o.b1; c <= o.b2; c++) {
            for (s = 0, f = o.r1; f <= o.r2; f++) for (a = o.g1; a <= o.g2; a++) s += n[r(f, a, c)] || 0;
            l += s, p[c] = l;
        }
        return p.forEach(function(r, n) {
            h[n] = l - r;
        }), function(r) {
            var n, t, u, e, i, f = r + "1", a = r + "2", s = 0;
            for (c = o[f]; c <= o[a]; c++) if (p[c] > l / 2) {
                for (u = o.copy(), e = o.copy(), i = (n = c - o[f]) <= (t = o[a] - c) ? Math.min(o[a] - 1, ~~(c + t / 2)) : Math.max(o[f], ~~(c - 1 - n / 2)); !p[i]; ) i++;
                for (s = h[i]; !s && p[i - 1]; ) s = h[--i];
                return u[a] = i, e[f] = u[a] + 1, [ u, e ];
            }
        }(i == t ? "r" : i == u ? "g" : "b");
    }
}

var c = 5, f = 8 - c, a = 1e3, s = .75, v = {
    map: function(r, n) {
        var o = {};
        return n ? r.map(function(r, t) {
            return o.index = t, n.call(o, r);
        }) : r.slice();
    },
    naturalOrder: function(r, n) {
        return r < n ? -1 : r > n ? 1 : 0;
    },
    sum: function(r, n) {
        var o = {};
        return r.reduce(n ? function(r, t, u) {
            return o.index = u, r + n.call(o, t);
        } : function(r, n) {
            return r + n;
        }, 0);
    },
    max: function(r, n) {
        return Math.max.apply(null, n ? v.map(r, n) : r);
    }
};

o.prototype = {
    volume: function(r) {
        var n = this;
        return n._volume && !r || (n._volume = (n.r2 - n.r1 + 1) * (n.g2 - n.g1 + 1) * (n.b2 - n.b1 + 1)), 
        n._volume;
    },
    count: function(n) {
        var o = this, t = o.histo;
        if (!o._count_set || n) {
            var u, e, i, c = 0;
            for (u = o.r1; u <= o.r2; u++) for (e = o.g1; e <= o.g2; e++) for (i = o.b1; i <= o.b2; i++) c += t[r(u, e, i)] || 0;
            o._count = c, o._count_set = !0;
        }
        return o._count;
    },
    copy: function() {
        var r = this;
        return new o(r.r1, r.r2, r.g1, r.g2, r.b1, r.b2, r.histo);
    },
    avg: function(n) {
        var o = this, t = o.histo;
        if (!o._avg || n) {
            var u, e, i, f, a = 0, s = 1 << 8 - c, v = 0, l = 0, p = 0;
            for (e = o.r1; e <= o.r2; e++) for (i = o.g1; i <= o.g2; i++) for (f = o.b1; f <= o.b2; f++) a += u = t[r(e, i, f)] || 0, 
            v += u * (e + .5) * s, l += u * (i + .5) * s, p += u * (f + .5) * s;
            o._avg = a ? [ ~~(v / a), ~~(l / a), ~~(p / a) ] : [ ~~(s * (o.r1 + o.r2 + 1) / 2), ~~(s * (o.g1 + o.g2 + 1) / 2), ~~(s * (o.b1 + o.b2 + 1) / 2) ];
        }
        return o._avg;
    },
    contains: function(r) {
        var n = this, o = r[0] >> f;
        return gval = r[1] >> f, bval = r[2] >> f, o >= n.r1 && o <= n.r2 && gval >= n.g1 && gval <= n.g2 && bval >= n.b1 && bval <= n.b2;
    }
}, t.prototype = {
    push: function(r) {
        this.vboxes.push({
            vbox: r,
            color: r.avg()
        });
    },
    palette: function() {
        return this.vboxes.map(function(r) {
            return r.color;
        });
    },
    size: function() {
        return this.vboxes.size();
    },
    map: function(r) {
        for (var n = this.vboxes, o = 0; o < n.size(); o++) if (n.peek(o).vbox.contains(r)) return n.peek(o).color;
        return this.nearest(r);
    },
    nearest: function(r) {
        for (var n, o, t, u = this.vboxes, e = 0; e < u.size(); e++) ((o = Math.sqrt(Math.pow(r[0] - u.peek(e).color[0], 2) + Math.pow(r[1] - u.peek(e).color[1], 2) + Math.pow(r[2] - u.peek(e).color[2], 2))) < n || void 0 === n) && (n = o, 
        t = u.peek(e).color);
        return t;
    },
    forcebw: function() {
        var r = this.vboxes;
        r.sort(function(r, n) {
            return v.naturalOrder(v.sum(r.color), v.sum(n.color));
        });
        var n = r[0].color;
        n[0] < 5 && n[1] < 5 && n[2] < 5 && (r[0].color = [ 0, 0, 0 ]);
        var o = r.length - 1, t = r[o].color;
        t[0] > 251 && t[1] > 251 && t[2] > 251 && (r[o].color = [ 255, 255, 255 ]);
    }
}, module.exports = {
    quantize: function(r, o) {
        function c(r, n) {
            for (var o, t = 1, u = 0; u < a; ) if ((o = r.pop()).count()) {
                var e = i(f, o), c = e[0], s = e[1];
                if (!c) return;
                if (r.push(c), s && (r.push(s), t++), t >= n) return;
                if (u++ > a) return;
            } else r.push(o), u++;
        }
        if (!r.length || o < 2 || o > 256) return !1;
        var f = u(r), l = 0;
        f.forEach(function() {
            l++;
        });
        var p = e(r, f), h = new n(function(r, n) {
            return v.naturalOrder(r.count(), n.count());
        });
        h.push(p), c(h, s * o);
        for (var b = new n(function(r, n) {
            return v.naturalOrder(r.count() * r.volume(), n.count() * n.volume());
        }); h.size(); ) b.push(h.pop());
        c(b, o - b.size());
        for (var g = new t(); b.size(); ) g.push(b.pop());
        return g;
    }
};
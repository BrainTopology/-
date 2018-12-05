function r(r, n) {
    return Math.pow(r[0] - n[0], 2) + Math.pow(r[1] - n[1], 2) + Math.pow(r[2] - n[2], 2);
}

var n = require("../color-name/index"), a = {};

for (var t in n) n.hasOwnProperty(t) && (a[n[t]] = t);

var e = module.exports = {
    rgb: {
        channels: 3,
        labels: "rgb"
    },
    hsl: {
        channels: 3,
        labels: "hsl"
    },
    hsv: {
        channels: 3,
        labels: "hsv"
    },
    hwb: {
        channels: 3,
        labels: "hwb"
    },
    cmyk: {
        channels: 4,
        labels: "cmyk"
    },
    xyz: {
        channels: 3,
        labels: "xyz"
    },
    lab: {
        channels: 3,
        labels: "lab"
    },
    lch: {
        channels: 3,
        labels: "lch"
    },
    hex: {
        channels: 1,
        labels: [ "hex" ]
    },
    keyword: {
        channels: 1,
        labels: [ "keyword" ]
    },
    ansi16: {
        channels: 1,
        labels: [ "ansi16" ]
    },
    ansi256: {
        channels: 1,
        labels: [ "ansi256" ]
    },
    hcg: {
        channels: 3,
        labels: [ "h", "c", "g" ]
    },
    apple: {
        channels: 3,
        labels: [ "r16", "g16", "b16" ]
    },
    gray: {
        channels: 1,
        labels: [ "gray" ]
    }
};

for (var h in e) if (e.hasOwnProperty(h)) {
    if (!("channels" in e[h])) throw new Error("missing channels property: " + h);
    if (!("labels" in e[h])) throw new Error("missing channel labels property: " + h);
    if (e[h].labels.length !== e[h].channels) throw new Error("channel and label counts mismatch: " + h);
    var u = e[h].channels, o = e[h].labels;
    delete e[h].channels, delete e[h].labels, Object.defineProperty(e[h], "channels", {
        value: u
    }), Object.defineProperty(e[h], "labels", {
        value: o
    });
}

e.rgb.hsl = function(r) {
    var n, a, t, e = r[0] / 255, h = r[1] / 255, u = r[2] / 255, o = Math.min(e, h, u), s = Math.max(e, h, u), c = s - o;
    return s === o ? n = 0 : e === s ? n = (h - u) / c : h === s ? n = 2 + (u - e) / c : u === s && (n = 4 + (e - h) / c), 
    (n = Math.min(60 * n, 360)) < 0 && (n += 360), t = (o + s) / 2, a = s === o ? 0 : t <= .5 ? c / (s + o) : c / (2 - s - o), 
    [ n, 100 * a, 100 * t ];
}, e.rgb.hsv = function(r) {
    var n, a, t, e = r[0], h = r[1], u = r[2], o = Math.min(e, h, u), s = Math.max(e, h, u), c = s - o;
    return a = 0 === s ? 0 : c / s * 1e3 / 10, s === o ? n = 0 : e === s ? n = (h - u) / c : h === s ? n = 2 + (u - e) / c : u === s && (n = 4 + (e - h) / c), 
    (n = Math.min(60 * n, 360)) < 0 && (n += 360), t = s / 255 * 1e3 / 10, [ n, a, t ];
}, e.rgb.hwb = function(r) {
    var n = r[0], a = r[1], t = r[2], h = e.rgb.hsl(r)[0], u = 1 / 255 * Math.min(n, Math.min(a, t));
    return t = 1 - 1 / 255 * Math.max(n, Math.max(a, t)), [ h, 100 * u, 100 * t ];
}, e.rgb.cmyk = function(r) {
    var n, a, t, e, h = r[0] / 255, u = r[1] / 255, o = r[2] / 255;
    return e = Math.min(1 - h, 1 - u, 1 - o), n = (1 - h - e) / (1 - e) || 0, a = (1 - u - e) / (1 - e) || 0, 
    t = (1 - o - e) / (1 - e) || 0, [ 100 * n, 100 * a, 100 * t, 100 * e ];
}, e.rgb.keyword = function(t) {
    var e = a[t];
    if (e) return e;
    var h, u = 1 / 0;
    for (var o in n) if (n.hasOwnProperty(o)) {
        var s = r(t, n[o]);
        s < u && (u = s, h = o);
    }
    return h;
}, e.keyword.rgb = function(r) {
    return n[r];
}, e.rgb.xyz = function(r) {
    var n = r[0] / 255, a = r[1] / 255, t = r[2] / 255;
    return [ 100 * (.4124 * (n = n > .04045 ? Math.pow((n + .055) / 1.055, 2.4) : n / 12.92) + .3576 * (a = a > .04045 ? Math.pow((a + .055) / 1.055, 2.4) : a / 12.92) + .1805 * (t = t > .04045 ? Math.pow((t + .055) / 1.055, 2.4) : t / 12.92)), 100 * (.2126 * n + .7152 * a + .0722 * t), 100 * (.0193 * n + .1192 * a + .9505 * t) ];
}, e.rgb.lab = function(r) {
    var n, a, t, h = e.rgb.xyz(r), u = h[0], o = h[1], s = h[2];
    return u /= 95.047, o /= 100, s /= 108.883, u = u > .008856 ? Math.pow(u, 1 / 3) : 7.787 * u + 16 / 116, 
    o = o > .008856 ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116, s = s > .008856 ? Math.pow(s, 1 / 3) : 7.787 * s + 16 / 116, 
    n = 116 * o - 16, a = 500 * (u - o), t = 200 * (o - s), [ n, a, t ];
}, e.hsl.rgb = function(r) {
    var n, a, t, e, h, u = r[0] / 360, o = r[1] / 100, s = r[2] / 100;
    if (0 === o) return h = 255 * s, [ h, h, h ];
    n = 2 * s - (a = s < .5 ? s * (1 + o) : s + o - s * o), e = [ 0, 0, 0 ];
    for (var c = 0; c < 3; c++) (t = u + 1 / 3 * -(c - 1)) < 0 && t++, t > 1 && t--, 
    h = 6 * t < 1 ? n + 6 * (a - n) * t : 2 * t < 1 ? a : 3 * t < 2 ? n + (a - n) * (2 / 3 - t) * 6 : n, 
    e[c] = 255 * h;
    return e;
}, e.hsl.hsv = function(r) {
    var n, a, t = r[0], e = r[1] / 100, h = r[2] / 100, u = e, o = Math.max(h, .01);
    return h *= 2, e *= h <= 1 ? h : 2 - h, u *= o <= 1 ? o : 2 - o, a = (h + e) / 2, 
    n = 0 === h ? 2 * u / (o + u) : 2 * e / (h + e), [ t, 100 * n, 100 * a ];
}, e.hsv.rgb = function(r) {
    var n = r[0] / 60, a = r[1] / 100, t = r[2] / 100, e = Math.floor(n) % 6, h = n - Math.floor(n), u = 255 * t * (1 - a), o = 255 * t * (1 - a * h), s = 255 * t * (1 - a * (1 - h));
    switch (t *= 255, e) {
      case 0:
        return [ t, s, u ];

      case 1:
        return [ o, t, u ];

      case 2:
        return [ u, t, s ];

      case 3:
        return [ u, o, t ];

      case 4:
        return [ s, u, t ];

      case 5:
        return [ t, u, o ];
    }
}, e.hsv.hsl = function(r) {
    var n, a, t, e = r[0], h = r[1] / 100, u = r[2] / 100, o = Math.max(u, .01);
    return t = (2 - h) * u, n = (2 - h) * o, a = h * o, a /= n <= 1 ? n : 2 - n, a = a || 0, 
    t /= 2, [ e,100*a,100*t];
}, e.hwb.rgb = function(r) {
    var n, a, t, e, h = r[0] / 360, u = r[1] / 100, o = r[2] / 100, s = u + o;
    s > 1 && (u /= s, o /= s), a = 1 - o, t = 6 * h - (n = Math.floor(6 * h)), 0 != (1 & n) && (t = 1 - t), 
    e = u + t * (a - u);
    var c, l, i;
    switch (n) {
      default:
      case 6:
      case 0:
        c = a, l = e, i = u;
        break;

      case 1:
        c = e, l = a, i = u;
        break;

      case 2:
        c = u, l = a, i = e;
        break;

      case 3:
        c = u, l = e, i = a;
        break;

      case 4:
        c = e, l = u, i = a;
        break;

      case 5:
        c = a, l = u, i = e;
    }
    return [ 255 * c, 255 * l, 255 * i ];
}, e.cmyk.rgb = function(r) {
    var n, a, t, e = r[0] / 100, h = r[1] / 100, u = r[2] / 100, o = r[3] / 100;
    return n = 1 - Math.min(1, e * (1 - o) + o), a = 1 - Math.min(1, h * (1 - o) + o), 
    t = 1 - Math.min(1, u * (1 - o) + o), [ 255 * n, 255 * a, 255 * t ];
}, e.xyz.rgb = function(r) {
    var n, a, t, e = r[0] / 100, h = r[1] / 100, u = r[2] / 100;
    return n = 3.2406 * e + -1.5372 * h + -.4986 * u, a = -.9689 * e + 1.8758 * h + .0415 * u, 
    t = .0557 * e + -.204 * h + 1.057 * u, n = n > .0031308 ? 1.055 * Math.pow(n, 1 / 2.4) - .055 : 12.92 * n, 
    a = a > .0031308 ? 1.055 * Math.pow(a, 1 / 2.4) - .055 : 12.92 * a, t = t > .0031308 ? 1.055 * Math.pow(t, 1 / 2.4) - .055 : 12.92 * t, 
    n = Math.min(Math.max(0, n), 1), a = Math.min(Math.max(0, a), 1), t = Math.min(Math.max(0, t), 1), 
    [ 255 * n, 255 * a, 255 * t ];
}, e.xyz.lab = function(r) {
    var n, a, t, e = r[0], h = r[1], u = r[2];
    return e /= 95.047, h /= 100, u /= 108.883, e = e > .008856 ? Math.pow(e, 1 / 3) : 7.787 * e + 16 / 116, 
    h = h > .008856 ? Math.pow(h, 1 / 3) : 7.787 * h + 16 / 116, u = u > .008856 ? Math.pow(u, 1 / 3) : 7.787 * u + 16 / 116, 
    n = 116 * h - 16, a = 500 * (e - h), t = 200 * (h - u), [ n, a, t ];
}, e.lab.xyz = function(r) {
    var n, a, t, e = r[0];
    n = r[1] / 500 + (a = (e + 16) / 116), t = a - r[2] / 200;
    var h = Math.pow(a, 3), u = Math.pow(n, 3), o = Math.pow(t, 3);
    return a = h > .008856 ? h : (a - 16 / 116) / 7.787, n = u > .008856 ? u : (n - 16 / 116) / 7.787, 
    t = o > .008856 ? o : (t - 16 / 116) / 7.787, n *= 95.047, a *= 100, t *= 108.883, 
    [ n, a, t ];
}, e.lab.lch = function(r) {
    var n, a, t, e = r[0], h = r[1], u = r[2];
    return n = Math.atan2(u, h), (a = 360 * n / 2 / Math.PI) < 0 && (a += 360), t = Math.sqrt(h * h + u * u), 
    [ e, t, a ];
}, e.lch.lab = function(r) {
    var n, a, t, e = r[0], h = r[1];
    return t = r[2] / 360 * 2 * Math.PI, n = h * Math.cos(t), a = h * Math.sin(t), [ e, n, a ];
}, e.rgb.ansi16 = function(r) {
    var n = r[0], a = r[1], t = r[2], h = 1 in arguments ? arguments[1] : e.rgb.hsv(r)[2];
    if (0 === (h = Math.round(h / 50))) return 30;
    var u = 30 + (Math.round(t / 255) << 2 | Math.round(a / 255) << 1 | Math.round(n / 255));
    return 2 === h && (u += 60), u;
}, e.hsv.ansi16 = function(r) {
    return e.rgb.ansi16(e.hsv.rgb(r), r[2]);
}, e.rgb.ansi256 = function(r) {
    var n = r[0], a = r[1], t = r[2];
    return n === a && a === t ? n < 8 ? 16 : n > 248 ? 231 : Math.round((n - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(n / 255 * 5) + 6 * Math.round(a / 255 * 5) + Math.round(t / 255 * 5);
}, e.ansi16.rgb = function(r) {
    var n = r % 10;
    if (0 === n || 7 === n) return r > 50 && (n += 3.5), n = n / 10.5 * 255, [ n, n, n ];
    var a = .5 * (1 + ~~(r > 50));
    return [ (1 & n) * a * 255, (n >> 1 & 1) * a * 255, (n >> 2 & 1) * a * 255 ];
}, e.ansi256.rgb = function(r) {
    if (r >= 232) {
        var n = 10 * (r - 232) + 8;
        return [ n, n, n ];
    }
    r -= 16;
    var a;
    return [ Math.floor(r / 36) / 5 * 255, Math.floor((a = r % 36) / 6) / 5 * 255, a % 6 / 5 * 255 ];
}, e.rgb.hex = function(r) {
    var n = (((255 & Math.round(r[0])) << 16) + ((255 & Math.round(r[1])) << 8) + (255 & Math.round(r[2]))).toString(16).toUpperCase();
    return "000000".substring(n.length) + n;
}, e.hex.rgb = function(r) {
    var n = r.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!n) return [ 0, 0, 0 ];
    var a = n[0];
    3 === n[0].length && (a = a.split("").map(function(r) {
        return r + r;
    }).join(""));
    var t = parseInt(a, 16);
    return [ t >> 16 & 255, t >> 8 & 255, 255 & t ];
}, e.rgb.hcg = function(r) {
    var n, a, t = r[0] / 255, e = r[1] / 255, h = r[2] / 255, u = Math.max(Math.max(t, e), h), o = Math.min(Math.min(t, e), h), s = u - o;
    return n = s < 1 ? o / (1 - s) : 0, a = s <= 0 ? 0 : u === t ? (e - h) / s % 6 : u === e ? 2 + (h - t) / s : 4 + (t - e) / s + 4, 
    a /= 6, a %= 1, [ 360 * a, 100 * s, 100 * n ];
}, e.hsl.hcg = function(r) {
    var n = r[1] / 100, a = r[2] / 100, t = 1, e = 0;
    return (t = a < .5 ? 2 * n * a : 2 * n * (1 - a)) < 1 && (e = (a - .5 * t) / (1 - t)), 
    [ r[0], 100 * t, 100 * e ];
}, e.hsv.hcg = function(r) {
    var n = r[1] / 100, a = r[2] / 100, t = n * a, e = 0;
    return t < 1 && (e = (a - t) / (1 - t)), [ r[0], 100 * t, 100 * e ];
}, e.hcg.rgb = function(r) {
    var n = r[0] / 360, a = r[1] / 100, t = r[2] / 100;
    if (0 === a) return [ 255 * t, 255 * t, 255 * t ];
    var e = [ 0, 0, 0 ], h = n % 1 * 6, u = h % 1, o = 1 - u, s = 0;
    switch (Math.floor(h)) {
      case 0:
        e[0] = 1, e[1] = u, e[2] = 0;
        break;

      case 1:
        e[0] = o, e[1] = 1, e[2] = 0;
        break;

      case 2:
        e[0] = 0, e[1] = 1, e[2] = u;
        break;

      case 3:
        e[0] = 0, e[1] = o, e[2] = 1;
        break;

      case 4:
        e[0] = u, e[1] = 0, e[2] = 1;
        break;

      default:
        e[0] = 1, e[1] = 0, e[2] = o;
    }
    return s = (1 - a) * t, [ 255 * (a * e[0] + s), 255 * (a * e[1] + s), 255 * (a * e[2] + s) ];
}, e.hcg.hsv = function(r) {
    var n = r[1] / 100, a = n + r[2] / 100 * (1 - n), t = 0;
    return a > 0 && (t = n / a), [ r[0], 100 * t, 100 * a ];
}, e.hcg.hsl = function(r) {
    var n = r[1] / 100, a = r[2] / 100 * (1 - n) + .5 * n, t = 0;
    return a > 0 && a < .5 ? t = n / (2 * a) : a >= .5 && a < 1 && (t = n / (2 * (1 - a))), 
    [ r[0], 100 * t, 100 * a ];
}, e.hcg.hwb = function(r) {
    var n = r[1] / 100, a = n + r[2] / 100 * (1 - n);
    return [ r[0], 100 * (a - n), 100 * (1 - a) ];
}, e.hwb.hcg = function(r) {
    var n = r[1] / 100, a = 1 - r[2] / 100, t = a - n, e = 0;
    return t < 1 && (e = (a - t) / (1 - t)), [ r[0], 100 * t, 100 * e ];
}, e.apple.rgb = function(r) {
    return [ r[0] / 65535 * 255, r[1] / 65535 * 255, r[2] / 65535 * 255 ];
}, e.rgb.apple = function(r) {
    return [ r[0] / 255 * 65535, r[1] / 255 * 65535, r[2] / 255 * 65535 ];
}, e.gray.rgb = function(r) {
    return [ r[0] / 100 * 255, r[0] / 100 * 255, r[0] / 100 * 255 ];
}, e.gray.hsl = e.gray.hsv = function(r) {
    return [ 0, 0, r[0] ];
}, e.gray.hwb = function(r) {
    return [ 0, 100, r[0] ];
}, e.gray.cmyk = function(r) {
    return [ 0, 0, 0, r[0] ];
}, e.gray.lab = function(r) {
    return [ r[0], 0, 0 ];
}, e.gray.hex = function(r) {
    var n = 255 & Math.round(r[0] / 100 * 255), a = ((n << 16) + (n << 8) + n).toString(16).toUpperCase();
    return "000000".substring(a.length) + a;
}, e.rgb.gray = function(r) {
    return [ (r[0] + r[1] + r[2]) / 3 / 255 * 100 ];
};
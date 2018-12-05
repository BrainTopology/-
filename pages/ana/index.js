var t = function() {
    function t(t, e) {
        var i = [], a = !0, r = !1, n = void 0;
        try {
            for (var o, s = t[Symbol.iterator](); !(a = (o = s.next()).done) && (i.push(o.value), 
            !e || i.length !== e); a = !0) ;
        } catch (t) {
            r = !0, n = t;
        } finally {
            try {
                !a && s.return && s.return();
            } finally {
                if (r) throw n;
            }
        }
        return i;
    }
    return function(e, i) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (t[a] = i[a]);
    }
    return t;
}, i = require("../../utils/util"), a = i.chunk, r = i.deepCopy, n = require("../../utils/saveImg").savePicToAlbum, o = require("../../utils/MMCQ").quantize, s = require("../../vendor/parse-color/index"), h = null, c = !1, l = 0, u = {
    startX: 0,
    startY: 0,
    initWidth: 0,
    initHeight: 0
}, d = {
    dx: 0,
    dy: 0,
    scale: 1
}, g = [], f = 0;

Page({
    data: {
        tempFilePaths: "",
        sysInfo: {},
        color: {
            rgba: "",
            main: "",
            hsl: "",
            hex: ""
        },
        palette: null,
        colorSelected: "",
        width: 0,
        height: 0,
        showSaveBtn: !1,
        showColorDetail: !1,
        realHeight: 0,
        realWidth: 0,
        computedBorder: "",
        imgChanged: !1
    },
    touchStartPoint: {
        x: 0,
        y: 0
    },
    roam: e({}, d),
    currState: e({}, u),
    onLoad: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                e.screenWidth -= 10, t.setData({
                    sysInfo: e
                }), t.init();
            }
        });
    },
    init: function() {
        var t = this, e = "/assets/images/picker/ana-ex.png";
        wx.getImageInfo({
            src: e,
            success: function(i) {
                var a = i.width, n = i.height, o = {
                    tempFilePaths: e,
                    width: a,
                    height: n,
                    realWidth: a,
                    realHeight: n,
                    showSaveBtn: !1
                };
                t.currState = u, t.roam = d, t.setData(o, function() {
                    t.initCanvas(r(o));
                });
            }
        });
    },
    chooseImage: function() {
        var t = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original" ],
            sourceType: [ "album", "camera" ],
            success: function(i) {
                var a = i.tempFilePaths[0];
                wx.getImageInfo({
                    src: a,
                    success: function(i) {
                        var n = i.width, o = i.height, s = {
                            tempFilePaths: a,
                            width: n,
                            height: o,
                            realWidth: n,
                            realHeight: o,
                            showSaveBtn: !1,
                            imgChanged: !0
                        };
                        t.setData(s, function() {
                            t.currState = e({}, u), t.roam = e({}, d), t.initCanvas(r(s));
                        });
                    }
                });
            }
        });
    },
    saveImage: function() {
        wx.showLoading({
            title: "处理中"
        });
        var t = this.data;
        t.tempFilePaths, t.sysInfo.screenWidth, t.realHeight, t.realWidth;
        wx.canvasToTempFilePath({
            canvasId: "imgCanvas",
            success: function(t) {
                wx.hideLoading(), n(t.tempFilePath);
            }
        });
    },
    initCanvas: function(t) {
        var e = this, i = t.tempFilePaths, a = t.width, n = t.height;
        c = !0, wx.showLoading({
            title: "本地计算中"
        }), setTimeout(function() {
            l ? e.queryFailed() : c && (l++, e.initCanvas(r({
                tempFilePaths: i,
                width: a,
                height: n
            })));
        }, 5e3);
        var o = this.getInitSize({
            width: a,
            height: n
        }), s = o.initHeight, h = o.initWidth, u = this.getStartPoint({
            initHeight: s,
            initWidth: h
        });
        u.startX, u.startY;
        this.currState = {
            startX: 0,
            startY: 0,
            initWidth: h,
            initHeight: s
        }, this.setData({
            height: s,
            width: h
        }, function() {
            e.drawImage();
        });
    },
    drawImage: function() {
        var t = this, e = this.currState, i = e.startX, a = e.startY, r = e.initWidth, n = e.initHeight, o = this.data, s = o.tempFilePaths, c = (o.sysInfo.screenWidth, 
        this.roam);
        c.dx, c.dy, c.scale;
        (h = wx.createCanvasContext("imgCanvas")).drawImage(s, i, a, r, n), h.draw(), setTimeout(function() {
            g = [], t.queryCenterColor({
                x: i,
                y: a,
                width: r,
                height: n
            });
        }, 5);
    },
    toggleColorDetail: function() {
        var t = this.data.showColorDetail;
        this.setData({
            showColorDetail: !t
        });
    },
    queryCenterColor: function(t) {
        var e = this, i = t.x, r = t.y, n = t.width, o = t.height;
        wx.canvasGetImageData({
            canvasId: "imgCanvas",
            x: i,
            y: r,
            width: 100,
            height: 100,
            success: function(t) {
                var s = a(t.data, 4);
                0 == (s = s.filter(function(t) {
                    return t[3] >= 125;
                })).length && 0 == g.length ? setTimeout(function() {
                    e.queryCenterColor({
                        x: i,
                        y: r,
                        width: n,
                        height: o
                    });
                }, 5) : (g = g.concat(s), i > n && r > o ? e.computeMainColor(g) : i > n ? (i = 0, 
                r += 100, setTimeout(function() {
                    e.queryCenterColor({
                        x: i,
                        y: r,
                        width: n,
                        height: o
                    });
                }, 5)) : (i += 100, setTimeout(function() {
                    e.queryCenterColor({
                        x: i,
                        y: r,
                        width: n,
                        height: o
                    });
                }, 5)));
            }
        });
    },
    drawPaletteOnCanvas: function(t) {
        var e = this, i = t.palette, a = this.currState, r = a.startX, n = a.startY, o = a.initWidth, s = a.initHeight, c = this.data, l = c.tempFilePaths, u = c.sysInfo.screenWidth, d = this.roam;
        d.dx, d.dy, d.scale;
        i = i.slice(0, 6), (h = wx.createCanvasContext("imgCanvas")).setFillStyle("rgb(255,255,255)"), 
        h.fillRect(r, n, 2 * o, 2 * s), h.drawImage(l, r, n, o, s);
        var g = i.length;
        if (s > o && u - o > 100 + s / g * .1) {
            var m = s / g, v = .95 * (m - (f = .1 * m) / 2);
            i.forEach(function(t, e) {
                e < g - 1 && (h.setFillStyle("rgb(" + t + ")"), h.fillRect(o + f, e * m, 200, m));
            }), i.forEach(function(t, e) {
                e < g - 1 && (h.setFillStyle("rgb(255,255,255)"), h.fillRect(o + f / 2, (e + 1) * m - f / 2, 200, f));
            }), i.forEach(function(t, e) {
                e == g - 1 && h.drawImage("/assets/images/picker/qrcode.jpg", o + f + 50 - v / 2, e * m + f / 2, v, v);
            }), this.setData({
                width: o + f + 100,
                height: s
            });
        } else {
            var w = o / g, p = .95 * (w - (f = .1 * w) / 2);
            i.forEach(function(t, e) {
                e < g - 1 && (h.setFillStyle("rgb(" + t + ")"), h.fillRect(e * w, s + f, w, 200));
            }), i.forEach(function(t, e) {
                e < g - 1 && (h.setFillStyle("rgb(255,255,255)"), h.fillRect((e + 1) * w - f / 2, s + f / 2, f, 200));
            }), i.forEach(function(t, e) {
                e < g - 1 || h.drawImage("/assets/images/picker/qrcode.jpg", e * w + f / 2, s + f + 50 - p / 2, p, p);
            }), this.setData({
                width: o,
                height: s + f + 100
            });
        }
        h.draw(), setTimeout(function() {
            e.data.imgChanged && e.uploadPalette(i);
        }, 500);
    },
    uploadPalette: function(t) {
        wx.cloud && wx.cloud.callFunction({
            name: "uploadPalette",
            data: {
                palette: t
            },
            success: function(t) {},
            fail: console.error
        });
    },
    computeMainColor: function(t) {
        var e = o(t, 10);
        if (e) {
            var i = e.palette().map(function(t) {
                return t.join(",");
            });
            this.setData({
                palette: i
            });
            var a = i[4], r = "rgb(" + a + ")", n = s(r);
            this.drawPaletteOnCanvas({
                palette: i
            }), this.setData({
                colorSelected: i[4],
                computedBorder: this.computeBorder(a),
                color: {
                    main: r,
                    rgba: r,
                    hex: n.hex,
                    hsl: n.hsl.join(",")
                },
                showSaveBtn: !0
            }, function(t) {
                wx.hideLoading(), c = !1, l = 0;
            });
        } else this.queryFailed();
    },
    queryFailed: function() {
        wx.hideLoading(), wx.showToast({
            title: "处理失败，图像太大？",
            icon: "none",
            duration: 2e3
        }), c = !1, l = 0;
    },
    queryMain: function(t) {
        var e = t.currentTarget.dataset.color, i = "rgb(" + e + ")", a = s(i);
        this.setData({
            colorSelected: e,
            computedBorder: this.computeBorder(e),
            color: {
                main: i,
                rgba: i,
                hex: a.hex,
                hsl: a.hsl.join(",")
            }
        });
    },
    setClipboard: function(t) {
        var e = t.currentTarget.dataset.type, i = this.data.color[e];
        "rgba" == e ? i = "rgba(" + i + ")" : "hsl" == e && (i = "hsl(" + i + ")"), wx.setClipboardData({
            data: i,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        wx.showToast({
                            title: "色值已复制",
                            icon: "success",
                            duration: 1e3
                        });
                    }
                });
            }
        });
    },
    computeBorder: function(t) {
        return t.split(",").map(function(t) {
            return 255 - +t;
        }).join(",");
    },
    drawPalette: function(t) {
        var e = t.colorData, i = this.data.sysInfo.platform;
        h = wx.createCanvasContext("palette");
        var a = Math.sqrt(e.length), r = 10, n = e[Math.floor(e.length / 2)];
        this.getCenterColorInfo(n), e.forEach(function(t, e) {
            t[3] = (t[3] / 255).toFixed(2), h.setFillStyle("rgba(" + t.join(",") + ")"), ~i.toLowerCase().indexOf("ios") ? h.fillRect(e % a * r, (a - Math.floor(e / a)) * r, r, r) : h.fillRect(e % a * r, Math.floor(e / a) * r, r, r);
        }), h.setStrokeStyle("red");
        var o = Math.floor(a / 2) * r;
        h.strokeRect(o, o, 10, 10), h.draw();
    },
    getCenterColorInfo: function(e) {
        var i = t(e, 4), a = "rgba(" + i[0] + ", " + i[1] + ", " + i[2] + ", " + i[3] / 255 + ")", r = s(a);
        this.setData({
            color: {
                main: a,
                rgba: "" + e.join(","),
                hex: r.hex,
                hsl: r.hsl.join(",")
            }
        });
    },
    checkPoint: function(t) {
        var e = t.startX, i = t.startY, a = t.initWidth, r = void 0 === a ? this.currState.initWidth : a, n = t.initHeight, o = void 0 === n ? this.currState.initHeight : n, s = this.getCenter();
        return !(e > s) && (!(i > s) && (!(e + r < s) && !(i + o < s)));
    },
    fixPoint: function(t) {
        var e = t.startX, i = t.startY, a = t.initWidth, r = void 0 === a ? this.currState.initWidth : a, n = t.initHeight, o = void 0 === n ? this.currState.initHeight : n, s = this.getCenter();
        return e > s && (e = s), i > s && (i = s), e + r < s && (e = s - r), i + o < s && (i = s - o), 
        {
            startX: e,
            startY: i,
            initWidth: r,
            initHeight: o
        };
    },
    getCenter: function() {
        return this.data.sysInfo.screenWidth / 2;
    },
    getInitSize: function(t) {
        var e = t.width, i = t.height, a = this.data.sysInfo.screenWidth, r = 0, n = 0;
        return e > i ? n = (r = Math.min(a, e)) * i / e : r = (n = Math.min(a, i)) * e / i, 
        {
            initHeight: n,
            initWidth: r
        };
    },
    getStartPoint: function(t) {
        var e = t.initHeight, i = t.initWidth, a = this.data.sysInfo.screenWidth;
        return {
            startX: a / 2 - i / 2,
            startY: (a - e) / 2
        };
    },
    onShareAppMessage: function(t) {
        return {
            title: "图片拾色",
            path: "/pages/index/index"
        };
    },
    start: function(t) {
        var e = t.touches[0], i = e.x, a = e.y;
        this.touchStartPoint = {
            x: i,
            y: a
        };
    },
    move: function(t) {
        var i = t.touches[0], a = i.x, r = i.y, n = a - this.touchStartPoint.x, o = r - this.touchStartPoint.y;
        this.roam = e({}, this.roam, {
            dx: n,
            dy: o
        }), this.drawImage();
    },
    end: function(t) {
        var i = this.currState, a = i.startX, r = i.startY, n = i.initWidth, o = i.initHeight, s = this.roam;
        s.dx, s.dy, s.scale;
        this.currState = this.fixPoint({
            startX: a,
            startY: r,
            initWidth: n,
            initHeight: o
        }), this.roam = e({}, this.roam, {
            dx: 0,
            dy: 0
        }), this.drawImage();
    }
});
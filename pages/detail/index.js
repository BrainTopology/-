var t = function() {
    function t(t, e) {
        var a = [], i = !0, n = !1, r = void 0;
        try {
            for (var o, s = t[Symbol.iterator](); !(i = (o = s.next()).done) && (a.push(o.value), 
            !e || a.length !== e); i = !0) ;
        } catch (t) {
            n = !0, r = t;
        } finally {
            try {
                !i && s.return && s.return();
            } finally {
                if (n) throw r;
            }
        }
        return a;
    }
    return function(e, a) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, a);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i]);
    }
    return t;
}, a = require("../../utils/util"), i = (a.chunk, a.deepCopy, require("../../utils/saveImg").savePicToAlbum), n = require("../../utils/MMCQ").quantize, r = require("../../vendor/parse-color/index"), o = require("../../vendor/contrastColor/index"), s = null, l = !1, h = 0, c = {
    startX: 0,
    startY: 0,
    initWidth: 0,
    initHeight: 0
}, d = {
    dx: 0,
    dy: 0,
    scale: 1
};

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
    currState: e({}, c),
    onLoad: function(t) {
        var e = this, a = getApp().gd.currPalette;
        a ? wx.getSystemInfo({
            success: function(t) {
                t.screenWidth -= 10, e.setData({
                    sysInfo: t,
                    palette: a
                }), e.initCanvas({
                    palette: a
                });
            }
        }) : wx.navigateTo({
            url: "/pages/square/index"
        });
    },
    saveImage: function() {
        var t = this;
        wx.showLoading({
            title: "处理中"
        });
        var e = this.data;
        e.tempFilePaths, e.sysInfo.screenWidth, e.realHeight, e.realWidth;
        wx.canvasToTempFilePath({
            canvasId: "imgCanvas",
            success: function(e) {
                wx.hideLoading(), i(e.tempFilePath), t.addPaletteDownloadCount();
            }
        });
    },
    initCanvas: function(t) {
        var e = this, a = t.palette;
        l = !0, wx.showLoading({
            title: "本地计算中"
        }), setTimeout(function() {
            h ? e.queryFailed() : l && (h++, e.initCanvas({}));
        }, 5e3), this.drawPaletteOnCanvas({
            palette: a.palette
        });
    },
    toggleColorDetail: function() {
        var t = this.data.showColorDetail;
        this.setData({
            showColorDetail: !t
        });
    },
    drawPaletteOnCanvas: function(t) {
        var e = this, a = t.palette, i = this.data.sysInfo.screenWidth;
        (s = wx.createCanvasContext("imgCanvas")).setFillStyle("rgb(255,255,255)"), s.fillRect(0, 0, i, i);
        a.length;
        var n = .95, c = i * (1 - n) / 2, d = i * (1 - n) / 2, u = i * n * .75 * .9 / 3, f = i * n * .75 * .05, g = i * n * .045, v = i * n * .955 / 2, p = i * n * .18, w = .1 * v;
        s.setFontSize(w), s.setTextBaseline("top"), a.forEach(function(t, e) {
            var a = "rgb(" + t + ")", i = t.split(",");
            s.setFillStyle(a);
            var n = d + (e % 2 == 1 ? v + g : 0), l = c + Math.floor(e / 2) * (u + f);
            s.fillRect(n, l, v, u), s.setFillStyle(o({
                r: i[0],
                g: i[1],
                b: i[2]
            }));
            var h = r(a);
            s.fillText(h.hex, n + .5 * w, l + .5 * w);
        }), s.drawImage("/assets/images/picker/qrcode.jpg", i / 2 - p / 2, i - c - p, p, p), 
        this.setData({
            width: i,
            height: i,
            showSaveBtn: !0
        }), s.draw(), wx.hideLoading(), l = !1, h = 0, setTimeout(function() {
            e.addPaletteViewCount();
        }, 500);
    },
    addPaletteViewCount: function() {
        wx.cloud && this.data.palette && wx.cloud.callFunction({
            name: "addPaletteViewCount",
            data: {
                id: this.data.palette._id
            },
            success: function(t) {},
            fail: console.error
        });
    },
    addPaletteDownloadCount: function() {
        wx.cloud && this.data.palette && wx.cloud.callFunction({
            name: "addPaletteDownloadCount",
            data: {
                id: this.data.palette._id
            },
            success: function(t) {},
            fail: console.error
        });
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
        var e = n(t, 10);
        if (e) {
            var a = e.palette().map(function(t) {
                return t.join(",");
            });
            this.setData({
                palette: a
            });
            var i = a[4], o = "rgb(" + i + ")", s = r(o);
            this.drawPaletteOnCanvas({
                palette: a
            }), this.setData({
                colorSelected: a[4],
                computedBorder: this.computeComplementaryColor(i),
                color: {
                    main: o,
                    rgba: o,
                    hex: s.hex,
                    hsl: s.hsl.join(",")
                },
                showSaveBtn: !0
            }, function(t) {
                wx.hideLoading(), l = !1, h = 0;
            });
        } else this.queryFailed();
    },
    queryFailed: function() {
        wx.hideLoading(), wx.showToast({
            title: "处理失败，图像太大？",
            icon: "none",
            duration: 2e3
        }), l = !1, h = 0;
    },
    queryMain: function(t) {
        var e = t.currentTarget.dataset.color, a = "rgb(" + e + ")", i = r(a);
        this.setData({
            colorSelected: e,
            computedBorder: this.computeComplementaryColor(e),
            color: {
                main: a,
                rgba: a,
                hex: i.hex,
                hsl: i.hsl.join(",")
            }
        });
    },
    setClipboard: function(t) {
        var e = t.currentTarget.dataset.type, a = this.data.color[e];
        "rgba" == e ? a = "rgba(" + a + ")" : "hsl" == e && (a ="hsl("+ a +")" ), wx.setClipboardData({
            data: a,
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
    computeComplementaryColor: function(t) {
        return t.split(",").map(function(t) {
            return 255 - +t;
        }).join(",");
    },
    drawPalette: function(t) {
        var e = t.colorData, a = this.data.sysInfo.platform;
        s = wx.createCanvasContext("palette");
        var i = Math.sqrt(e.length), n = 10, r = e[Math.floor(e.length / 2)];
        this.getCenterColorInfo(r), e.forEach(function(t, e) {
            t[3] = (t[3] / 255).toFixed(2), s.setFillStyle("rgba(" + t.join(",") + ")"), ~a.toLowerCase().indexOf("ios") ? s.fillRect(e % i * n, (i - Math.floor(e / i)) * n, n, n) : s.fillRect(e % i * n, Math.floor(e / i) * n, n, n);
        }), s.setStrokeStyle("red");
        var o = Math.floor(i / 2) * n;
        s.strokeRect(o, o, 10, 10), s.draw();
    },
    getCenterColorInfo: function(e) {
        var a = t(e, 4), i = "rgba(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] / 255 + ")", n = r(i);
        this.setData({
            color: {
                main: i,
                rgba: "" + e.join(","),
                hex: n.hex,
                hsl: n.hsl.join(",")
            }
        });
    },
    checkPoint: function(t) {
        var e = t.startX, a = t.startY, i = t.initWidth, n = void 0 === i ? this.currState.initWidth : i, r = t.initHeight, o = void 0 === r ? this.currState.initHeight : r, s = this.getCenter();
        return !(e > s) && (!(a > s) && (!(e + n < s) && !(a + o < s)));
    },
    fixPoint: function(t) {
        var e = t.startX, a = t.startY, i = t.initWidth, n = void 0 === i ? this.currState.initWidth : i, r = t.initHeight, o = void 0 === r ? this.currState.initHeight : r, s = this.getCenter();
        return e > s && (e = s), a > s && (a = s), e + n < s && (e = s - n), a + o < s && (a = s - o), 
        {
            startX: e,
            startY: a,
            initWidth: n,
            initHeight: o
        };
    },
    getCenter: function() {
        return this.data.sysInfo.screenWidth / 2;
    },
    getInitSize: function(t) {
        var e = t.width, a = t.height, i = this.data.sysInfo.screenWidth, n = 0, r = 0;
        return e > a ? r = (n = Math.min(i, e)) * a / e : n = (r = Math.min(i, a)) * e / a, 
        {
            initHeight: r,
            initWidth: n
        };
    },
    getStartPoint: function(t) {
        var e = t.initHeight, a = t.initWidth, i = this.data.sysInfo.screenWidth;
        return {
            startX: i / 2 - a / 2,
            startY: (i - e) / 2
        };
    },
    onShareAppMessage: function(t) {
        return {
            title: "图片拾色",
            path: "/pages/index/index"
        };
    },
    start: function(t) {
        var e = t.touches[0], a = e.x, i = e.y;
        this.touchStartPoint = {
            x: a,
            y: i
        };
    },
    move: function(t) {
        var a = t.touches[0], i = a.x, n = a.y, r = i - this.touchStartPoint.x, o = n - this.touchStartPoint.y;
        this.roam = e({}, this.roam, {
            dx: r,
            dy: o
        }), this.drawImage();
    },
    end: function(t) {
        var a = this.currState, i = a.startX, n = a.startY, r = a.initWidth, o = a.initHeight, s = this.roam;
        s.dx, s.dy, s.scale;
        this.currState = this.fixPoint({
            startX: i,
            startY: n,
            initWidth: r,
            initHeight: o
        }), this.roam = e({}, this.roam, {
            dx: 0,
            dy: 0
        }), this.drawImage();
    }
});
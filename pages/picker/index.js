  var t = function() {
    function t(t, i) {
        var e = [], r = !0, a = !1, n = void 0;
        try {
            for (var o, s = t[Symbol.iterator](); !(r = (o = s.next()).done) && (e.push(o.value), 
            !i || e.length !== i); r = !0) ;
        } catch (t) {
            a = !0, n = t;
        } finally {
            try {
                !r && s.return && s.return();
            } finally {
                if (a) throw n;
            }
        }
        return e;
    }
    return function(i, e) {
        if (Array.isArray(i)) return i;
        if (Symbol.iterator in Object(i)) return t(i, e);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), i = require("../../utils/util"), e = i.chunk, r = i.throttle, a = require("../../vendor/parse-color/index"), n = null, o = null, s = null, h = {
    currX: 0,
    currY: 0,
    initWidth: 0,
    initHeight: 0
}, c = {
    dx: 0,
    dy: 0
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
        colorData: [],
        iPad: !1
    },
    touchStartPoint: {
        x: 0,
        y: 0
    },
    roam: c,
    currState: h,
    onLoad: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(i) {
                i.screenWidth -= 10, i.screenWidth % 2 == 1 && (i.screenWidth -= 1);
                var e = !1;
                i.model && -1 != i.model.indexOf("iPad") && (e = !0), t.setData({
                    sysInfo: i,
                    iPad: e
                }), t.init();
            }
        });
    },
    init: function() {
        var t = this, i = "/assets/images/picker/picker-ex.png";
        wx.getImageInfo({
            src: i,
            success: function(e) {
                var r = e.width, a = e.height, n = {
                    tempFilePaths: i,
                    width: r,
                    height: a
                };
                t.setData({
                    tempFilePaths: i,
                    width: r,
                    height: a
                }), t.currState = h, t.roam = c, t.initCanvas(n);
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
                var e = i.tempFilePaths[0];
                wx.getImageInfo({
                    src: e,
                    success: function(i) {
                        var r = i.width, a = i.height, n = {
                            tempFilePaths: e,
                            width: r,
                            height: a
                        };
                        t.setData({
                            tempFilePaths: e,
                            width: r,
                            height: a
                        }), t.currState = h, t.roam = c, t.initCanvas(n);
                    }
                });
            }
        });
    },
    initCanvas: function(t) {
        var i = this, e = (t.tempFilePaths, t.width), r = t.height, a = this.getInitSize({
            width: e,
            height: r
        }), n = a.initHeight, o = a.initWidth, s = this.getStartPoint({
            initHeight: n,
            initWidth: o
        }), h = s.currX, c = s.currY;
        this.currState = {
            currX: h,
            currY: c,
            initWidth: o,
            initHeight: n
        }, this.drawImage(), this.drawCross();
        for (var u = 2; u < 15; u += 2) setTimeout(function() {
            i.queryCenterColor();
        }, 100 * u);
    },
    drawCross: function() {
        o = wx.createCanvasContext("crossCanvas");
        var t = this.getCenter();
        o.beginPath(), o.moveTo(t, t - 50), o.lineTo(t, t + 50), o.moveTo(t - 50, t), o.lineTo(t + 50, t), 
        o.setStrokeStyle("#AAAAAA"), o.stroke(), o.draw();
    },
    drawImage: function() {
        var t = this, i = this.currState, e = i.currX, r = i.currY, a = i.initWidth, o = i.initHeight, s = this.data.tempFilePaths, h = this.roam, c = h.dx, u = h.dy;
        (n = wx.createCanvasContext("imgCanvas")).drawImage(s, e + c, r + u, a, o), n.draw(!1, function() {
            t.queryCenterColor();
        });
    },
    queryCenterColor: function() {
        var t = this, i = this.getCenter();
        wx.canvasGetImageData({
            canvasId: "imgCanvas",
            x: i - 4,
            y: i - 4,
            width: 9,
            height: 9,
            success: function(i) {
                var r = e(i.data, 4);
                t.setData({
                    colorData: r
                }), t.drawPalette({
                    colorData: r
                });
            }
        });
    },
    setClipboard: function(t) {
        var i = t.currentTarget.dataset.type, e = this.data.color[i];
        "rgba" == i ? e = "rgba(" + e + ")" : "hsl" == i && (e ), 
        wx.setClipboardData({
            data: e,
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
    drawPalette: function(t) {
        var i = t.colorData;
        this.data.sysInfo.platform;
        s = wx.createCanvasContext("palette");
        var e = Math.sqrt(i.length), r = i[Math.floor(i.length / 2)];
        this.getCenterColorInfo(r, function() {
            i.forEach(function(t, i) {
                t[3] = (t[3] / 255).toFixed(2), s.setFillStyle("rgba(" + t.join(",") + ")"), s.fillRect(i % e * 10, 10 * Math.floor(i / e), 10, 10);
            }), s.setStrokeStyle("red");
            var t = 10 * Math.floor(e / 2);
            s.strokeRect(t, t, 10, 10), s.draw();
        });
    },
    getCenterColorInfo: function(i, e) {
        var r = t(i, 4), n = "rgba(" + r[0] + ", " + r[1] + ", " + r[2] + ", " + r[3] / 255 + ")", o = a(n);
        this.setData({
            color: {
                main: n,
                rgba: "" + i.join(","),
                hex: o.hex.toUpperCase(),
                hsl: o.hsl.join(" ")
            }
        }, function() {
            e && e();
        });
    },
    fixPoint: function(t) {
        var i = t.currX, e = t.currY, r = t.initWidth, a = void 0 === r ? this.currState.initWidth : r, n = t.initHeight, o = void 0 === n ? this.currState.initHeight : n, s = !1, h = this.getCenter();
        i > h && (s = !0, i = h), e > h && (s = !0, e = h), i + a < h && (s = !0, i = h - a + 1), 
        e + o < h && (s = !0, e = h - o + 1), this.currState = {
            currX: i,
            currY: e,
            initWidth: a,
            initHeight: o
        }, this.roam = {
            dx: 0,
            dy: 0
        }, s && this.drawImage();
    },
    getCenter: function() {
        return this.data.sysInfo.screenWidth / 2;
    },
    getInitSize: function(t) {
        var i = t.width, e = t.height, r = this.data.sysInfo.screenWidth;
        return i > e ? Math.min(r, i) * e / i : Math.min(r, e) * i / e, {
            initHeight: e,
            initWidth: i
        };
    },
    getStartPoint: function(t) {
        var i = t.initHeight, e = t.initWidth, r = this.data.sysInfo.screenWidth;
        return {
            currX: r / 2 - e / 2,
            currY: (r - i) / 2
        };
    },
    start: function(t) {
        var i = t.touches[0], e = i.x, r = i.y;
        this.touchStartPoint = {
            x: e,
            y: r
        }, this.touching = !0;
    },
    move: r(function(t) {
        if (this.touching) {
            var i = t.touches[0], e = i.x, r = i.y, a = e - this.touchStartPoint.x, n = r - this.touchStartPoint.y;
            this.roam = {
                dx: a,
                dy: n
            }, this.drawImage();
        }
    }, 16),
    end: function(t) {
        this.touching = !1;
        var i = this.currState, e = i.currX, r = i.currY, a = i.initWidth, n = i.initHeight, o = this.roam, s = o.dx, h = o.dy;
        this.fixPoint({
            currX: e + s,
            currY: r + h,
            initWidth: a,
            initHeight: n
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "图片拾色取色",
            path: "/pages/index/index"
        };
    },
   toast: function () {
    wx.navigateTo({
      url: '../makeup/index'
    })
  },
});
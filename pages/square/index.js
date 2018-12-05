var t = require("../../vendor/colorSort/index").sortColors, e = require("../../vendor/date-fns/date_fns.min.js").format;

Page({
    data: {
        palettes: [],
        page: 0
    },
    onShareAppMessage: function(t) {
        return {
            title: "图片拾色取色",
            path: "/pages/index/index"
        };
    },
    onLoad: function() {
        this.getPalettes();
    },
    pushIfNotExist: function(t, e) {
        var a = [ "_id", "createTime" ];
        for (var n in e) !function(n) {
            var r = !1;
            for (var i in t) !function(i) {
                a.map(function(a) {
                    t[i][a] == e[n][a] && (r = !0);
                });
            }(i);
            r || t.push(e[n]);
        }(n);
        return t;
    },
    getPalettes: function() {
        var a = this, n = this.data, r = n.page, i = n.palettes;
        r > 20 || (wx.cloud ? wx.cloud.callFunction({
            name: "getAllPalette",
            data: {
                page: r,
                limit: 15
            },
            success: function(n) {
                if (n && n.result) {
                    var o = n.result.data.data;
                    if (0 == o.length) return void a.setData({
                        page: 1e6
                    });
                    o.length < 15 && (r = 1e6), o.map(function(a) {
                        a.palette = t(a.palette), a.createTime = e(new Date(a.createTime), "YYYY-MM-DD HH:mm:ss");
                    }), o = o.filter(function(t) {
                        return 6 == t.palette.length;
                    }), a.setData({
                        palettes: a.pushIfNotExist(i, o),
                        page: r + 1
                    });
                }
            },
            fail: console.error
        }) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        }));
    },
    goToDetail: function(t) {
        if (null != t.currentTarget.dataset.id) {
            var e = this.data.palettes[t.currentTarget.dataset.id];
            getApp().gd.currPalette = e, wx.navigateTo({
                url: "/pages/detail/index"
            });
        }
    },
    lower: function() {
        this.getPalettes();
    }
});
var n = require("./slice");

module.exports = {
    showBusy: function(n) {
        return wx.showToast({
            title: n,
            icon: "loading",
            duration: 1e4
        });
    },
    showSuccess: function(n) {
        return wx.showToast({
            title: n,
            icon: "success"
        });
    },
    showModel: function(n, t) {
        wx.hideToast(), wx.showModal({
            title: n,
            content: JSON.stringify(t),
            showCancel: !1
        });
    },
    chunk: function(t, e) {
        e = Math.max(e, 0);
        var r = null == t ? 0 : t.length;
        if (!r || e < 1) return [];
        for (var o = 0, i = 0, u = new Array(Math.ceil(r / e)); o < r; ) u[i++] = n(t, o, o += e);
        return u;
    },
    throttle: function(n, t, e) {
        var r, o, i, u = null, l = 0;
        e || (e = {});
        var a = function() {
            l = !1 === e.leading ? 0 : Date.now(), u = null, i = n.apply(r, o), u || (r = o = null);
        };
        return function() {
            var s = Date.now();
            l || !1 !== e.leading || (l = s);
            var c = t - (s - l);
            return r = this, o = arguments, c <= 0 || c > t ? (u && (clearTimeout(u), u = null), 
            l = s, i = n.apply(r, o), u || (r = o = null)) : u || !1 === e.trailing || (u = setTimeout(a, c)), 
            i;
        };
    },
    deepCopy: function(n) {
        return JSON.parse(JSON.stringify(n));
    }
};
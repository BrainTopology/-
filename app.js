require("./config"), require("./utils/util");

var u = {};

App({
    onLaunch: function() {
        u = this.gd, wx.cloud && wx.cloud.init({
            env: "color-prod-988457"
        });
    },
    gd: {
        userInfo: null,
        currPalette: null
    }
});
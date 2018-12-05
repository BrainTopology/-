module.exports = {
    savePicToAlbum: function(t) {
        wx.getSetting({
            success: function(o) {
                o.authSetting["scope.writePhotosAlbum"] ? wx.saveImageToPhotosAlbum({
                    filePath: t,
                    success: function(t) {
                        wx.showToast({
                            title: "保存成功"
                        });
                    },
                    fail: function(t) {}
                }) : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        wx.saveImageToPhotosAlbum({
                            filePath: t,
                            success: function(t) {
                                wx.showToast({
                                    title: "保存成功"
                                });
                            },
                            fail: function(t) {}
                        });
                    },
                    fail: function() {
                        wx.openSetting({
                            success: function(t) {},
                            fail: function(t) {}
                        });
                    }
                });
            },
            fail: function(t) {}
        });
    }
};
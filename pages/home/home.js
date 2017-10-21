var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [
      //{ url: "http://www.test.com/image/1111.jpg" },
      { url: "../../images/1.jpg" },
      { url: "../../images/2.jpg" },
      { url: "../../images/3.jpg" },
      { url: "../../images/4.jpg" }
    ],
    list:
    [
      { id: 0, name: "上映热播"}, 
      { id: 1, name: "即将上映"}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onItemClicked: function(res) {
    var id = res.currentTarget.dataset.id;
    console.log("index id: ", id);
  }
})
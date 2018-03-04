// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../images/rating_empty.png',
    selectedSrc: '../../images/rating_full.png',
    halfSrc: '../../images/rating_half.png',
    rating: 0,
    ratingMarginLeft: "",
    textLength: 0,
    buttonDisabled: true,
    comment: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let windowWidth = wx.getSystemInfoSync().windowWidth
      this.setData({
        ratingMarginLeft: (windowWidth - 5 * 50) / 2
      })
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

  selectLeft: function (e) {
    var rating = e.currentTarget.dataset.rating
    if (this.data.rating == 0.5 && e.currentTarget.dataset.rating == 0.5) {
      rating = 0;
    }
    this.setData({
      rating: rating
    })
  },

  selectRight: function (e) {
    var rating = e.currentTarget.dataset.rating
    this.setData({
      rating: rating
    })
  },

  textareaBindInput: function (e) {
    var length = e.detail.value.length;
    var disabled = length == 0 || this.data.regionsIndex == 0;
    this.setData({
      textLength: length,
      buttonDisabled: disabled
    })
  },

  bindFormSubmit: function (e) {
    var value = e.detail.value;
    console.log("test: ", value.comment)

    // wx.navigateBack({
    //   url: '../index/index',
    //   success: function (res) {
    //     // success
    //   },
    //   fail: function () {
    //     // fail
    //   },
    //   complete: function () {
    //     // complete
    //   }
    // })
  }
})
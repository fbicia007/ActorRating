var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviePosterWidth: 0,
    tabs: ['简介', '演员'],
    stv: {
      windowWidth: 0,
      windowHeight: 0,
      lineWidth: 0,
      offset: 0,
      tStart: false,
      pageHeight: 0
    },
    activeTab: 0,
    movie: "",
    actors: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var id = options.id
    var released = options.released
    var movies = ""

    if (released == 0) {
      movies = app.globalData.releasedMovies
    } else {
      movies = app.globalData.willReleaseMovies
    }

    for (var i = 0; i < movies.length; i++) {
      if (id == movies[i].id) {
        wx.setNavigationBarTitle({
          title: movies[i].title,
        })
        this.setData({
          movie: movies[i],
          actors: movies[i].actors
        })
      }
    }

    let { tabs } = this.data;
    var res = wx.getSystemInfoSync()
    this.windowWidth = res.windowWidth;
    this.data.stv.lineWidth = this.windowWidth / this.data.tabs.length
    this.data.stv.windowWidth = res.windowWidth
    this.data.stv.windowHeight = res.windowHeight
    this.setData({
      stv: this.data.stv,
      moviePosterWidth: res.windowWidth
    })
    this.tabsCount = tabs.length;
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

  loadMoviePoster: function (e) {
    var imageHeight = e.detail.height * ( this.data.moviePosterWidth / e.detail.width)
    let { stv } = this.data;
    stv.pageHeight = this.data.stv.windowHeight - imageHeight - 36
    this.setData({
      stv: this.data.stv
    })
  },

  handlerStart(e) {
    let { clientX, clientY } = e.touches[0];
    this.startX = clientX;
    this.tapStartX = clientX;
    this.tapStartY = clientY;
    this.data.stv.tStart = true;
    this.tapStartTime = e.timeStamp;
    this.setData({ stv: this.data.stv })
  },

  handlerMove(e) {
    let { clientX, clientY } = e.touches[0];
    let { stv } = this.data;
    let offsetX = this.startX - clientX;
    this.startX = clientX;
    stv.offset += offsetX;
    if (stv.offset <= 0) {
      stv.offset = 0;
    } else if (stv.offset >= stv.windowWidth * (this.tabsCount - 1)) {
      stv.offset = stv.windowWidth * (this.tabsCount - 1);
    }
    this.setData({ stv: stv });
  },

  handlerCancel(e) {

  },

  handlerEnd(e) {
    let { clientX, clientY } = e.changedTouches[0];
    let endTime = e.timeStamp;
    let { tabs, stv, activeTab } = this.data;
    let { offset, windowWidth } = stv;
    //快速滑动
    if (endTime - this.tapStartTime <= 300) {
      //向左
      if (Math.abs(this.tapStartY - clientY) < 50) {
        if (this.tapStartX - clientX > 5) {
          if (activeTab < this.tabsCount - 1) {
            this.setData({ activeTab: ++activeTab })
          }
        } else {
          if (activeTab > 0) {
            this.setData({ activeTab: --activeTab })
          }
        }
        stv.offset = stv.windowWidth * activeTab;
      } else {
        //快速滑动 但是Y距离大于50 所以用户是左右滚动
        let page = Math.round(offset / windowWidth);
        if (activeTab != page) {
          this.setData({ activeTab: page })
        }
        stv.offset = stv.windowWidth * page;
      }
    } else {
      let page = Math.round(offset / windowWidth);
      if (activeTab != page) {
        this.setData({ activeTab: page })
      }
      stv.offset = stv.windowWidth * page;
    }
    stv.tStart = false;
    this.setData({ stv: this.data.stv })
  },

  updateSelectedPage(page) {
    let { tabs, stv, activeTab } = this.data;
    activeTab = page;
    this.setData({ activeTab: activeTab })
    stv.offset = stv.windowWidth * activeTab;
    this.setData({ stv: this.data.stv })
    console.log("page: " + this.data.activeTab)
  },

  handlerTabTap(e) {
    this.updateSelectedPage(e.currentTarget.dataset.index);
  }
})
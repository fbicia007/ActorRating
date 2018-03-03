var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: "",
    showModalStatus: false,
    tabs: ['简介', '角色'],
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
    roles: "",
    roleName: "",
    roleDescription: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = options.id
    var status = app.globalData.statusList[options.status]
    var movies = ""
    var openId = app.globalData.userInfo.openId

    this.setData({
      options: options
    })

    wx.showLoading({
      title: '全力加载中...',
    })

    app.getComingSoonFilmDetail(status, id, openId, function (res) {
      wx.hideLoading()
      var data = res.data[0]
      console.log("data: ", data)

      wx.setNavigationBarTitle({
        title: data.title,
      })
      that.setData({
        movie: data,
        roles: data.roles
      })
      console.log("roles: ", data.roles)
    })


    let { tabs } = this.data;
    var res = wx.getSystemInfoSync()
    this.windowWidth = res.windowWidth;
    this.data.stv.lineWidth = this.windowWidth / this.data.tabs.length
    this.data.stv.windowWidth = res.windowWidth
    this.data.stv.windowHeight = res.windowHeight
    this.data.stv.pageHeight = this.data.stv.windowHeight - 50
    this.setData({
      stv: this.data.stv
    })
    this.tabsCount = tabs.length
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

  updateSelectedPage(page) {
    let { tabs, stv, activeTab } = this.data
    activeTab = page
    this.setData({ activeTab: activeTab })
    stv.offset = stv.windowWidth * activeTab
    this.setData({ stv: this.data.stv })
  },

  handlerTabTap(e) {
    this.updateSelectedPage(e.currentTarget.dataset.index)
  },

  onDescriptionClicked: function (e) {
    this.setData({
      roleName: e.currentTarget.dataset.roleName,
      roleDescription: e.currentTarget.dataset.roleDescription
    })

    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },

  onCloseClicked: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },

  util: function (currentStatu) {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })

    this.animation = animation
    animation.opacity(0).rotateX(-100).step()

    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.opacity(1).rotateX(0).step()
      this.setData({
        animationData: animation
      })

      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        )
      }
    }.bind(this), 200)

    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      )
    }
  },

  onVoteClicked: function(e) {
    var data = e.currentTarget.dataset
    var actorId = data.actorId
    var roleId = data.roleId
    var openId = app.globalData.userInfo.openId
    var voteSymbol = data.voteSymbol

    if (voteSymbol) {
      wx.showLoading({
        title: '正在取消...',
      })
    } else {
      wx.showLoading({
        title: '正在投票...',
      })
    }

    var that = this
    app.getVoteRequest(openId, actorId, roleId, function (res) {
      var data = res.data[0]
      console.log("data: ", data)
      var id = that.data.options.id
      var status = app.globalData.statusList[that.data.options.status]
      var openId = app.globalData.userInfo.openId
      app.getComingSoonFilmDetail(status, id, openId, function (res) {
        wx.hideLoading()
        var data = res.data[0]
        that.setData({
          roles: data.roles
        })
      })
    })
  }
})
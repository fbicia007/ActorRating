var wxLogin = require('../../login/wxLogin.js')

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    films: [{}, {}],
    filmsInfo: [{}, {}],
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '演员评分',
    })

    if (this.data.logged) {
      loadFilms(this)
    } else {
      var that = this
      wxLogin.wxLogin(this, function (result) {
        that.setData({
          logged: true
        })
        app.globalData.userInfo = result.data.data
        loadFilms(that)
      },
        function (error) {
          loadFilms(that)
        })
    }
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

  loadMoviePosterError: function (e) {
    var status = e.target.dataset.status
    var id = e.target.dataset.id
    var films = this.data.films
    var data = films[status].data

    for (let i = 0; i < data.length; i++) {
      if (data[i] != null && data[i].id == id) {
        console.log("film: ", data[i])
        data[i].posterV = "../../images/image_holder_v.png"
      }
    }

    this.setData({
      films: films
    })
  },

  onDetailClicked: function (e) {
    var data = e.currentTarget.dataset
    console.log("click id: ", data.id, " stauts: ", data.status)
    if (app.globalData.userInfo.openId) {
      openDetail(data)
    } else {
      var that = this
      wxLogin.wxLogin(this, function (result) {
        that.setData({
          logged: true
        })
        app.globalData.userInfo = result.data.data
        openDetail(data)
      },
        function (error) {

        })
    }


  },

  onMoreClicked: function (e) {
    var temp = e.currentTarget.dataset;
    console.log("tmp: ", temp.type)
    wx.navigateTo({
      url: '../movieList/movieList?type=' + temp.type
    })
  },

  onSearchClicked: function (e) {
    wx.navigateTo({
      url: '../searchMovie/searchMovie'
    })
  },

})

function loadFilms(that) {
  setTimeout(function () {
    wx.showLoading({
      title: '全力加载中...',
    })

    var statusList = new Array()
    for (var status in app.globalData.statusList) {
      statusList.push(app.globalData.statusList[status])
    }

    var titlelist = app.globalData.pageTypelist
    var films = []
    var filmsInfo = []
    for (let i = 0; i < statusList.length; i++) {
      app.getFilmInfo(statusList[i], 0, 7, function (res) {
        wx.hideLoading()
        var data = res.data

        films[i] = { title: titlelist[statusList[i]], data: data, status: statusList[i] }
        filmsInfo[i] = { data: data }

        that.setData({
          films: films,
          filmsInfo: filmsInfo,
        })

      })
    }
  }, 1500)
}

function openDetail(data) {
  if (data.status == 1) {
    wx.navigateTo({
      url: '../movieDetails/movieDetails?id=' + data.id + "&status=" + data.status,
    })
  } else {
    wx.navigateTo({
      url: '../shootingMovieDetails/shootingMovieDetails?id=' + data.id + "&status=" + data.status,
    })
  }
}
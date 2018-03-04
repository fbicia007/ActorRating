// pages/actorDetails/actorDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideText: true,
    hideClass: 'up',
    actorImage: "https://xuwang.de/actorrating/images/actors/dengchao.jpeg",
    actorDescription: "一辆宝马牌摩托车在南京机场高速公路上急速行驶，频繁变道超车。其最高速度开到299公里每小时，犹如高铁速度，以至于其影像资料在瞬间变得扭曲。近日，一段时长1分2秒的摩托车手飙车视频在社交平台引发热议。有网友评论称，“太危险了”，速度都快赶上高铁了，看得心惊胆战。甚至有人说，这样的速度跟任何车辆碰擦都是致命的，对于这种“拿生命当儿戏”的行为应该严肃查处。对此，3月1日中午，南京市公安局交通管理局官方微博 @南京交警 对外发布通报称，3月1日上午10时30分，南京交警高速五大队办案民警将违法犯罪嫌疑人史某（1994年生，无业）抓获。警方认为，史某驾驶摩托车在南京机场高速上高速竞驶，涉嫌危险驾驶。",
    name: "邓超",
    birthday: "1979-02-08",
    constellation: "水瓶座",
    birthplace: "中国,江西,南昌",
    profession: "演员 / 配音 / 导演",
    nickName: "",
    avatarUrl: "",
    items0: [
      {
        image: "http://pic7.qiyipic.com/image/20170424/f3/08/p_1057357_m_601_m3.jpg"
      },
      {
        image: "http://img.chinatimes.com/newsphoto/2015-06-20/656/20150620003057.jpg"
      },
      {
        image: "http://i.shangc.net/2015/1019/20151019050132723.jpg"
      },
      {
        image: "http://img.5669.com/uploads/allimg/150115/37-150115112243912.jpg"
      },
      {
        image: "http://pic7.qiyipic.com/image/20170424/f3/08/p_1057357_m_601_m3.jpg"
      },
      {
        image: "http://img.chinatimes.com/newsphoto/2015-06-20/656/20150620003057.jpg"
      },
      {
        image: "http://i.shangc.net/2015/1019/20151019050132723.jpg"
      },
      {
        image: "http://img.5669.com/uploads/allimg/150115/37-150115112243912.jpg"
      },
      {
        image: "http://img.5669.com/uploads/allimg/150115/37-150115112243912.jpg"
      }
    ],
    items1: [
      {
        image: "https://p.nanrenwo.net/uploads/allimg/170105/8450-1F105164K0.jpg",
        name: '乘风破浪'
      },
      {
        image: "http://p3.ifengimg.com/a/2017_36/5c164c74e15f86e_size93_w350_h500.jpg",
        name: '城市之光'
      },
      {
        image: "http://img31.mtime.cn/CMS/Gallery/2015/07/27/114956.20445766_1000.jpg",
        name: '烈日灼心'
      }
    ],
    item2: [
      {
        avatarurl: "https://wx.qlogo.cn/mmopen/vi_32/biaSJicGMdVg4YibV32Dhl8Q3RxIsKsFic7BLfrFxjLPItZ3ib69yia5mQrjxribe87ibTHBAlZUHV8iaibQAhOVn7sy3zng/0",
        nickName: "张鹏",
        comment: "测试评论123",
        time: "2018-03-01"
      },
      {
        avatarurl: "https://wx.qlogo.cn/mmopen/vi_32/biaSJicGMdVg4YibV32Dhl8Q3RxIsKsFic7BLfrFxjLPItZ3ib69yia5mQrjxribe87ibTHBAlZUHV8iaibQAhOVn7sy3zng/0",
        nickName: "张鹏",
        comment: "测试评论456",
        time: "2018-03-01"
      },
      {
        avatarurl: "https://wx.qlogo.cn/mmopen/vi_32/biaSJicGMdVg4YibV32Dhl8Q3RxIsKsFic7BLfrFxjLPItZ3ib69yia5mQrjxribe87ibTHBAlZUHV8iaibQAhOVn7sy3zng/0",
        nickName: "张鹏",
        comment: "测试评论789",
        time: "2018-03-01"
      },
      {
        avatarurl: "https://wx.qlogo.cn/mmopen/vi_32/biaSJicGMdVg4YibV32Dhl8Q3RxIsKsFic7BLfrFxjLPItZ3ib69yia5mQrjxribe87ibTHBAlZUHV8iaibQAhOVn7sy3zng/0",
        nickName: "张鹏",
        comment: "随便写写",
        time: "2018-03-01"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.login({
      success: function (res) {
        console.log("login: ", res)

        wx.getUserInfo({
          success: function (res) {
            console.log("getUserInfo: ", res)
            that.setData({
              nickName: res.userInfo.nickName,
              avatarUrl: res.userInfo.avatarUrl,
            })
          },
        })

        console.log(that.data.nickName)
        console.log(that.data.avatarUrl)
      }
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
  showall: function () {
    var that = this;
    var hide = that.data.hideText;
    var hideClass = that.data.hideClass == 'up' ? 'down' : 'up';
    that.setData({
      hideText: !hide,
      hideClass: hideClass
    })
  },
  zan: function (e) {
    let a = e.target.dataset.num
    let x = e.target.dataset.zan
    let c = this.data.comments
    if (x == 1) {
      x = 0;
    } else {
      x = 1;
    }
    c[a].zan = x;
    // console.log(a)
    // console.log(x)
    // console.log(c)
    // console.log(c.zan)
    this.setData({
      comments: c
    })
  }
})
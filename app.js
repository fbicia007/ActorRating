//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    releasedMovies:[
      {
        id:0,
        posterV: "/images/烈日灼心.jpeg",
        posterH:"/images/烈日灼心-h.jpeg",
        title:"烈日灼心",
        description:"七年前，福建西陇发生一起惨绝人寰的灭门惨案，某别墅内一家五口同日惨死，在社会上引起极大的震动，然而此去经年，嫌疑人杨自道（郭涛 饰）、辛小丰（邓超 饰）、陈比觉（高虎 饰）却依然逍遥法外。现如今，这三个人都在厦门过活，杨当起了出租车司机，小丰加入了协警队伍，因意外变成傻子的陈则带着三人捡来的女孩尾巴栖息在亲戚的渔场中。这一天，拥有丰富办案经验的伊谷春（段奕宏 饰）调到小丰所在的队伍担任警长。伊颇为器重能力卓越的小丰，但嗅觉灵敏的他也隐隐觉出这个男子和当年的灭门惨案有所关联。在此期间，道哥在一次意外中结识了伊的妹妹小夏（王珞丹 饰）。仿佛冥冥之中有一只看不见的手，正将这三个决心重新做人的男人推向无法更改的结局……",
        actors: [
          {
            id: 100,
            photo: "/images/邓超.jpeg",
            name: "邓超",
            role: "辛小丰",
            like: 23
          }, 
          {
            id:101,
            photo: "/images/郭涛.jpeg",
            name: "郭涛",
            role: "杨自道",
            like: 11
          },
          {
            id: 102,
            photo: "/images/王珞丹.jpeg",
            name: "王珞丹",
            role: "小夏",
            like: 15
          }
        ]
      },
      {
        id: 1,
        posterV: "/images/绣春刀2.jpeg",
        posterH: "/images/绣春刀2-h.jpeg",
        title: "绣春刀2",
        description: "明天启七年，北镇抚司锦衣卫沈炼（张震 饰）在一次扫除乱党任务中，为救画师北斋（杨幂 饰），将同僚凌云铠（武强 饰）灭口。此后一方面要摆脱来自陆文昭（张译 饰）、裴纶（雷佳音 饰）的质疑与调查，一方面又在神秘女子的要挟下放火烧了锦衣卫经历司。裹挟在乱世，沈炼与北斋情陷其中，却越陷越深。而在这一切的背后，巨大阴谋正暗中布局。众生如蝼蚁囿于修罗场，逆鳞之战，一触即发……",
        actors: [
          {
            id: 103,
            photo: "/images/张震.jpeg",
            name: "张震",
            role: "沈炼",
            like: 43
          },
          {
            id: 104,
            photo: "/images/杨幂.jpeg",
            name: "杨幂",
            role: "北斋",
            like: 65
          },
          {
            id: 105,
            photo: "/images/张译.jpeg",
            name: "张译",
            role: "陆文昭",
            like: 164
          }
        ]
      },
      {
        id: 3,
        posterV: "/images/战狼2.jpeg",
        posterH: "/images/战狼2-h.jpeg",
        title: "战狼2",
        description: "故事发生在非洲附近的大海上，主人公冷锋（吴京 饰）遭遇人生滑铁卢，被“开除军籍”，本想漂泊一生的他，正当他打算这么做的时候，一场突如其来的意外打破了他的计划，突然被卷入了一场非洲国家叛乱，本可以安全撤离，却因无法忘记曾经为军人的使命，孤身犯险冲回沦陷区，带领身陷屠杀中的同胞和难民，展开生死逃亡。随着斗争的持续，体内的狼性逐渐复苏，最终孤身闯入战乱区域，为同胞而战斗。",
        actors: [
          {
            id: 106,
            photo: "/images/吴京.jpeg",
            name: "吴京",
            role: "冷锋",
            like: 14
          },
          {
            id: 107,
            photo: "/images/吴刚.jpeg",
            name: "吴刚",
            role: "何建国",
            like: 15
          }
        ]
      },
      {
        id: 4,
        posterV: "/images/记忆大师.jpeg",
        posterH: "/images/记忆大师-h.jpeg",
        title: "记忆大师",
        description: "故事发生在2025年，因为和妻子张代晨（徐静蕾 饰）婚姻破裂，男主角江丰（黄渤 饰）走进记忆大师医疗中心接受手术，却不料手术失误记忆被错误重载，他莫名其妙变成了“杀人凶手”。警官沈汉强（段奕宏 饰）的穷追不舍让他逐渐发现，自己脑内的错误记忆不仅是破案的关键，更是救赎自己的唯一希望。与此同时，妻子身边出现的女人陈姗姗（杨子姗 饰）、记忆中浮现出的神秘女子（许玮甯 饰），似乎也和真相有着千丝万缕的联系，一场记忆烧脑战也随之开始。",
        actors: [
          {
            id: 108,
            photo: "/images/黄渤.jpeg",
            name: "黄渤",
            role: "江丰",
            like: 126
            
          },
          {
            id: 109,
            photo: "/images/徐静蕾.jpeg",
            name: "徐静蕾",
            role: "张代晨",
            like: 32
          }
        ]
      }
    ],
    willReleaseMovies: [
      {
        id: 5,
        posterV: "/images/盗墓笔记.jpeg",
        posterH: "/images/盗墓笔记-h.jpeg",
        title: "盗墓笔记",
        description: "落魄作家为了写作素材，寻访到了一个叫做吴邪（鹿晗 饰）的古董铺子老板，而吴邪正准备离开这个城市，临走之前，吴邪和他讲诉了关于自己奇怪的盗墓家族往事，并说出了自己第一次随家族探险所经历的诡异事件：那一次他们的家族因为偶然获取了一件特殊的青铜器， 追根溯源，寻找到了被掩埋在中国西北盆地中的西王母古国，他们招募了一批盗墓贼一同前往古城遗址探险，进入了位于古城地下的西王母陵中，发现了当年周穆王于西王母求长生不死之术的真相。作家听完吴邪的故事，却发现其中有很多疑点，吴邪到底说的是自己的臆想，还是真相更加可怕复杂，因为吴邪的离开变成了永恒之谜。",
        actors: [
          {
            id: 110,
            photo: "/images/鹿晗.jpeg",
            name: "鹿晗",
            role: "吴邪",
            like: 86
          },
          {
            id: 111,
            photo: "/images/井柏然.jpeg",
            name: "井柏然",
            role: "张起灵",
            like: 56
          }
        ]
      },
      {
        id: 6,
        posterV: "/images/缝纫机乐队.jpeg",
        posterH: "/images/缝纫机乐队-h.jpeg",
        title: "缝纫机乐队",
        description: "小镇青年胡亮（乔杉 饰）为守护家乡摇滚公园，高薪请来音乐经纪人程宫（董成鹏 饰）筹办演唱会。最后集合了鼓手-炸药（李鸿其 饰），贝斯手-丁建国（娜扎 饰），吉他手-杨双树（韩童生 饰），键盘手-希希（曲隽希 饰）组建了“缝纫机乐队”，演出筹备之际，当地房地产大亨为尽快拆除公园，表示愿出高价迫使程宫取消演出。面对高额诱惑和音乐梦想，程宫该何去何从？摇滚小镇集安的摇滚公园能否保全，集安人的摇滚梦想又将何去何从呢……",
        actors: [
          {
            id: 112,
            photo: "/images/董成鹏.jpeg",
            name: "董成鹏",
            role: "程宫",
            like: 35
          },
          {
            id: 113,
            photo: "/images/乔杉.jpeg",
            name: "乔杉",
            role: "胡亮",
            like: 68
          }
        ]
      },
      {
        id: 7,
        posterV: "/images/羞羞的铁拳.jpeg",
        posterH: "/images/羞羞的铁拳-h.jpeg",
        title: "羞羞的铁拳",
        description: "靠打假拳混日子的艾迪生（艾伦 饰），本来和正义感十足的体育记者马小（马丽 饰）是一对冤家，没想到因为一场意外的电击，男女身体互换。性别错乱后，两人互坑互害，引发了拳坛的大地震，也揭开了假拳界的秘密，惹来一堆麻烦，最终两人在“卷莲门”副掌门张茱萸（沈腾 饰）的指点下，向恶势力挥起了羞羞的铁拳。",
        actors: [
          {
            id: 114,
            photo: "/images/艾伦.jpeg",
            name: "艾伦",
            role: "艾迪生",
            like: 124
          },
          {
            id: 115,
            photo: "/images/马丽.jpeg",
            name: "马丽",
            role: "马小",
            like: 223
          },
          {
            id: 116,
            photo: "/images/沈腾.jpeg",
            name: "沈腾",
            role: "张茱萸",
            like: 233
          }
        ]
      },
      {
        id: 8,
        posterV: "/images/功夫瑜伽.jpeg",
        posterH: "/images/功夫瑜伽-h.jpeg",
        title: "功夫瑜伽",
        description: "考古学教授Jack（成龙 饰）多年没有踏出学校，校长和学生都对他添油加醋的历史半信半疑。一次授课后，一个印度女孩找到Jack，用一张千年地图吸引了Jack的目光。于是Jack和挚友的儿子李琼斯（李治廷 饰）、助教小光（张艺兴 饰）组成“寻宝小分队”，为“神秘宝石”展开冒险，在迪拜和土豪飙车，在冰岛潜入神秘冰穴，在印度大战土狼，和印度贵族斗舞，动作喜剧再升级，打笑全世界。",
        actors: [
          {
            id: 117,
            photo: "/images/成龙.jpeg",
            name: "成龙",
            role: "Jack",
            like: 723
            
          },
          {
            id: 118,
            photo: "/images/张艺兴.jpeg",
            name: "张艺兴",
            role: "小光",
            like: 523
          }
        ]
      }
    ]
  }
})
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if (event.type == "read") {
    if (event.ShowId != "全部") {
      if (event.addAft == 0) {
        try {
          return await db.collection('Campus-Circle').orderBy('Time', 'desc').where({
            Label: event.ShowId,
            School: event.School
          }).skip(event.currentPage * 10).limit(10).get({
            success: res => {
              console.log("2333")
              return res
            }
          });
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          return await db.collection('Campus-Circle').orderBy('Time', 'desc').where({
            Label: event.ShowId,
            School: event.School
          }).skip(event.currentPage * 10 + 1).limit(10).get({
            success: res => {
              console.log("2333")
              return res
            }
          });
        } catch (e) {
          console.error(e);
        }
      }
    } else {
      if (event.addAft == 0) {
        try {
          return await db.collection('Campus-Circle').orderBy('Time', 'desc').where({
            School: event.School
          }).skip(event.currentPage * 10).limit(10).get({
            success: res => {
              return res
            }
          });
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          return await db.collection('Campus-Circle').orderBy('Time', 'desc').where({
            School: event.School
          }).skip(event.currentPage * 10 + 1).limit(10).get({
            success: res => {
              return res
            }
          });
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
  if (event.type == "write") {
    try {
      return await db.collection("Campus-Circle").add({
        data: {
          Cover: event.Cover,
          AllPhoto: event.AllPhoto,
          Title: event.Title,
          Text: event.Text,
          CoverHeight: event.CoverHeight,
          CoverWidth: event.CoverWidth,
          Label: event.Label,
          Time: event.Time,
          ShowHeight: event.ShowHeight,
          nickName: event.nickName,
          userName: event.userName,
          iconUrl: event.iconUrl,
          School: event.School,
          Star: 0
        },
        success: res => {},
        fail: err => {}
      })
    } catch (e) {
      console.log(e)
    }
  }
  if (event.type == "writeComment") {
    try {
      return await db.collection('Campus-Circle').where({
        _id: event._id
      }).update({
        data: {
          CommentList: event.CommentList
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
  if (event.type == "starCount") {
    try {
      return await db.collection('Campus-Circle').where({
        _id: event._id
      }).update({
        data: {
          Star: event.Star,
          Star_User: event.Star_User
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
  if (event.type == "readComment") {
    // 记得有空删除一下，下面逻辑，暂时用event._id兜底
    try {

      return await db.collection('Campus-Circle').where({
        _id: event._id
      }).get({
        success: function (res) {
          return res
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
  if (event.type == "search") {
    try {
      return await db.collection('Campus-Circle').where({
        Title: db.RegExp({
          regexp: event.searchKey,
          options: 'i',
        })
      }).get({
        success: function (res) {
          return res
        },
      })
    } catch (e) {
      console.log(e)
    }
  }
  if (event.type == "readUser") {
    try {
      return await db.collection('Campus-Circle').orderBy('Time', 'desc').where({
        username: event.username,
        iconUrl: event.iconUrl,
      }).skip(event.currentPage * 10).limit(10).get({
        success: function (res) {
          console.log("云函数成功");
          return res
        },
      })
    } catch (e) {
      console.log(e)
    }
  }
  if (event.type == "delCard") {
    try {
      return await db.collection('Campus-Circle').doc(event._id).remove()
    } catch (e) {
      console.log(e)
    }
  }
  if (event.type == "delComment") {
    try {
      return await db.collection('Campus-Circle').doc(event._id).update({
        data: {
          CommentList: event.CommentList
        },
      })
    } catch (e) {
      console.log(e)
    }
  }
  // 12-27新增：将点赞与评论这些新消息提示上传到数据库
  if (event.type == "StarControlLogs") {
    // 之前的云函数 StarCount
    db.collection('Campus-Circle').where({
      _id: event._id
    }).update({
      data: {
        Star: event.Star,
        Star_User: event.Star_User
      }
    })
    //   点赞->查找记录->无->add
    //                ->有->status -1? -> 0
    //                    ->status 0/1?-> -1
    const data1 = await db.collection('New-Information').where({ //查找记录
      character: event.character,
      type: '点赞',
      arcticle_id: event.arcticle_id
    }).count()
    console.log(data1.total, "这是data1,用于查找记录");

    if (data1.total == 0) { //没有记录，add点赞
      db.collection('New-Information').add({
        data: {
          character: event.character,
          be_character: event.be_character,
          type: '点赞',
          content: '',
          status: 0,
          createTime: event.createTime,
          arcticle: event.arcticle,
          arcticle_id: event.arcticle_id
        },
      })
    }
    if (data1.total == 1) { //有记录，判断是取消点赞/点赞
      const data3 = await db.collection('New-Information').where({
        character: event.character,
        type: '点赞',
        status: _.gte(0),
        arcticle_id: event.arcticle_id
      }).update({
        data: {
          status: -1,
          createTime: event.createTime
        }
      })
      console.log(data3, "data3，此时有记录，且取消点赞");

      if (!data3.stats.updated) {
        const data4 = await db.collection('New-Information').where({
          character: event.character,
          type: '点赞',
          status: -1,
          arcticle_id: event.arcticle_id
        }).update({
          data: {
            status: 0,
            createTime: event.createTime
          }
        })
        console.log(data4, "data4,有记录，且点赞");
      }
    }
  }
  // 评论
  if (event.type == "CommentControlLogs") {
    try {
      return await db.collection('New-Information').add({
        data: {
          character: event.character,
          be_character: event.be_character,
          type: '评论',
          content: event.content,
          status: 0,
          createTime: event.createTime,
          arcticle: event.arcticle,
          arcticle_id: event.arcticle_id
        },
        success(res) {
          console.log(res, "评论成功，数据库添加成功");
        },
        fail(e) {
          console.log(e, "评论失败，数据库存储失败");
        }
      })
    } catch (e) {
      console.log(e);
    }
  }
  // 删除评论
  if (event.type == "CancelCommentControlLogs") {
    try {
      return await db.collection('New-Information').where({
        character: event.character,
        be_character: event.be_character,
        arcticle_id: event.arcticle_id,
        type: '评论'
      }).update({
        data: {
          status: -1,
          createTime: event.createTime
        }
      }).then((res) => {
        console.log(res, "点赞状态更新成功");
      })
    } catch (e) {
      console.log(e);
    }
  }
  if (event.type == 'ReadControlLogs') {
    const data = await db.collection('New-Information').orderBy('createTime', 'desc').where({
        be_character: event.be_character,
        status: _.gte(0)
      })
      .skip(event.currentPage * event.pageSize)
      .limit(event.pageSize)
      .get()
    // 更新
    await db.collection('New-Information').where({
        be_character: event.be_character,
        status: _.eq(0)
      }).update({
        data: {
          status: 1
        }
      }).then(console.log, "更新完成")
      .catch(console.error, "更新失败")

    return data
  }

  // 12-27新增：将点赞与评论这些新消息提示上传到数据库 ↑↑↑↑↑↑
}
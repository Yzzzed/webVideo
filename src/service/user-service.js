import _cmds from '../util/cmds'

const _user = {
    //登录
    login: function(userInfo, resolve, reject){
        _cmds.request({
            url: _cmds.getServerUrl('/user/login.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //登出
    logout: function(resolve,reject){
        _cmds.request({
            url: _cmds.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //检查登录状态
    checkLogin: function(resolve, reject){
        _cmds.request({
            url: _cmds.getServerUrl('/getUser.do'),   //请求用户信息的接口 如果拿到用户信息 就有登录状态 否则没有
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //注册
    register: function(userInfo, resolve, reject){
        _cmds.request({
            url: _cmds.getServerUrl('/user/register.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //注册时的验证码
    registerValidateCode: function(validateCode, resolve, reject){
        _cmds.request({
            url: _cmds.getServerUrl('/email.do'),
            data: validateCode,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //用户名查重
    checkUsername: function(username,resolve,reject){
        _cmds.request({
            url: _cmds.getServerUrl('/user/check_username.do'),
            data: username,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //获取用户信息
    getUserInfo: function(resolve, reject){
        _cmds.request({
            url: _cmds.getServerUrl('/user/showDetail.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //更新用户信息
    updateUserInfo: function(userInfo, resolve,reject){
        _cmds.request({
            url: _cmds.getServerUrl('/user/user_info_update.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //获取用户关注列表
    getUserFollows: function(listParam, resolve,reject){
        _cmds.request({
            url: _cmds.getServerUrl('/user/getAttentionUser.do'),
            data: listParam,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //加关注
    follow: function(userId, resolve, reject){
        _cmds.request({
            url: _cmds.getServerUrl('/user/setAttention.do'),
            data: userId,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //取消关注
    unfollow: function(username, resolve,reject){
        _cmds.request({
            url: _cmds.getServerUrl('/user/deleteAttention.do'),
            data: username,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //判断是否关注
    checkFollow: function(userId, resolve, reject){
        _cmds.request({
            url: _cmds.getServerUrl('/user/checkAttention.do'),
            data: userId,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //获取用户收藏列表
    getUserCollection: function(listParam, resolve, reject){
        _cmds.request({
            url: _cmds.getServerUrl('/user/getCollection.do'),
            data: listParam,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //判断是否收藏
    checkCollection: function(articleId, resolve, reject){
        _cmds.request({
            url: _cmds.getServerUrl('/user/checkCollection.do'),
            data: articleId,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //加收藏
    collection: function(articleId, resolve, reject){
        _cmds.request({
            url: _cmds.getServerUrl('/user/addCollection.do'),
            data: articleId,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //取消收藏
    unCollection: function(articleId, resolve, reject){
        _cmds.request({
            url: _cmds.getServerUrl('/user/deleteCollection.do'),
            data: articleId,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //加点赞
    thumb: function(articleId, resolve, reject){
        _cmds.request({
            url: _cmds.getServerUrl('/user/addThumb.do'),
            data: articleId,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //取消点赞
    unthumb: function(articleId, resolve, reject){
        _cmds.request({
            url: _cmds.getServerUrl('/user/deleteThumb.do'),
            data: articleId,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //检查是否以点赞
    checkThumb: function(articleId, resolve, reject){
        _cmds.request({
            url: _cmds.getServerUrl('/user/checkThumb.do'),
            data: articleId,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //获取粉丝列表
    getUserFans: function(listParam, resolve, reject){
        _cmds.request({
            url: _cmds.getServerUrl('/user/getFans.do'),
            data: listParam,
            method: 'POST',
            success: resolve,
            error: reject
        })
    }
}

export default _user
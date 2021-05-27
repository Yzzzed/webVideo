import _cmds from '../util/cmds'

const _articles = {
    //加载我的文章列表
    loadMyArticles: function(listParam, resolve, reject){
        _cmds.request({
            url: _cmds.getServerUrl('/center/videos.do'),
            data: listParam,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //个人中心获取我的文章详情
    getMyArticleDetail: function(info, resolve,reject){
        _cmds.request({
            url: _cmds.getServerUrl('/center/article.do'),
            data: info,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //获取文章详情
    getArticleDetail: function(id, resolve,reject){
        _cmds.request({
            url: _cmds.getServerUrl('/view/video.do'),
            data: id,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //获取所有文章列表
    getArticleList: function(resolve,reject){
        _cmds.request({
            url: _cmds.getServerUrl('/view/videos.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //获取文章作者
    getArticleAuthor: function(userId, resolve,reject){
        _cmds.request({
            url: _cmds.getServerUrl('/user/findById.do'),
            data: userId,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //删除文章
    deleteArticle: function(id, resolve, reject){
        _cmds.request({
            url: _cmds.getServerUrl('/center/deleteVideo.do'),
            data: id,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //发表文章
    publishArticle: function(articleInfo, resolve, reject){
        _cmds.request({
            url: _cmds.getServerUrl('/center/addVideo.do'),
            data: articleInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //编辑文章
    updateArticle: function(articleInfo, resolve, reject){
        _cmds.request({
            url: _cmds.getServerUrl('/center/updateArticle.do'),
            data: articleInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //搜索获取文章列表
    getArticleList: function(listParam, resolve, reject){
        _cmds.request({
            url: _cmds.getServerUrl('/view/searchVideos.do'),
            data: listParam,
            method: 'GET',
            success: resolve,
            error: reject
        })
    }
}

export default _articles
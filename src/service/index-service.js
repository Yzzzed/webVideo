import _cmds from '../util/cmds'

const _index = {
    //加载为您推荐
    loadForYou: function(resolve, reject){
        _cmds.request({
            url: _cmds.getServerUrl('/view/videos.do'),
            // url: _cmds.getServerUrl('/api/index/loadForYou.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //加载侧边导航栏
    loadSideBar: function(resolve,reject){
        _cmds.request({
            // url: _cmds.getServerUrl('/user/loadSideBar.do'),
            url: _cmds.getServerUrl('/api/index/loadSideBar.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    }
}

export default _index
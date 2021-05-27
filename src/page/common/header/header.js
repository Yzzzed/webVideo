import './header.css'
import _cmds from '../../../util/cmds'
import _user from '../../../service/user-service'

const header = {
    userInfo: {
        isLogin: false
    },
    init: function(){
        this.onload()
        this.bindEvent()

        return this
    },
    bindEvent: function(){
        const _this = this
        //登出
        $('.logout').click(() => {
            _user.logout(res => {
                window.location.reload()
            }, errMsg => {
                console.log(errMsg)
            })
        })
        //搜索
        $('#search-btn').click(() => {
            _this.searchSubmit()
        })
        $('#search-input').keyup((e) => {
            if(e.keyCode === 13){
                _this.searchSubmit()
            }
        })
        //未登录写文章跳转
        $(document).on('click', '#write', () => {
            // _user.checkLogin(res => {
            //     window.location.href = './article-write.html'
            // }, errMsg => {
            //     // _cmds.errorTips(errMsg)
            //     _cmds.goLogin()
            // })
            if(_this.userInfo.isLogin){
                window.location.href = `./article-write.html?redirect=${encodeURIComponent(window.location.href)}`
            }else{
                _cmds.errorTips('请先登录~')
                _cmds.goLogin()
            }
        }) 

        //跳转到个人中心
        $('#username').click(() => {
            // window.location.href = `./user-center.html?id=${_this.userInfo.id}`
            window.location.href = `./user-center.html`
        })
        $('#myArticle').click(() => {
            // window.location.href = `./user-article.html?id=${_this.userInfo.id}`
            window.location.href = `./user-center.html`
        })
        $('#myCollection').click(() => {
            // window.location.href = `./user-collection.html?id=${_this.userInfo.id}`
            window.location.href = `./user-collection.html`
        })
        $('#myFollows').click(() => {
            window.location.href = `./user-follows.html`
        })
        $('#myFans').click(() => {
            window.location.href = `./user-fans.html`
        })
    },
    onload: function(){
        this.loadUserInfo()
        this.loadKeyword()
    },
    loadKeyword: function(){
        const keyword = _cmds.getUrlParam('keyword')
        if(keyword){
            $('#search-input').val(keyword)
        }
    },
    loadUserInfo: function(){
        const _this = this
        _user.checkLogin( res => {
            _this.userInfo.isLogin = true
            _this.userInfo.userId = res.id
            const username = res.username
            $('.user-con .not-login').hide().siblings('.user-con .login').show()
            .find('#username').text(username)
        }, errMsg => {
            console.log(errMsg)
        })
    },
    searchSubmit: function(){
        const keyword = $('#search-input').val()
        if(keyword){
            window.location.href = `./list.html?keyword=${keyword}`
        }else{
            _cmds.goHome()
        }
    }
}

// $(function(){
//     header.init()
// })
export default header.init()
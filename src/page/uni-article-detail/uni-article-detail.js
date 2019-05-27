import './uni-article-detail.css'
import header from '../common/header/header'
import _cmds from '../../util/cmds'
import _index from '../../service/index-service'
import _articles from '../../service/articles-service'
import templateSideBar from './sidebar.string'
import templateDetail from './detail.string'
import _user from '../../service/user-service'

const page = {
    init: function(){
        this.onload()
        this.bindEvent()
    },
    bindEvent: function(){
        const _this = this
        // const $follow = $('.follow')
        //阻止冒泡
        $(document).on('click', 'button', e => {
            e.stopPropagation()
            return false
        })
        //关注与取消关注
        $(document).on('click', '.follow', function(){
            if($(this).html() == '关注'){
                if(window.confirm('确认要关注该用户吗？')){
                    //传要关注的用户id
                    _user.follow({
                        userId: _this.userId
                    }, res => {
                        _cmds.successTips('关注成功~')
                        _this.checkFollow()
                    }, errMsg => {
                        _cmds.errorTips('关注失败~')
                    })
                    // alert('关注')
                }
            }
            else if($(this).html() == '取消关注'){
                if(window.confirm('确认要取关该用户吗？')){
                    //传要取消关注的username
                    _user.unfollow({
                        attentionUsername: _this.username
                    }, res => {
                        _cmds.successTips('取关成功~')
                        _this.checkFollow()
                    }, errMsg => {
                        _cmds.errorTips('取关失败~')
                    })
                    // alert('取消关注')
                }
            }
        })

        //收藏与取消收藏
        $(document).on('click', '.collection', function(){
            if($(this).html() == '收藏'){
                if(window.confirm('确认要收藏该文章吗？')){
                    //传要收藏的文章id
                    _user.collection({
                        articleId: _cmds.getUrlParam('id')
                    }, res => {
                        _cmds.successTips('收藏成功~')
                        _this.checkCollection()
                    }, errMsg => {
                        _cmds.errorTips('收藏失败~')
                    })
                }
            }
            else if($(this).html() == '取消收藏'){
                if(window.confirm('确认要取消收藏该文章吗？')){
                    //传要取消收藏的文章id
                    _user.unCollection({
                        articleId: _cmds.getUrlParam('id')
                    }, res => {
                        _cmds.successTips('取消收藏成功~')
                        _this.checkCollection()
                    }, errMsg => {
                        _cmds.errorTips('取消收藏失败~')
                    })
                }
            }
        })

        //点赞与取消点赞
        $(document).on('click', '.thumb', function(){
            // console.log($(this).html())
            if($(this).html() == '点赞'){
                _user.thumb({
                    articleId: _cmds.getUrlParam('id')
                }, res => {
                    _this.checkThumb()
                }, errMsg => {
                    _cmds.errorTips('点赞失败~')
                })
            }
            else if($(this).html() == '取消点赞'){
                _user.unthumb({
                    articleId: _cmds.getUrlParam('id')
                }, res => {
                    _this.checkThumb()
                }, errMsg => {
                    _cmds.errorTips('取消点赞失败~')
                })
            }
        })

    },
    onload:function(){
        // this.loadSideBar()
        this.loadDetail()
        header.init()
    },
    // loadSideBar: function(){
    //     const $sideBar = $('.side-bar')
    //     let htmlSideBar = ''
    //     _index.loadSideBar(res => {
    //         htmlSideBar = _cmds.renderHtml(templateSideBar, res)
    //         $sideBar.html(htmlSideBar)
    //     }, errMsg => {
    //         $sideBar.html(`<p class="err-tip">${errMsg}</p>`)
    //     })
    // },
    loadDetail: function(){
        const _this = this
        _articles.getArticleDetail({
            id: _cmds.getUrlParam('id')
        }, res => {
            //异步请求 必须在第二个请求后再渲染
            _this.filter(res)
        }, errMsg => {
            _cmds.errorTips(errMsg)
        })
    },
    filter: function(data){
        const _this = this
        const $panelHeading = $('.panel-heading')
        let detailHtml = ''
        const userId = data.user_id
        this.userId = userId
        // console.log("TCL: userId", userId)
        const $con = $('#con')
        _articles.getArticleAuthor({
            userid: userId
        }, res => {
            this.username = res.username
            data.user = res.username
            // const $content = $(data.content)

            detailHtml = _cmds.renderHtml(templateDetail, data)
            $panelHeading.html(detailHtml)
            $con.html(data.content)
            // console.log("TCL: $content", $content)
            // console.log("TCL: $content.text()", $content.text())
            _this.checkFollow()
            _this.checkCollection()
            _this.checkThumb()
        }, errMsg => {
            _cmds.errorTips('filter error')
        })
    },
    checkFollow: function(){
        const _this = this
        const $follow = $('.follow')
        _user.checkFollow({
            userId: _this.userId
        }, res => {

            if(res){
                $follow.html('取消关注')
            }else{
                $follow.html('关注')
            }
        }, errMsg => {

        })
    },
    checkCollection: function(){
        const _this =this 
        const $collection = $('.collection')
        _user.checkCollection({
            articleId: _cmds.getUrlParam('id')
        }, res => {
            if(res){
                $collection.html('取消收藏')
            }else{
                $collection.html('收藏')
            }
        }, errMsg => {

        })
    },
    checkThumb: function(){
        const _this = this
        const $thumb = $('.thumb')
        _user.checkThumb({
            articleId: _cmds.getUrlParam('id')
        }, res => {
            if(res){
                $thumb.html('取消点赞')
            }else{
                $thumb.html('点赞')
            }
        }, errMsg => {

        })
    }
}

$(function(){
    page.init()
})
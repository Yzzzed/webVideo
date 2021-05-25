import './article-detail.css'
import header from '../common/header/header'
import _cmds from '../../util/cmds'
import _index from '../../service/index-service'
import _articles from '../../service/articles-service'
import templateSideBar from './sidebar.string'
import templateDetail from './detail.string'

const page = {
    init: function(){
        this.onload()
        this.bindEvent()
    },
    bindEvent: function(){

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
        _articles.getMyArticleDetail({
            id: _cmds.getUrlParam('id')
        }, res => {
            //异步请求 必须在第二个请求后再渲染
            _this.filter(res)
        }, errMsg => {
            _cmds.errorTips(errMsg)
        })
    },
    filter: function(data){
        const $panelHeading = $('.panel-heading')
        let detailHtml = ''
        let playerHtml = ''
        const userId = data.user_id
        const $con = $('#con')
        _articles.getArticleAuthor({
            userid: userId
        }, res => {
            data.user = res.username
            console.log("TCL: data", data)
            
            detailHtml = _cmds.renderHtml(templateDetail, data)
            $panelHeading.html(detailHtml)
            playerHtml = _cmds.renderHtml(playerHtml, data)
            $con.html(playerHtml)
        }, errMsg => {
            _cmds.errorTips(errMsg)
        })
    }
}

$(function(){
    page.init()
})
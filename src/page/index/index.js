import './index.css'
import header from '../common/header/header'
import _cmds from '../../util/cmds'
import _index from '../../service/index-service'
import templateSideBar from './sidebar.string'
import templateForYou from './forYou.string'
import _articles from '../../service/articles-service';

const page = {
    init: function(){
        this.onload()
        this.bindEvent()
    },
    bindEvent: function(){
        
    },
    onload: function(){
        // this.loadSideBar()
        this.loadForYou()
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
    loadForYou: function(){
        const _this = this
        const $panelBody = $('.panel-body')
        _index.loadForYou(res => {
            let htmlForYou = ''
            htmlForYou = _cmds.renderHtml(templateForYou, res)
            $panelBody.html(htmlForYou)
            // _this.filter(res)
        }, errMsg => {
            _cmds.errorTips(errMsg)
        })
    },
    // filter: function(data){
    //     const _this = this
    //     const $panelBody = $('.panel-body')
    //     let htmlForYou = ''
    //     const userId = data.user_id
    //     console.log("TCL: userId", userId)
    //     _articles.getArticleAuthor({
    //         userid: userId
    //     }, res => {
    //         data.user = res.username
    //         console.log("TCL: data", data)
            
    //     }, errMsg => {
    //         _cmds.errorTips('filter error')
    //     })
        
    // }
}

$(function(){
    page.init()
})
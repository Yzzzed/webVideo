import './index.css'
import header from '../common/header/header'
import _cmds from '../../util/cmds'
import _index from '../../service/index-service'
import templateSideBar from './sidebar.string'
import templateForYou from './forYou.string'
import templatePlayer from './player.string'
import _articles from '../../service/articles-service';

const page = {
    init: function(){
        this.onload()
        this.bindEvent()
    },
    bindEvent: function(){
        // $('#index-player').on('click', '#index-player',() => {
        //     console.log('-----click-----')
        //     const player = videojs('ipfs-streaming-video')
        //     player.play()
        // })
        
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
        const $hotList = $('.hot-list')
        _index.loadForYou(res => {
            const first = res.list.shift()
            first.poster = _cmds.randomImg()
            console.log(first)
            let player = ''
            let htmlForYou = ''
            htmlForYou = _cmds.renderHtml(templateForYou, res)
            $panelBody.html(htmlForYou)
            player = _cmds.renderHtml(templatePlayer, first)
            $hotList.html(player)
            // this.loadPlayer(first.address)
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
    loadPlayer: function (url) {
        const target = document.querySelector('#index-player')
        const sources = {
            hd: {
              play_url: `https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4`,
            },
            sd: {
              play_url: `https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4`,
            },
        }
        const player = Griffith.createPlayer(target)
        player.render({sources})
    }
}

$(function(){
    page.init()
})
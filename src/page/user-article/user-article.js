import './user-article.css'
import header from '../common/header/header'
import navSide from '../common/nav-side/nav-side'
import _cmds from '../../util/cmds'
import _articles from '../../service/articles-service'
import templateIndex from './index.string'
import Pagination from '../../util/pagination/pagination'

const page = {
    data: {
        listParam: {
            search: _cmds.getUrlParam('keyword') || '',
            pageNum: _cmds.getUrlParam('pageNum') || 1,
            pageSize: _cmds.getUrlParam('pageSize') || 5,
            currentPage: _cmds.getUrlParam('currentPage') || 1
        }
    },
    init: function(){
        this.onload()
        this.bindEvent()
    },
    bindEvent: function(){
        const _this = this
        $(document).on('click', '.update', function(){
            const id = $(this).parents('.article-item').data('id')
            // const id = $('.article-item').data('id')
            // console.log("TCL: id", id)
            if(id){
                window.location.href = `./article-update.html?id=${id}`
            }
        })
        //阻止冒泡
        $(document).on('click', 'button', e => {
            e.stopPropagation()
            return false
        })
        //删除文章
        $(document).on('click','.delete', function(){
            const id = $(this).parents('.article-item').data('id')
            if(window.confirm('确定要删除该文章吗?')){
                _articles.deleteArticle({
                    id: id
                }, res => {
                    _this.loadUserArticles()
                    _this.loadPagination()
                }, errMsg => {
                    _cmds.errorTips(errMsg)
                })
            }
        })
        
    },
    onload: function(){
        //加载header
        header.init()
        // 初始化左侧菜单
        navSide.init({
            name: 'my-article'
        })
        // 加载用户文章列表
        this.loadUserArticles()
    },
    loadUserArticles: function(){
        let userHtml = '',
            listParam = this.data.listParam,
            $panelBody = $('.panel-body')

        _articles.loadMyArticles(listParam,(res) => {
            // console.log("TCL: $content", $content)
            userHtml = _cmds.renderHtml(templateIndex, res)
            $panelBody.html(userHtml)

            this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            })
        }, (errMsg) => {
            console.log(errMsg)
            // _cmds.errorTips(errMsg)
        })
    },
    loadPagination: function(pageInfo){
        this.pagination ? '' : (this.pagination = new Pagination())

        this.pagination.render($.extend({}, pageInfo, {
            container: $('.cmds-pagination'),
            onSelectPage: pageNum => {
                this.data.listParam.pageNum = pageNum
                this.data.listParam.currentPage = pageNum
                this.loadUserArticles()
            }
        }))
    }

}

$(function(){
    page.init()
})
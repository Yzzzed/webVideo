import './list.css'
import header from '../common/header/header'
import _cmds from '../../util/cmds'
import _articles from '../../service/articles-service'
import templateList from './list.string'
import Pagination from '../../util/pagination/pagination'


const page = {
    data: {
        listParam: {
            search: _cmds.getUrlParam('keyword') || '',
            pageNum: _cmds.getUrlParam('pageNum') || 1,
            pageSize: _cmds.getUrlParam('pageSize') || 6,
            currentPage: _cmds.getUrlParam('currentPage') || 1
        }
    },
    init: function(){
        this.onload()
    },
    onload: function(){
        this.loadList()
        header.init()
    },
    loadList: function(){
        let listHtml = '',
            listParam = this.data.listParam,
            $listCon = $('.panel-body')

        // $listCon.html('<div class="loading"></div>')

        _articles.getArticleList(listParam, res => {
            listHtml = _cmds.renderHtml(templateList, {
                list: res.list
            })
            $listCon.html(listHtml)

            this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            })
        }, errMsg => {
            _cmds.errorTips(errMsg)
        })
    },
    loadPagination: function(pageInfo){
        this.pagination ? '' : (this.pagination = new Pagination())

        this.pagination.render($.extend({}, pageInfo, {
            container: $('.cmds-pagination'),
            onSelectPage: pageNum => {
                this.data.listParam.pageNum = pageNum
                this.data.listParam.currentPage = pageNum
                this.loadList()
            }
        }))
    }
}

$(function(){
    page.init()
})

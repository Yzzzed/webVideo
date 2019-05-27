import './user-collection.css'
import header from '../common/header/header'
import navSide from '../common/nav-side/nav-side'
import _cmds from '../../util/cmds'
import _user from '../../service/user-service'
import templateIndex from './index.string'
import Pagination from '../../util/pagination/pagination'

const page = {
    data: {
        listParam: {
            search: _cmds.getUrlParam('keyword') || '',
            pageSize: _cmds.getUrlParam('pageSize') || 5,
            pageNum: _cmds.getUrlParam('pageNum') || 1,
            currentPage: _cmds.getUrlParam('currentPage') || 1
        }
    },
    init: function(){
        this.onload()
        this.bindEvent()
    },
    bindEvent: function(){
        const _this = this
        //阻止冒泡
        $(document).on('click', 'button', e => {
            e.stopPropagation()
            return false
        })
        $(document).on('click', '.uncollection', function(){
            if(window.confirm('确定要取消收藏该文章吗？')){
                const articleId = $(this).parents('.article-item').data('id')
                _user.unCollection({
                    articleId: articleId
                }, res => {
                    _cmds.successTips('取消收藏成功~')
                    _this.loadUserCollection()
                    _this.loadPagination()
                })
            }
        })
    },
    onload: function(){
        header.init()
        // 初始化左侧菜单
        navSide.init({
            name: 'my-collection'
        })
        // 加载用户收藏
        this.loadUserCollection()
    },
    loadUserCollection: function(){
        let userHtml = '',
            listParam = this.data.listParam,
            $panelBody = $('.panel-body')
        _user.getUserCollection(listParam, (res) => {
            // console.log(res)
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
                this.loadUserCollection()
            }
        }))
    }

}

$(function(){
    page.init()
})
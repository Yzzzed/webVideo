import './user-fans.css'
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
            pageNum: _cmds.getUrlParam('pageNum') || 1,
            pageSize: _cmds.getUrlParam('pageSize') || 5,
            currentPage: _cmds.getUrlParam('currentPage') || 1
        }
    },
    init: function(){
        this.onload()
    },
    onload: function(){
        header.init()
        // 初始化左侧菜单
        navSide.init({
            name: 'my-fans'
        })
        // 加载用户粉丝
        this.loadUserFans()
    },
    loadUserFans: function(){
        let userHtml = '',
            listParam = this.data.listParam,
            $panelBody = $('.panel-body')
        _user.getUserFans(listParam, (res) => {
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
                this.loadUserFans()
            }
        }))
    }

}

$(function(){
    page.init()
})
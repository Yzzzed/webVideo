import './user-follows.css'
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
        this.bindEvent()
    },
    onload: function(){
        header.init()
        // 初始化左侧菜单
        navSide.init({
            name: 'my-follows'
        })
        //加载用户关注
        this.loadUserFollows()
    },
    bindEvent: function(){
        const _this = this
        //阻止冒泡
        $(document).on('click', 'button', e => {
            e.stopPropagation()
            return false
        })
        //取消关注
        $(document).on('click', '.unfollow', function(){
            if(window.confirm('确定要取关该用户吗？')){
                const username = $(this).parents('.list-group-item').data('username')
                // console.log("TCL: username", username)
                _user.unfollow({
                    attentionUsername: username
                }, res => {
                    _cmds.successTips('取关成功~')
                    _this.loadUserFollows()
                    _this.loadPagination()
                }, errMsg => {
                    _cmds.errorTips('取关失败~')
                })
            }
        })
    },
    loadUserFollows: function(){
        let userHtml = '',
            listParam = this.data.listParam,
            $panelBody = $('.panel-body')


        _user.getUserFollows(listParam, (res) => {
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
                this.loadUserFollows()
            }
        }))
    }

}

$(function(){
    page.init()
})
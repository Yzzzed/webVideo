import './user-center.css'
import header from '../common/header/header'
import navSide from '../common/nav-side/nav-side'
import _cmds from '../../util/cmds'
import _user from '../../service/user-service'
import templateIndex from './index.string'

const page = {
    init: function(){
        this.onload()
        this.bindEvent()
    },
    bindEvent: function(){
        const _this = this
        $(document).on('click','#user-info-edit',() => {
            $('.user-info-con').addClass('hide').siblings('.info-edit-con').removeClass('hide').show()
            $('.user-edit').addClass('hide').siblings('.user-update').removeClass('hide').show()
        })
        $(document).on('click','#user-edit-finish', () => {
            const userInfo = {
                neckname    : $('#neckname').val(),
                sex         : $('#sex').val(),
                birthday    : $('#birthday').val(),
                place       : $('#place').val(),
                personal_sign : $('#personal_sign').val()
            }
            _user.updateUserInfo(userInfo, (res) => {
                _cmds.successTips('更新成功~')
                _this.loadUserInfo()
                $('.info-edit-con').addClass('hide').siblings('.user-info-con').removeClass('hide').show()
                $('.user-update').addClass('hide').siblings('.user-edit').removeClass('hide').show()

            }, errMsg => {
                _cmds.errorTips(`更新失败~Error: ${errMsg}`)
            })
        })
        $(document).on('click', '#user-edit-quit', () => {
            _this.loadUserInfo()
            $('.info-edit-con').addClass('hide').siblings('.user-info-con').removeClass('hide').show()
            $('.user-update').addClass('hide').siblings('.user-edit').removeClass('hide').show()
        })
    },
    onload: function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'my-center'
        })
        //
        header.init()
        // 加载用户信息
        this.loadUserInfo()
    },
    //加载用户信息
    loadUserInfo: function(){
        const _this = this

        let userHtml = ''
        _user.getUserInfo((res) => {
            userHtml = _cmds.renderHtml(templateIndex, res)
            $('.panel-body').html(userHtml)
        }, (errMsg) => {
            // console.log(errMsg)
            _cmds.errorTips(errMsg)
        })
    }

}

$(function(){
    page.init()
})
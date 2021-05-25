import './user-center.css'
import header from '../common/header/header'
import navSide from '../common/nav-side/nav-side'
import _cmds from '../../util/cmds'
import _user from '../../service/user-service'
import _articles from '../../service/articles-service'
import templateIndex from './index.string'
import templateVideoList from './list.string'

const page = {
    init: function(){
        this.onload()
        this.bindEvent()
        this.uploadInit()
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
            }
            _user.updateUserInfo(userInfo, (res) => {
                if(res.code === 0) {
                    _cmds.successTips('更新成功~')
                }
                _this.loadUserInfo()

            }, errMsg => {
                _cmds.errorTips(`更新失败~Error: ${errMsg}`)
            })
        })
        $(document).on('click', '#user-edit-quit', () => {
            _this.loadUserInfo()
            $('.info-edit-con').addClass('hide').siblings('.user-info-con').removeClass('hide').show()
            $('.user-update').addClass('hide').siblings('.user-edit').removeClass('hide').show()
        })
        $(document).on('click', '#editNickname', () => {
            $('.ui.modal.nickname-modal').modal({
                centered: false
            }).modal('show')
        })
        $(document).on('click', '#uploadBtn', () => {
            $('.ui.modal.upload-modal').modal({
                centered: false
            }).modal('show')
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
        this.loadUserVideo()
    },
    //加载用户信息
    loadUserInfo: function(){
        const _this = this

        let userHtml = ''
        _user.getUserInfo((res) => {
            console.log('res---', res)
            userHtml = _cmds.renderHtml(templateIndex, res)
            $('#panel-body').html(userHtml)
        }, (errMsg) => {
            // console.log(errMsg)
            _cmds.errorTips(errMsg)
        })
    },
    loadUserVideo: function () {
        const _this = this

        let videoHtml = ''
        const $videoCard = $('#user-video-card')
        _articles.loadMyArticles({},(res) => {
            console.log('res', res)
            videoHtml = _cmds.renderHtml(templateVideoList, res)
            console.log(videoHtml)
            $videoCard.html(videoHtml)
        }, (errMsg) => {
            console.log(errMsg)
        })
    },
    // 上传初始化
    uploadInit: function () {
        $('#videofile').fileinput({
            language: 'zh', //设置语言
            uploadUrl: '/xxxxx.do', //上传的地址
            allowedFileExtensions: ['jpg', 'gif', 'png'],//接收的文件后缀
            showUpload: true, //是否显示上传按钮
            showCaption: false,//是否显示标题
            browseClass: "btn btn-primary", //按钮样式     
            dropZoneEnabled: true,//是否显示拖拽区域
            //maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
            //minFileCount: 0,
            maxFileCount: 10, //表示允许同时上传的最大文件个数
            enctype: 'multipart/form-data',
            validateInitialCount:true,
            previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
            msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
        });
    }

}

$(function(){
    page.init()
})
import './user-login.css'
import '../common/nav-simple/nav-simple'
import _cmds from '../../util/cmds'
import _user from '../../service/user-service'

//表单里面错误提示
const formError = {
    show: function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg)
    },
    hide: function(){
        $('.error-item').hide().find('.err-msg').text('')
    }
}

const page = {
    userInfo: {

    },
    //页面初始化
    init: function(){
        this.bindEvent()
    },
    //点击事件
    bindEvent: function(){
        const _this = this
        $('#submit').click(() => {
            _this.submit()
        })
        $('.form-control').keyup(e => {
            if(e.keyCode === 13){
                _this.submit()
            }
        })
    },
    //提交表单
    submit: function(){
        const _this = this
        const formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        }

        const validateResult = _this.formValidate(formData)
        
        if(validateResult.status){
            _user.login(formData, (res) => {
                _this.userInfo.userid = res.id
                _this.userInfo.username = res.username
                // window.location.href = _cmds.getUrlParam('redirect') || `./user-center.html?userid=${_this.userInfo.userid}&username=${_this.userInfo.username}`
                window.location.href = _cmds.getUrlParam('redirect') || `./index.html`
            }, (errMsg) => {
                formError.show(errMsg)
            })
        }else{
            formError.show(validateResult.msg)
        }
    },
    formValidate: function(formData){
        let result = {
            status: false,
            msg: ''
        }

        if(!_cmds.validate(formData.username,'required')){
            result.msg = '用户名不能为空'
            return result
        }
        if(!_cmds.validate(formData.password,'required')){
            result.msg = '密码不能为空'
            return result
        }

        result.status = true
        result.msg = '验证通过'
        return result
    }
}

$(function(){
    page.init()
})

import './user-register.css'
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
    init: function(){
        this.bindEvent()
    },
    bindEvent: function(){
        const _this = this
        $('#username').blur(() => {
            const username = $.trim($('#username').val())
            if(!username) return

            //异步验证用户名是否存在
            _user.checkUsername({username:username}, res => {
                formError.hide()
            }, errMsg => {
                formError.show(errMsg)
            })
        })
        $('#codeSubmit').click(() => {
            const emailData ={
                email: $.trim($('#email').val()),
                msg: ''
            }
            if(!_cmds.validate(emailData.email, 'required')){
                emailData.msg = '邮箱不能为空'
                formError.show(emailData.msg)
                return
            }
            if(!_cmds.validate(emailData.email,'email')){
                emailData.msg = '邮箱格式不正确'
                return
            }
            _user.registerValidateCode(emailData, (res) => {
                console.log(res)
            }, errMsg => {
                _cmds.errorTips(errMsg)
            })

        })
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
        const formData = {
            username            : $.trim($('#username').val()),
            password            : $.trim($('#password').val()),
            passwordConfirm     : $.trim($('#passwordConfirm').val()),
            email               : $.trim($('#email').val()),
            identifyingCode     : $.trim($('#validateCode').val())
        },
        validateResult = this.formValidate(formData)
        if(validateResult.status){
            _user.register(formData, res => {
                _cmds.successTips('注册成功~')
                window.location.href = './user-login.html'
            }, errMsg => {
                formError.show(errMsg)
            })
        }

    },
    //表单验证以及验证码检验
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
            result.msg = '用户名不能为空'
            return result
        }
        if(formData.password.length < 6){
            result.msg = '密码长度不能少于6位'
            return result
        }
        if(formData.password !== formData.passwordConfirm){
            result.msg = '两次输入密码不一致'
            return result
        }
        if(!_cmds.validate(formData.email, 'required')){
            result.msg = '邮箱不能为空'
            return result
        }
        if(!_cmds.validate(formData.email,'email')){
            result.msg = '邮箱格式不正确'
            return result
        }
        if(!_cmds.validate(formData.identifyingCode, 'required')){
            result.msg = '验证码不能为空'
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
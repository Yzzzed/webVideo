import './article-write.css'
import _cmds from '../../util/cmds'
import _articles from '../../service/articles-service'
import E from 'wangeditor'

const page = {
    init: function(){
        this.onload()
        this.bindEvent()
    },
    bindEvent: function(){
        const _this = this
        //发表文章
        $('.save').on('click', () => {
            // console.log("TCL: $('#title').val()", $('#title').val())
            // console.log("TCL: _this.editor.txt.html()", _this.editor.txt.html())
            // console.log("TCL: _this.editor.txt.html()", _this.editor.txt.text())
            const articleInfo = {
                title: $.trim($('#title').val()),
                content: $.trim(_this.editor.txt.html()),
                textContent: $.trim(_this.editor.txt.text())
            }

        _this.publish(articleInfo)
        })
        //返回上一页
        $('.return').on('click', () => {
            window.location.href = _cmds.getUrlParam('redirect')
        })


    },
    onload:function(){
        this.loadEditor()
    },
    loadEditor: function(){
        let e = new E('#editor')
        e.create()
        this.editor = e
    },
    publish: function(articleInfo){
        if(!_cmds.validate(articleInfo.title, 'required')){
            _cmds.errorTips('标题不能为空~')
            return
        }
        if(!_cmds.validate(articleInfo.textContent, 'required')){
            _cmds.errorTips('内容不能为空~')
            return
        }
        
        if(window.confirm('确定要发表该文章吗')){
            _articles.publishArticle(articleInfo, res => {
                _cmds.successTips('发表成功~')
                window.location.href = './user-article.html'
            }, errMsg => {
                _cmds.errorTips(errMsg)
            })
        }
    }
}

$(function(){
    page.init()
})